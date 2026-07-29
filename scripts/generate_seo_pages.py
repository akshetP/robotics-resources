#!/usr/bin/env python3
"""Generate SEO/AEO secondary pages for getintorobotics.com."""
from __future__ import annotations

import json
import re
from pathlib import Path

DOMAIN = "https://getintorobotics.com"
TODAY = "2026-07-29"
ROOT = Path(__file__).resolve().parent.parent


def extract_details_blocks(html: str):
    library = re.search(
        r'<section class="library col-content"[\s\S]*?</section>',
        html,
    )
    if not library:
        raise ValueError("Could not find the homepage library section")

    blocks = re.findall(
        r'<details class="disclosure">([\s\S]*?)</details>',
        library.group(0),
    )
    out = []
    for block in blocks:
        label_match = re.search(r'class="disclosure__label">([^<]+)', block)
        if not label_match:
            raise ValueError("A library disclosure is missing its label")
        label = label_match.group(1)
        label = (
            label.replace("&amp;", "&")
            .replace("&lt;", "<")
            .replace("&gt;", ">")
            .replace("&quot;", '"')
        )
        groups = []
        if "Channels" in block and "Playlists" in block:
            ch = re.search(
                r'<h4 class="resource-group__title">Channels</h4>\s*<ul class="resource-list">([\s\S]*?)</ul>',
                block,
            )
            pl = re.search(
                r'<h4 class="resource-group__title">Playlists</h4>\s*<ul class="resource-list">([\s\S]*?)</ul>',
                block,
            )
            if not ch or not pl:
                raise ValueError("The YouTube disclosure is missing a resource group")

            def parse_ul(ul: str):
                items = []
                for m in re.finditer(r'<li><a href="([^"]+)"[^>]*>([\s\S]*?)</a></li>', ul):
                    text = re.sub(r"<[^>]+>", "", m.group(2)).strip()
                    text = re.sub(r"\s*\(opens in a new tab\)\s*", "", text).strip()
                    items.append((m.group(1), text))
                return items

            groups = [("Channels", parse_ul(ch.group(1))), ("Playlists", parse_ul(pl.group(1)))]
            items = [item for _, group in groups for item in group]
        else:
            items = []
            for m in re.finditer(r'<li><a href="([^"]+)"[^>]*>([\s\S]*?)</a></li>', block):
                text = re.sub(r"<[^>]+>", "", m.group(2)).strip()
                text = re.sub(r"\s*\(opens in a new tab\)\s*", "", text).strip()
                items.append((m.group(1), text))
        out.append({"label": label, "items": items, "groups": groups})
    return out


