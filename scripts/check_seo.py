#!/usr/bin/env python3
"""Check SEO/AEO invariants across the generated static site."""

from __future__ import annotations

import json
import re
import struct
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOMAIN = "https://getintorobotics.com"
HTML_ENTITY = re.compile(r"&(?:amp|lt|gt|quot);")
EM_DASH = "\u2014"
EN_DASH = "\u2013"
AMERICAN_ENGLISH = re.compile(
    r"\b("
    r"organiz(?:e|es|ed|ing|ation|ations)|"
    r"optimiz(?:e|es|ed|ing|ation)|"
    r"specializ(?:e|es|ed|ing|ation)|"
    r"realiz(?:e|es|ed|ing)|"
    r"recogniz(?:e|es|ed|ing)|"
    r"customiz(?:e|es|ed|ing)|"
    r"utiliz(?:e|es|ed|ing)|"
    r"analyz(?:e|es|ed|ing)|"
    r"summariz(?:e|es|ed|ing)|"
    r"prioritiz(?:e|es|ed|ing)|"
    r"behavior(?:s|al)?|"
    r"favorite[sd]?|"
    r"canceled|traveling|modeling|"
    r"defense|offense|"
    r"neighbor(?:s|hood)?|"
    r"fulfill(?:ed|ing|ment)?|"
    r"anonymized|"
    r"licenses|"
    r"enrollment|"
    r"toward|"
    r"gotten|"
    r"math"
    r")\b",
    re.IGNORECASE,
)


def match(pattern: str, source: str) -> str | None:
    result = re.search(pattern, source, re.IGNORECASE)
    return result.group(1) if result else None


def public_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return f"{DOMAIN}/"
    if relative.endswith("/index.html"):
        return f"{DOMAIN}/{relative[:-10]}"
    return f"{DOMAIN}/{relative}"


def png_size(path: Path) -> tuple[int, int] | None:
    data = path.read_bytes()[:24]
    if len(data) != 24 or data[:8] != b"\x89PNG\r\n\x1a\n":
        return None
    return struct.unpack(">II", data[16:24])


def authored_text(source: str) -> str:
    """Return authored copy while ignoring third-party resource titles and scripts."""
    cleaned = re.sub(r"<script\b[\s\S]*?</script>", " ", source, flags=re.I)
    cleaned = re.sub(r"<style\b[\s\S]*?</style>", " ", cleaned, flags=re.I)
    cleaned = re.sub(
        r'<ul class="resource-list">[\s\S]*?</ul>',
        " ",
        cleaned,
        flags=re.I,
    )
    cleaned = re.sub(r'<meta name="theme-color"[^>]*>', " ", cleaned, flags=re.I)
    cleaned = re.sub(r'@"?type"?\s*:\s*"Organization"', " ", cleaned)
    cleaned = re.sub(r"#organization", " ", cleaned, flags=re.I)
    cleaned = re.sub(r"<[^>]+>", " ", cleaned)
    return unescape(cleaned)


def language_failures(path: Path, source: str) -> list[str]:
    relative = path.relative_to(ROOT)
    failures: list[str] = []
    if EM_DASH in source or EN_DASH in source:
        failures.append(f"{relative}: contains an em dash or en dash")

    prose_chunks = [authored_text(source)]
    for payload in re.findall(
        r'<script type="application/ld\+json">([\s\S]*?)</script>',
        source,
    ):
        try:
            data = json.loads(payload)
        except json.JSONDecodeError:
            continue
        prose_chunks.append(json.dumps(data, ensure_ascii=False))

    prose = "\n".join(prose_chunks)
    for match_obj in AMERICAN_ENGLISH.finditer(prose):
        word = match_obj.group(0)
        # Schema.org requires the American type name "Organization".
        if word.lower() in {"organization", "organizations"}:
            continue
        failures.append(f"{relative}: American English spelling '{word}'")
    return failures


