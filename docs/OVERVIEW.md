# Motion Atlas — Delivery Overview

Reviewed on **2026-11-04 (Asia/Shanghai)**. Repository: [zczxz3/website-assets](https://github.com/zczxz3/website-assets), public.

**Delivered: 25 independent interaction prototypes, an interactive gallery, English research notes, reusable modules and preserved verification evidence.** This is a first-pass component library. Complete production-site reconstruction, visual parity and production readiness are still outside the verified scope.

**Version 0.2:** [search, shareable links, runtime improvements and verification](UPGRADE_NOTES.md).

## Batch two

[References 16–25](../motion/BATCH_TWO.md) add terrain navigation, two GLSL effects, horizontal chapters, camera storytelling, infinite posters, a melody grid, a runner, a desk and an engineering diagram. This extends the original catalog; precise limitations are documented per site.

## Start here

| Goal | Open |
| --- | --- |
| Understand the delivery and choose a component | This overview |
| Review original-site evidence and implementation differences | [RESEARCH.md](../motion/RESEARCH.md) |
| Integrate a module | [COMPONENT_API.md](../motion/COMPONENT_API.md) and [components/](../motion/components/) |
| Check measured results | [STUDY_VERIFICATION.md](../motion/STUDY_VERIFICATION.md) |
| Check archive hashes and audited source files | [verification-manifest.json](../motion/verification-manifest.json) |
| Read unresolved original-renderer failures | [BROWSER_LIMITATIONS.md](../motion/BROWSER_LIMITATIONS.md) |
| Obtain all 15 research directories | [study-source.zip](../motion/study-source.zip) |
| Inspect browser evidence and screenshots | [component-verification.zip](https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/component-verification.zip) |

## 1. Layout, typography and product presentation

All five prototypes passed desktop and mobile functional checks. Each module link opens its directly browsable source.

| Reference | Reusable implementation | Practical use | Important limit |
| --- | --- | --- | --- |
| 01 MERSI Architecture | [Shared-element transition](../motion/components/shared-transition.mjs) | Portfolio cards and project dialogs | Native FLIP geometry; routing, GSAP, Lenis and the full horizontal portfolio are not rebuilt |
| 02 Obys Agency | [Masked text and layout switch](../motion/components/text-reveal.mjs) | Editorial headings and project grids | Production timelines, cursor effects and media switching remain separate |
| 03 GT Flexa | [Variable-type controls](../motion/components/variable-type.mjs) | Interactive type specimens | Supply a licensed variable font for real axes; default width uses a geometric fallback |
| 04 NIPPON COLORS | [Synchronized color theme](../motion/components/color-theme.mjs) | Palette selectors and themed sections | Original demo palette; not the production color database |
| 05 Stripe Press | [CSS 3D book](../motion/components/book-tilt.mjs) | Books and lightweight product cards | Original cover; no recovered product model or production renderer |

## 2. Art, motion and playable interaction

| Reference | Reusable implementation | Practical use | Important limit |
| --- | --- | --- | --- |
| 06 The Boat | [Layered ink narrative](../motion/components/ink-story.mjs) | Scroll-driven storytelling prototypes | Procedural illustration; original comic, audio and complete scene progression unverified |
| 07 Short Trip | [Tram and layered landscape](../motion/components/scene-scroller.mjs) | Playable scenes and parallax experiments | Simplified original scenery; no recovered game route or characters |
| 08 Igloo Inc. | [GPU particle morph](../motion/components/particle-morph.mjs) | Particle transitions and interactive backgrounds | Independent WebGL sphere-to-torus study; original WebGL2 scene unverified |
| 09 Bruno Simon | [Vehicle and following camera](../motion/components/vehicle-world.mjs) | Spatial navigation and movement experiments | CPU-projected 3D and simplified kinematics; not the original Three.js/Rapier world |
| 10 Patatap | [Keyboard visuals and synthesized notes](../motion/components/key-visual-sampler.mjs) | Audio-reactive interactive sketches | Audio requires explicit activation; no original samples |

## 3. Maps, scientific diagrams and image processing

| Reference | Reusable implementation | Practical use | Important limit |
| --- | --- | --- | --- |
| 11 Human Terrain | [Linear grid-to-height terrain](../motion/components/population-terrain.mjs) | Comparing scalar grids in 3D | Default data is synthetic; geographic tiles and real population ingestion are absent |
| 12 Earth Nullschool | [Globe and advected particles](../motion/components/flow-field.mjs) | Studying vector fields and projections | Synthetic field; not live weather or a calibrated scientific dashboard |
| 13 Land Lines | [Normalized stroke matching](../motion/components/stroke-matcher.mjs) | Gesture-to-shape matching | Three procedural candidates; no satellite atlas or production search index |
| 14 Mechanical Watch | [Rotating exploded gear diagram](../motion/components/mechanism-section.mjs) | Interactive technical illustrations | Illustrative gear train; not a complete physically meshing watch |
| 15 LOW←TECH MAGAZINE | [Bayer and Floyd–Steinberg dithering](../motion/components/dither-image.mjs) | Two-color image treatments and PNG export | Procedural sample; publishing theme and energy measurements are not rebuilt |

## What to reuse first

For practical integration, start with **color themes, CSS books, masked text, shared-element dialogs and dithering**. These have focused behavior and fewer external asset or data requirements. They still need testing in the consuming application.

Variable typography needs a suitable licensed font. Audio needs an explicit user action. Particle work needs a supported WebGL context. Vehicle, population, weather, satellite matching and watch studies are useful foundations for further work; their simplified models or synthetic inputs must be replaced where the application requires real-world accuracy.

## Current verification and files

The 25-study version passed 58 browser scenarios, 17 Node checks and 41 pre-extraction source comparisons. Full coverage, archive hashes and original-site limitations are in [STUDY_VERIFICATION.md](../motion/STUDY_VERIFICATION.md).

The source archive contains 306 files, including 25 site directory trees and six research sections per site. Source and original screenshots are separated from the preserved component-test archive. The newly added studies and bounded original captures are indexed in [BATCH_TWO.md](../motion/BATCH_TWO.md).

## Run and reuse

From the downloaded or cloned repository root:

```sh
python3 -m zipfile -e study-source.zip .
python3 -m http.server 8000
```

Open `http://localhost:8000` for the gallery. For a standalone example, open `http://localhost:8000/sites/01-mersi-architecture/04-reconstruction/index.html`. A web server is required for ES module imports; opening the HTML file directly is insufficient. No npm installation is needed for the gallery.

Each site directory contains `01-original`, `02-analysis`, `03-assets`, `04-reconstruction`, `05-components`, `06-demo` and a site README. Import a module's `mount(host, options)` and call the returned `destroy()` before replacing it. Include the supplied `styles.css` when using the supplied presentation. See [the API](../motion/COMPONENT_API.md) for host sizing and module-specific options.

## Prioritized follow-up work

1. **MERSI and Obys:** add routed transitions, horizontal portfolio flow, exact text timing and media interactions; compare recordings against the original references.
2. **The Boat, Igloo and Bruno:** capture complete original scenes on a browser with the required rendering capabilities. The currently observed GPU failures are documented; loading-screen captures do not establish scene behavior.
3. **Human Terrain and Earth:** add licensed, versioned geographic/scientific data, units, legends and real data-to-render validation.
4. **GT Flexa:** supply a licensed variable font and compare native width/weight interpolation with the reference.
5. **All modules before production use:** measure animation and loading performance, complete keyboard/touch/accessibility coverage, and verify host-application lifecycle behavior.

The original implementation code is MIT-licensed. Reference screenshots and third-party materials retain their own rights. Original photography, commercial fonts, sound recordings and production datasets are not supplied as reusable assets.