TOPIC_MAP = {
    "Open Source Robotics Projects GitHub Repositories": {
        "slug": "open-source-robotics-projects",
        "title": "Open-source robotics projects",
        "h1": "Open-source robotics projects",
        "desc": "Explore 15 curated open-source robotics projects, from educational robots to autonomy stacks such as Duckietown, F1TENTH, Autoware and the NASA JPL Open-Source Rover.",
        "answer": "Open-source robotics projects give learners working robots, platforms and software stacks they can clone, build and modify. This collection highlights educational platforms, mobile robots, autonomy projects and hardware ecosystems that are suitable for study and experimentation.",
        "why": "Start here if you want a concrete robot or platform rather than abstract theory alone. Many of these projects ship documentation, simulations and community channels.",
    },
    "GitHub Repositories to Learn Robotics": {
        "slug": "learning-repositories",
        "title": "GitHub repositories to learn robotics",
        "h1": "GitHub repositories to learn robotics",
        "desc": "Browse 15 curated GitHub repositories for learning robotics, including paper lists, PythonRobotics, coursework and awesome machine learning for robotics collections.",
        "answer": "Learning repositories collect papers, tutorials, algorithms and coursework in one place. They are useful when you want structured reading lists or code examples rather than a single product tutorial.",
        "why": "Use these lists to deepen mathematics, perception, localisation and machine learning for robotics after you have a basic project workflow.",
    },
    "ROS Resources": {
        "slug": "ros",
        "title": "ROS resources",
        "h1": "ROS resources",
        "desc": "University ROS courses and community lists from Delft, ETH Zurich, Purdue, UPC Barcelona and more, curated for robotics learners.",
        "answer": "ROS (Robot Operating System) is a widely used middleware framework for writing robot software. This collection focuses on university courses and curated community lists that teach classic ROS concepts and tooling.",
        "why": "Choose these materials if you are maintaining ROS 1 systems, comparing ROS with ROS 2, or following an academic course that still uses ROS.",
    },
    "ROS 2 Resources": {
        "slug": "ros-2",
        "title": "ROS 2 resources",
        "h1": "ROS 2 resources",
        "desc": "Curated ROS 2 tutorials and playlists for beginners, including Humble crash courses and Autoware self-driving material.",
        "answer": "ROS 2 is the current generation of the Robot Operating System, designed for production robots with improved real-time, security and multi-robot support. This page gathers beginner-friendly tutorials and playlists so you can install tools, run nodes and understand the graph.",
        "why": "New robotics software projects should generally start with ROS 2 rather than ROS 1. Pair these tutorials with a simulator such as Gazebo or Webots.",
    },
    "YouTube Channels & Playlists to Learn Robotics": {
        "slug": "youtube-robotics",
        "title": "YouTube channels and playlists for robotics",
        "h1": "YouTube channels and playlists for robotics",
        "desc": "21 curated YouTube channels and lecture playlists covering robotics mathematics, manipulation, dynamics, control and hands-on builds.",
        "answer": "Video channels and lecture playlists help when you prefer demonstrated workflows or university lecture series. This collection separates channels from playlists so you can browse creators or complete course-style series.",
        "why": "Use channels for ongoing inspiration and playlists when you want a sequenced syllabus you can finish over several weeks.",
    },
    "Free University Courses": {
        "slug": "university-courses",
        "title": "Free university courses in robotics",
        "h1": "Free university courses in robotics",
        "desc": "Eight free university and lab courses in robotics from MIT, Stanford, QUT, Freiburg, UC Berkeley and Duckietown.",
        "answer": "Free university courses provide structured robotics learning with lecture notes, assignments or video series from recognised institutions. They are one of the highest-leverage ways to build foundations without paying for a full degree module.",
        "why": "Pick one course and finish it before collecting more bookmarks. Complement lectures with simulator practice and a small open-source project.",
    },
    "Books to Learn Robotics": {
        "slug": "robotics-books",
        "title": "Books to learn robotics",
        "h1": "Books to learn robotics",
        "desc": "Six ROS-focused robotics books available online as PDFs, selected for beginners and intermediate learners.",
        "answer": "Books remain useful for systematic coverage of ROS concepts, tooling and examples. This collection focuses on titles that learners can access online while working through tutorials.",
        "why": "Use a book alongside a simulator and a tutorial playlist. Do not wait until you have read everything before writing your first node.",
    },
    "Robotic Simulators": {
        "slug": "robotic-simulators",
        "title": "Robotic simulators",
        "h1": "Robotic simulators",
        "desc": "Compare 21 robotic simulators and digital twin tools, from Gazebo, Webots and MuJoCo to Isaac Sim, RoboDK and industrial suites.",
        "answer": "Robotic simulators let you test algorithms, robot models and factories without physical hardware. Options range from research engines such as MuJoCo and Gazebo to industrial digital twins and game-engine workflows.",
        "why": "Beginners often start with Gazebo, Webots or a ROS-integrated tutorial stack. Specialists may need Isaac Sim, RoboDK or vendor-specific environments later.",
    },
}


def css_href(depth: int) -> str:
    return "../" * depth + "assets/css/site.css"


def favicon_href(depth: int) -> str:
    return "../" * depth + "assets/img/favicon.png"


def og_href() -> str:
    return f"{DOMAIN}/images/og-default.png"


ORG = {
    "@type": "Organization",
    "@id": f"{DOMAIN}/#organization",
    "name": "Get Into Robotics",
    "alternateName": "Robotics Resources Library",
    "url": f"{DOMAIN}/",
    "logo": f"{DOMAIN}/assets/img/favicon.png",
    "founder": {
        "@type": "Person",
        "name": "Akshet Patel",
        "url": "https://akshetpatel.com/",
        "sameAs": [
            "https://github.com/akshetP",
            "https://linkedin.com/in/akshetpatel",
            "https://www.youtube.com/@akshetpatel",
            "https://twitter.com/Akshet9",
        ],
    },
    "sameAs": [
        "https://github.com/akshetP/robotics-resources",
        "https://akshetpatel.com/",
    ],
}

WEBSITE = {
    "@type": "WebSite",
    "@id": f"{DOMAIN}/#website",
    "url": f"{DOMAIN}/",
    "name": "Get Into Robotics",
    "description": "Curated robotics learning library covering projects, ROS, courses, books and simulators.",
    "publisher": {"@id": f"{DOMAIN}/#organization"},
    "inLanguage": "en-GB",
}


