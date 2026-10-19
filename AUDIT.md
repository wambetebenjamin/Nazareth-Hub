# STEP 1 — Template Audit

Source archive: `itsolution-master.zip` (3,435,109 bytes)
Root folder inside zip: `itsolution-master/`
Template: Colorlib "ITSolution" — free Bootstrap 4.3.1 HTML5 template (CC BY 3.0)
Total files: **172**

---

## 1. Full file tree (verbatim, as extracted)

```
.DS_Store
about.html
blog-single.html
blog.html
cases.html
contact.html
css/.DS_Store
css/ajax-loader.gif
css/animate.css
css/bootstrap.min.css
css/flaticon.css
css/magnific-popup.css
css/owl.carousel.min.css
css/owl.theme.default.min.css
css/style.css
fonts/.DS_Store
fonts/flaticon/.DS_Store
fonts/flaticon/backup.txt
fonts/flaticon/font/Flaticon.eot
fonts/flaticon/font/Flaticon.svg
fonts/flaticon/font/Flaticon.ttf
fonts/flaticon/font/Flaticon.woff
fonts/flaticon/font/Flaticon.woff2
fonts/flaticon/font/_flaticon.scss
fonts/flaticon/font/flaticon.css
fonts/flaticon/font/flaticon.html
fonts/flaticon/license/license.pdf
images/.DS_Store
images/about-1.jpg
images/about-2.jpg
images/about.jpg
images/bg_1.jpg
images/bg_2.jpg
images/bg_3.jpg
images/image_1.jpg
images/image_2.jpg
images/image_3.jpg
images/image_4.jpg
images/image_5.jpg
images/image_6.jpg
images/loc.png
images/person_1.jpg
images/person_2.jpg
images/person_3.jpg
images/person_4.jpg
images/services.svg
images/testimony-1.jpg
images/testimony-2.jpg
images/testimony-3.jpg
images/testimony-4.jpg
images/testimony-5.jpg
images/work-1.jpg
images/work-2.jpg
images/work-3.jpg
images/work-4.jpg
images/work-5.jpg
images/work-6.jpg
images/work-7.jpg
images/work-8.jpg
index.html
js/.DS_Store
js/bootstrap-datepicker.js
js/bootstrap.min.js
js/google-map.js
js/jquery-3.2.1.min.js
js/jquery-migrate-3.0.1.min.js
js/jquery.animateNumber.min.js
js/jquery.easing.1.3.js
js/jquery.magnific-popup.min.js
js/jquery.min.js
js/jquery.stellar.min.js
js/jquery.waypoints.min.js
js/main.js
js/owl.carousel.min.js
js/popper.min.js
js/scrollax.min.js
main.html
prepros-6.config
readme.txt
scss/.DS_Store
scss/bootstrap/.DS_Store
scss/bootstrap/_alert.scss
scss/bootstrap/_badge.scss
scss/bootstrap/_breadcrumb.scss
scss/bootstrap/_button-group.scss
scss/bootstrap/_buttons.scss
scss/bootstrap/_card.scss
scss/bootstrap/_carousel.scss
scss/bootstrap/_close.scss
scss/bootstrap/_code.scss
scss/bootstrap/_custom-forms.scss
scss/bootstrap/_dropdown.scss
scss/bootstrap/_forms.scss
scss/bootstrap/_functions.scss
scss/bootstrap/_grid.scss
scss/bootstrap/_images.scss
scss/bootstrap/_input-group.scss
scss/bootstrap/_jumbotron.scss
scss/bootstrap/_list-group.scss
scss/bootstrap/_media.scss
scss/bootstrap/_mixins.scss
scss/bootstrap/_modal.scss
scss/bootstrap/_nav.scss
scss/bootstrap/_navbar.scss
scss/bootstrap/_pagination.scss
scss/bootstrap/_popover.scss
scss/bootstrap/_print.scss
scss/bootstrap/_progress.scss
scss/bootstrap/_reboot.scss
scss/bootstrap/_root.scss
scss/bootstrap/_spinners.scss
scss/bootstrap/_tables.scss
scss/bootstrap/_toasts.scss
scss/bootstrap/_tooltip.scss
scss/bootstrap/_transitions.scss
scss/bootstrap/_type.scss
scss/bootstrap/_utilities.scss
scss/bootstrap/_variables.scss
scss/bootstrap/bootstrap-grid.scss
scss/bootstrap/bootstrap-reboot.scss
scss/bootstrap/bootstrap.scss
scss/bootstrap/mixins/_alert.scss
scss/bootstrap/mixins/_background-variant.scss
scss/bootstrap/mixins/_badge.scss
scss/bootstrap/mixins/_border-radius.scss
scss/bootstrap/mixins/_box-shadow.scss
scss/bootstrap/mixins/_breakpoints.scss
scss/bootstrap/mixins/_buttons.scss
scss/bootstrap/mixins/_caret.scss
scss/bootstrap/mixins/_clearfix.scss
scss/bootstrap/mixins/_deprecate.scss
scss/bootstrap/mixins/_float.scss
scss/bootstrap/mixins/_forms.scss
scss/bootstrap/mixins/_gradients.scss
scss/bootstrap/mixins/_grid-framework.scss
scss/bootstrap/mixins/_grid.scss
scss/bootstrap/mixins/_hover.scss
scss/bootstrap/mixins/_image.scss
scss/bootstrap/mixins/_list-group.scss
scss/bootstrap/mixins/_lists.scss
scss/bootstrap/mixins/_nav-divider.scss
scss/bootstrap/mixins/_pagination.scss
scss/bootstrap/mixins/_reset-text.scss
scss/bootstrap/mixins/_resize.scss
scss/bootstrap/mixins/_screen-reader.scss
scss/bootstrap/mixins/_size.scss
scss/bootstrap/mixins/_table-row.scss
scss/bootstrap/mixins/_text-emphasis.scss
scss/bootstrap/mixins/_text-hide.scss
scss/bootstrap/mixins/_text-truncate.scss
scss/bootstrap/mixins/_transition.scss
scss/bootstrap/mixins/_visibility.scss
scss/bootstrap/utilities/_align.scss
scss/bootstrap/utilities/_background.scss
scss/bootstrap/utilities/_borders.scss
scss/bootstrap/utilities/_clearfix.scss
scss/bootstrap/utilities/_display.scss
scss/bootstrap/utilities/_embed.scss
scss/bootstrap/utilities/_flex.scss
scss/bootstrap/utilities/_float.scss
scss/bootstrap/utilities/_overflow.scss
scss/bootstrap/utilities/_position.scss
scss/bootstrap/utilities/_screenreaders.scss
scss/bootstrap/utilities/_shadows.scss
scss/bootstrap/utilities/_sizing.scss
scss/bootstrap/utilities/_spacing.scss
scss/bootstrap/utilities/_stretched-link.scss
scss/bootstrap/utilities/_text.scss
scss/bootstrap/utilities/_visibility.scss
scss/bootstrap/vendor/_rfs.scss
scss/style.scss
services.html
```

