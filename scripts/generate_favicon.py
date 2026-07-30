"""
Generates the "PC" monogram favicon/app icons matching the site header logo
(navy circle, cream serif "PC"), replacing the default Next.js/Vercel icon.

Run with: python3 scripts/generate_favicon.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

APP_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "app")

INK_900 = "#201d2e"
PARCHMENT_50 = "#fdfbf6"
FONT_PATH = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"


def draw_badge(size: int) -> Image.Image:
    scale = 4  # supersample for smooth edges, then downscale
    big = size * scale
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.ellipse((0, 0, big - 1, big - 1), fill=INK_900)

    font_size = int(big * 0.44)
    font = ImageFont.truetype(FONT_PATH, font_size)
    text = "PC"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    x = (big - text_w) / 2 - bbox[0]
    y = (big - text_h) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=PARCHMENT_50)

    return img.resize((size, size), Image.LANCZOS)


def main():
    # Master + ICO (multi-size) for the classic favicon.ico
    master = draw_badge(512)
    ico_sizes = [16, 32, 48, 64]
    master.save(
        os.path.join(APP_DIR, "favicon.ico"),
        sizes=[(s, s) for s in ico_sizes],
    )
    print("wrote favicon.ico")

    # Modern high-res icon (Next.js picks this up automatically for <link rel="icon">)
    icon_png = draw_badge(512)
    icon_png.save(os.path.join(APP_DIR, "icon.png"))
    print("wrote icon.png")

    # Apple touch icon (iOS "add to home screen")
    apple = draw_badge(180)
    # Apple icons look best without transparency; flatten onto ink-900 (matches circle anyway)
    apple_flat = Image.new("RGB", apple.size, INK_900)
    apple_flat.paste(apple, mask=apple.split()[3])
    apple_flat.save(os.path.join(APP_DIR, "apple-icon.png"))
    print("wrote apple-icon.png")


if __name__ == "__main__":
    main()
