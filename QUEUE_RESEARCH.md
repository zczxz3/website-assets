# Frontend Research Queue — Batch 03

Thirty targets from the supplied CSV. Checked 2026-11-04. The original CSV is preserved byte-for-byte; `queue-registry.json` is the English, machine-readable progress register. IDs are scoped to this batch and are not Foundation resource IDs.

## Coverage and honest status

- 28 repository heads pinned, including 26 clone candidates and two reference-only repositories; metadata is not a full build or a dependency license audit.
- One official ZIP candidate (Dimension) and one site-only reference (Lusion).
- Six independent bounded studies implemented: B07–B10, A05 and F03. See [verification](QUEUE_VERIFICATION.md) for actual test outcomes.
- 21 implementation targets remain queued; three are reference-only. No claim that 30 upstream products have been completely reconstructed.

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
|---|---|---|---|
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

## Source and license provenance

The first six pinned upstream LICENSE files are preserved separately in `queue-upstream-licenses.json`. They attribute Jonathan Suh, Hakim El Hattab, Lokesh Rajendran, Tobias Ahlin, the SortableJS contributors and Dillion Verma. No upstream runtime code, personal portfolio data, fonts, photos, audio or models are bundled in this slice. Our implementation is original MIT code.

React Bits currently restricts redistribution of components, bundles and ports; [official license](https://raw.githubusercontent.com/DavidHDev/react-bits/main/LICENSE.md). GSAP has restrictions on competing no-code visual animation tools, including product reverse engineering for that purpose; [official terms](https://gsap.com/community/standard-license/). These are retained as reference-only entries and excluded from the acquisition script and runtime. Dimension requires attribution under its [official template license](https://html5up.net/license); its ZIP and assets have not been repackaged. Lusion has no established whole-site redistribution permission in this research.

Repository license metadata for the other 20 clone candidates is provisional: inspect the pinned LICENSE, source-file notices, dependencies, assets and trademarks before packaging. Repository activity dates are evidence of updates, not guarantees of maintenance quality. The older B07–B10 sources are useful as small mechanism references, not recommendations to adopt their entire toolchains.

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
