# Motion Atlas — Delivery Overview

Reviewed on **2026-11-04 (Asia/Shanghai)**. Repository: [zczxz3/website-assets](https://github.com/zczxz3/website-assets), public.

**Delivered: 15 independent interaction prototypes, an interactive gallery, English research notes, reusable modules and preserved verification evidence.** This is a first-pass component library. Complete production-site reconstruction, visual parity and production readiness are still outside the verified scope.

**Version 0.2:** [search, shareable links, runtime improvements and verification](UPGRADE_NOTES.md).

## Start here

| Goal | Open |
| --- | --- |
| Understand the delivery and choose a component | This overview |
| Review original-site evidence and implementation differences | [RESEARCH.md](RESEARCH.md) |
| Integrate a module | [COMPONENT_API.md](COMPONENT_API.md) and [components/](components/) |
| Check measured results | [STUDY_VERIFICATION.md](STUDY_VERIFICATION.md) |
| Check archive hashes and audited source files | [verification-manifest.json](verification-manifest.json) |
| Read unresolved original-renderer failures | [BROWSER_LIMITATIONS.md](BROWSER_LIMITATIONS.md) |
| Obtain all 15 research directories | [study-source.zip](study-source.zip) |
| Inspect browser evidence and screenshots | [component-verification.zip](component-verification.zip) |

## 1. Layout, typography and product presentation

All five prototypes passed desktop and mobile functional checks. Each module link opens its directly browsable source.

| Reference | Reusable implementation | Practical use | Important limit |
| --- | --- | --- | --- |
| 01 MERSI Architecture | [Shared-element transition](components/shared-transition.mjs) | Portfolio cards and project dialogs | Native FLIP geometry; routing, GSAP, Lenis and the full horizontal portfolio are not rebuilt |
| 02 Obys Agency | [Masked text and layout switch](components/text-reveal.mjs) | Editorial headings and project grids | Production timelines, cursor effects and media switching remain separate |
| 03 GT Flexa | [Variable-type controls](components/variable-type.mjs) | Interactive type specimens | Supply a licensed variable font for real axes; default width uses a geometric fallback |
| 04 NIPPON COLORS | [Synchronized color theme](components/color-theme.mjs) | Palette selectors and themed sections | Original demo palette; not the production color database |
| 05 Stripe Press | [CSS 3D book](components/book-tilt.mjs) | Books and lightweight product cards | Original cover; no recovered product model or production renderer |

## 2. Art, motion and playable interaction

| Reference | Reusable implementation | Practical use | Important limit |
| --- | --- | --- | --- |
| 06 The Boat | [Layered ink narrative](components/ink-story.mjs) | Scroll-driven storytelling prototypes | Procedural illustration; original comic, audio and complete scene progression unverified |
| 07 Short Trip | [Tram and layered landscape](components/scene-scroller.mjs) | Playable scenes and parallax experiments | Simplified original scenery; no recovered game route or characters |
| 08 Igloo Inc. | [GPU particle morph](components/particle-morph.mjs) | Particle transitions and interactive backgrounds | Independent WebGL sphere-to-torus study; original WebGL2 scene unverified |
| 09 Bruno Simon | [Vehicle and following camera](components/vehicle-world.mjs) | Spatial navigation and movement experiments | CPU-projected 3D and simplified kinematics; not the original Three.js/Rapier world |
| 10 Patatap | [Keyboard visuals and synthesized notes](components/key-visual-sampler.mjs) | Audio-reactive interactive sketches | Audio requires explicit activation; no original samples |

## 3. Maps, scientific diagrams and image processing

| Reference | Reusable implementation | Practical use | Important limit |
| --- | --- | --- | --- |
| 11 Human Terrain | [Linear grid-to-height terrain](components/population-terrain.mjs) | Comparing scalar grids in 3D | Default data is synthetic; geographic tiles and real population ingestion are absent |
| 12 Earth Nullschool | [Globe and advected particles](components/flow-field.mjs) | Studying vector fields and projections | Synthetic field; not live weather or a calibrated scientific dashboard |
| 13 Land Lines | [Normalized stroke matching](components/stroke-matcher.mjs) | Gesture-to-shape matching | Three procedural candidates; no satellite atlas or production search index |
| 14 Mechanical Watch | [Rotating exploded gear diagram](components/mechanism-section.mjs) | Interactive technical illustrations | Illustrative gear train; not a complete physically meshing watch |
| 15 LOW←TECH MAGAZINE | [Bayer and Floyd–Steinberg dithering](components/dither-image.mjs) | Two-color image treatments and PNG export | Procedural sample; publishing theme and energy measurements are not rebuilt |

## What to reuse first

For practical integration, start with **color themes, CSS books, masked text, shared-element dialogs and dithering**. These have focused behavior and fewer external asset or data requirements. They still need testing in the consuming application.

Variable typography needs a suitable licensed font. Audio needs an explicit user action. Particle work needs a supported WebGL context. Vehicle, population, weather, satellite matching and watch studies are useful foundations for further work; their simplified models or synthetic inputs must be replaced where the application requires real-world accuracy.

## Verification and upload status

| Check | Result | Scope |
| --- | --- | --- |
| REA runtime | Verified | Pinned REA 6.8.0 on a standard GitHub Ubuntu runner |
| Desktop interactions | 15/15 passed | Width 1280; one functional interaction per prototype |
| Mobile interactions | 15/15 passed | Width 390; one functional interaction per prototype |
| Gallery lifecycle | 1/1 passed | Teardown, style cleanup and repeated mounting |
| Algorithm and utility checks | 14/14 passed | Mathematical invariants, frame scheduling, catalog/URL helpers and grid validation |
| Additional browser coverage | 5/5 passed | Two normal-motion studies, two gallery search cases and one runtime fixture with eight assertions |
| Browser page errors | 0 in the 36 final scenarios | Independent prototypes only |
| Source package | 194 files; 15 site directories | All six requested sections present per site |
| Archive integrity | Passed | Both ZIP files readable; SHA-256 values match the recorded delivery |
| Published code parity | 29/29 published source files match | CI compares file bytes before ZIP extraction |

[Successful version 0.2 verification run](https://github.com/zczxz3/website-assets/actions/runs/41761319184). Tested commit: `18a74a796438f97d56c14cc117651cbbee107a87`. This run includes the upgraded gallery, scheduler, component lifecycle and packaging checks.

The authoritative browser result is **`component-checks/summary.json` inside `component-verification.zip`**; `package-verification.json` contains the source comparison. Two study scenarios and the runtime fixture exercise normal animation; the remaining cases use reduced-motion preferences. The checks do not establish full animation fidelity, frame rate or complete accessibility coverage.

## Files and size

| Item | Size | Contents |
| --- | ---: | --- |
| `study-source.zip` | 936,406 bytes (0.94 MB) | Full per-site notes, evidence, standalone demos and module source |
| `component-verification.zip` | 4,862,915 bytes (4.86 MB) | Preserved final-run reports and screenshots |

The 15 per-site directory trees are inside `study-source.zip`; they are not expanded in GitHub's file tree. Shared components and the root gallery are already directly accessible. This packaging avoids repeating the evidence files in the repository tree.

The gallery now supports keyword/category filtering and shareable `?study=ID` links. Back/forward navigation restores the selected study.

## Run and reuse

From the downloaded or cloned repository root:

```sh
python3 -m zipfile -e study-source.zip .
python3 -m http.server 8000
```

Open `http://localhost:8000` for the gallery. For a standalone example, open `http://localhost:8000/sites/01-mersi-architecture/04-reconstruction/index.html`. A web server is required for ES module imports; opening the HTML file directly is insufficient. No npm installation is needed for the gallery.

Each site directory contains `01-original`, `02-analysis`, `03-assets`, `04-reconstruction`, `05-components`, `06-demo` and a site README. Import a module's `mount(host, options)` and call the returned `destroy()` before replacing it. Include the supplied `styles.css` when using the supplied presentation. See [the API](COMPONENT_API.md) for host sizing and module-specific options.

## Prioritized follow-up work

1. **MERSI and Obys:** add routed transitions, horizontal portfolio flow, exact text timing and media interactions; compare recordings against the original references.
2. **The Boat, Igloo and Bruno:** capture complete original scenes on a browser with the required rendering capabilities. The currently observed GPU failures are documented; loading-screen captures do not establish scene behavior.
3. **Human Terrain and Earth:** add licensed, versioned geographic/scientific data, units, legends and real data-to-render validation.
4. **GT Flexa:** supply a licensed variable font and compare native width/weight interpolation with the reference.
5. **All modules before production use:** measure animation and loading performance, complete keyboard/touch/accessibility coverage, and verify host-application lifecycle behavior.

The original implementation code is MIT-licensed. Reference screenshots and third-party materials retain their own rights. Original photography, commercial fonts, sound recordings and production datasets are not supplied as reusable assets.
