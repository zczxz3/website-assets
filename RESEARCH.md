# Research findings: 25 distinctive websites

This is a first-pass study with bounded live evidence and independently implemented, reusable interaction prototypes. It is not a complete or pixel-identical reconstruction of all 15 production websites.

See [the later direct renderer diagnostics](BROWSER_LIMITATIONS.md) for confirmed WebGL/WebGPU initialization failures on Igloo, Bruno Simon and The Boat.

## Evidence

The [original REA capture run](https://github.com/zczxz3/website-assets/actions/runs/41750252643) visited all 15 public URLs. Thirteen initial PageDown scenarios were complete; Igloo and Bruno Simon had incomplete scenarios and are explicitly marked. Seven bounded JavaScript subsets completed static parsing, one subset failed, and seven were not analyzed because no qualifying bounded same-host input was retained. A canvas count is not proof of WebGL or any particular library. Primary sources and runtime observations are distinguished below.

The complete source package `study-source.zip` contains all 15 independent site directories and the requested six research subdirectories. Extract it at the repository root to expose those paths locally. Shared reusable module source is also directly browsable in `components/`.



## Follow-up observations

The follow-up run entered the Short Trip web scene, opened the Human Terrain population view and activated Land Lines drawing mode. Longer Igloo and Bruno captures completed but still showed loading states; their complete rendering remains unverified. The Boat entry scenario remained partial. A completed Patatap keypress did not demonstrate note activation. These are retained as specific limits.

---

## 01. MERSI Architecture

## Evidence and confidence

- Original: https://www.mersi-architecture.com/
- Observation: `2026-11-04T00:54:50.129992+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **failed**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 0 canvas element(s), 21 image element(s), 0 observed page error(s).

Primary-source documented: Webflow CMS; Vite-built custom JavaScript; GSAP ScrollTrigger, SplitText and Flip; Lenis; Taxi.js; Splide. The independent component uses native Web Animations, with no production-source code copied.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

One original image moves from its card into a project dialog, preserving continuity across the layout change.

Implementation: **DOM geometry / Web Animations / dialog**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes flip transition. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `/haqt6iy0yx2eNjk2ODk4NDJhNDBhMTdhYzQ1ZTU0MThh/KOb4T9Uw3E6nfGm5tJ7BcGMw3jQ`
- `https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=69689842a40a17ac45e5418a`
- `https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.schunk.ed9687e0656a5325.js`
- `https://cdn.prod.website-files.com/69689842a40a17ac45e5418a/js/webflow.eaf8ceef.4516a5108c6c615f.js`
- `https://mersi.netlify.app/main.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The original author documents GSAP Flip and Taxi.js. This component independently implements the geometric principle with Web Animations. It is a single-page transition, not a routed copy.

Select the courtyard image; verify its geometry moves into the modal. Close it with the Close button or Escape; keyboard focus returns to the source card.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 02. Obys Agency

## Evidence and confidence

- Original: https://obys.agency/
- Observation: `2026-11-04T00:54:50.129876+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 1 canvas element(s), 38 image element(s), 0 observed page error(s).

Observed: a canvas, a large project catalog and image/video content. The exact active animation dependencies are unverified by the bounded first capture.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Staggered text enters through clipped lines. Switch the composition without losing the same content.

Implementation: **Clipped text / stagger / layout state**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes text masks. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://www.googletagmanager.com/gtag/js?id=G-L16SCYVMS7`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

Selected typographic techniques are independently rebuilt. The exact Obys production timeline and pointer shader are not reproduced.

Replay the masked typography and toggle between two compositions. With reduced motion enabled, the final text appears immediately.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 03. GT Flexa

## Evidence and confidence

- Original: https://gt-flexa.com/
- Observation: `2026-11-04T00:55:52.234807+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 1; parse failures: 0.
- Last retained nonempty DOM: 0 canvas element(s), 0 image element(s), 0 observed page error(s).

Primary-page documented: extensive variable-font use. The bounded application script was parsed by REA without parse failures. The commercial original font is not included.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Explore width and weight as continuous controls, and edit the specimen directly.

Implementation: **Font axes / geometric fallback / editable text**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes variable type. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `javascripts/app.js`
- `https://www.googletagmanager.com/gtag/js?id=UA-128988891-3`
- `/cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js`
- `https://static.cloudflareinsights.com/beacon.min.js/vce701823e78c4301a35b7e07294d87301792088814092`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

Commercial GT Flexa files are not bundled. Supply a licensed variable font for native axes. The width control also uses a geometric fallback, explicitly distinct from real glyph interpolation.

Change weight and width, then edit the specimen. Test a separately licensed variable font via the mount option before claiming native width-axis interpolation.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 04. NIPPON COLORS

## Evidence and confidence

- Original: https://nipponcolors.com/
- Observation: `2026-11-04T00:56:05.605833+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 1; parse failures: 0.
- Last retained nonempty DOM: 0 canvas element(s), 1 image element(s), 0 observed page error(s).

Observed script references include jQuery and the site script. The public page exposes named colors and RGB/CMYK fields. This independent implementation uses native DOM and CSS.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Background, title, hexadecimal value and selection state change together.

Implementation: **Theme state / contrast-aware labels / CSS interpolation**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes color state. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://code.jquery.com/jquery-3.7.1.min.js`
- `/js/script.js`
- `//use.typekit.com/avz5lgi.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The demo palette and layout are original. The selected technique is synchronized color presentation, not a copy of the original palette database.

Select each named swatch. The background, name, hexadecimal output and aria-pressed state must agree.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 05. Stripe Press

## Evidence and confidence

- Original: https://press.stripe.com/
- Observation: `2026-11-04T00:56:16.565624+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 2 canvas element(s), 35 image element(s), 0 observed page error(s).

Observed: two canvases and Stripe-hosted bootstrap scripts. The capture shows a stacked dimensional book presentation. The production rendering library remains unverified.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Move over the cover or adjust its rotation to explore a dimensional object built from lightweight planes.

Implementation: **CSS perspective / pointer mapping / keyboard range**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes css 3d object. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://b.stripecdn.com/mkt-statics-srv/assets/imt-861a8d15f2ff52282714277e64c74c35.js`
- `https://b.stripecdn.com/mkt-statics-srv/assets/v1-Bootstrapper-NUYZBWPG.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

This is a CSS 3D book, not a recovered Stripe model or renderer. Cover artwork and text are original.

Move the pointer over the book or use its keyboard-accessible rotation slider. Observe the cover, spine and page block under the same transform.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 06. The Boat

## Evidence and confidence

- Original: https://www.sbs.com.au/theboat/
- Observation: `2026-11-04T00:54:50.130017+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 2; parse failures: 0.
- Last retained nonempty DOM: 1 canvas element(s), 2 image element(s), 0 observed page error(s).

Observed: a start screen with a canvas and runtime scroll-manager containers; the supplied script subset passed REA parsing. Narrative progression beyond the initial gate was not inspected in this first pass.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Ink-like marks, terrain layers and typography share one narrative progress value.

Implementation: **Canvas layers / scroll progress / parallax**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes scroll narrative. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `scripts/vendor/modernizr/modernizr.js`
- `scripts/vendor/detectizr/detectizr.js`
- `scripts/flightcheck.js`
- `scripts/main.js`
- `//nexus.ensighten.com/sbs/prod/Bootstrap.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The original page was captured at its opening state. This is a technique study with procedural illustration, without SBS artwork, story text or sound.

Scroll within the scene or use the narrative progress slider. Ink texture, depth layers and text should respond to the shared progress value.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

The targeted canvas click did not complete its bounded scenario. The original start gate remains a limitation. See the follow-up Evidence in `01-original/`.

---

## 07. Short Trip

## Evidence and confidence

- Original: https://alexanderperrin.com.au/paper/shorttrip/
- Observation: `2026-11-04T00:56:21.303374+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 1 canvas element(s), 2 image element(s), 0 observed page error(s).

Primary page documents left/right hold controls, eco quality and audio toggles. The capture shows a Steam promotion overlay and a canvas; gameplay progression was not yet verified.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Move a tram through a layered drawn landscape. Velocity and scenery update from the same elapsed time.

Implementation: **Delta-time motion / input / parallax**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes playable scene. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `static/bundle20201224.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

Original procedural scenery and a simplified vehicle are supplied. This does not reconstruct Short Trip's artwork, route, characters or game engine.

Hold the left/right buttons or focus the scene and use arrow keys. Release or blur the scene to stop input. The distance output should change.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

The Play Web Version entry was activated and the illustrated web scene became visible. Audio enablement and a complete route were not exercised. See the follow-up Evidence in `01-original/`.

---

## 08. Igloo Inc.

## Evidence and confidence

- Original: https://www.igloo.inc/
- Observation: `2026-11-04T00:55:03.827807+00:00`
- Browser result: **partial bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 1; parse failures: 0.
- Last retained nonempty DOM: 0 canvas element(s), 0 image element(s), 0 observed page error(s).

The original result is incomplete: a sparse loading view was captured, then the PageDown action failed. One bounded script passed static analysis. No claim about the active production particle engine is made.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Thousands of GPU points interpolate between a sphere and a torus while the view responds to the pointer.

Implementation: **WebGL / GLSL / point buffers / interpolation**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes webgl particles. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://www.igloo.inc/assets/index-2e130bc1.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The first original capture was incomplete and showed a sparse loading state. The particle technique is an independent study; the exact Igloo shader is unverified.

Adjust the shape slider and move the pointer. Verify sphere-to-torus interpolation. On a device without WebGL the component reports unsupported rather than claiming a render.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

A longer observation completed without the PageDown action, but the retained viewport remained a flat sparse loading state. Complete capture does not establish successful 3D rendering. See the follow-up Evidence in `01-original/`.

---

## 09. Bruno Simon

## Evidence and confidence

- Original: https://bruno-simon.com/
- Observation: `2026-11-04T00:55:10.692514+00:00`
- Browser result: **partial bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 1 canvas element(s), 44 image element(s), 0 observed page error(s).

Primary-site documented: Three.js, TSL, WebGL/WebGPU, Rapier and Howler.js. Source repository is MIT-licensed according to its own page. First browser result is incomplete and shows loading; the full vehicle world was not verified in that capture.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

A small vehicle moves through an original projected world with obstacle resolution and a damped following camera.

Implementation: **Kinematic bicycle / collision / 3D projection**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes interactive 3d. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://www.googletagmanager.com/gtag/js?id=G-JMSN30BQ5J`
- `./assets/index-ORr3L4no.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

This is a deliberately small CPU-projected 3D prototype. Bruno's current production project uses Three.js with WebGL/WebGPU and Rapier, confirmed by its own technical page. This does not reproduce that renderer or physics engine.

Drive with on-screen controls or focus the scene and use arrow keys. Test obstacle resolution, camera following and Reset. This is a simplified kinematic simulation.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

A longer observation completed, but the retained viewport still showed the animated loading ring. The complete production world was not observed. See the follow-up Evidence in `01-original/`.

---

## 10. Patatap

## Evidence and confidence

- Original: https://patatap.com/
- Observation: `2026-11-04T00:56:23.542935+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 1 canvas element(s), 0 image element(s), 0 observed page error(s).

Primary-site documented: Two.js, with animation/sound collaboration credited to Jono Brandel and Lullatone. The opening canvas prompt was captured; the original audio samples are not included.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Keyboard notes create visual gestures; sound starts only after an explicit audio action.

Implementation: **Canvas / Web Audio / event timing**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes audio and geometry. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- No external script URL was present in the retained initial HTML subset.

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

Original synthesized tones replace the original samples. The source site credits Two.js; this independent study uses Canvas and Web Audio.

Select Play a shape or focus the scene and type A–Z. Enable sound explicitly; mute it again. There are no original sound samples or network audio requests.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

A canvas keypress completed at the browser-action level, but the final viewport still showed the opening prompt. Original note/sound activation is not claimed. See the follow-up Evidence in `01-original/`.

---

## 11. Human Terrain

## Evidence and confidence

- Original: https://pudding.cool/2018/10/city_3d/
- Observation: `2026-11-04T00:55:34.019874+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 1 canvas element(s), 0 image element(s), 0 observed page error(s).

Primary page documents GHSL population data and Google Earth Engine processing. Captured runtime classes include Mapbox GL canvas and controls. The entry screen and map initialization were inspected; no global population dataset is mirrored.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

A linear value-to-height function creates a field of columns, with continuous scenario blending and camera rotation.

Implementation: **Linear encoding / grid data / 3D projection**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes 3d data terrain. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `//www.earthengine.app/javascript/main.js`
- `https://api.tiles.mapbox.com/mapbox-gl-js/v0.49.0/mapbox-gl.js`
- `https://api.mapbox.com/mapbox-gl-js/v2.0.0/mapbox-gl.js`
- `https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-compare/v0.1.0/mapbox-gl-compare.js`
- `//gc.zgo.at/count.js`
- `https://pudding.cool/assets/scripts/d3.v4.12.0+jetpack.min.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The included field is synthetic and does not estimate real population. The mount API accepts real grids. Production GHSL processing, vector tiles and Mapbox camera behavior remain separate from this small component.

Change the scenario blend and rotate the camera. Height uses a linear shared min/max range across both grids. The default fields are synthetic.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

Activating View Population displayed the Mapbox population terrain and year controls. This verifies the entry transition and visible terrain, not the underlying global dataset or historical accuracy. See the follow-up Evidence in `01-original/`.

---

## 12. Earth Nullschool

## Evidence and confidence

- Original: https://earth.nullschool.net/
- Observation: `2026-11-04T00:55:49.561610+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 1; parse failures: 0.
- Last retained nonempty DOM: 6 canvas element(s), 2 image element(s), 0 observed page error(s).

Observed: multiple canvases and projection/layer controls; the bounded JavaScript subset passed REA parsing. The site presents meteorological data sources and timestamps; the component uses synthetic vectors, not those live products.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Particles advect over an orthographic globe. Drag the view and change speed or the illustrative scientific layer.

Implementation: **Spherical projection / midpoint integration / particles**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes scientific flow. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `./src/main~PFYJS5Q4.js`
- `https://www.googletagmanager.com/gtag/js?id=G-6SYP36R2F0`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The field is synthetic. It is not live weather, and the illustrative temperature layer has no measured units. Real data ingestion, temporal interpolation and scientific legends are not implemented.

Drag the globe, change flow speed and switch the illustrative layer. Reduced motion stops ambient advection. No live weather data or measured temperature scale is displayed.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 13. Land Lines

## Evidence and confidence

- Original: https://lines.chromeexperiments.com/
- Observation: `2026-11-04T00:56:34.356298+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **not-run**; parsed files: not measured; parse failures: not measured.
- Last retained nonempty DOM: 1 canvas element(s), 3 image element(s), 0 observed page error(s).

Primary-page documented: Pixi.js/WebGL, a vantage point tree and preprocessing with line-detection tools. The Draw/Drag entry view was captured. The prototype does not include Google Earth imagery.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Resampled strokes are normalized and compared against a small procedural atlas, independent of scale and drawing direction.

Implementation: **Polyline resampling / normalized distance / pointer input**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes geometric matching. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- No external script URL was present in the retained initial HTML subset.

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

The original project uses preprocessed satellite imagery, a vantage point tree and Pixi.js. This prototype uses original procedural shapes and exact search over three candidates, with no satellite image dataset.

Draw a continuous line or choose the example stroke. Compare normalized distances, then clear the drawing. Only three original procedural candidates are searched.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

## Targeted follow-up

Activating Draw displayed the drawing mode and gesture prompt. A full original satellite matching interaction was not exercised. See the follow-up Evidence in `01-original/`.

---

## 14. Mechanical Watch

## Evidence and confidence

- Original: https://ciechanow.ski/mechanical-watch/
- Observation: `2026-11-04T00:56:38.532888+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 1; parse failures: 0.
- Last retained nonempty DOM: 93 canvas element(s), 13 image element(s), 0 observed page error(s).

Primary-page documented: drag-to-rotate and slider-driven examination. Runtime DOM contains many canvas figures. The bounded common script passed parsing; this does not prove the identity of the rendering engine.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Rotate an illustrated gear train and separate its layers with a continuous section control.

Implementation: **Gear ratios / exploded view / 3D projection**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes exploded diagram. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://www.googletagmanager.com/gtag/js?id=UA-25335284-3`
- `/js/base.js`
- `/js/watch.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

This is an illustrative gear train, not a mechanically complete watch movement or a recovered original CAD model.

Drag to rotate and change the exploded-view slider. Gear rotation rates follow inverse tooth counts, but the geometry is illustrative and not a physically meshing complete movement.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.

---

## 15. LOW←TECH MAGAZINE

## Evidence and confidence

- Original: https://solar.lowtechmagazine.com/
- Observation: `2026-11-04T00:56:40.334786+00:00`
- Browser result: **complete bounded scenario**. Scope: initial view, PageDown and a short settlement period.
- Static subset: **completed**; parsed files: 1; parse failures: 0.
- Last retained nonempty DOM: 0 canvas element(s), 0 image element(s), 1 observed page error(s).

Primary repository documents Hugo >=0.145 and AGPL-3.0 theme code. The captured page includes the publication layout and dithered imagery; one page error occurred and is retained as a limitation. The independent component contains no theme code.

The initial collector uses `captured` for successful CLI exit codes. The status above additionally checks REA completeness; an exit code of zero alone is not accepted as complete capture.

## Selected mechanism

Convert an original procedural image to two colors using ordered dithering or error diffusion, then export the result.

Implementation: **Bayer matrix / Floyd–Steinberg / PNG export**. Input is mapped to a small explicit state, which drives geometry or style updates. The component owns its event handlers and rendering resources and exposes `destroy()` for teardown. Animation frames are gated by viewport intersection and page visibility. Ambient motion respects the system preference and the gallery pause control.

## Visual design

The study brief emphasizes image dithering. The independent demo uses an original visual system and procedural assets. The adjacent reference image records the observed production view; it is not a claim of visual equivalence. The original opening gate or loading state may hide later behaviors. Source-documented mechanisms and inferred reconstruction choices remain separate.

## Resource evidence

- `https://solar.lowtechmagazine.com/js/script.js`
- `https://plausible.io/js/script.js`

String fingerprints, HTML classes and a canvas count do not alone establish an active runtime dependency. See `01-original/collector-report.json` for bounded CSS measurements and code-string signals.

## Reconstruction and practical limits

No third-party image is bundled. The original publishing theme is Hugo and AGPL-3.0; this independently written image component does not incorporate its code.

Change threshold, switch between Bayer and Floyd–Steinberg, and save a PNG. The input image is an original procedural composition.

This is a runnable component-level reconstruction of selected principles, not a complete or pixel-identical reconstruction of the production website. Remaining production-specific features include exact timing, content, all routes, complete asset loading, pointer-specific effects, mobile behavior and field-data integration where applicable.


## Batch two: references 16–25

See [BATCH_TWO.md](BATCH_TWO.md) for ten author-supported research entries, bounded original-capture results, reconstruction choices and remaining differences. Each site has six study sections in the current source ZIP. The new original capture has nine complete bounded scenarios and one partial scenario; this does not establish complete scene behavior.
