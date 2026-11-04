# Frontend Research Queue — Batch 03 + Effects

Fifty targets from the updated supplied CSV, checked 2026-11-04. The CSV is preserved byte-for-byte; `queue-registry.json` is the English progress register. IDs are scoped to this queue and are not Foundation resource IDs.

## Coverage and honest status

- 50 targets: 23 basic, 17 advanced and 10 full-site entries.
- Acquisition: 38 pinned clone candidates, one official ZIP candidate and 11 study references. Acquisition is not permission to redistribute.
- Six bounded original studies remain implemented: B07–B10, A05 and F03; 41 targets are queued and A09, A10 and F10 remain reference-only.
- 20 new effect contracts are documented in [Effect integration research](QUEUE_EFFECTS.md). They are not new completed components or installable Studio runtimes.
- Overlapping catalog views expose 26 effect components and two orchestration tools without duplicating IDs.
- The previous 30 rows retain their source pins and verification fields. New repository heads are metadata evidence, not complete builds or dependency license audits.

## First working slice

| ID | Observed upstream structure | Independent implementation and difference |
|---|---|---|
| B07 | Hamburgers uses Sass transform variants and active state classes. Reviewed spin, spring and collapse sources. | `bindMenu` plus three-line CSS, explicit panel state, Escape and cleanup. Three mechanisms only, with independently chosen timings and transforms. |
| B08 | Ladda creates a spinner wrapper, disables during loading and exposes start, stop and progress. | `bindAsync` accepts an abortable task; a real JSON fetch drives state. No synthetic success timer and no invented percentage progress. Progress mode is not reconstructed. |
| B09 | Pretty Checkbox layers native transparent inputs and styled labels; focus is a separate Sass rule. | Visible native inputs restyled with appearance:none. Checkbox, radio and switch remain native and labeled. No icon-font or image variants. |
| B10 | SpinKit uses CSS keyframes and per-child delays. | Original dots and waveform presets; only four lightweight elements; reduced-motion freezes movement. No full SpinKit clone. |
| A05 | SortableJS distinguishes reorder, shared-list transfer, handles, old/new indices and cloning. | Pointer events plus keyboard/buttons commit an array transaction; a shelf adds a new original card. No SortableJS dependency, nesting, multi-drag, arbitrary grid or auto-scroll. |
| F03 | The portfolio reads a central resume object, composes homepage sections, and routes MDX articles through Next.js. | A smaller original multipage HTML/CSS recipe with home, project detail, journal, article and a Dock. Generated cover art, original text; no resume data, logos, MDX compiler, React, Next.js or complete upstream design copied. |

## Queue and acceptance