---

## 2. All CSS custom properties (28) — `css/style.css` `:root`, lines 7-35

Reproduced verbatim in `app/globals.css`.

```css
:root {
  --blue: #007bff;
  --indigo: #6610f2;
  --purple: #6f42c1;
  --pink: #e83e8c;
  --red: #dc3545;
  --orange: #fd7e14;
  --yellow: #ffc107;
  --green: #28a745;
  --teal: #20c997;
  --cyan: #17a2b8;
  --white: #fff;
  --gray: #6c757d;
  --gray-dark: #343a40;
  --primary: #007bff;
  --secondary: #6c757d;
  --success: #28a745;
  --info: #17a2b8;
  --warning: #ffc107;
  --danger: #dc3545;
  --light: #f8f9fa;
  --dark: #343a40;
  --breakpoint-xs: 0;
  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;
  --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
```

Identical block also present in `css/bootstrap.min.css` (line 6) and generated from
`scss/bootstrap/_root.scss` + `scss/bootstrap/_variables.scss`.

### Template SCSS design tokens — `scss/style.scss` lines 4-11

Reproduced verbatim as CSS custom properties (`--nh-*`) in `app/globals.css`:

| SCSS variable | Value | Mapped custom property |
| --- | --- | --- |
| `$font-primary` | `'Montserrat',Arial, sans-serif` | `--nh-font-primary` |
| `$white` | `#fff` | `--nh-white` |
| `$black` | `#000000` | `--nh-black` |
| `$darken` | `#090f35` | `--nh-darken` |
| `$primary` | `#323edd` | `--nh-primary` |
| `$secondary` | `#ffa41b` | `--nh-secondary` |
| body colour | `lighten($black,60%)` = `#999999` | `--nh-body` |
| heading colour | `rgba(0,0,0,.8)` | `--nh-heading` |
| loader stroke | `#F96D00` | `--nh-loader-stroke` |
| loader track | `#eeeeee` | `--nh-loader-track` |