def head(title: str, description: str, path: str, depth: int, schemas=None, og_type: str = "website") -> str:
    canonical = DOMAIN + path
    schema_html = ""
    for schema in schemas or []:
        payload = json.dumps(schema, indent=2, ensure_ascii=False)
        schema_html += f'\n    <script type="application/ld+json">\n{payload}\n    </script>'
    return f"""<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{description}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="author" content="Akshet Patel">
    <meta name="theme-color" content="#6b21a8">
    <link rel="canonical" href="{canonical}">
    <link rel="alternate" type="text/plain" title="llms.txt" href="{DOMAIN}/llms.txt">
    <meta property="og:type" content="{og_type}">
    <meta property="og:site_name" content="Get Into Robotics">
    <meta property="og:locale" content="en_GB">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{description}">
    <meta property="og:url" content="{canonical}">
    <meta property="og:image" content="{og_href()}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Get Into Robotics: Robotics Resources Library">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{title}">
    <meta name="twitter:description" content="{description}">
    <meta name="twitter:image" content="{og_href()}">
    <meta name="twitter:creator" content="@Akshet9">
    <link rel="icon" href="{favicon_href(depth)}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link rel="stylesheet" href="{css_href(depth)}">{schema_html}
</head>"""


def header(depth: int, active: str | None = None) -> str:
    prefix = "../" * depth
    links = [
        (prefix or "./", "Home", active == "home"),
        (prefix + "topics/open-source-robotics-projects/", "Topics", active == "topics"),
        (prefix + "guides/how-to-learn-robotics/", "Guides", active == "guides"),
        (prefix + "faq/", "FAQ", active == "faq"),
        (prefix + "about/", "About", active == "about"),
    ]
    nav_bits = []
    for href, label, current in links:
        aria = ' aria-current="page"' if current else ""
        nav_bits.append(f'                    <a class="nav-link" href="{href}"{aria}>{label}</a>')
    nav = "\n".join(nav_bits)
    home = prefix or "./"
    return f"""    <a class="skip-link" href="#main">Skip to main content</a>
    <header class="site-header">
        <div class="layout">
            <div class="site-header__bar">
                <a class="brand" href="{home}" aria-label="Get Into Robotics home">
                    <span class="brand__mark" aria-hidden="true"><i class="fas fa-robot" aria-hidden="true"></i></span>
                    <span class="brand__text">Get Into Robotics</span>
                </a>
                <nav class="primary-nav" id="primary-nav" aria-label="Primary">
{nav}
                    <a class="nav-link nav-link--mobile-only" href="https://github.com/akshetP/robotics-resources" target="_blank" rel="noopener">GitHub repository</a>
                </nav>
                <div class="site-header__actions">
                    <a class="btn btn--primary" href="https://github.com/akshetP/robotics-resources" target="_blank" rel="noopener">
                        <i class="fab fa-github" aria-hidden="true"></i>
                        <span>Star</span>
                    </a>
                    <button class="btn btn--icon nav-toggle" id="nav-toggle" type="button"
                            aria-expanded="false" aria-controls="primary-nav" aria-label="Open navigation menu">
                        <i class="fas fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </div>
    </header>"""


