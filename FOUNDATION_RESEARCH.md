# Foundation resource review

Checked 4 November 2026. This is a curated integration review for Modular Website Studio, not a bulk mirror. Publisher counts are observations, not audited inventories. No third-party component source, fonts, images or icons are redistributed in this delivery.

## Compatibility boundary

Studio module v1 accepts inline static HTML/CSS, empty permissions and empty dependencies. Native inputs, details and CSS animation work without scripts. React, Tailwind source, GSAP, Canvas event code and imported packages are not directly installable. A CSS-only label does not prove semantic or keyboard correctness.

P0–P3 retain the user's research priorities. “Static selection” is an integration candidate, not a claim that every upstream component is ready to install. The 30 independently authored modules in this repository are the actual installable deliverable.

## Reviewed sources

| # | Source | Priority | Integration route | License evidence / limitation |
|---|---|---|---|---|
| F01 | [Uiverse](https://uiverse.io/) | P0 | **Static selection** — Select HTML/CSS entries; compile Tailwind and remove framework/runtime requirements. | MIT stated for UI elements; retain author and license notice. [Evidence](https://uiverse.io/) |
| F02 | [AIMRAN Library](https://library.aimran.es/) | P1 | **Reference** — Only dependency-free entries fit module v1. React + Motion needs a runtime adapter. | Free claim; redistribution license not verified on inspected index. [Evidence](https://library.aimran.es/) |
| F03 | [CodeHarem](https://codeharem.com/) | P0 | **Reference** — Study native state and editor UX; independently implement until redistribution terms are recorded. | Publisher allows personal/commercial use; a complete redistribution license was not verified. [Evidence](https://codeharem.com/blog/copy-paste-html-css-components/) |
| F04 | [GEMILAN Code](https://gemilan.com/code) | P0 | **Provisional** — Treat as a provisional source. Do not assume dashboard dependencies match component dependencies. | MIT publisher claim observed; exact component license and stable availability need recheck. [Evidence](https://gemilan.com/code) |
| F05 | [CodeFronts](https://codefronts.com/) | P2 | **Static selection** — Use vanilla subsets or compile utility CSS first. | MIT stated on index; preserve selected author/license. [Evidence](https://codefronts.com/) |
| F06 | [WebDevSnippets](https://webdevsnippets.com/) | P2 | **Reference** — Record original author, dependency list and license per snippet. | Redistribution license not verified on inspected index. [Evidence](https://webdevsnippets.com/) |
| F07 | [FreeFrontend](https://freefrontend.com/) | P2 | **Reference** — Use discovery links; do not bulk package the aggregator. | No blanket clearance inferred; inspect each original source. [Evidence](https://freefrontend.com/) |
| F08 | [HyperUI](https://hyperui.dev/) | P2 | **Build adapter** — Compile required Tailwind styles and scope the result before module installation. | MIT; retain notice. [Evidence](https://github.com/markmead/hyperui) |
| F09 | [CodeShack Snippets](https://codeshack.io/snippets/) | P2 | **Reference** — Separate static markup from scripts and verify per-item rights. | Redistribution license not verified on inspected index. [Evidence](https://codeshack.io/snippets/) |
| F10 | [Purely CSS](https://purelycss.com/) | P2 | **Reference** — Review keyboard behavior; CSS-only does not establish accessibility. | Redistribution license not verified on inspected index. [Evidence](https://purelycss.com/) |
| F11 | [CodePeek](https://www.codepeek.dev/) | P2 | **Static selection** — Check exact source and native semantics before adapting. | MIT stated in footer; retain creator attribution/license. [Evidence](https://www.codepeek.dev/) |
| F12 | [Movin Components](https://movin.design/components/) | P0 | **Static selection** — Native CSS-only subsets fit. JS interactions and shadcn CLI imports require a separate integration path. | MIT-0 confirmed in linked repository; attribution not required by license. [Evidence](https://github.com/raza-ahmed/movin-components/blob/main/LICENSE) |
| F13 | [Animated UI Library](https://saurabhbhayana.com/ui-library) | P2 | **Reference** — CSS loaders fit conceptually; Canvas requires script runtime. | Free claim; redistribution license not verified on inspected index. [Evidence](https://saurabhbhayana.com/ui-library) |
| F14 | [CSS Buttons](https://cssbuttons.io/) | P1 | **Static selection** — Reuse the original Button Atlas static adapters supplied in this pack. | Follow Uiverse MIT terms and preserve each selected creator/source. [Evidence](https://uiverse.io/) |
| F15 | [Button Interaction Specs](https://github.com/jsabutis/button-interaction-specs) | P1 | **Static selection** — Use as comparison vocabulary. Current pack independently implements 10 static patterns. | MIT repository; retain notice if copying. [Evidence](https://github.com/jsabutis/button-interaction-specs) |
| F16 | [CSS Loaders](https://css-loaders.com/) | P1 | **Reference** — Use bounded animations, status text and reduced-motion fallback. | Exact source license not confirmed by inspected page; no third-party loader copied. [Evidence](https://css-loaders.com/) |
| F17 | [Loading.css](https://loading.io/animation/) | P1 | **Static selection** — Extract only selected keyframes; namespace names and support reduced motion. | MIT stated in loadingio/loading.css repository. [Evidence](https://github.com/loadingio/loading.css/) |
| F18 | [Animista](https://animista.net/) | P1 | **Generator** — Preserve generated license header; namespace keyframes and expose timing tokens. | Generated CSS is labeled FreeBSD licensed on official site. [Evidence](https://animista.net/) |
| F19 | [Animation Playground](https://github.com/wangruofeng/animation-playground) | P2 | **Reference** — Split CSS-only effects from JS/Canvas effects before integration. | Repository license not verified; do not infer MIT from public visibility. [Evidence](https://github.com/wangruofeng/animation-playground) |
| F20 | [Pure CSS](https://purecss.com/) | P2 | **Reference** — Prefer native details/inputs; do not treat :target overlays as complete accessible dialogs. | Terms page inspected; no blanket redistribution grant recorded for this pack. [Evidence](https://purecss.com/terms/) |
| F21 | [10015 CSS Tools](https://www.10015.io/css-tools) | P3 | **Generator** — Use as authoring workflow reference; our token controls are independent. | Generated output terms not verified; no site implementation copied. [Evidence](https://10015.io/css-tools) |
| F22 | [Clippy](https://bennettfeely.com/clippy/) | P3 | **Generator** — Store editable polygon values in CSS; provide non-clipped fallback. | Site source license not checked; output and tool source are separate concerns. [Evidence](https://bennettfeely.com/clippy/) |
| F23 | [React Bits Creative Tools](https://www.reactbits.dev/tools) | P3 | **Runtime adapter** — Do not label entire product plain MIT. React/Shader exports need runtime integration. | Core React Bits code uses MIT + Commons Clause; tool/output terms require separate review. [Evidence](https://github.com/DavidHDev/react-bits) |
| F24 | [Lucide](https://lucide.dev/) | P3 | **Static selection** — Inline selected SVG with required notices; avoid shipping the whole icon library. No Lucide files bundled here. | ISC; listed Feather-derived icons additionally carry MIT notices. [Evidence](https://lucide.dev/license) |
| F25 | [SVG Repo](https://www.svgrepo.com/) | P3 | **Per-asset review** — Select and record exact author/license. Do not bulk mirror icons into a competing catalog. | Per-item terms; default SVG Repo license restricts equivalent-library redistribution and as-is resale. [Evidence](https://www.svgrepo.com/page/licensing/) |
| F26 | [CSSUI](https://www.cssui.dev/) | P2 | **Static selection** — Review semantics, duplicate IDs and keyboard behavior per component before adapting. | MIT stated on official site. [Evidence](https://www.cssui.dev/) |

## What to implement first

1. Native fields, switches, disclosure, cards and grid layouts: reusable without a framework adapter.
2. Static Button Atlas patterns, loaders and configurable CSS motion: share timing and focus conventions.
3. Tailwind templates: compile and scope a selected subset before packaging.
4. Generators and icon pickers: add authoring tools separately from exported components.
5. JavaScript interaction modules: keep in the existing runtime library until Studio has an explicit script-module contract.

## Evidence limits

The 26 original pages were reviewed as public document/index sources; this is not a claim of 26 full browser interaction audits. GEMILAN returned content initially and 404 on a later request, so it is provisional. Original hover, press, network behavior and every individual license were not exhaustively exercised. Missing license evidence means review pending, not a finding that use is forbidden. License notes describe publisher statements and are not legal advice.

For imported code, record the exact original component URL, creator, pinned source revision, license text and notices, modifications, dependency versions, default/focus/hover/press/release behavior, responsive/reduced-motion behavior, and exported test results. Preserve upstream notices in both source and distribution ZIP. Our original pack has its own MIT license and provenance in every module folder.