def main() -> None:
    failures: list[str] = []
    pages = sorted(
        path
        for path in ROOT.rglob("*.html")
        if "node_modules" not in path.parts
    )
    indexable = [path for path in pages if path.name != "404.html"]
    seen_titles: set[str] = set()
    seen_descriptions: set[str] = set()
    seen_images: set[str] = set()

    for path in pages:
        source = path.read_text(encoding="utf-8")
        relative = path.relative_to(ROOT)
        title = match(r"<title>([^<]+)</title>", source)
        description = match(
            r'<meta name="description" content="([^"]+)"',
            source,
        )
        robots = match(r'<meta name="robots" content="([^"]+)"', source)
        canonical = match(r'<link rel="canonical" href="([^"]+)"', source)
        og_image = match(r'<meta property="og:image" content="([^"]+)"', source)
        schemas = re.findall(
            r'<script type="application/ld\+json">([\s\S]*?)</script>',
            source,
        )
        schema_types: list[str] = []

        for payload in schemas:
            try:
                data = json.loads(payload)
            except json.JSONDecodeError as error:
                failures.append(f"{relative}: invalid JSON-LD ({error})")
                continue
            nodes = data.get("@graph", [data]) if isinstance(data, dict) else data
            schema_types.extend(
                node.get("@type", "")
                for node in nodes
                if isinstance(node, dict)
            )
            if HTML_ENTITY.search(payload):
                failures.append(f"{relative}: HTML entity found in JSON-LD")

        failures.extend(language_failures(path, source))

        if path.name == "404.html":
            if robots != "noindex, follow":
                failures.append(f"{relative}: expected noindex, follow")
            if canonical:
                failures.append(f"{relative}: 404 page must not have a canonical")
            continue

        if not title or not 50 <= len(title) <= 60:
            failures.append(f"{relative}: title must be 50 to 60 characters")
        elif title in seen_titles:
            failures.append(f"{relative}: duplicate title")
        else:
            seen_titles.add(title)

        if not description or not 120 <= len(description) <= 155:
            failures.append(f"{relative}: description must be 120 to 155 characters")
        elif description in seen_descriptions:
            failures.append(f"{relative}: duplicate description")
        else:
            seen_descriptions.add(description)

        expected_url = public_url(path)
        if canonical != expected_url:
            failures.append(f"{relative}: canonical is not self-referential")
        if robots is None or "noindex" in robots:
            failures.append(f"{relative}: indexable page is marked noindex")
        if path.name == "index.html" and path.parent != ROOT:
            if "BreadcrumbList" not in schema_types:
                failures.append(f"{relative}: missing BreadcrumbList schema")

        if not og_image or not og_image.startswith(f"{DOMAIN}/images/"):
            failures.append(f"{relative}: invalid Open Graph image URL")
        elif og_image in seen_images:
            failures.append(f"{relative}: Open Graph image is not page-specific")
        else:
            seen_images.add(og_image)
            image_path = ROOT / og_image.removeprefix(f"{DOMAIN}/")
            if not image_path.is_file():
                failures.append(f"{relative}: Open Graph image is missing")
            elif png_size(image_path) != (1200, 630):
                failures.append(f"{relative}: Open Graph image must be 1200x630")

        if path.parent.parent == ROOT / "topics":
            hero = match(r'class="page-hero__lead">([^<]+)', source)
            answer = match(r'class="answer-card__body">([^<]+)', source)
            for label, text in (("hero answer", hero), ("direct answer", answer)):
                words = len(unescape(text or "").split())
                if not 40 <= words <= 80:
                    failures.append(
                        f"{relative}: {label} must contain 40 to 80 words (found {words})"
                    )

    sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    sitemap_urls = set(re.findall(r"<loc>([^<]+)</loc>", sitemap))
    expected_urls = {public_url(path) for path in indexable}
    if sitemap_urls != expected_urls:
        failures.append("sitemap.xml does not exactly match indexable HTML pages")
    if len(re.findall(r"<lastmod>[^<]+</lastmod>", sitemap)) != len(expected_urls):
        failures.append("sitemap.xml must include lastmod for every URL")

    logo_path = ROOT / "images" / "logo.png"
    if png_size(logo_path) != (512, 512):
        failures.append("Organisation logo must be a 512x512 PNG")
    for path in indexable:
        source = path.read_text(encoding="utf-8")
        if f'"url": "{DOMAIN}/images/logo.png"' not in source:
            failures.append(f"{path.relative_to(ROOT)}: Organisation logo is incorrect")

    for relative in ("llms.txt", "llms-full.txt", "robots.txt", "sitemap.xml"):
        path = ROOT / relative
        text = path.read_text(encoding="utf-8")
        if EM_DASH in text or EN_DASH in text:
            failures.append(f"{relative}: contains an em dash or en dash")
        for match_obj in AMERICAN_ENGLISH.finditer(text):
            word = match_obj.group(0)
            if word.lower() in {"organization", "organizations"}:
                continue
            failures.append(f"{relative}: American English spelling '{word}'")

    if failures:
        print("SEO/AEO checks failed:")
        for failure in failures:
            print(f"- {failure}")
        raise SystemExit(1)

    print(
        f"SEO/AEO checks passed: {len(indexable)} indexable pages, "
        f"{len(seen_images)} unique Open Graph images, "
        "British English and no em/en dashes"
    )


if __name__ == "__main__":
    main()