def footer(depth: int) -> str:
    prefix = "../" * depth
    home = prefix or "./"
    return f"""    <footer class="site-footer layout">
        <div class="site-footer__about">
            <p class="site-footer__brand">Get Into Robotics</p>
            <p class="site-footer__desc">A curated library of robotics projects, courses, ROS materials, books and simulators for every level.</p>
        </div>
        <nav class="site-footer__nav--explore" aria-labelledby="footer-explore">
            <h2 class="site-footer__heading" id="footer-explore">Explore</h2>
            <ul class="footer-links">
                <li><a href="{home}">Library <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
                <li><a href="{prefix}guides/how-to-learn-robotics/">Guides <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
                <li><a href="{prefix}faq/">FAQ <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
                <li><a href="{prefix}about/">About <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
            </ul>
        </nav>
        <nav class="site-footer__nav--connect" aria-labelledby="footer-connect">
            <h2 class="site-footer__heading" id="footer-connect">Connect</h2>
            <ul class="footer-links">
                <li><a href="https://akshetpatel.com/" target="_blank" rel="noopener">akshetpatel.com <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
                <li><a href="https://github.com/akshetP/robotics-resources" target="_blank" rel="noopener">GitHub repository <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
                <li><a href="https://linkedin.com/in/akshetpatel" target="_blank" rel="noopener">LinkedIn <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
            </ul>
        </nav>
        <div class="site-footer__bottom">
            <p class="site-footer__copy">&copy; <span id="year">2026</span> Akshet Patel. All rights reserved.</p>
            <ul class="icon-links icon-links--footer" aria-label="Social profiles">
                <li><a href="https://linkedin.com/in/akshetpatel" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true"></i></a></li>
                <li><a href="https://www.youtube.com/@akshetpatel" target="_blank" rel="noopener" aria-label="YouTube"><i class="fab fa-youtube" aria-hidden="true"></i></a></li>
                <li><a href="https://github.com/akshetP" target="_blank" rel="noopener" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true"></i></a></li>
                <li><a href="https://twitter.com/Akshet9" target="_blank" rel="noopener" aria-label="Twitter"><i class="fab fa-twitter" aria-hidden="true"></i></a></li>
            </ul>
        </div>
    </footer>
    <script>
    (function () {{
        var year = document.getElementById("year");
        if (year) year.textContent = String(new Date().getFullYear());
        var nav = document.getElementById("primary-nav");
        var navToggle = document.getElementById("nav-toggle");
        if (!nav || !navToggle) return;
        var icon = navToggle.querySelector("i");
        function setMenu(open) {{
            nav.classList.toggle("is-open", open);
            navToggle.setAttribute("aria-expanded", open ? "true" : "false");
            navToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
            icon.className = open ? "fas fa-times" : "fas fa-bars";
        }}
        navToggle.addEventListener("click", function () {{ setMenu(!nav.classList.contains("is-open")); }});
        nav.addEventListener("click", function (e) {{ if (e.target.closest("a")) setMenu(false); }});
        document.addEventListener("keydown", function (e) {{
            if (e.key === "Escape" && nav.classList.contains("is-open")) {{ setMenu(false); navToggle.focus(); }}
        }});
        document.querySelectorAll('a[target="_blank"]').forEach(function (link) {{
            link.setAttribute("rel", "noopener noreferrer");
            if (![...link.querySelectorAll(".sr-only")].some(function (n) {{ return /new tab/.test(n.textContent); }})) {{
                var hint = document.createElement("span");
                hint.className = "sr-only";
                hint.textContent = " (opens in a new tab)";
                link.appendChild(hint);
            }}
        }});
    }})();
    </script>
</body>
</html>"""


def breadcrumbs(items):
    parts = ['            <ol class="breadcrumbs">']
    for index, (href, name) in enumerate(items):
        if href:
            sep = ' <span class="breadcrumbs__sep" aria-hidden="true">/</span>' if index < len(items) - 1 else ""
            parts.append(f'                <li><a href="{href}">{name}</a>{sep}</li>')
        else:
            parts.append(f"                <li><span>{name}</span></li>")
    parts.append("            </ol>")
    return "\n".join(parts)


def item_list_html(items=None, groups=None) -> str:
    if groups:
        chunks = []
        for title, group_items in groups:
            lis = "\n".join(
                f'                            <li><a href="{href}" target="_blank" rel="noopener">{text} <i class="fas fa-chevron-right resource-list__chevron" aria-hidden="true"></i></a></li>'
                for href, text in group_items
            )
            chunks.append(
                f"""                    <div class="resource-group">
                        <h3 class="resource-group__title">{title}</h3>
                        <ul class="resource-list">
{lis}
                        </ul>
                    </div>"""
            )
        return "\n".join(chunks)
    lis = "\n".join(
        f'                        <li><a href="{href}" target="_blank" rel="noopener">{text} <i class="fas fa-chevron-right resource-list__chevron" aria-hidden="true"></i></a></li>'
        for href, text in (items or [])
    )
    return f"""                    <div class="resource-group">
                        <ul class="resource-list">
{lis}
                        </ul>
                    </div>"""


