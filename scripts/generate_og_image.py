"""Render the brand logo and per-page Open Graph images from site tokens.

Requires Pillow. Run after changing any --accent, --bg, --ink or --surface token
or page metadata so social assets keep matching the site.
"""

# pyright: reportMissingModuleSource=false

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
CSS = ROOT / "assets" / "css" / "site.css"
OUT_DIR = ROOT / "images"

WIDTH, HEIGHT = 1200, 630
SCALE = 2  # supersample, then downscale for smooth edges

SERIF = "/System/Library/Fonts/Supplemental/Charter.ttc"
SERIF_BOLD_INDEX = 3

BADGE = "GET INTO ROBOTICS"
DOMAIN = "getintorobotics.com"

CARDS = {
    "og-default.png": (
        "Robotics learning resources",
        "Curated projects, ROS and ROS 2 materials, courses, books and simulators.",
        "8 collections  ·  99 curated links  ·  Beginner to advanced",
    ),
    "og-about.png": (
        "About Get Into Robotics",
        "Meet the editor and learn how this robotics resource library is curated.",
        "Editorial approach  ·  Trust  ·  Contribute",
    ),
    "og-faq.png": (
        "Robotics learning FAQ",
        "Clear answers about learning robotics, choosing ROS 2 and picking simulators.",
        "8 practical answers  ·  Beginner focused",
    ),
    "og-guides-how-to-learn-robotics.png": (
        "How to learn robotics",
        "A practical path from foundations and simulation to projects and ROS 2.",
        "Step-by-step guide  ·  Free learning path",
    ),
    "og-guides-getting-started-with-ros-2.png": (
        "Getting started with ROS 2",
        "Learn nodes, topics, services, packages and simulation in the right order.",
        "Beginner guide  ·  Curated tutorials",
    ),
    "og-topics-open-source-robotics-projects.png": (
        "Open-source robotics projects",
        "Working robots, autonomy stacks and educational platforms you can explore.",
        "15 curated projects  ·  Build and experiment",
    ),
    "og-topics-learning-repositories.png": (
        "GitHub repositories to learn robotics",
        "Curated code, coursework, papers and algorithm collections for robotics.",
        "15 curated repositories  ·  Learn by building",
    ),
    "og-topics-ros.png": (
        "ROS tutorials and resources",
        "University courses and community collections for classic ROS workflows.",
        "8 curated links  ·  ROS 1 learning",
    ),
    "og-topics-ros-2.png": (
        "ROS 2 tutorials and resources",
        "Beginner tutorials, Humble crash courses and practical learning playlists.",
        "5 curated links  ·  Start with ROS 2",
    ),
    "og-topics-youtube-robotics.png": (
        "Robotics YouTube channels",
        "Lecture playlists and creators covering control, dynamics and practical builds.",
        "21 curated videos and channels",
    ),
    "og-topics-university-courses.png": (
        "Free university robotics courses",
        "Structured courses from MIT, Stanford, QUT, Freiburg and UC Berkeley.",
        "8 curated courses  ·  Learn for free",
    ),
    "og-topics-robotics-books.png": (
        "Books to learn robotics and ROS",
        "Accessible, structured references for beginner and intermediate learners.",
        "6 curated books  ·  Read and practise",
    ),
    "og-topics-robotic-simulators.png": (
        "Robotic simulators compared",
        "Explore Gazebo, Webots, MuJoCo, Isaac Sim, RoboDK and industrial tools.",
        "21 curated simulators  ·  Test without hardware",
    ),
}


def read_tokens() -> dict[str, str]:
    css = CSS.read_text(encoding="utf-8")
    wanted = ("bg", "surface", "ink", "ink-muted", "accent", "accent-soft")
    tokens: dict[str, str] = {}
    for name in wanted:
        match = re.search(rf"--{name}:\s*(#[0-9a-fA-F]{{3,6}})\s*;", css)
        if not match:
            raise ValueError(f"Could not read --{name} from {CSS.name}")
        tokens[name] = match.group(1)
    return tokens


def font(size: int, *, bold: bool = False) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(SERIF, size * SCALE, index=SERIF_BOLD_INDEX if bold else 0)


def px(value: int) -> int:
    return value * SCALE


