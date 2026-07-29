#!/usr/bin/env python3
"""Check internal references and external links across the static site."""

from __future__ import annotations

import argparse
import json
import re
import ssl
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import asdict, dataclass
from html.parser import HTMLParser
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import unquote, urljoin, urlparse
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "https://getintorobotics.com"
USER_AGENT = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/126.0 Safari/537.36"
)
SKIP_SCHEMES = ("mailto:", "tel:", "javascript:", "data:")
OK_RESTRICTED = {401, 403, 405, 406, 418, 429}
NON_DOCUMENT_ORIGINS = {
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
}
BOT_BLOCKING_HOSTS = {
    "facebook.com",
    "www.facebook.com",
    "instagram.com",
    "www.instagram.com",
    "linkedin.com",
    "www.linkedin.com",
}


class ReferenceParser(HTMLParser):
    """Collect links, assets and element IDs from one HTML document."""

    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[str, str]] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs) -> None:
        values = dict(attrs)
        if identifier := values.get("id"):
            self.ids.add(identifier)
        for attr in ("href", "src"):
            if value := values.get(attr):
                self.references.append((attr, value.strip()))


@dataclass(frozen=True)
class Source:
    page: str
    attr: str
    value: str


@dataclass
class ExternalResult:
    url: str
    status: int | None
    final_url: str | None
    state: str
    error: str | None = None


def html_files() -> list[Path]:
    return sorted(
        path
        for path in ROOT.rglob("*.html")
        if ".git" not in path.parts and "node_modules" not in path.parts
    )


def parse_site():
    parsed = {}
    sources: dict[str, list[Source]] = {}
    for page in html_files():
        parser = ReferenceParser()
        parser.feed(page.read_text(encoding="utf-8"))
        parsed[page.resolve()] = parser
        for attr, value in parser.references:
            sources.setdefault(value, []).append(
                Source(str(page.relative_to(ROOT)), attr, value)
            )
    return parsed, sources


def local_path_for_url(page: Path, value: str) -> tuple[Path, str | None] | None:
    """Map an internal URL to a file and optional fragment."""

    if not value or value.startswith(SKIP_SCHEMES):
        return None

    parsed = urlparse(value)
    if parsed.scheme in {"http", "https"}:
        if parsed.netloc not in {"getintorobotics.com", "www.getintorobotics.com"}:
            return None
        raw_path = unquote(parsed.path or "/")
    elif parsed.scheme or parsed.netloc:
        return None
    elif value.startswith("#"):
        return page.resolve(), unquote(parsed.fragment) or None
    else:
        raw_path = unquote(parsed.path)

    if raw_path.startswith("/"):
        target = ROOT / raw_path.lstrip("/")
    else:
        target = page.parent / raw_path

    if not raw_path or raw_path.endswith("/"):
        target = target / "index.html"
    elif target.is_dir():
        target = target / "index.html"

    return target.resolve(), unquote(parsed.fragment) or None


def check_internal(parsed, sources):
    issues = []
    for value, refs in sources.items():
        for ref in refs:
            page = (ROOT / ref.page).resolve()
            mapped = local_path_for_url(page, value)
            if mapped is None:
                continue
            target, fragment = mapped
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                issues.append(
                    {
                        "type": "escapes-root",
                        "source": ref.page,
                        "value": value,
                        "target": str(target),
                    }
                )
                continue
            if not target.exists():
                issues.append(
                    {
                        "type": "missing-file",
                        "source": ref.page,
                        "value": value,
                        "target": str(target.relative_to(ROOT)),
                    }
                )
                continue
            if fragment and target.suffix.lower() in {".html", ".htm"}:
                target_parser = parsed.get(target)
                if target_parser is None:
                    target_parser = ReferenceParser()
                    target_parser.feed(target.read_text(encoding="utf-8"))
                if fragment not in target_parser.ids:
                    issues.append(
                        {
                            "type": "missing-fragment",
                            "source": ref.page,
                            "value": value,
                            "target": str(target.relative_to(ROOT)),
                            "fragment": fragment,
                        }
                    )
    return issues


