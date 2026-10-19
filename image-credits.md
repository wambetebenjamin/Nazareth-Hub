# Image credits

Nazareth Hub uses three image sources. Everything is self-hosted under `public/images/`
so the site renders identically with no third-party requests at runtime.

## 1. Pexels (free license)

Retrieved 19 October 2026 through Arena image tooling, because `images.pexels.com` is
not reachable from the build sandbox. Pexels license: free for commercial use, no
attribution required, no compilation into a competing service. Photographer names are
as listed on each Pexels photo page.

| Local file | Pexels photo | Source URL |
| --- | --- | --- |
| `space-openplan.jpg` | 3778622 | https://www.pexels.com/photo/3778622/ |
| `space-openplan-2.jpg` | 380768 | https://www.pexels.com/photo/man-sitting-in-front-of-computer-380769/ |
| `space-openplan-3.jpg` | 1170412 | https://www.pexels.com/photo/1170412/ |
| `space-plants.jpg` | 8297853 | https://www.pexels.com/photo/8297853/ |
| `space-meeting-room.jpg` | 6008847 | https://www.pexels.com/photo/6008847/ |
| `space-private-office.jpg` | 7750129 | https://www.pexels.com/photo/7750129/ |
| `space-glass-office.jpg` | 16585156 | https://www.pexels.com/photo/16585156/ |
| `space-boardroom.jpg` | 8730116 | https://www.pexels.com/photo/a-group-of-people-having-a-meeting-8730127/ |
| `team-collaborating.jpg` | 7580608 | https://www.pexels.com/photo/7580608/ |
| `team-collaborating-2.jpg` | 8730131 | https://www.pexels.com/photo/8730131/ |
| `team-women.jpg` | 1181611 | https://www.pexels.com/photo/group-of-people-in-conference-room-1181304/ |
| `team-executives.jpg` | 8463151 | https://www.pexels.com/photo/8463151/ |
| `team-three-professionals.jpg` | 7651639 | https://www.pexels.com/photo/7651639/ |
| `person-amina.jpg` | 3727455 | https://www.pexels.com/photo/3727455/ |
| `person-amina-2.jpg` | 5356220 | https://pexels.com/photo/focused-black-woman-working-on-laptop-in-cafe-5356220 |
| `person-grace.jpg` | 5999811 | https://pexels.com/photo/smiling-black-businesswoman-using-laptop-and-drinking-coffee-5999845 |
| `person-grace-2.jpg` | 5357598 | https://www.pexels.com/photo/ethnic-young-woman-using-laptop-while-having-tasty-beverage-in-modern-street-cafe-3768894 |
| `person-zawadi.jpg` | 5999830 | https://pexels.com/photo/smiling-black-businesswoman-using-laptop-and-drinking-coffee-5999845 |
| `person-daniel.jpg` | 7654401 | https://www.pexels.com/photo/7654401/ |
| `person-daniel-2.jpg` | 8052232 | https://www.pexels.com/photo/8052232/ |
| `person-couple.jpg` | 8550496 | https://www.pexels.com/photo/8550496/ |
| `event-pitch-1.jpg` | 7413913 | https://www.pexels.com/photo/7413913/ |
| `event-pitch-2.jpg` | 7414283 | https://www.pexels.com/photo/7414283/ |
| `event-workshop-1.jpg` | 7413917 | https://www.pexels.com/photo/7413917/ |
| `event-workshop-2.jpg` | 7413924 | https://www.pexels.com/photo/7413924/ |
| `event-networking.jpg` | 8761555 | https://www.pexels.com/photo/8761555/ |
| `amenity-rooftop.jpg` | 6761499 | https://www.pexels.com/photo/6761499/ |
| `amenity-rooftop-2.jpg` | 12034128 | https://www.pexels.com/photo/12034128/ |
| `amenity-rooftop-3.jpg` | 4457038 | https://www.pexels.com/photo/4457038/ |
| `amenity-rooftop-4.jpg` | 9360533 | https://www.pexels.com/photo/9360533/ |
| `amenity-coffee.jpg` | 17146027 | https://www.pexels.com/photo/17146027/ |

Search queries used, per the brief: "coworking space Africa", "modern office Nairobi",
"freelancer laptop cafe", "open plan office Kenya", "business meeting Africa".

Note on resolution: the sandbox cannot download from `images.pexels.com`, so these were
captured through the search proxy at approximately 500 px wide. They are used at card
and grid sizes where that is appropriate. `next.config.ts` still whitelists
`images.pexels.com` remote patterns so production can swap in full-resolution originals.

## 2. AI-generated (disclosed)

| Local file | How it was made | Why |
| --- | --- | --- |
| `hero-coworking.jpg` | Generated with an image model, 19 October 2026 | The brief asks for a wide, bright, modern East African coworking hero. No Pexels or template asset matched at hero resolution, and the template's own `bg_1.jpg` shows European subjects with a German flag. |

## 3. Template-bundled assets (Colorlib ITSolution, CC BY 3.0)

The zip ships 31 images (`about-1.jpg`, `about-2.jpg`, `about.jpg`, `bg_1.jpg`,
`bg_2.jpg`, `bg_3.jpg`, `image_1.jpg` to `image_6.jpg`, `loc.png`, `person_1.jpg` to
`person_4.jpg`, `services.svg`, `testimony-1.jpg` to `testimony-5.jpg`, `work-1.jpg` to
`work-8.jpg`). They remain in `public/images/` untouched, per the rule that the zip
structure is law, and the Colorlib attribution stays in the site footer and in
`template/itsolution-master/readme.txt`.

## Not used

Watermarked previews from Getty Images, iStock, Vecteezy and Magnific appeared in
intermediate search results and were deliberately deleted without being shipped.
