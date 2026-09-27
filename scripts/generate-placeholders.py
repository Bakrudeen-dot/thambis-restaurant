"""
Generates stylised, food-coloured placeholder images for the Thambis website.

These are NOT real photographs. They exist so the layout, cropping and art
direction can be reviewed before the restaurant's own photography is ready.
Replace any file in /public/images with a real photo using the SAME filename
and the site updates automatically (see IMAGE-GUIDE.md).

Run:  python3 scripts/generate-placeholders.py
"""
import math
import os
import random

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT, exist_ok=True)

FONT_PATHS = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/dejavu/DejaVuSans.ttf",
]


def font(size):
    for p in FONT_PATHS:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def background(w, h, c1, c2, seed):
    """Warm, dark table surface with soft light fall-off and wood-like grain."""
    rnd = random.Random(seed)
    img = Image.new("RGB", (w, h), c2)
    px = img.load()
    cx, cy = w * rnd.uniform(0.35, 0.65), h * rnd.uniform(0.3, 0.55)
    maxd = math.hypot(w, h) * 0.75
    for y in range(0, h, 2):
        for x in range(0, w, 2):
            d = math.hypot(x - cx, y - cy) / maxd
            col = lerp(c1, c2, min(1, d))
            px[x, y] = col
            if x + 1 < w:
                px[x + 1, y] = col
            if y + 1 < h:
                px[x, y + 1] = col
                if x + 1 < w:
                    px[x + 1, y + 1] = col
    d = ImageDraw.Draw(img, "RGBA")
    for _ in range(int(h / 6)):
        y = rnd.uniform(0, h)
        a = rnd.randint(4, 12)
        d.line([(0, y), (w, y + rnd.uniform(-30, 30))], fill=(0, 0, 0, a), width=rnd.randint(1, 3))
    return img


def blob(draw, cx, cy, r, color, rnd, points=14, jitter=0.25):
    pts = []
    for i in range(points):
        a = 2 * math.pi * i / points
        rr = r * (1 + rnd.uniform(-jitter, jitter))
        pts.append((cx + rr * math.cos(a), cy + rr * math.sin(a)))
    draw.polygon(pts, fill=color)


def plate(draw, cx, cy, r, rim=(236, 230, 218), inner=(245, 241, 233), steel=False):
    if steel:
        rim, inner = (150, 150, 152), (190, 190, 192)
    draw.ellipse([cx - r - 6, cy - r + 10, cx + r + 6, cy + r + 22], fill=(0, 0, 0, 90))
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=rim)
    draw.ellipse([cx - r * 0.8, cy - r * 0.8, cx + r * 0.8, cy + r * 0.8], fill=inner)


def bowl(draw, cx, cy, r, content, rnd, brass=False, speck=None):
    edge = (176, 138, 74) if brass else (160, 160, 164)
    draw.ellipse([cx - r - 3, cy - r + 8, cx + r + 3, cy + r + 16], fill=(0, 0, 0, 100))
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=edge)
    ir = r * 0.82
    draw.ellipse([cx - ir, cy - ir, cx + ir, cy + ir], fill=content)
    hl = tuple(min(255, c + 30) for c in content)
    draw.ellipse([cx - ir * 0.6, cy - ir * 0.7, cx + ir * 0.1, cy - ir * 0.2], fill=hl + (90,))
    if speck:
        for _ in range(int(r)):
            a = rnd.uniform(0, 2 * math.pi)
            rr = rnd.uniform(0, ir * 0.85)
            x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
            s = rnd.uniform(1.5, 4)
            draw.ellipse([x - s, y - s, x + s, y + s], fill=rnd.choice(speck))


def leaf(img, cx, cy, lw, lh, angle):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.ellipse([cx - lw / 2, cy - lh / 2, cx + lw / 2, cy + lh / 2], fill=(46, 112, 52, 255))
    d.ellipse([cx - lw / 2 + 20, cy - lh / 2 + 16, cx + lw / 2 - 20, cy + lh / 2 - 16], fill=(58, 132, 60, 255))
    d.line([(cx - lw / 2 + 10, cy), (cx + lw / 2 - 10, cy)], fill=(120, 170, 90, 255), width=5)
    for i in range(-10, 11):
        x = cx + i * lw / 24
        d.line([(x, cy), (x + lw / 16, cy - lh / 2.4)], fill=(52, 120, 56, 255), width=2)
        d.line([(x, cy), (x + lw / 16, cy + lh / 2.4)], fill=(52, 120, 56, 255), width=2)
    layer = layer.rotate(angle, center=(cx, cy), resample=Image.BICUBIC)
    img.paste(layer, (0, 0), layer)