---

## 3. All @font-face rules

### 3a. Flaticon icon font — `css/flaticon.css` lines 7-23 (reproduced verbatim)

```css
@font-face {
  font-family: "Flaticon";
  src: url("../fonts/flaticon/font/Flaticon.eot");
  src: url("../fonts/flaticon/font/Flaticon.eot?#iefix") format("embedded-opentype"),
       url("../fonts/flaticon/font/Flaticon.woff") format("woff"),
       url("../fonts/flaticon/font/Flaticon.ttf") format("truetype"),
       url("../fonts/flaticon/font/Flaticon.svg#Flaticon") format("svg");
  font-weight: normal;
  font-style: normal;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: "Flaticon";
    src: url("../fonts/flaticon/font/Flaticon.svg#Flaticon") format("svg");
  }
}
```

### 3b. Flaticon icon font — `fonts/flaticon/font/flaticon.css` lines 6-23 and `fonts/flaticon/font/_flaticon.scss` lines 6-23 (reproduced verbatim)

```css
@font-face {
  font-family: "Flaticon";
  src: url("./Flaticon.eot");
  src: url("./Flaticon.eot?#iefix") format("embedded-opentype"),
       url("./Flaticon.woff2") format("woff2"),
       url("./Flaticon.woff") format("woff"),
       url("./Flaticon.ttf") format("truetype"),
       url("./Flaticon.svg#Flaticon") format("svg");
  font-weight: normal;
  font-style: normal;
}

@media screen and (-webkit-min-device-pixel-ratio:0) {
  @font-face {
    font-family: "Flaticon";
    src: url("./Flaticon.svg#Flaticon") format("svg");
  }
}
```

### 3c. Montserrat — loaded remotely, no local @font-face

`index.html` line 8 (and every other HTML page):

```html
<link href="https://fonts.googleapis.com/css?family=Montserrat:200,300,400,500,600,700,800&display=swap" rel="stylesheet">
```

Self-hosted in the Next.js build via `@fontsource/montserrat` so the identical weights
(200, 300, 400, 500, 600, 700, 800) resolve without a third-party request. **Fonts are sacred.**

### Flaticon glyph map (7 glyphs, `_flaticon.scss`)

`flaticon-bolt \f100`, `flaticon-cyber`, `flaticon-light-bulb`, `flaticon-presentation`,
`flaticon-secure`, `flaticon-stats`, `flaticon-web-programming`.

### Other webfont/CDN dependencies in the template

Font Awesome 4.7.0 via `stackpath.bootstrapcdn.com` (`.fa fa-facebook`, `.fa fa-twitter`,
`.fa fa-instagram`, `.fa fa-dribbble`, `.fa fa-map`, `.fa fa-phone`, `.fa fa-paper-plane`, `.fa fa-heart`).
Replaced by `lucide-react` in the Next.js build per STEP 3 stack.

