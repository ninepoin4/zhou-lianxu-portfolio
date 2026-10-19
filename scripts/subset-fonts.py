"""
Rebuild the subset CJK webfonts from every character used in the site.

Why: a full Noto Sans/Serif SC is 17–24 MB. This site only needs ~680 glyphs,
so we ship ~380 KB of woff2 instead. The fonts keep their variable weight axis.

Requirements
------------
    pip install fonttools brotli
    NotoSerifSC-VF.ttf / NotoSansSC-VF.ttf installed in C:\\Windows\\Fonts
    (or pass explicit paths with --serif / --sans)

Usage
-----
    python scripts/subset-fonts.py
    python scripts/subset-fonts.py --serif "D:/fonts/NotoSerifSC-VF.ttf"

Run this after changing copy in src/ or index.html. Missing glyphs fall back to
the system CJK font, so the site still works — this just keeps the intended
typeface everywhere.
"""

from __future__ import annotations

import argparse
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FONT_DIR = ROOT / "public" / "fonts"

# punctuation / symbols that can be added to copy without touching code
EXTRA = (
    "，。、；：？！“”‘’（）《》〈〉—…·「」『』【】〔〕～＋－×÷＝％‰℃¥￥"
    "→←↑↓↗↘▲▼◆●○◎★☆✳①②③④⑤⑥⑦⑧⑨⑩　"
)


def collect_chars() -> str:
    chars: set[str] = set()
    for path in list((ROOT / "src").rglob("*.ts")) + list((ROOT / "src").rglob("*.tsx")):
        chars.update(ch for ch in path.read_text(encoding="utf-8") if ord(ch) > 127)
    index = ROOT / "index.html"
    if index.exists():
        chars.update(ch for ch in index.read_text(encoding="utf-8") if ord(ch) > 127)
    chars.update(EXTRA)
    return "".join(sorted(chars))


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--serif", default=r"C:\Windows\Fonts\NotoSerifSC-VF.ttf")
    parser.add_argument("--sans", default=r"C:\Windows\Fonts\NotoSansSC-VF.ttf")
    args = parser.parse_args()

    text = collect_chars()
    chars_file = ROOT / "scripts" / "chars.txt"
    chars_file.write_text(text, encoding="utf-8")
    print(f"collected {len(text)} characters -> {chars_file}")

    FONT_DIR.mkdir(parents=True, exist_ok=True)
    jobs = [
        (args.serif, FONT_DIR / "noto-serif-sc-subset.woff2"),
        (args.sans, FONT_DIR / "noto-sans-sc-subset.woff2"),
    ]
    for source, target in jobs:
        if not os.path.exists(source):
            print(f"!! missing font: {source}", file=sys.stderr)
            return 1
        cmd = [
            sys.executable,
            "-m",
            "fontTools.subset",
            source,
            f"--text-file={chars_file}",
            "--flavor=woff2",
            f"--output-file={target}",
            "--layout-features=*",
            "--no-hinting",
            "--desubroutinize",
        ]
        print(" ".join(cmd))
        subprocess.run(cmd, check=True)
        print(f"  -> {target.relative_to(ROOT)} ({target.stat().st_size / 1024:.0f} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