def finish(img, name, label=True):
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    w, h = img.size
    # vignette
    vig = Image.new("L", (w, h), 0)
    vd = ImageDraw.Draw(vig)
    for i in range(40):
        t = i / 40
        vd.ellipse([-w * 0.25 + t * w * 0.2, -h * 0.25 + t * h * 0.2, w * 1.25 - t * w * 0.2, h * 1.25 - t * h * 0.2], fill=int(255 * t))
    vig = vig.filter(ImageFilter.GaussianBlur(60))
    dark = Image.new("RGB", (w, h), (10, 7, 5))
    img = Image.composite(img, dark, vig)
    # grain
    noise = Image.effect_noise((w, h), 18).convert("RGB")
    img = Image.blend(img, noise, 0.045)
    if label:
        d = ImageDraw.Draw(img, "RGBA")
        f = font(max(14, int(min(w, h) * 0.018)))
        text = f"PLACEHOLDER  ·  {name}"
        tw = d.textlength(text, font=f)
        pad = 10
        d.rectangle([18, h - 18 - f.size - pad * 2, 18 + tw + pad * 2, h - 18], fill=(0, 0, 0, 120))
        d.text((18 + pad, h - 18 - f.size - pad), text, font=f, fill=(246, 239, 227, 210))
    img.save(os.path.join(OUT, name), "JPEG", quality=82, optimize=True, progressive=True)
    print("wrote", name, img.size)


# ---------------------------------------------------------------- compositions

def comp_dosa(name, w, h, seed, ghee=False):
    rnd = random.Random(seed)
    img = background(w, h, (74, 48, 34), (20, 14, 11), seed)
    d = ImageDraw.Draw(img, "RGBA")
    leaf(img, w * 0.5, h * 0.52, w * 0.95, h * 0.62, rnd.uniform(-12, -4))
    d = ImageDraw.Draw(img, "RGBA")
    # dosa roll: long golden diagonal cylinder
    L = w * 0.78
    ang = math.radians(-18)
    cx, cy = w * 0.48, h * 0.5
    th = h * (0.13 if ghee else 0.16)
    for i in range(60):
        t = i / 59
        x = cx + (t - 0.5) * L * math.cos(ang)
        y = cy + (t - 0.5) * L * math.sin(ang)
        col = lerp((196, 120, 40), (232, 170, 70), 0.5 + 0.5 * math.sin(t * 9))
        if ghee:
            col = lerp((170, 90, 30), (214, 140, 50), 0.5 + 0.5 * math.sin(t * 7))
        r = th * (0.9 if 0.08 < t < 0.92 else 0.6)
        d.ellipse([x - r, y - r * 0.8, x + r, y + r * 0.8], fill=col)
    for i in range(30):
        t = rnd.uniform(0.1, 0.9)
        x = cx + (t - 0.5) * L * math.cos(ang)
        y = cy + (t - 0.5) * L * math.sin(ang) - th * 0.3
        d.line([(x, y), (x + rnd.uniform(10, 40), y + rnd.uniform(-6, 6))], fill=(120, 60, 20, 90), width=3)
    bowl(d, w * 0.2, h * 0.8, h * 0.1, (214, 120, 50), rnd, speck=[(240, 200, 120), (60, 110, 40)])
    bowl(d, w * 0.42, h * 0.84, h * 0.08, (236, 232, 214), rnd, speck=[(60, 110, 40), (40, 30, 20)])
    bowl(d, w * 0.62, h * 0.84, h * 0.08, (186, 60, 40), rnd)
    finish(img, name)


def comp_meals(name, w, h, seed):
    rnd = random.Random(seed)
    img = background(w, h, (70, 46, 30), (18, 12, 10), seed)
    leaf(img, w * 0.5, h * 0.5, w * 1.05, h * 0.8, rnd.uniform(-8, 8))
    d = ImageDraw.Draw(img, "RGBA")
    # rice mound
    for i in range(400):
        a = rnd.uniform(0, 2 * math.pi)
        r = rnd.uniform(0, h * 0.14)
        x, y = w * 0.52 + r * math.cos(a) * 1.3, h * 0.55 + r * math.sin(a)
        d.ellipse([x - 5, y - 3, x + 5, y + 3], fill=(248, 244, 232, 230))
    colours = [(214, 120, 50), (170, 70, 40), (230, 200, 90), (120, 150, 60), (200, 90, 50), (240, 236, 220), (150, 90, 50), (210, 160, 60)]
    for i, c in enumerate(colours):
        a = math.pi * (1.05 + i * 0.13)
        x = w * 0.5 + w * 0.36 * math.cos(a)
        y = h * 0.5 + h * 0.3 * math.sin(a)
        bowl(d, x, y, h * 0.065, c, rnd, speck=[(60, 110, 40)] if i % 2 else None)
    # papad
    d.ellipse([w * 0.72, h * 0.52, w * 0.9, h * 0.76], fill=(236, 214, 160))
    for _ in range(40):
        x, y = rnd.uniform(w * 0.74, w * 0.88), rnd.uniform(h * 0.55, h * 0.73)
        d.ellipse([x - 2, y - 2, x + 2, y + 2], fill=(190, 150, 90))
    # pickle / poriyal heaps
    blob(d, w * 0.3, h * 0.7, h * 0.05, (120, 150, 60), rnd)
    blob(d, w * 0.4, h * 0.76, h * 0.035, (170, 40, 30), rnd)
    finish(img, name)