| ID | Target | Scope | Status | Acceptance |
|---|---|---|---|---|
| B01 | [daisyUI Button](https://daisyui.com/components/button/) | Button variants | queued | Compare solid, outline, ghost, icon, sizes and disabled states in one page. |
| B02 | [Bootstrap Buttons](https://getbootstrap.com/docs/5.3/components/buttons/) | Button states | queued | Check native disabled behavior and aria-pressed with keyboard activation. |
| B03 | [Magic UI Shimmer Button](https://magicui.design/docs/components/shimmer-button) | Moving border highlight | queued | Expose highlight width, period, radius and color; freeze motion under reduced motion. |
| B04 | [Carbon Button](https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines) | Action hierarchy | queued | Group Save, Cancel and Delete with explicit labels and danger semantics. |
| B05 | [NES.css](https://nostalgic-css.github.io/NES.css/) | Pixel controls | queued | Rebuild stepped corners and press depth with original CSS; test associated checkboxes. |
| B06 | [98.css](https://jdan.github.io/98.css/) | Beveled controls | queued | Compare pressed edge shading and a separately visible keyboard focus outline. |
| B07 | [Hamburgers](https://jonsuh.com/hamburgers/) | Menu transforms | implemented-bounded-study | Compare spin, spring and collapse; keep a real panel and aria-expanded synchronized; Escape returns focus. |
| B08 | [Ladda](https://lab.hakim.se/ladda/) | Asynchronous submission | implemented-bounded-study | Run one request at a time; retain button size; announce success, failure and cancellation; retry after failure. |
| B09 | [Pretty Checkbox](https://lokesh-coder.github.io/pretty-checkbox/) | Native selection controls | implemented-bounded-study | Keep checkbox, radio and switch inputs operable with Tab, Space and touch, with visible focus. |
| B10 | [SpinKit](https://tobiasahlin.com/spinkit/) | Inline loading graphics | implemented-bounded-study | Show dots and wave with shared stagger parameters; preserve label width and a static reduced-motion state. |
| A01 | [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) | Modal focus lifecycle | queued | Open a dialog; cycle Tab within it; Escape closes; focus returns to its trigger. |
| A02 | [Headless UI Combobox](https://headlessui.com/react/combobox) | Search selector | queued | Filter items, move with arrow keys, select with Enter, and expose a no-results state. |
| A03 | [Floating UI Tooltip](https://floating-ui.com/docs/tooltip) | Collision-aware tooltip | queued | Trigger with hover and focus; move the target to viewport edges and verify placement flips. |
| A04 | [Embla Carousel](https://www.embla-carousel.com/docs/examples/predefined) | Synchronized carousel | queued | Dragging, previous/next controls and pagination dots must identify the same slide. |
| A05 | [SortableJS](https://sortablejs.github.io/Sortable/) | Source-backed ordering | implemented-bounded-study | Reorder items, add from a shelf, synchronize preview and export; provide keyboard and touch controls. |
| A06 | [Anime.js Timeline](https://animejs.com/documentation/timeline/) | Replayable timeline | queued | Sequence mask, image and text with configurable overlaps; pause and replay deterministically. |
| A07 | [shadcn/ui Blocks](https://ui.shadcn.com/blocks) | Responsive sidebar block | queued | Collapse desktop navigation and open mobile navigation without breaking content width. |
| A08 | [Codrops Scroll3DGrid](https://tympanus.net/Development/Scroll3DGrid/) | Perspective scroll grid | queued | Use original images for one perspective layout; verify forward and reverse scrolling; review dependencies separately. |
| A09 | [React Bits Iridescence](https://reactbits.dev/backgrounds/iridescence) | Iridescent background reference | reference-only | Record public behavior only; do not package React Bits components or ports in the redistributable library. |
| A10 | [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) | Scroll progress reference | reference-only | Keep license documentation only for this builder; no GSAP product reverse engineering for a competing visual animation builder. |
| F01 | [Start Bootstrap Agency](https://startbootstrap.github.io/startbootstrap-agency/) | Agency website flow | queued | Navigate to work, open and close a project, restore focus and check the mobile menu; contact delivery is separate. |
| F02 | [HTML5 UP Dimension](https://html5up.net/uploads/demos/dimension/) | Panel portfolio | queued | Open a panel, close or navigate back, and verify mobile; preserve HTML5 UP attribution and audit asset credits. |
| F03 | [Magic UI Portfolio](https://portfolio-magicui.vercel.app/) | Editable portfolio recipe | implemented-bounded-study | Change owner, projects, cover colors, social URL and article; verify home, work detail, Dock, journal and offline export. |
| F04 | [Fuwari](https://fuwari.vercel.app/) | Content-driven blog | queued | Add a post and check home, archive, article and theme switching; illustration permissions are separate. |
| F05 | [Starlight](https://starlight.astro.build/) | Documentation website | queued | Verify side navigation, full-text search, page outline and mobile navigation on an authored documentation set. |
| F06 | [Tabler](https://preview.tabler.io/) | Dashboard flow | queued | Connect overview, list and form; audit every dependency including charts separately. |
| F07 | [Vercel Shop](https://template.vercel.shop/) | Commerce frontend | queued | Connect product list, detail, variants and cart with mock data; identify Shopify service and checkout boundaries. |
| F08 | [Excalidraw](https://excalidraw.com/) | Canvas editing flow | queued | Select a tool, draw, select/edit, undo/redo and export in a local single-user scope. |
| F09 | [Webamp](https://webamp.org/) | Multi-window audio flow | queued | Import owned audio; synchronize play, seek, volume, playlist and windows; exclude bundled music or unreviewed skins. |
| F10 | [Lusion](https://lusion.co/) | Creative studio reference | reference-only | Observe home to project detail and return continuity; use original assets and no unlicensed site redistribution. |
| E01 | [Fade and rise](https://michalsnik.github.io/aos/) | Fade and rise | queued | Reveal on entry; once=true must not replay after leaving and re-entering. |
| E02 | [Mask reveal](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/clip-path) | Mask reveal | queued | A circle from the selected origin or a directional rectangle reveals all corners after an image change. |
| E03 | [Hand-drawn annotation](https://roughnotation.com/) | Hand-drawn annotation | queued | Underline or circle remains aligned after wrapping; repeated entry creates no duplicate SVG nodes. |
| E04 | [Character and word stagger](https://splitting.js.org/guide.html) | Character and word stagger | queued | Chinese and English reveal in reading order; assistive technology receives the complete sentence; split only once. |
| E05 | [Typewriter and erase](https://mattboldt.com/demos/typed-js/) | Typewriter and erase | queued | Preserve Chinese and emoji graphemes, reserve layout space and allow looping to stop. |
| E06 | [Number counter](https://inorganik.github.io/countUp.js/) | Number counter | queued | Handle negative numbers, decimals and units; finish at the exact formatted destination value. |
| E07 | [Card tilt and glare](https://micku7zu.github.io/vanilla-tilt.js/) | Card tilt and glare | queued | Reset on pointer leave, preserve touch clicks and recompute bounds after editor movement. |
| E08 | [Cursor trail](https://tholman.com/cursor-effects/) | Cursor trail | queued | Stay inside the selected block; removing the block removes its listeners and canvases. |
| E09 | [Success confetti](https://www.kirilv.com/canvas-confetti/) | Success confetti | queued | A real success event fires once; an ordinary click must not manufacture business success; rendering stops after completion. |
| E10 | [Reading progress](https://scroll-driven-animations.style/demos/progress-bar/css/) | Reading progress | queued | Main article top is 0% and bottom is 100%; scrolling an independent sidebar must not change article progress. |
| E11 | [Image parallax](https://simpleparallax.com/) | Image parallax | queued | Scrolling forward and backward is reversible; narrow layouts expose no empty edges; pause offscreen. |
| E12 | [Shared-element transition](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition) | Shared-element transition | queued | Open the matching image and restore focus on return; navigation still works without the API. |
| E13 | [Flowing mesh gradient](https://shaders.paper.design/mesh-gradient) | Flowing mesh gradient | queued | Pause offscreen; disabling WebGL leaves readable content and working controls. |
| E14 | [Paper and film grain](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence) | Paper and film grain | queued | Two instances have independent filter IDs; texture does not intercept clicks. |
| E15 | [Ink edge](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feDisplacementMap) | Ink edge | queued | Distort shape edges only; body text remains clear and expanded filter bounds prevent clipping. |
| E16 | [SVG stroke drawing](https://animejs.com/documentation/svg/createdrawable/) | SVG stroke drawing | queued | Paths of different lengths complete correctly and remain fully visible. |
| E17 | [SVG contour morph](https://animejs.com/documentation/svg/morphto/) | SVG contour morph | queued | Rapid repeated toggles finish at the path matching the current application state. |
| E18 | [Variable font axes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/font-variation-settings) | Variable font axes | queued | The title fits its container; without the variable font the complete text remains readable. |
| E19 | [Linked particle background](https://particles.js.org/demos/recipes/links) | Linked particle background | queued | Moving or removing a block leaves no extra canvases; reduce density on mobile. |
| E20 | [Frosted glass panel](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter) | Frosted glass panel | queued | Text remains readable over light and dark backgrounds; unsupported blur has an opaque fallback. |


## Source and license provenance

The first six pinned upstream LICENSE files are preserved separately in `queue-upstream-licenses.json`. They attribute Jonathan Suh, Hakim El Hattab, Lokesh Rajendran, Tobias Ahlin, the SortableJS contributors and Dillion Verma. No upstream runtime code, personal portfolio data, fonts, photos, audio or models are bundled in this slice. Our implementation is original MIT code.

React Bits currently restricts redistribution of components, bundles and ports; [official license](https://raw.githubusercontent.com/DavidHDev/react-bits/main/LICENSE.md). GSAP has restrictions on competing no-code visual animation tools, including product reverse engineering for that purpose; [official terms](https://gsap.com/community/standard-license/). These are retained as reference-only entries and excluded from the acquisition script and runtime. Dimension requires attribution under its [official template license](https://html5up.net/license); its ZIP and assets have not been repackaged. Lusion has no established whole-site redistribution permission in this research.

Repository license metadata for the other 32 clone candidates is provisional: inspect the pinned LICENSE, source-file notices, dependencies, assets and trademarks before packaging. Repository activity dates are evidence of updates, not guarantees of maintenance quality. The older B07–B10 sources are useful as small mechanism references, not recommendations to adopt their entire toolchains.

Current Typed.js v3 uses GPL-3.0 or commercial licensing, so E05 is planned as original JavaScript without vendoring that runtime. Paper Shaders requires preservation of LICENSE and NOTICE when bundled. See [effect-specific evidence and contracts](QUEUE_EFFECTS.md).

## Run and integrate

See [component APIs and integration examples](QUEUE_COMPONENTS.md). Open `queue-controls.html` for independent control demos without the portfolio iframe.

```sh
python3 -m http.server 8000
# Open http://localhost:8000/queue.html
node --test queue-tests.mjs
node queue-pack.mjs
```

Open `queue-portfolio.mws.json` in Modular Website Studio to edit the generated source files. Download a configured version from Queue Lab after making changes. Runtime controls are plain ES modules with explicit mount/cleanup APIs in `queue-components.mjs`; they are not silently installed into the Studio static-module system. `queue-card.zip` contains one static original project card and installs through the normal module ZIP control.

The preview iframe has an opaque origin and only a fixed, original navigation script. All user content is plain text escaped into markup. Exported websites contain no scripts, external assets or network-dependent build steps; navigation is native HTML. The Studio edit iframe is not modified.

## Reproducible acquisition

`python3 queue-fetch.py --ids B07 B08 B09 B10` checks out the exact pinned commits into ignored/local `references/` folders, without executing dependency installs or project scripts. It refuses existing nonmatching directories and reference-only targets. Run this on your machine where GitHub network access is available. These full checkouts have not been performed in this managed workspace; source review used the GitHub connector at the pinned commits. Do not commit those upstream checkouts to this repo.

## Remaining boundaries

Full-source builds and complete reconstructions of the upstream applications remain pending. Tests cover Chromium desktop and emulated touch, not real iOS/Safari hardware. The list grip has no automatic scrolling during drag; use the move buttons or keyboard for long lists. Preview offers an explicit page selector; exported relative links work without a server. There is no checkout, backend, authentication, analytics or email delivery in this portfolio recipe.
