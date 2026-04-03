# Venue images (WHERE TO GO section)

Replace these files with your Family Farm Resort photos:

- **ceremony.JPG** – First carousel image (e.g. pool area at night)
- **reception.JPG** – Second carousel image (e.g. A-frame cabin at night)

Overwrite the existing files with your new images (same names). JPG or PNG is fine; if you use PNG, rename to `ceremony.png` and `reception.png` and update the paths in `src/data/venues.json` (and fallbacks in `src/components/Venue.jsx`).

**Deployment (Vercel, Netlify, etc.):** URLs must match the real filename **exactly**, including `.JPG` vs `.jpg`. Linux servers are case-sensitive; Windows is not, so wrong casing often works locally but breaks in production.