def comp_biryani(name, w, h, seed, meat=(120, 60, 30)):
    rnd = random.Random(seed)
    img = background(w, h, (64, 40, 28), (16, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.48, h * 0.52, min(w, h) * 0.36
    bowl(d, cx, cy, r, (232, 196, 120), rnd, brass=True)
    for i in range(1400):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.8)
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        col = rnd.choice([(250, 244, 226), (240, 178, 60), (230, 150, 40), (250, 240, 210), (210, 110, 40)])
        ang = rnd.uniform(0, math.pi)
        dx, dy = 7 * math.cos(ang), 7 * math.sin(ang)
        d.line([(x - dx, y - dy), (x + dx, y + dy)], fill=col, width=3)
    for _ in range(6):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(r * 0.1, r * 0.55)
        blob(d, cx + rr * math.cos(a), cy + rr * math.sin(a), r * 0.12, meat, rnd, jitter=0.3)
    for _ in range(14):
        x, y = cx + rnd.uniform(-r * 0.6, r * 0.6), cy + rnd.uniform(-r * 0.6, r * 0.6)
        d.ellipse([x - 5, y - 3, x + 5, y + 3], fill=(40, 110, 50))
    bowl(d, w * 0.85, h * 0.8, h * 0.1, (238, 234, 222), rnd, speck=[(160, 60, 80), (60, 110, 40)])
    d.ellipse([w * 0.08, h * 0.12, w * 0.2, h * 0.24], fill=(230, 220, 90))
    finish(img, name)


def comp_fry(name, w, h, seed, base=(190, 50, 30), steel=False):
    rnd = random.Random(seed)
    img = background(w, h, (60, 38, 26), (14, 10, 8), seed)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.5, h * 0.52, min(w, h) * 0.38
    plate(d, cx, cy, r, steel=steel)
    for _ in range(26):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.6)
        col = lerp(base, (120, 30, 20), rnd.uniform(0, 0.6))
        blob(d, cx + rr * math.cos(a), cy + rr * math.sin(a), r * rnd.uniform(0.07, 0.12), col, rnd, jitter=0.35)
    for _ in range(18):
        x, y = cx + rnd.uniform(-r * 0.5, r * 0.5), cy + rnd.uniform(-r * 0.5, r * 0.5)
        d.ellipse([x - 6, y - 3, x + 6, y + 3], fill=(40, 110, 40))
    for i in range(3):
        x, y = cx + r * 0.45, cy - r * 0.35 + i * 30
        d.ellipse([x - 40, y - 18, x + 40, y + 18], outline=(200, 150, 190), width=5)
    d.pieslice([cx - r * 0.7 - 50, cy + r * 0.3 - 50, cx - r * 0.7 + 50, cy + r * 0.3 + 50], 200, 340, fill=(236, 214, 70))
    finish(img, name)


def comp_curry(name, w, h, seed, gravy=(150, 60, 30), pieces=(110, 50, 25), side="rice"):
    rnd = random.Random(seed)
    img = background(w, h, (66, 42, 28), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.44, h * 0.5, min(w, h) * 0.3
    bowl(d, cx, cy, r, gravy, rnd, brass=True, speck=[(230, 180, 90, 180), (40, 110, 40)])
    for _ in range(7):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.5)
        blob(d, cx + rr * math.cos(a), cy + rr * math.sin(a), r * 0.13, pieces, rnd, jitter=0.3)
    if side == "rice":
        plate(d, w * 0.82, h * 0.3, min(w, h) * 0.17)
        for _ in range(220):
            a = rnd.uniform(0, 2 * math.pi)
            rr = rnd.uniform(0, min(w, h) * 0.11)
            x, y = w * 0.82 + rr * math.cos(a), h * 0.3 + rr * math.sin(a)
            d.ellipse([x - 4, y - 2, x + 4, y + 2], fill=(248, 244, 232))
    else:
        comp_side_parotta(d, w * 0.82, h * 0.72, min(w, h) * 0.17, rnd)
    finish(img, name)


def comp_side_parotta(d, cx, cy, r, rnd):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(222, 170, 90))
    for i in range(10):
        rr = r * (1 - i / 11)
        d.arc([cx - rr, cy - rr, cx + rr, cy + rr], rnd.uniform(0, 360), rnd.uniform(0, 360) + 260, fill=(170, 110, 50), width=4)
    for _ in range(30):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.9)
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        d.ellipse([x - 5, y - 5, x + 5, y + 5], fill=(150, 80, 30, 150))


