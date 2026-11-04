# Effect catalog — integration research

The updated 50-row queue adds **20 planned effect contracts (E01–E20)**. Existing six implementations retain their progress. No new effect runtime or Studio core integration is claimed in this update.

`queue-registry.json` is the English catalog. `queue-effects.json` describes proposed bindings, triggers, parameters, export recipes and reduced-motion behavior. These descriptors are **not installable Studio module ZIPs**. Studio's current v1 module format accepts static HTML/CSS; a runtime adapter needs a separate design and implementation.

## Classification

The catalog has 23 basic, 17 advanced and 10 full-site targets. Its overlapping effect view contains 26 unique entries: E01–E20 plus B03, B07, B08, B10, A08 and A09. A06 and A10 belong to the two-entry orchestration-tools view. No duplicate targets are created by these views.

`batch` / `acquisition` says how a reference is acquired. `reuse_policy` describes the intended reuse boundary. `status` records actual progress. A native CSS reference acquired by study can still be queued for an original implementation. E05 is also queued for original code while current Typed.js runtime code remains excluded from this permissive pack.

## Proposed integration contract

Bind a stable target ID, an effect role and parameter names. Element attachments use an inner effect wrapper so editor placement survives. Block layers stay within a selected section and cannot capture unrelated pointer input. State transitions receive real application state; a decorative preview never invents a successful submission. Orchestration tools coordinate effects rather than become page content.

Future runtime bindings should support mount, update, play, pause and destroy. Parameter names in this catalog are a design proposal; value types, bounds, defaults and runtime capability negotiation remain implementation work. Do not wire these descriptors to an Install button yet.

Every implementation must clean up observers, listeners, canvases, animation frames and pending work; pause continuous effects offscreen; preserve keyboard/touch semantics; and expose a static or immediate fallback. Test duplicate instances, editor movement, deletion, export, reduced motion and missing APIs.

## Effect contracts

### E01 — Fade and rise

Reference: [Fade and rise](https://michalsnik.github.io/aos/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Heading, image or card.
- Trigger: viewport-enter.
- Proposed parameters: `distance`, `duration`, `delay`, `once`.
- Acceptance: Reveal on entry; once=true must not replay after leaving and re-entering.
- Export: Inline scoped transform/opacity CSS and an observer; content starts readable if JS fails.
- Reduced motion: Show final position and full opacity.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/michalsnik/aos).

### E02 — Mask reveal

Reference: [Mask reveal](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Image, cover or title container.
- Trigger: viewport-enter, click.
- Proposed parameters: `shape`, `origin`, `direction`, `duration`.
- Acceptance: A circle from the selected origin or a directional rectangle reveals all corners after an image change.
- Export: Inline clip-path keyframes and a trigger; remove clipping in the unsupported fallback.
- Reduced motion: Show the complete target immediately.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path).

Candidate reuse: [components/text-reveal.mjs](components/text-reveal.mjs). Line-mask reveal; no configurable circle or image mask. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E03 — Hand-drawn annotation

Reference: [Hand-drawn annotation](https://roughnotation.com/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Single-line or multiline text.
- Trigger: viewport-enter, click.
- Proposed parameters: `type`, `strokeWidth`, `color`, `duration`.
- Acceptance: Underline or circle remains aligned after wrapping; repeated entry creates no duplicate SVG nodes.
- Export: Bundle the chosen licensed annotation runtime; measure after fonts load and on resize.
- Reduced motion: Render the completed annotation.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/rough-stuff/rough-notation).

### E04 — Character and word stagger

Reference: [Character and word stagger](https://splitting.js.org/guide.html). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Heading or short text.
- Trigger: viewport-enter.
- Proposed parameters: `splitMode`, `stagger`, `distance`, `duration`.
- Acceptance: Chinese and English reveal in reading order; assistive technology receives the complete sentence; split only once.
- Export: Inline original splitting logic and indexed CSS; preserve a whole accessible text alternative.
- Reduced motion: Show the complete sentence immediately.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/shshaw/Splitting).

