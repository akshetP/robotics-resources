"""Render images/og-default.png from the design tokens in assets/css/site.css.

Requires Pillow. Run after changing any --accent, --bg, --ink or --surface token
so the social card keeps matching the site.
"""

# pyright: reportMissingModuleSource=false

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
CSS = ROOT / "assets" / "css" / "site.css"
OUT = ROOT / "images" / "og-default.png"

WIDTH, HEIGHT = 1200, 630
SCALE = 2  # supersample, then downscale for smooth edges

SERIF = "/System/Library/Fonts/Supplemental/Charter.ttc"
SERIF_BOLD_INDEX = 3

TITLE = "Robotics Resources Library"
BADGE = "GET INTO ROBOTICS"
SUBTITLE = [
    "Curated projects, ROS and ROS 2 materials,",
    "courses, books and simulators for every level.",
]
META = "8 collections  \u00b7  99 curated links  \u00b7  Beginner to advanced"
DOMAIN = "getintorobotics.com"


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


def main() -> None:
    t = read_tokens()
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
    draw.text((px(74), px(200)), TITLE, font=font(72), fill=ink, anchor="lt")
    subtitle_font = font(31)
    for index, line in enumerate(SUBTITLE):
        draw.text(
            (px(74), px(298) + index * px(46)),
            line,
            font=subtitle_font,
            fill=muted,
            anchor="lt",
        )

    draw.text((px(74), px(430)), META, font=font(23), fill=accent, anchor="lt")
    draw.text((px(74), px(542)), DOMAIN, font=font(21), fill=ink, anchor="lt")

    # Robot glyph.
    draw.rounded_rectangle(
        [px(981), px(202), px(1119), px(340)], radius=px(24), fill=accent
    )
    draw.ellipse([px(1005), px(232), px(1043), px(270)], fill=t["surface"])
    draw.ellipse([px(1054), px(232), px(1092), px(270)], fill=t["surface"])
    draw.rounded_rectangle(
        [px(1013), px(288), px(1087), px(316)], radius=px(8), fill=t["accent-soft"]
    )

    image.resize((WIDTH, HEIGHT), Image.Resampling.LANCZOS).save(OUT, optimize=True)
    print(f"Wrote {OUT.relative_to(ROOT)} using accent {accent}")


if __name__ == "__main__":
    main()