def comp_parotta(name, w, h, seed):
    rnd = random.Random(seed)
    img = background(w, h, (68, 44, 30), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    leaf(img, w * 0.5, h * 0.52, w * 0.9, h * 0.66, -6)
    d = ImageDraw.Draw(img, "RGBA")
    comp_side_parotta(d, w * 0.38, h * 0.5, min(w, h) * 0.24, rnd)
    comp_side_parotta(d, w * 0.58, h * 0.46, min(w, h) * 0.22, rnd)
    bowl(d, w * 0.8, h * 0.66, min(w, h) * 0.12, (160, 70, 30), rnd, speck=[(230, 180, 90)])
    finish(img, name)


def comp_kothu(name, w, h, seed):
    rnd = random.Random(seed)
    img = background(w, h, (70, 44, 28), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.5, h * 0.52, min(w, h) * 0.4
    plate(d, cx, cy, r, steel=True)
    for _ in range(900):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.72)
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        col = rnd.choice([(214, 150, 70), (190, 110, 40), (240, 210, 130), (160, 60, 30), (230, 190, 90), (60, 120, 50)])
        s = rnd.uniform(4, 10)
        d.rectangle([x - s, y - s / 2, x + s, y + s / 2], fill=col)
    bowl(d, w * 0.86, h * 0.2, min(w, h) * 0.1, (160, 60, 30), rnd)
    finish(img, name)


def comp_idli(name, w, h, seed, vada=True, idli=True):
    rnd = random.Random(seed)
    img = background(w, h, (66, 44, 30), (15, 11, 9), seed)
    leaf(img, w * 0.5, h * 0.5, w * 0.9, h * 0.72, 5)
    d = ImageDraw.Draw(img, "RGBA")
    r = min(w, h) * 0.1
    if idli:
        for (x, y) in [(0.34, 0.42), (0.5, 0.38), (0.42, 0.58)]:
            d.ellipse([w * x - r, h * y - r * 0.85 + 12, w * x + r, h * y + r * 0.85 + 12], fill=(0, 0, 0, 80))
            d.ellipse([w * x - r, h * y - r * 0.85, w * x + r, h * y + r * 0.85], fill=(246, 244, 236))
            d.ellipse([w * x - r * 0.6, h * y - r * 0.6, w * x + r * 0.3, h * y], fill=(255, 255, 250, 180))
    if vada:
        for (x, y) in [(0.64, 0.56), (0.62, 0.36)] if idli else [(0.38, 0.45), (0.58, 0.42), (0.48, 0.62)]:
            rr = r * 1.1
            d.ellipse([w * x - rr, h * y - rr, w * x + rr, h * y + rr], fill=(176, 104, 40))
            d.ellipse([w * x - rr * 0.8, h * y - rr * 0.85, w * x + rr * 0.6, h * y + rr * 0.3], fill=(206, 140, 60))
            d.ellipse([w * x - rr * 0.25, h * y - rr * 0.25, w * x + rr * 0.25, h * y + rr * 0.25], fill=(60, 110, 50))
    bowl(d, w * 0.2, h * 0.78, r * 0.95, (214, 120, 50), rnd, speck=[(240, 200, 120), (60, 110, 40)])
    bowl(d, w * 0.8, h * 0.78, r * 0.9, (236, 232, 214), rnd, speck=[(60, 110, 40)])
    finish(img, name)


def comp_bowls(name, w, h, seed, main=(214, 120, 50), speck=None, grains=None):
    rnd = random.Random(seed)
    img = background(w, h, (68, 44, 30), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.5, h * 0.5, min(w, h) * 0.32
    bowl(d, cx, cy, r, main, rnd, brass=True, speck=speck)
    if grains:
        for _ in range(500):
            a = rnd.uniform(0, 2 * math.pi)
            rr = rnd.uniform(0, r * 0.75)
            x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
            d.ellipse([x - 5, y - 3, x + 5, y + 3], fill=rnd.choice(grains))
    for (x, y, c) in [(0.14, 0.2, (40, 110, 50)), (0.86, 0.8, (190, 60, 40)), (0.84, 0.18, (230, 200, 90))]:
        blob(d, w * x, h * y, min(w, h) * 0.05, c, rnd)
    finish(img, name)


def comp_bread(name, w, h, seed, puffy=False):
    rnd = random.Random(seed)
    img = background(w, h, (70, 46, 30), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    plate(d, w * 0.46, h * 0.52, min(w, h) * 0.38, steel=True)
    for i, (x, y) in enumerate([(0.38, 0.44), (0.54, 0.46), (0.46, 0.62)]):
        r = min(w, h) * 0.15
        base = (224, 170, 80) if puffy else (214, 176, 110)
        d.ellipse([w * x - r, h * y - r, w * x + r, h * y + r], fill=base)
        d.ellipse([w * x - r * 0.7, h * y - r * 0.8, w * x + r * 0.2, h * y - r * 0.1], fill=(245, 205, 120, 160) if puffy else (230, 200, 140, 120))
        for _ in range(20):
            a = rnd.uniform(0, 2 * math.pi)
            rr = rnd.uniform(0, r * 0.9)
            xx, yy = w * x + rr * math.cos(a), h * y + rr * math.sin(a)
            d.ellipse([xx - 4, yy - 4, xx + 4, yy + 4], fill=(140, 80, 30, 140))
    bowl(d, w * 0.84, h * 0.74, min(w, h) * 0.11, (200, 150, 60), rnd, speck=[(60, 110, 40)])
    finish(img, name)


def comp_coffee(name, w, h, seed, tea=False):
    rnd = random.Random(seed)
    img = background(w, h, (84, 54, 34), (16, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    # dabarah (wide bowl) + tumbler seen from above
    cx, cy = w * 0.52, h * 0.55
    R = min(w, h) * 0.32
    d.ellipse([cx - R - 6, cy - R + 16, cx + R + 6, cy + R + 28], fill=(0, 0, 0, 110))
    d.ellipse([cx - R, cy - R, cx + R, cy + R], fill=(186, 146, 80))
    d.ellipse([cx - R * 0.9, cy - R * 0.9, cx + R * 0.9, cy + R * 0.9], fill=(150, 112, 56))
    r = R * 0.55
    d.ellipse([cx - r - 10, cy - r - 10, cx + r + 10, cy + r + 10], fill=(210, 170, 96))
    foam = (206, 160, 110) if not tea else (196, 140, 90)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=foam)
    for _ in range(60):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.9)
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        s = rnd.uniform(2, 7)
        d.ellipse([x - s, y - s, x + s, y + s], fill=(236, 206, 160, 140))
    d.arc([cx - r * 0.7, cy - r * 0.7, cx + r * 0.7, cy + r * 0.7], 200, 320, fill=(120, 70, 40, 160), width=6)
    # beans / spices
    for _ in range(26):
        x, y = rnd.uniform(w * 0.05, w * 0.3), rnd.uniform(h * 0.05, h * 0.35)
        d.ellipse([x - 12, y - 8, x + 12, y + 8], fill=(70, 40, 24))
        d.line([(x - 8, y), (x + 8, y)], fill=(40, 22, 14), width=2)
    finish(img, name)


def comp_drink(name, w, h, seed, colour=(230, 150, 60)):
    rnd = random.Random(seed)
    img = background(w, h, (80, 54, 36), (16, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    for i, x in enumerate([0.36, 0.64]):
        cx, cy, r = w * x, h * (0.5 + 0.06 * i), min(w, h) * 0.18
        d.ellipse([cx - r - 6, cy - r + 14, cx + r + 6, cy + r + 24], fill=(0, 0, 0, 100))
        d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(230, 230, 230, 120))
        d.ellipse([cx - r * 0.86, cy - r * 0.86, cx + r * 0.86, cy + r * 0.86], fill=colour)
        d.ellipse([cx - r * 0.5, cy - r * 0.6, cx, cy - r * 0.2], fill=(255, 255, 255, 90))
        d.ellipse([cx + r * 0.2, cy - r * 0.1, cx + r * 0.6, cy + r * 0.3], fill=(60, 140, 60))
    d.pieslice([w * 0.1, h * 0.72, w * 0.24, h * 0.9], 180, 360, fill=(236, 214, 70))
    finish(img, name)


def comp_dessert(name, w, h, seed, colour=(236, 206, 150), speck=None, block=False):
    rnd = random.Random(seed)
    img = background(w, h, (72, 46, 30), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    if block:
        plate(d, w * 0.5, h * 0.52, min(w, h) * 0.34)
        for (x, y) in [(0.42, 0.46), (0.58, 0.48), (0.5, 0.62)]:
            s = min(w, h) * 0.09
            d.rounded_rectangle([w * x - s, h * y - s, w * x + s, h * y + s], radius=20, fill=colour)
            for _ in range(6):
                xx, yy = w * x + rnd.uniform(-s * 0.7, s * 0.7), h * y + rnd.uniform(-s * 0.7, s * 0.7)
                d.ellipse([xx - 5, yy - 3, xx + 5, yy + 3], fill=(220, 190, 120))
    else:
        bowl(d, w * 0.5, h * 0.52, min(w, h) * 0.3, colour, rnd, brass=True, speck=speck)
    for _ in range(12):
        x, y = rnd.uniform(w * 0.05, w * 0.95), rnd.uniform(h * 0.8, h * 0.95)
        d.ellipse([x - 6, y - 4, x + 6, y + 4], fill=(230, 210, 170))
    finish(img, name)


def comp_snacks(name, w, h, seed):
    rnd = random.Random(seed)
    img = background(w, h, (74, 48, 30), (15, 11, 9), seed)
    d = ImageDraw.Draw(img, "RGBA")
    leaf(img, w * 0.5, h * 0.5, w * 0.88, h * 0.64, 8)
    d = ImageDraw.Draw(img, "RGBA")
    for _ in range(10):
        x, y = rnd.uniform(w * 0.25, w * 0.72), rnd.uniform(h * 0.32, h * 0.66)
        d.ellipse([x - 60, y - 30, x + 60, y + 30], fill=(214, 150, 60))
        d.ellipse([x - 40, y - 22, x + 20, y], fill=(236, 186, 90, 160))
    for i in range(4):
        cx, cy, r = w * (0.2 + i * 0.06), h * 0.2, 40
        for k in range(4):
            d.ellipse([cx - r + k * 8, cy - r + k * 8, cx + r - k * 8, cy + r - k * 8], outline=(200, 150, 70), width=6)
    bowl(d, w * 0.84, h * 0.76, min(w, h) * 0.1, (236, 232, 214), rnd, speck=[(60, 110, 40)])
    finish(img, name)


def comp_interior(name, w, h, seed, warm=True):
    rnd = random.Random(seed)
    img = background(w, h, (60, 36, 24), (12, 9, 7), seed)
    d = ImageDraw.Draw(img, "RGBA")
    # tables and chairs silhouettes
    for i in range(4):
        x = w * (0.15 + i * 0.24)
        d.rectangle([x - 80, h * 0.62, x + 80, h * 0.66], fill=(40, 26, 18))
        d.rectangle([x - 6, h * 0.66, x + 6, h * 0.86], fill=(34, 22, 16))
        d.rectangle([x - 130, h * 0.58, x - 96, h * 0.86], fill=(28, 18, 13))
        d.rectangle([x + 96, h * 0.58, x + 130, h * 0.86], fill=(28, 18, 13))
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for i in range(5):
        x = w * (0.1 + i * 0.2)
        ld.line([(x, 0), (x, h * 0.22)], fill=(20, 14, 10, 255), width=3)
        ld.ellipse([x - 26, h * 0.22 - 10, x + 26, h * 0.22 + 26], fill=(255, 196, 120, 255))
    for _ in range(40):
        x, y = rnd.uniform(0, w), rnd.uniform(0, h * 0.55)
        r = rnd.uniform(10, 50)
        ld.ellipse([x - r, y - r, x + r, y + r], fill=(255, 180, 100, rnd.randint(20, 60)))
    glow = layer.filter(ImageFilter.GaussianBlur(24))
    img.paste(glow, (0, 0), glow)
    img.paste(layer, (0, 0), layer.filter(ImageFilter.GaussianBlur(3)))
    finish(img, name)


def comp_spices(name, w, h, seed):
    rnd = random.Random(seed)
    img = background(w, h, (64, 42, 28), (14, 10, 8), seed)
    d = ImageDraw.Draw(img, "RGBA")
    spices = [(170, 40, 30), (220, 160, 30), (120, 70, 40), (60, 110, 50), (200, 110, 40), (90, 50, 30), (236, 214, 170)]
    for i, c in enumerate(spices):
        a = 2 * math.pi * i / len(spices)
        x, y = w * 0.5 + w * 0.28 * math.cos(a), h * 0.5 + h * 0.3 * math.sin(a)
        bowl(d, x, y, min(w, h) * 0.1, c, rnd, brass=i % 2 == 0)
    for _ in range(60):
        x, y = w * 0.5 + rnd.uniform(-90, 90), h * 0.5 + rnd.uniform(-90, 90)
        blob(d, x, y, 8, rnd.choice(spices), rnd)
    finish(img, name)


def comp_tawa(name, w, h, seed):
    rnd = random.Random(seed)
    img = background(w, h, (56, 34, 22), (10, 7, 6), seed)
    d = ImageDraw.Draw(img, "RGBA")
    cx, cy, r = w * 0.5, h * 0.55, min(w, h) * 0.44
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(34, 30, 28))
    d.ellipse([cx - r * 0.9, cy - r * 0.9, cx + r * 0.9, cy + r * 0.9], fill=(46, 40, 36))
    d.ellipse([cx - r * 0.75, cy - r * 0.75, cx + r * 0.75, cy + r * 0.75], fill=(220, 160, 80))
    for _ in range(200):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.72)
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        s = rnd.uniform(2, 8)
        d.ellipse([x - s, y - s, x + s, y + s], fill=(170, 100, 40, 180))
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    for _ in range(30):
        x, y = rnd.uniform(w * 0.2, w * 0.8), rnd.uniform(0, h * 0.4)
        ld.ellipse([x - 60, y - 60, x + 60, y + 60], fill=(255, 255, 255, 12))
    layer = layer.filter(ImageFilter.GaussianBlur(30))
    img.paste(layer, (0, 0), layer)
    finish(img, name)


def comp_spread(name, w, h, seed, label=True):
    """Wide overhead table spread — used for hero, final CTA and OG image."""
    rnd = random.Random(seed)
    img = background(w, h, (70, 44, 28), (12, 9, 7), seed)
    leaf(img, w * 0.66, h * 0.52, w * 0.62, h * 0.62, -10)
    d = ImageDraw.Draw(img, "RGBA")
    # biryani handi on the right
    cx, cy, r = w * 0.8, h * 0.3, h * 0.2
    bowl(d, cx, cy, r, (232, 190, 110), rnd, brass=True)
    for _ in range(700):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, r * 0.78)
        x, y = cx + rr * math.cos(a), cy + rr * math.sin(a)
        col = rnd.choice([(250, 244, 226), (240, 178, 60), (230, 150, 40)])
        d.line([(x - 5, y), (x + 5, y + 2)], fill=col, width=3)
    # dosa across the leaf
    L = w * 0.36
    ang = math.radians(-14)
    dx, dy = w * 0.64, h * 0.56
    for i in range(50):
        t = i / 49
        x = dx + (t - 0.5) * L * math.cos(ang)
        y = dy + (t - 0.5) * L * math.sin(ang)
        rr = h * 0.075 * (0.9 if 0.08 < t < 0.92 else 0.6)
        d.ellipse([x - rr, y - rr * 0.8, x + rr, y + rr * 0.8], fill=lerp((196, 120, 40), (236, 172, 70), 0.5 + 0.5 * math.sin(t * 9)))
    # bowls
    for (x, y, c) in [(0.5, 0.82, (214, 120, 50)), (0.62, 0.86, (236, 232, 214)), (0.74, 0.84, (186, 60, 40)), (0.9, 0.7, (150, 60, 30)), (0.46, 0.3, (170, 70, 40))]:
        bowl(d, w * x, h * y, h * 0.07, c, rnd, speck=[(60, 110, 40)])
    # coffee top right
    comp_small_coffee(d, w * 0.95, h * 0.9, h * 0.08)
    # chicken 65 plate
    plate(d, w * 0.93, h * 0.52, h * 0.12, steel=True)
    for _ in range(10):
        a = rnd.uniform(0, 2 * math.pi)
        rr = rnd.uniform(0, h * 0.06)
        blob(d, w * 0.93 + rr * math.cos(a), h * 0.52 + rr * math.sin(a), h * 0.025, (180, 50, 30), rnd)
    # spice scatter on the left darker area
    for _ in range(40):
        x, y = rnd.uniform(w * 0.02, w * 0.4), rnd.uniform(h * 0.05, h * 0.95)
        blob(d, x, y, rnd.uniform(3, 7), rnd.choice([(150, 40, 30), (200, 150, 40), (70, 40, 24)]), rnd)
    finish(img, name, label=label)


def comp_small_coffee(d, cx, cy, r):
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(186, 146, 80))
    d.ellipse([cx - r * 0.6, cy - r * 0.6, cx + r * 0.6, cy + r * 0.6], fill=(206, 160, 110))


# ---------------------------------------------------------------- registry
L, P, S, W = (1600, 1200), (1200, 1500), (1400, 1400), (2400, 1350)

jobs = [
    ("hero-tamil-food.jpg", W, lambda n, s: comp_spread(n, *W, s)),
    ("final-cta-spread.jpg", W, lambda n, s: comp_spread(n, *W, s)),
    ("masala-dosa.jpg", L, lambda n, s: comp_dosa(n, *L, s)),
    ("ghee-roast-dosa.jpg", P, lambda n, s: comp_dosa(n, *P, s, ghee=True)),
    ("plain-dosa.jpg", L, lambda n, s: comp_dosa(n, *L, s)),
    ("onion-uthappam.jpg", S, lambda n, s: comp_bread(n, *S, s)),
    ("south-indian-meals.jpg", L, lambda n, s: comp_meals(n, *L, s)),
    ("banana-leaf-meals.jpg", W, lambda n, s: comp_meals(n, *W, s)),
    ("veg-meals.jpg", S, lambda n, s: comp_meals(n, *S, s)),
    ("chicken-biryani.jpg", P, lambda n, s: comp_biryani(n, *P, s)),
    ("mutton-biryani.jpg", L, lambda n, s: comp_biryani(n, *L, s, meat=(90, 44, 26))),
    ("egg-biryani.jpg", S, lambda n, s: comp_biryani(n, *S, s, meat=(246, 240, 220))),
    ("veg-biryani.jpg", S, lambda n, s: comp_biryani(n, *S, s, meat=(90, 140, 60))),
    ("kothu-parotta.jpg", L, lambda n, s: comp_kothu(n, *L, s)),
    ("chicken-kothu.jpg", S, lambda n, s: comp_kothu(n, *S, s)),
    ("parotta.jpg", L, lambda n, s: comp_parotta(n, *L, s)),
    ("chilli-parotta.jpg", S, lambda n, s: comp_kothu(n, *S, s)),
    ("chicken-65.jpg", P, lambda n, s: comp_fry(n, *P, s)),
    ("idli-vada.jpg", L, lambda n, s: comp_idli(n, *L, s)),
    ("idli.jpg", S, lambda n, s: comp_idli(n, *S, s, vada=False)),
    ("medu-vada.jpg", S, lambda n, s: comp_idli(n, *S, s, idli=False)),
    ("sambar.jpg", S, lambda n, s: comp_bowls(n, *S, s, main=(206, 110, 44), speck=[(240, 200, 120), (60, 110, 40), (200, 60, 40)])),
    ("pongal.jpg", S, lambda n, s: comp_bowls(n, *S, s, main=(236, 220, 170), grains=[(244, 236, 200), (230, 210, 150), (60, 40, 30)])),
    ("poori.jpg", S, lambda n, s: comp_bread(n, *S, s, puffy=True)),
    ("chapati.jpg", S, lambda n, s: comp_bread(n, *S, s)),
    ("chicken-curry.jpg", L, lambda n, s: comp_curry(n, *L, s)),
    ("pepper-chicken.jpg", S, lambda n, s: comp_fry(n, *S, s, base=(110, 50, 25))),
    ("mutton-curry.jpg", P, lambda n, s: comp_curry(n, *P, s, gravy=(120, 50, 26), pieces=(80, 36, 20), side="parotta")),
    ("mutton-sukka.jpg", S, lambda n, s: comp_fry(n, *S, s, base=(100, 44, 22), steel=True)),
    ("fish-fry.jpg", L, lambda n, s: comp_fry(n, *L, s, base=(200, 80, 30))),
    ("fish-curry.jpg", S, lambda n, s: comp_curry(n, *S, s, gravy=(190, 90, 36), pieces=(230, 200, 150))),
    ("veg-kurma.jpg", S, lambda n, s: comp_bowls(n, *S, s, main=(226, 190, 120), speck=[(60, 130, 60), (230, 120, 40), (240, 230, 200)])),
    ("paneer-masala.jpg", S, lambda n, s: comp_curry(n, *S, s, gravy=(200, 90, 40), pieces=(246, 238, 216))),
    ("tamil-snacks.jpg", L, lambda n, s: comp_snacks(n, *L, s)),
    ("onion-bajji.jpg", S, lambda n, s: comp_snacks(n, *S, s)),
    ("filter-coffee.jpg", P, lambda n, s: comp_coffee(n, *P, s)),
    ("filter-coffee-wide.jpg", L, lambda n, s: comp_coffee(n, *L, s)),
    ("masala-tea.jpg", S, lambda n, s: comp_coffee(n, *S, s, tea=True)),
    ("fresh-juice.jpg", S, lambda n, s: comp_drink(n, *S, s)),
    ("rose-milk.jpg", S, lambda n, s: comp_drink(n, *S, s, colour=(236, 150, 170))),
    ("payasam.jpg", S, lambda n, s: comp_dessert(n, *S, s, speck=[(200, 150, 80), (120, 60, 30)])),
    ("kesari.jpg", S, lambda n, s: comp_dessert(n, *S, s, colour=(240, 150, 40), block=True)),
    ("south-indian-desserts.jpg", L, lambda n, s: comp_dessert(n, *L, s, colour=(236, 190, 110), block=True)),
    ("restaurant-interior.jpg", L, lambda n, s: comp_interior(n, *L, s)),
    ("dining-atmosphere.jpg", P, lambda n, s: comp_interior(n, *P, s)),
    ("cafe-counter.jpg", S, lambda n, s: comp_interior(n, *S, s)),
    ("tamil-spices.jpg", P, lambda n, s: comp_spices(n, *P, s)),
    ("dosa-tawa.jpg", L, lambda n, s: comp_tawa(n, *L, s)),
    ("story-kitchen.jpg", P, lambda n, s: comp_tawa(n, *P, s)),
]

if __name__ == "__main__":
    for i, (name, _size, fn) in enumerate(jobs):
        fn(name, 100 + i * 7)
    # Open Graph (1200x630) – no placeholder label so it can ship as-is if needed
    comp_spread("og-image.jpg", 1200, 630, 999, label=False)