def wrap_text(
    draw: ImageDraw.ImageDraw,
    text: str,
    text_font: ImageFont.FreeTypeFont,
    max_width: int,
) -> list[str]:
    words = text.split()
    lines: list[str] = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and draw.textlength(candidate, font=text_font) > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def draw_robot(
    draw: ImageDraw.ImageDraw,
    t: dict[str, str],
    box: tuple[int, int, int, int],
) -> None:
    left, top, right, bottom = (px(value) for value in box)
    width = right - left
    height = bottom - top
    radius = round(min(width, height) * 0.17)
    draw.rounded_rectangle([left, top, right, bottom], radius=radius, fill=t["accent"])

    eye_radius = round(width * 0.12)
    eye_y = top + round(height * 0.36)
    for eye_x in (left + round(width * 0.32), left + round(width * 0.68)):
        draw.ellipse(
            [
                eye_x - eye_radius,
                eye_y - eye_radius,
                eye_x + eye_radius,
                eye_y + eye_radius,
            ],
            fill=t["surface"],
        )

    mouth_width = round(width * 0.54)
    mouth_height = round(height * 0.2)
    mouth_left = left + (width - mouth_width) // 2
    mouth_top = top + round(height * 0.63)
    draw.rounded_rectangle(
        [
            mouth_left,
            mouth_top,
            mouth_left + mouth_width,
            mouth_top + mouth_height,
        ],
        radius=round(mouth_height * 0.3),
        fill=t["accent-soft"],
    )


def render_logo(t: dict[str, str]) -> None:
    size = 512
    logo = Image.new("RGB", (size * SCALE, size * SCALE), t["bg"])
    draw = ImageDraw.Draw(logo)
    draw_robot(draw, t, (48, 48, 464, 464))
    output = OUT_DIR / "logo.png"
    logo.resize((size, size), Image.Resampling.LANCZOS).save(output, optimize=True)
    print(f"Wrote {output.relative_to(ROOT)}")


def render_card(
    t: dict[str, str],
    filename: str,
    title: str,
    subtitle: str,
    meta: str,
) -> None:
    accent, ink, muted = t["accent"], t["ink"], t["ink-muted"]

    image = Image.new("RGB", (px(WIDTH), px(HEIGHT)), t["bg"])
    draw = ImageDraw.Draw(image)

    # Accent edges: a top rule and a heavier left spine.
    draw.rectangle([0, 0, px(WIDTH), px(8)], fill=accent)
    draw.rectangle([0, 0, px(14), px(HEIGHT)], fill=accent)

    # Eyebrow badge: the pill is sized around the letter-spaced label.
    badge_font = font(21, bold=True)
    badge_text = " ".join(BADGE)  # cheap letter-spacing
    badge_width = round(badge_font.getlength(badge_text))
    draw.rounded_rectangle(
        [px(74), px(90), px(74) + badge_width + px(52), px(139)],
        radius=px(6),
        fill=accent,
    )
    draw.text(
        (px(74) + badge_width // 2 + px(26), px(115)),
        badge_text,
        font=badge_font,
        fill=t["surface"],
        anchor="mm",
    )

    # Headline and supporting copy.
    title_font = font(65)
    title_lines = wrap_text(draw, title, title_font, px(815))
    title_y = px(190)
    for index, line in enumerate(title_lines[:2]):
        draw.text(
            (px(74), title_y + index * px(72)),
            line,
            font=title_font,
            fill=ink,
            anchor="lt",
        )

    subtitle_y = 285 + (len(title_lines[:2]) - 1) * 70
    subtitle_font = font(28)
    subtitle_lines = wrap_text(draw, subtitle, subtitle_font, px(790))
    for index, line in enumerate(subtitle_lines[:2]):
        draw.text(
            (px(74), px(subtitle_y) + index * px(40)),
            line,
            font=subtitle_font,
            fill=muted,
            anchor="lt",
        )

    draw.text((px(74), px(485)), meta, font=font(22), fill=accent, anchor="lt")
    draw.text((px(74), px(550)), DOMAIN, font=font(20), fill=ink, anchor="lt")

    # Robot glyph.
    draw_robot(draw, t, (985, 210, 1125, 350))

    output = OUT_DIR / filename
    image.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(output, optimize=True)
    print(f"Wrote {output.relative_to(ROOT)}")


def main() -> None:
    t = read_tokens()
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    render_logo(t)
    for filename, (title, subtitle, meta) in CARDS.items():
        render_card(t, filename, title, subtitle, meta)
    print(f"Rendered {len(CARDS)} social cards using accent {t['accent']}")


if __name__ == "__main__":
    main()