Candidate reuse: [components/text-reveal.mjs](components/text-reveal.mjs). Line-level reveal only; grapheme splitting and full new acceptance remain pending. Existing demonstrations do not satisfy the new acceptance contract automatically.

Candidate reuse: [buttons.mjs](buttons.mjs). Button-specific stagger; not a generic text effect. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E05 — Typewriter and erase

Reference: [Typewriter and erase](https://mattboldt.com/demos/typed-js/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Heading, short phrase or tutorial.
- Trigger: load, click-play.
- Proposed parameters: `typeSpeed`, `pause`, `eraseSpeed`, `loop`.
- Acceptance: Preserve Chinese and emoji graphemes, reserve layout space and allow looping to stop.
- Export: Write original plain JavaScript; do not bundle current Typed.js code in the permissive component pack.
- Reduced motion: Show the complete text without a blinking cursor.
- License evidence: GPL-3.0 or commercial license. Pinned upstream README licensing section reviewed; v3 is not MIT. No upstream runtime bundled. [Source](https://github.com/mattboldt/typed.js/blob/b2d6a7d9af6d9cd39830701f6b6a7cd98a37e13f/README.md).

### E06 — Number counter

Reference: [Number counter](https://inorganik.github.io/countUp.js/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Metric, card number or index.
- Trigger: viewport-enter, value-change.
- Proposed parameters: `start`, `end`, `precision`, `duration`, `prefix`, `suffix`.
- Acceptance: Handle negative numbers, decimals and units; finish at the exact formatted destination value.
- Export: Bundle the chosen counter or original formatter; initial HTML contains the readable final value.
- Reduced motion: Set the final formatted number immediately.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/inorganik/countUp.js).

### E07 — Card tilt and glare

Reference: [Card tilt and glare](https://micku7zu.github.io/vanilla-tilt.js/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Card, cover or button inner wrapper.
- Trigger: fine-pointer-move.
- Proposed parameters: `maxAngle`, `perspective`, `glare`, `resetDuration`.
- Acceptance: Reset on pointer leave, preserve touch clicks and recompute bounds after editor movement.
- Export: Keep editor placement on an outer wrapper and tilt transforms on an inner effect layer.
- Reduced motion: Keep the card static.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/micku7zu/vanilla-tilt.js).

Candidate reuse: [components/book-tilt.mjs](components/book-tilt.mjs). Book rotation study; general card/glare adapter and editor transform separation are pending. Existing demonstrations do not satisfy the new acceptance contract automatically.

Candidate reuse: [buttons.mjs](buttons.mjs). Button tilt preset; not a general card component. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E08 — Cursor trail

Reference: [Cursor trail](https://tholman.com/cursor-effects/). Status: **queued**, runtime not supplied.

- Role: `block-layer`. Target: Creative cover or bounded canvas section.
- Trigger: pointer-move.
- Proposed parameters: `style`, `color`, `scope`.
- Acceptance: Stay inside the selected block; removing the block removes its listeners and canvases.
- Export: Use a block-scoped pointer-events:none canvas and an explicit destroy lifecycle.
- Reduced motion: Keep the system cursor with no trail.
- License evidence: Unverified. GitHub metadata only; per-file review pending [Source](https://github.com/tholman/cursor-effects).

### E09 — Success confetti

Reference: [Success confetti](https://www.kirilv.com/canvas-confetti/). Status: **queued**, runtime not supplied.

- Role: `block-layer`. Target: Completion area or button feedback layer.
- Trigger: success-event, explicit-preview.
- Proposed parameters: `count`, `angle`, `colors`, `origin`.
- Acceptance: A real success event fires once; an ordinary click must not manufacture business success; rendering stops after completion.
- Export: Bundle a one-shot renderer; keep independent readable success text.
- Reduced motion: Skip particles and retain the status text.
- License evidence: ISC. GitHub metadata only; per-file review pending [Source](https://github.com/catdad/canvas-confetti).

Candidate reuse: [buttons.mjs](buttons.mjs). Sparks preset is visual feedback, not a verified business-success confetti contract. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E10 — Reading progress

Reference: [Reading progress](https://scroll-driven-animations.style/demos/progress-bar/css/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Article progress bar or sidebar indicator.
- Trigger: container-scroll.
- Proposed parameters: `orientation`, `color`, `thickness`, `scrollContainer`.
- Acceptance: Main article top is 0% and bottom is 100%; scrolling an independent sidebar must not change article progress.
- Export: Use a scoped scroll timeline with a JS fallback when needed; bind the actual scroll container.
- Reduced motion: Synchronize progress without additional smoothing.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://scroll-driven-animations.style/).

### E11 — Image parallax

Reference: [Image parallax](https://simpleparallax.com/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Image or cover inside a clipping wrapper.
- Trigger: scroll.
- Proposed parameters: `direction`, `scale`, `amplitude`, `scrollContainer`.
- Acceptance: Scrolling forward and backward is reversible; narrow layouts expose no empty edges; pause offscreen.
- Export: Export self-owned images, a crop wrapper and a native JavaScript entry point.
- Reduced motion: Render a static cover image.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/geosigno/simpleParallax.js).

Candidate reuse: [components/ink-story.mjs](components/ink-story.mjs). Layered narrative motion; not image parallax with crop guarantees. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E12 — Shared-element transition

Reference: [Shared-element transition](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition). Status: **queued**, runtime not supplied.

- Role: `state-transition`. Target: Thumbnail and corresponding detail hero.
- Trigger: open, back.
- Proposed parameters: `source`, `target`, `duration`, `easing`.
- Acceptance: Open the matching image and restore focus on return; navigation still works without the API.
- Export: Use unique view-transition names and a same-document state update; provide an immediate update fallback.
- Reduced motion: Update state and restore focus immediately.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition).

Candidate reuse: [components/shared-transition.mjs](components/shared-transition.mjs). Existing shared-image study; native View Transition API adapter remains pending. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E13 — Flowing mesh gradient

Reference: [Flowing mesh gradient](https://shaders.paper.design/mesh-gradient). Status: **queued**, runtime not supplied.

- Role: `block-layer`. Target: Hero, banner or empty-state background.
- Trigger: visible-loop.
- Proposed parameters: `colors`, `speed`, `distortion`, `swirl`.
- Acceptance: Pause offscreen; disabling WebGL leaves readable content and working controls.
- Export: Bundle only the chosen native shader entry; retain Apache LICENSE and NOTICE; include a CSS gradient base.
- Reduced motion: Use a static gradient with no rendering loop.
- License evidence: Apache-2.0. Apache-2.0 metadata and pinned NOTICE reviewed. Retain LICENSE and NOTICE when bundling; assets and dependencies still require review. [Source](https://github.com/paper-design/shaders/blob/2fec1d57247033a7e72052156c65a826cff08ccb/LICENSE).

### E14 — Paper and film grain

Reference: [Paper and film grain](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence). Status: **queued**, runtime not supplied.

- Role: `block-layer`. Target: Cover, background or image overlay.
- Trigger: static.
- Proposed parameters: `scale`, `opacity`, `seed`.
- Acceptance: Two instances have independent filter IDs; texture does not intercept clicks.
- Export: Inline an original SVG feTurbulence filter with a unique ID per instance.
- Reduced motion: Keep the texture static; never animate the seed.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence).

Candidate reuse: [components/film-distortion.mjs](components/film-distortion.mjs). Film shader study; the standalone SVG texture is a new implementation. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E15 — Ink edge

Reference: [Ink edge](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap). Status: **queued**, runtime not supplied.

- Role: `block-layer`. Target: Self-owned SVG shape or chapter illustration.
- Trigger: viewport-enter, static.
- Proposed parameters: `frequency`, `displacement`, `seed`, `duration`.
- Acceptance: Distort shape edges only; body text remains clear and expanded filter bounds prevent clipping.
- Export: Compose original turbulence and displacement filters; keep text outside the filtered subtree.
- Reduced motion: Use a static ink shape or the original undistorted shape.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap).

Candidate reuse: [components/ink-story.mjs](components/ink-story.mjs). Canvas ink illustration; not an SVG displacement filter. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E16 — SVG stroke drawing

Reference: [SVG stroke drawing](https://animejs.com/documentation/svg/createdrawable/). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Logo, map line or icon path.
- Trigger: load, viewport-enter, click.
- Proposed parameters: `order`, `direction`, `stagger`, `duration`.
- Acceptance: Paths of different lengths complete correctly and remain fully visible.
- Export: Use original getTotalLength/dash animation or a licensed minimal engine with self-owned SVG paths.
- Reduced motion: Display complete paths.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/juliangarnier/anime).

### E17 — SVG contour morph

Reference: [SVG contour morph](https://animejs.com/documentation/svg/morphto/). Status: **queued**, runtime not supplied.

- Role: `state-transition`. Target: Two compatible icon or illustration shapes.
- Trigger: click, state-change.
- Proposed parameters: `fromPath`, `toPath`, `duration`, `easing`.
- Acceptance: Rapid repeated toggles finish at the path matching the current application state.
- Export: Export compatible self-owned paths and a chosen interpolator; cancel superseded transitions.
- Reduced motion: Replace the path immediately.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/juliangarnier/anime).

### E18 — Variable font axes

Reference: [Variable font axes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Heading or index with supported font axes.
- Trigger: hover, focus, viewport-enter.
- Proposed parameters: `axis`, `min`, `max`, `duration`.
- Acceptance: The title fits its container; without the variable font the complete text remains readable.
- Export: Embed only a font licensed for redistribution; include a system-font fallback.
- Reduced motion: Use fixed width and weight.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings).

Candidate reuse: [components/variable-type.mjs](components/variable-type.mjs). Axis controls and geometric width fallback; no licensed variable font is bundled. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E19 — Linked particle background

Reference: [Linked particle background](https://particles.js.org/demos/recipes/links). Status: **queued**, runtime not supplied.

- Role: `block-layer`. Target: Banner or map-heading background.
- Trigger: visible-loop.
- Proposed parameters: `count`, `speed`, `linkDistance`, `color`.
- Acceptance: Moving or removing a block leaves no extra canvases; reduce density on mobile.
- Export: Bundle only the required engine and Links preset; impose a particle budget and static fallback.
- Reduced motion: Use static points or a solid background.
- License evidence: MIT. GitHub metadata only; per-file review pending [Source](https://github.com/tsparticles/tsparticles).

Candidate reuse: [components/particle-morph.mjs](components/particle-morph.mjs). WebGL sphere/torus morph; not the Links canvas recipe. Existing demonstrations do not satisfy the new acceptance contract automatically.

### E20 — Frosted glass panel

Reference: [Frosted glass panel](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter). Status: **queued**, runtime not supplied.

- Role: `element-attachment`. Target: Navigation, overlay or HUD panel.
- Trigger: static, theme-change.
- Proposed parameters: `blur`, `baseOpacity`, `border`.
- Acceptance: Text remains readable over light and dark backgrounds; unsupported blur has an opaque fallback.
- Export: Inline scoped backdrop-filter CSS with a sufficiently opaque contrast base.
- Reduced motion: Keep blur fixed without animation.
- License evidence: No upstream code bundled; original implementation planned. Platform reference only; no documentation code copied [Source](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter).

## Suggested implementation order

1. E01, E02, E10, E14 and E20: bounded native effects with readable fallbacks.
2. E04, E06, E07, E12, E16 and E18: text, state and target-binding correctness.
3. E03, E05, E08, E09, E11, E13, E15, E17 and E19: additional runtime, event, graphics or asset requirements.

This ordering is a project decision, not an upstream recommendation. Reference metadata has been checked; the 20 new effects have not been installed, built or behavior-tested. Repository pins do not establish that all dependencies or example assets may be redistributed.