def write(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    print("Wrote", path.relative_to(ROOT))


def main() -> None:
    cats = extract_details_blocks((ROOT / "index.html").read_text())
    assert len(cats) == len(TOPIC_MAP)

    for cat in cats:
        meta = TOPIC_MAP[cat["label"]]
        path = f"/topics/{meta['slug']}/"
        depth = 2
        page_url = DOMAIN + path
        breadcrumb_schema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": f"{DOMAIN}/"},
                {"@type": "ListItem", "position": 2, "name": meta["title"], "item": page_url},
            ],
        }
        collection_schema = {
            "@context": "https://schema.org",
            "@graph": [
                ORG,
                WEBSITE,
                {
                    "@type": "CollectionPage",
                    "@id": page_url,
                    "url": page_url,
                    "name": meta["title"],
                    "description": meta["desc"],
                    "isPartOf": {"@id": f"{DOMAIN}/#website"},
                    "about": meta["h1"],
                    "dateModified": TODAY,
                    "inLanguage": "en-GB",
                    "mainEntity": {
                        "@type": "ItemList",
                        "numberOfItems": len(cat["items"]),
                        "itemListElement": [
                            {"@type": "ListItem", "position": i, "name": text, "url": href}
                            for i, (href, text) in enumerate(cat["items"], 1)
                        ],
                    },
                },
            ],
        }
        related = [
            (f"../../topics/{other['slug']}/", other["title"])
            for other in TOPIC_MAP.values()
            if other["slug"] != meta["slug"]
        ][:4]
        related_html = "\n".join(
            f'                    <li><a href="{href}">{title} <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>'
            for href, title in related
        )
        page = f"""{head(f"{meta['title']} | Get Into Robotics", meta['desc'], path, depth, [collection_schema, breadcrumb_schema])}
<body>
{header(depth, "topics")}
    <main class="layout" id="main" tabindex="-1">
        <article class="col-content">
{breadcrumbs([("../../", "Home"), (None, meta["title"])])}
            <header class="page-hero">
                <p class="section-kicker">Topic collection</p>
                <h1 class="page-hero__title">{meta['h1']}</h1>
                <p class="page-hero__lead">{meta['answer']}</p>
                <p class="page-hero__meta">{len(cat['items'])} curated links · Updated {TODAY}</p>
            </header>

            <section class="answer-card" aria-labelledby="direct-answer">
                <p class="answer-card__label">Direct answer</p>
                <h2 class="answer-card__title" id="direct-answer">What belongs in this collection?</h2>
                <p class="answer-card__body">{meta['why']}</p>
            </section>

            <section class="content-block" aria-labelledby="list-title">
                <h2 id="list-title">Curated links</h2>
                <div class="resource-panel">
{item_list_html(cat['items'], cat['groups'] or None)}
                </div>
            </section>

            <section class="content-block">
                <h2>How to use these resources</h2>
                <ol>
                    <li>Skim the list and open two or three links that match your current level.</li>
                    <li>Prefer resources with active documentation or recent commits when you need production guidance.</li>
                    <li>Combine one tutorial source with one simulator and one small project rather than collecting endless bookmarks.</li>
                </ol>
                <p><a class="btn btn--ghost" href="../../guides/how-to-learn-robotics/">Read the learning guide <i class="fas fa-chevron-right" aria-hidden="true"></i></a></p>
            </section>

            <nav class="related" aria-labelledby="related-title">
                <p class="related__title" id="related-title">Related topics</p>
                <ul class="related__list">
{related_html}
                    <li><a href="../../faq/">Robotics learning FAQ <i class="fas fa-chevron-right" aria-hidden="true"></i></a></li>
                </ul>
            </nav>
        </article>
    </main>
{footer(depth)}
"""
        write(ROOT / f"topics/{meta['slug']}/index.html", page)

    about_schema = {
        "@context": "https://schema.org",
        "@graph": [
            ORG,
            WEBSITE,
            {
                "@type": "AboutPage",
                "@id": f"{DOMAIN}/about/",
                "url": f"{DOMAIN}/about/",
                "name": "About Get Into Robotics",
                "description": "Learn who maintains Get Into Robotics, how resources are curated, and how to contribute or report issues.",
                "isPartOf": {"@id": f"{DOMAIN}/#website"},
                "inLanguage": "en-GB",
                "dateModified": TODAY,
                "mainEntity": {"@id": f"{DOMAIN}/#organization"},
            },
            {
                "@type": "Person",
                "@id": "https://akshetpatel.com/#person",
                "name": "Akshet Patel",
                "url": "https://akshetpatel.com/",
                "sameAs": ORG["founder"]["sameAs"],
                "jobTitle": "Robotics engineer and educator",
            },
        ],
    }
    write(
        ROOT / "about/index.html",
        f"""{head("About Get Into Robotics | Curated robotics learning library", "Learn who maintains Get Into Robotics, how the robotics resource library is curated, and how to contribute corrections or new links.", "/about/", 1, [about_schema])}
<body>
{header(1, "about")}
    <main class="layout" id="main" tabindex="-1">
        <article class="col-content prose">
{breadcrumbs([("../", "Home"), (None, "About")])}
            <header class="page-hero">
                <h1 class="page-hero__title">About Get Into Robotics</h1>
                <p class="page-hero__lead">Get Into Robotics is a curated library of robotics learning resources edited by Akshet Patel. It exists to shorten the path from curiosity to a clear next tutorial, course, project or simulator.</p>
                <p class="page-hero__meta">Last updated {TODAY}</p>
            </header>
            <section class="answer-card">
                <p class="answer-card__label">Direct answer</p>
                <h2 class="answer-card__title">Who is behind this site?</h2>
                <p class="answer-card__body">Get Into Robotics is maintained by <a href="https://akshetpatel.com/" target="_blank" rel="noopener">Akshet Patel</a>, a robotics practitioner and educator. The public source list lives on <a href="https://github.com/akshetP/robotics-resources" target="_blank" rel="noopener">GitHub</a>, where anyone can suggest improvements.</p>
            </section>
            <section class="content-block">
                <h2>Curation principles</h2>
                <ul>
                    <li>Prefer resources that a motivated learner can use without expensive proprietary lock-in.</li>
                    <li>Group links by intent: build, study, watch, simulate or read.</li>
                    <li>Keep descriptions honest. Inclusion is not a claim that every third-party page is perfect.</li>
                    <li>Review broken links when reported through the GitHub repository.</li>
                </ul>
            </section>
            <section class="content-block">
                <h2>Trust and transparency</h2>
                <ul>
                    <li>No affiliate book promotions are shown on this site.</li>
                    <li>External destinations keep their own licences, pricing and privacy policies.</li>
                    <li>Microsoft Clarity is used for anonymised usage analytics on the homepage experience.</li>
                    <li>British English is used for original site copy.</li>
                </ul>
            </section>
            <section class="content-block">
                <h2>Contact</h2>
                <p>For corrections or additions, open an issue or pull request on the <a href="https://github.com/akshetP/robotics-resources" target="_blank" rel="noopener">robotics-resources repository</a>. For other enquiries, visit <a href="https://akshetpatel.com/" target="_blank" rel="noopener">akshetpatel.com</a>.</p>
            </section>
        </article>
    </main>
{footer(1)}
""",
    )

    faqs = [
        ("What is Get Into Robotics?", "Get Into Robotics is a free curated library of robotics learning resources. It organises projects, ROS and ROS 2 materials, courses, books, YouTube playlists and simulators so learners can find a credible next step quickly."),
        ("How should a complete beginner start learning robotics?", "Start with one structured course, one simulator and one small project. The how-to-learn-robotics guide on this site recommends that sequence and links into the relevant collections."),
        ("Should I learn ROS or ROS 2 first?", "New learners should usually start with ROS 2, because it is the actively developed generation of the framework. Use the ROS collection mainly when a course or legacy stack still depends on ROS 1."),
        ("Which robotic simulator should I try first?", "Gazebo and Webots are common starting points for ROS-centric learning. MuJoCo is popular for research and reinforcement learning. Isaac Sim is stronger when you need high-fidelity NVIDIA workflows."),
        ("Are the linked books and courses free?", "This library prioritises resources that are freely browseable or widely used in education. Always check the destination site for licence terms, enrolment requirements or download conditions."),
        ("How often is the library updated?", "The collections are reviewed periodically and when the community reports broken links. Each topic page shows a last-updated date, and the GitHub repository tracks proposed changes."),
        ("Can I suggest a new resource?", "Yes. Open an issue or pull request on the GitHub repository with the URL, a short description and the collection it belongs in."),
        ("Is Get Into Robotics affiliated with ROS or Open Robotics?", "No. The site is an independent educational directory. Names such as ROS, Gazebo and Autoware belong to their respective organisations."),
    ]
    faq_schema = {
        "@context": "https://schema.org",
        "@graph": [
            ORG,
            WEBSITE,
            {
                "@type": "FAQPage",
                "@id": f"{DOMAIN}/faq/",
                "url": f"{DOMAIN}/faq/",
                "name": "Robotics learning FAQ",
                "description": "Answers to common questions about learning robotics, choosing ROS 2, picking simulators and using the Get Into Robotics library.",
                "isPartOf": {"@id": f"{DOMAIN}/#website"},
                "inLanguage": "en-GB",
                "dateModified": TODAY,
                "mainEntity": [
                    {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
                    for q, a in faqs
                ],
            },
        ],
    }
    faq_items = "\n".join(
        f"""                <details class="disclosure">
                    <summary class="disclosure__summary">
                        <h2 class="disclosure__title">
                            <span class="disclosure__label">{q}</span>
                            <i class="fas fa-chevron-down disclosure__chevron" aria-hidden="true"></i>
                        </h2>
                    </summary>
                    <div class="disclosure__panel">
                        <p>{a}</p>
                    </div>
                </details>"""
        for q, a in faqs
    )
    write(
        ROOT / "faq/index.html",
        f"""{head("Robotics learning FAQ | Get Into Robotics", "Answers to common questions about learning robotics, choosing ROS or ROS 2, picking simulators and using the Get Into Robotics curated library.", "/faq/", 1, [faq_schema])}
<body>
{header(1, "faq")}
    <main class="layout" id="main" tabindex="-1">
        <article class="col-content">
{breadcrumbs([("../", "Home"), (None, "FAQ")])}
            <header class="page-hero">
                <h1 class="page-hero__title">Robotics learning FAQ</h1>
                <p class="page-hero__lead">Short answers to the questions beginners and career changers ask most often when they start robotics.</p>
            </header>
            <div class="faq">
{faq_items}
            </div>
            <p><a class="btn btn--primary" href="../guides/how-to-learn-robotics/">Continue with the learning guide</a></p>
        </article>
    </main>
{footer(1)}
""",
    )

    learn_steps = [
        "Learn basic programming and linear algebra enough to read robot tutorials without panic.",
        "Take one free university course or long playlist and finish it.",
        "Practise in a simulator before buying hardware.",
        "Clone a small open-source robot project and reproduce a documented demo.",
        "Move into ROS 2 tutorials once you can run and debug a simple simulated robot.",
    ]
    learn_schema = {
        "@context": "https://schema.org",
        "@graph": [
            ORG,
            WEBSITE,
            {
                "@type": "Article",
                "@id": f"{DOMAIN}/guides/how-to-learn-robotics/",
                "headline": "How to learn robotics: a practical path",
                "description": "A practical guide to learning robotics from fundamentals to ROS 2, using free courses, simulators and open-source projects.",
                "datePublished": TODAY,
                "dateModified": TODAY,
                "author": {"@type": "Person", "name": "Akshet Patel", "url": "https://akshetpatel.com/"},
                "publisher": {"@id": f"{DOMAIN}/#organization"},
                "mainEntityOfPage": f"{DOMAIN}/guides/how-to-learn-robotics/",
                "inLanguage": "en-GB",
                "image": og_href(),
            },
            {
                "@type": "HowTo",
                "name": "How to learn robotics",
                "description": "A practical sequence for learning robotics using free courses, simulators and open-source projects.",
                "step": [
                    {"@type": "HowToStep", "position": i, "name": step, "text": step}
                    for i, step in enumerate(learn_steps, 1)
                ],
            },
        ],
    }
    write(
        ROOT / "guides/how-to-learn-robotics/index.html",
        f"""{head("How to learn robotics: a practical path | Get Into Robotics", "A practical British English guide to learning robotics: foundations, free courses, simulators, open-source projects and when to start ROS 2.", "/guides/how-to-learn-robotics/", 2, [learn_schema], og_type="article")}
<body>
{header(2, "guides")}
    <main class="layout" id="main" tabindex="-1">
        <article class="col-content prose">
{breadcrumbs([("../../", "Home"), (None, "How to learn robotics")])}
            <header class="page-hero">
                <p class="section-kicker">Guide</p>
                <h1 class="page-hero__title">How to learn robotics: a practical path</h1>
                <p class="page-hero__lead">Robotics rewards breadth and focus. You need enough maths and programming to follow tutorials, enough simulation practice to fail safely, and one project that forces the pieces together.</p>
                <p class="page-hero__meta">By Akshet Patel · Updated {TODAY}</p>
            </header>
            <section class="answer-card">
                <p class="answer-card__label">Direct answer</p>
                <h2 class="answer-card__title">What is the fastest credible way to learn robotics?</h2>
                <p class="answer-card__body">Finish one structured course, practise weekly in a simulator, then reproduce a documented open-source robot demo. Add ROS 2 once you can run and debug that demo. Avoid buying expensive hardware until a simulated workflow is working.</p>
            </section>
            <section class="content-block">
                <h2>Step-by-step path</h2>
                <ol>
                    {''.join(f'<li>{step}</li>' for step in learn_steps)}
                </ol>
            </section>
            <section class="content-block">
                <h2>Where to click next on this site</h2>
                <ul>
                    <li><a href="../../topics/university-courses/">Free university courses</a> for structured foundations</li>
                    <li><a href="../../topics/robotic-simulators/">Robotic simulators</a> for safe practice</li>
                    <li><a href="../../topics/open-source-robotics-projects/">Open-source projects</a> for end-to-end demos</li>
                    <li><a href="../getting-started-with-ros-2/">Getting started with ROS 2</a> when you are ready for middleware</li>
                </ul>
            </section>
            <section class="content-block">
                <h2>Common mistakes</h2>
                <ul>
                    <li>Collecting dozens of bookmarks without finishing one curriculum.</li>
                    <li>Jumping into advanced reinforcement learning before basic transforms and control make sense.</li>
                    <li>Buying hardware before you can run the same workflow in simulation.</li>
                </ul>
            </section>
        </article>
    </main>
{footer(2)}
""",
    )

    ros2_steps = [
        "Install a supported Linux environment and follow an official or well-maintained Humble installation guide.",
        "Learn the graph model: nodes, topics, services and parameters.",
        "Run beginner tutorials until you can create a package and launch communicating nodes.",
        "Connect the same workflow to a simulator such as Gazebo or Webots.",
        "Only then attempt a full autonomy or manipulation stack.",
    ]
    ros2_schema = {
        "@context": "https://schema.org",
        "@graph": [
            ORG,
            WEBSITE,
            {
                "@type": "Article",
                "@id": f"{DOMAIN}/guides/getting-started-with-ros-2/",
                "headline": "Getting started with ROS 2",
                "description": "A practical introduction to ROS 2 for beginners, covering installation mindset, core concepts, tutorials and simulators.",
                "datePublished": TODAY,
                "dateModified": TODAY,
                "author": {"@type": "Person", "name": "Akshet Patel", "url": "https://akshetpatel.com/"},
                "publisher": {"@id": f"{DOMAIN}/#organization"},
                "mainEntityOfPage": f"{DOMAIN}/guides/getting-started-with-ros-2/",
                "inLanguage": "en-GB",
                "image": og_href(),
            },
            {
                "@type": "HowTo",
                "name": "Getting started with ROS 2",
                "description": "Practical first steps for learning ROS 2 with tutorials and simulators.",
                "step": [
                    {"@type": "HowToStep", "position": i, "name": step, "text": step}
                    for i, step in enumerate(ros2_steps, 1)
                ],
            },
        ],
    }
    write(
        ROOT / "guides/getting-started-with-ros-2/index.html",
        f"""{head("Getting started with ROS 2 | Get Into Robotics", "Learn how to start ROS 2 the right way: environment setup, core concepts, beginner tutorials, simulators and curated playlists.", "/guides/getting-started-with-ros-2/", 2, [ros2_schema], og_type="article")}
<body>
{header(2, "guides")}
    <main class="layout" id="main" tabindex="-1">
        <article class="col-content prose">
{breadcrumbs([("../../", "Home"), (None, "Getting started with ROS 2")])}
            <header class="page-hero">
                <p class="section-kicker">Guide</p>
                <h1 class="page-hero__title">Getting started with ROS 2</h1>
                <p class="page-hero__lead">ROS 2 is the practical default for new robot software stacks. This guide explains what to learn first and which curated resources on this site support each stage.</p>
                <p class="page-hero__meta">By Akshet Patel · Updated {TODAY}</p>
            </header>
            <section class="answer-card">
                <p class="answer-card__label">Direct answer</p>
                <h2 class="answer-card__title">What is ROS 2 and who should learn it?</h2>
                <p class="answer-card__body">ROS 2 is middleware for building robot applications as a graph of communicating processes. Learn it if you want reusable packages, simulation integration and a pathway into modern mobile robotics or manipulation stacks.</p>
            </section>
            <section class="content-block">
                <h2>First steps</h2>
                <ol>
                    {''.join(f'<li>{step}</li>' for step in ros2_steps)}
                </ol>
            </section>
            <section class="content-block">
                <h2>Curated resources for this path</h2>
                <ul>
                    <li><a href="../../topics/ros-2/">ROS 2 tutorials and playlists</a></li>
                    <li><a href="../../topics/ros/">University ROS materials</a> for complementary theory</li>
                    <li><a href="../../topics/robotic-simulators/">Simulators</a> for Gazebo, Webots, Isaac Sim and more</li>
                    <li><a href="../../topics/open-source-robotics-projects/">Open-source projects</a> that demonstrate complete stacks</li>
                </ul>
            </section>
        </article>
    </main>
{footer(2)}
""",
    )

    write(
        ROOT / "404.html",
        f"""{head("Page not found | Get Into Robotics", "The page you requested could not be found on Get Into Robotics.", "/404.html", 0)}
<body>
{header(0)}
    <main class="layout" id="main" tabindex="-1">
        <section class="col-content page-hero">
            <h1 class="page-hero__title">Page not found</h1>
            <p class="page-hero__lead">That URL is not in the Get Into Robotics library. Try the homepage search or one of the topic collections.</p>
            <p><a class="btn btn--primary" href="/">Back to the library</a>
            <a class="btn btn--ghost" href="/faq/">Read the FAQ</a></p>
        </section>
    </main>
{footer(0)}
""",
    )
    print("All secondary pages generated.")


if __name__ == "__main__":
    main()