---

## 4. All API route names in the zip

**NONE.** The zip is a purely static HTML/CSS/JS template with zero server routes.

The only `api/` strings in the whole archive are the third-party Google Maps endpoints:

- `https://maps.googleapis.com/maps/api/js?key=AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s&sensor=false`
  — referenced in `index.html:708`, `about.html:426`, `blog.html:290`, `blog-single.html:394`,
  `cases.html:300`, `contact.html:257`, `services.html:384`
- `http://maps.googleapis.com/maps/api/geocode/json` — `js/google-map.js:49`

All seven API routes required by STEP 8 are therefore **new** and were created from scratch:
`/api/bookings/desk`, `/api/bookings/meeting-room`, `/api/bookings/[ref]`, `/api/events`,
`/api/events/rsvp`, `/api/contact`, `/api/recaptcha/verify`.

The live Google Maps JS embed is **not** carried over: STEP 7 requires a static map image
placeholder for `/` location and hours.

---

## 5. All env variable names in the zip

**NONE.** Zero occurrences of `process.env` anywhere in the archive. No `.env`, no `.env.example`.
All sixteen variables from STEP 9 are new. The only hard-coded secret found is the public
Google Maps JS key `AIzaSyBVWaKrjvy3MaE7SQ74_uJiULgl1JY0H2s` (Colorlib demo key, not carried over).

---

## 6. Loading screen — **PRESENT** (reproduced, not invented)

Markup, `index.html` line 693-694 (identical in every HTML page):

```html
<!-- loader -->
<div id="ftco-loader" class="show fullscreen"><svg class="circular" width="48px" height="48px"><circle class="path-bg" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke="#eeeeee"/><circle class="path" cx="24" cy="24" r="22" fill="none" stroke-width="4" stroke-miterlimit="10" stroke="#F96D00"/></svg></div>
```

Styles, `css/style.css` lines 9752-9830 (source `scss/style.scss:2037`):
`#ftco-loader` fixed, centred, 96x96, `background-color: rgba(255,255,255,.9)`,
`box-shadow: 0px 24px 64px rgba(0,0,0,0.24)`, `border-radius: 16px`, `opacity: 0`,
`visibility: hidden`, `z-index: 1000`; `.fullscreen` variant goes edge-to-edge on `#fff`;
`.show` fades in over `.4s ease-out`; `.circular` runs `loader-rotate 2s linear infinite`
positioned `left: calc(50% - 24px); top: calc(50% - 24px)`; `.path` uses
`stroke-dasharray: 1, 200; stroke-dashoffset: 0; animation: loader-dash 1.5s ease-in-out infinite;
stroke-linecap: round`. Keyframes `loader-rotate` and `loader-dash` (both `-webkit-` prefixed
and standard).

Dismissal logic, `js/main.js` lines 25-33:

```js
// loader
var loader = function() {
  setTimeout(function() {
    if($('#ftco-loader').length > 0) {
      $('#ftco-loader').removeClass('show');
    }
  }, 1);
};
loader();
```

The zip loader has **no percentage counter, no skip control, no `role="status"`, no
`prefers-reduced-motion` handling and no timeout cap**. Those are added in
`components/ui/LoadingScreen.tsx` per STEP 13 while keeping `#ftco-loader`, the `.show`
/ `.fullscreen` / `.circular` / `.path` class contract, the exact SVG geometry, the exact
`#eeeeee` / `#F96D00` strokes and the exact keyframes.

---

## 7. Cookie consent — **ABSENT**

0 files match `cookie` or `consent`. No banner, no `localStorage` usage anywhere in the zip
(0 matches). Built new: `components/ui/CookieConsent.tsx`, key `nazareth_hub_consent`,
four categories (Necessary, Functional, Analytics, Marketing), Kenya Data Protection Act 2019
wording.

