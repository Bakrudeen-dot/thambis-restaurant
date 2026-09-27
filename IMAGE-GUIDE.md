# Image guide — Thambis Restaurant & Cafe

Every image in `public/images/` is a **stylised placeholder** (labelled "PLACEHOLDER · filename").
Replace a file with a real photo using the **same filename** and the whole site updates.

Recommended: JPG, sRGB, 80–85% quality. Next/Image resizes automatically.

| File | Used for | Shape (min size) |
|---|---|---|
| hero-tamil-food.jpg | Homepage hero (food on the RIGHT, dark space on the left for text) | 16:9, 2400×1350 |
| final-cta-spread.jpg | Final call-to-action background | 16:9, 2400×1350 |
| banana-leaf-meals.jpg | Meals section full-bleed + gallery | 16:9, 2400×1350 |
| masala-dosa.jpg, plain-dosa.jpg, south-indian-meals.jpg, mutton-biryani.jpg, kothu-parotta.jpg, parotta.jpg, idli-vada.jpg, chicken-curry.jpg, fish-fry.jpg, tamil-snacks.jpg, filter-coffee-wide.jpg, south-indian-desserts.jpg, restaurant-interior.jpg, dosa-tawa.jpg | Cards / sections | 4:3, 1600×1200 |
| ghee-roast-dosa.jpg, chicken-biryani.jpg, chicken-65.jpg, mutton-curry.jpg, filter-coffee.jpg, dining-atmosphere.jpg, tamil-spices.jpg, story-kitchen.jpg | Tall cards | 4:5, 1200×1500 |
| All other dish files (idli.jpg, medu-vada.jpg, sambar.jpg, pongal.jpg, poori.jpg, chapati.jpg, …) | Menu cards | 1:1, 1400×1400 |
| og-image.jpg | Social sharing preview | 1200×630 |

Photography tips: shoot overhead or 45°, natural daylight, dark wood/stone surfaces, banana leaf and brass/steel vessels — this matches the site's warm, dark palette.

When gallery sizes change, update `w`/`h` in `galleryImages` (`data/menu.ts`) to the new photo's pixel size.
To regenerate the placeholders: `python3 scripts/generate-placeholders.py` (needs Pillow).