def external_urls(sources) -> list[str]:
    urls = set()
    for value in sources:
        if value in NON_DOCUMENT_ORIGINS:
            continue
        parsed = urlparse(value)
        if parsed.scheme not in {"http", "https"}:
            continue
        if parsed.netloc in {"getintorobotics.com", "www.getintorobotics.com"}:
            continue
        urls.add(value)
    return sorted(urls)


def request_url(url: str, timeout: float) -> ExternalResult:
    # This development environment does not expose the system CA bundle to
    # Python. Link health is determined from HTTP status and redirects, so use
    # an unverified context here rather than misclassifying every HTTPS URL.
    context = ssl._create_unverified_context()
    headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/pdf,*/*;q=0.8",
        "Accept-Language": "en-GB,en;q=0.9",
        "Range": "bytes=0-4095",
    }

    # GET is more reliable than HEAD because many healthy sites reject HEAD.
    request = Request(url, headers=headers, method="GET")
    try:
        with urlopen(request, timeout=timeout, context=context) as response:
            status = response.status
            final_url = response.geturl()
            state = "ok" if 200 <= status < 400 else "broken"
            return ExternalResult(url, status, final_url, state)
    except HTTPError as error:
        host = urlparse(url).netloc.lower()
        bot_blocked = error.code == 400 and host in BOT_BLOCKING_HOSTS
        state = "restricted" if error.code in OK_RESTRICTED or bot_blocked else "broken"
        return ExternalResult(url, error.code, error.geturl(), state, str(error.reason))
    except (URLError, TimeoutError, ssl.SSLError, OSError) as error:
        reason = getattr(error, "reason", error)
        text = str(reason)
        lowered = text.lower()
        if "timed out" in lowered or "temporary failure" in lowered:
            state = "unresolved"
        else:
            state = "broken"
        return ExternalResult(url, None, None, state, text)


def check_external(sources, workers: int, timeout: float):
    urls = external_urls(sources)
    results = []
    with ThreadPoolExecutor(max_workers=workers) as executor:
        futures = {executor.submit(request_url, url, timeout): url for url in urls}
        for future in as_completed(futures):
            results.append(future.result())
    return sorted(results, key=lambda result: result.url)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--internal-only", action="store_true")
    parser.add_argument("--workers", type=int, default=12)
    parser.add_argument("--timeout", type=float, default=20)
    parser.add_argument("--json", type=Path)
    args = parser.parse_args()

    parsed, sources = parse_site()
    internal = check_internal(parsed, sources)
    external = (
        [] if args.internal_only else check_external(sources, args.workers, args.timeout)
    )

    report = {
        "pages": len(parsed),
        "unique_references": len(sources),
        "internal_issues": internal,
        "external": [asdict(result) for result in external],
    }
    if args.json:
        args.json.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(f"HTML pages: {len(parsed)}")
    print(f"Unique references: {len(sources)}")
    print(f"Internal issues: {len(internal)}")
    for issue in internal:
        print(
            f"  INTERNAL {issue['type']}: {issue['source']} -> {issue['value']}"
        )

    if external:
        counts = {
            state: sum(result.state == state for result in external)
            for state in ("ok", "restricted", "broken", "unresolved")
        }
        print(
            "External: "
            + ", ".join(f"{state}={count}" for state, count in counts.items())
        )
        for result in external:
            if result.state not in {"ok", "restricted"}:
                print(
                    f"  EXTERNAL {result.state}: {result.url} "
                    f"[{result.status or '-'}] {result.error or ''}"
                )

    broken_external = sum(result.state == "broken" for result in external)
    return 1 if internal or broken_external else 0


if __name__ == "__main__":
    sys.exit(main())