## 8. CAPTCHA — **ABSENT**

0 files match `captcha` / `recaptcha`. Built new: `components/ui/ReCaptcha.tsx` (v3 invisible
score flow, v2 checkbox fallback under 0.5), `lib/recaptcha.ts`, `/api/recaptcha/verify`.

## 9. Legal pages — **ABSENT**

No privacy, terms or cookie policy documents exist. The zip only has three dead `href="#"`
footer links under a heading literally called "Legal" (`index.html` lines 655-662:
Join Us, Blog, Privacy & Policy, Terms & Conditions, Careers, Contact). Built new:
`/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`.

## 10. 404 page — **ABSENT**

No `404.html`. The 6 files matching "404" are HTTP status-code constants inside vendored
libraries (`js/bootstrap.min.js`, `js/jquery*.js`, `js/owl.carousel.min.js`,
`js/jquery.magnific-popup.min.js`, `css/bootstrap.min.css`), not a page. Built new:
`app/not-found.tsx` — branded, desk icon, "This space does not exist.", Back to Home.

## 11. 500 page — **ABSENT**

No `500.html`. The 19 files matching "500" are numeric literals / z-index / breakpoint values
in vendored libraries and `css/style.css`. Built new: `app/error.tsx`, `app/global-error.tsx`,
`app/api-error.tsx` — branded, Try Again, WhatsApp number.

---

## 12. Template structure carried into the Next.js build

| Zip section (index.html) | Nazareth Hub equivalent |
| --- | --- |
| `.wrap` top bar (phone / email / social, `bg #090f35`) | `components/layout/TopBar.tsx` — WhatsApp + email + social |
| `.ftco_navbar.bg-dark.ftco-navbar-light`, brand `IT<span>solution</span>` | `components/layout/Header.tsx`, brand `Nazareth<span>Hub</span>` |
| `.hero-wrap.js-fullheight` + `.overlay` + `.slider-text` + `.line` kicker | `components/home/Hero.tsx` |
| `.ftco-intro` three `.services-1` cards (`.line`, `.icon`, `.media-body`) | `components/home/SpaceTypes.tsx` |
| `.ftco-section` + `.heading-section h2 span` | `SectionHeading` across every page |
| `.ftco-counter` / `.block-18` / `strong.number[data-number]` | `components/ui/Counter.tsx` |
| `.services-section` / `.services-2` | `components/home/Amenities.tsx` |
| `.ftco-faqs` accordion | `/spaces` detail rows |
| `.testimony-section` / `.testimony-wrap` | `components/home/Testimonials.tsx` |
| `.blog-entry` / `.block-20` | `components/events/EventCard.tsx` |
| `.ftco-appointment` form on `bg_2.jpg` | `/booking` enquiry tab |
| `.ftco-footer.ftco-footer-2` (Explore / Legal / Have a Questions? / `.block-23`) | `components/layout/Footer.tsx` |
| `#ftco-loader` | `components/ui/LoadingScreen.tsx` |

## 13. Deviations forced by reality

1. `@vercel/blob@0.29.4` **does not exist on npm** (published 0.x line stops at `0.27.3`;
   latest is `2.8.2`). Pinned to `0.27.3`, the highest real 0.x release.
2. Sandbox Node is `v22.22.3`. `engines: >=24.0.0` and `.nvmrc: 24` are written exactly as
   specified, so `npm ci` emits an `EBADENGINE` warning locally but the manifest is correct
   for the Vercel target.
3. `images.pexels.com` is not reachable from the build sandbox, so gallery photos were
   retrieved through the Arena image tooling and **self-hosted** under `public/images/`.
   `next.config.ts` still declares the `images.pexels.com` remote pattern per STEP 5.

## 14. License

`readme.txt` + `main.html` state the template is Colorlib, CC BY 3.0, and the attribution
line must remain unless a license is purchased. Both files are preserved untouched in
`template/itsolution-master/`, and the attribution is retained in the new site footer.
