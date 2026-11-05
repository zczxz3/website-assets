# Button Atlas — verified delivery

> Repository layout: source, demos and direct commands in this guide are relative to `buttons/`. Run direct commands after `cd buttons` from the repository root; root npm tasks select that directory automatically. See [migration notes](../docs/REPOSITORY_LAYOUT.md).

> Historical evidence: results below refer to their recorded source revision. Current directory-migration checks are reported separately in [organization verification](../docs/ORGANIZATION_VERIFICATION.md).

Verified on **2026-11-04** against commit `90b23498f10db831921f3dcd571e2fbe20241c29`.
[Component workflow](https://github.com/zczxz3/website-assets/actions/runs/41767686220).
[Original reference capture](https://github.com/zczxz3/website-assets/actions/runs/41767447094).

## Independent implementation checks

| Coverage | Result | What was exercised |
| --- | --- | --- |
| Desktop component scenarios | 20 / 20 | Real mouse hover, held mouse press, release, Enter, Space; state and screenshot checks. |
| Mobile component scenarios | 20 / 20 | Chromium mobile/touch emulation at 390 CSS px; tap, state transitions, target size and horizontal overflow. |
| Gallery scenarios | 4 / 4 | 390 and 1280 px, normal and reduced motion; filtering, empty state, size, speed and motion toggle. |
| Lifecycle scenario | 1 / 1 | 13 assertions: unique SVG IDs, idempotent cleanup, sibling preservation, single flight, abort/late-result handling, undo, menu focus, motion suppression, disabled/re-enabled actions, safe labels and invalid configuration. |
| REA smoke scenarios | 2 / 2 | Unmodified REA 6.8.0, save and keyboard undo at 390 and 1280 px. |
| Node tests | 7 / 7 | Catalog coverage, bounded pointer mapping, stable spring, single flight, retry, cancellation and destruction. |
| Source fingerprints | 10 / 10 | Downloaded workflow SHA-256 values match the published executable/data inputs. |

The first five rows include **45 Playwright scenarios plus 2 REA scenarios**. The 13 lifecycle assertions are inside one scenario, not 13 extra browser runs. `button-verification.zip` retains the original workflow artifact unchanged: 105 Playwright screenshots, 2 REA screenshots, structured results and source fingerprints. All 45 result screenshots and both REA screenshots were independently rehashed after download; hover/default/pressed images are retained for visual inspection but are not a pixel-diff regression baseline.

The browser runtime is the Chromium installed from the pinned REA dependency's Playwright version, on a standard Ubuntu GitHub runner. Mobile verification is emulation, not physical-device coverage. Firefox/Safari, screen-reader output, sustained FPS and WCAG conformance are not certified by these tests. Visual inspection covered the gallery, reduced-motion mobile layout and representative fill, liquid, SVG, text, depth, async, menu and canvas states.

## Original-page evidence

**16 / 16 initial HTTP requests returned 200.** Browser rendering produced **12 complete bounded captures, 3 security-screened entries and 1 partial capture**. Successful HTTP and a complete collection procedure do not prove every animation rendered or every interaction was tested.

| ID | Resource | Browser result | Scope / limitation |
| --- | --- | --- | --- |
| B01 | [CSS Buttons](https://cssbuttons.io/) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B02 | [Hover.css](https://ianlunn.github.io/Hover/) | captured | Initial overview and one PageDown; no hover-specific original interaction. |
| B03 | [Button Interaction Specs](https://github.com/jsabutis/button-interaction-specs) | captured | Repository overview, not the linked live 131-effect gallery. |
| B04 | [Animated Buttons Colorion](https://animatedbuttons.colorion.co/) | blocked | Browser title remained “Just a moment...”; no bypass or alternate-client retry. |
| B05 | [CSS Button Creator](https://cssbuttoncreator.com/css-buttons/) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B06 | [Amo Hover](https://amo-hover.vercel.app/) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B07 | [Aceternity UI](https://ui.aceternity.com/categories/button) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B08 | [Magic UI](https://magicui.design/) | captured | Library landing page, not every button detail/demo. |
| B09 | [React Bits](https://reactbits.dev/) | partial | Initial screenshot shows a loading indicator; later action/DOM/image/URL sections are incomplete. |
| B10 | [Codrops Magnetic Buttons](https://tympanus.net/codrops/2020/08/05/magnetic-buttons/) | blocked | Browser title remained “Just a moment...”; no bypass or alternate-client retry. |
| B11 | [Codrops Button Experiments](https://tympanus.net/codrops/hub/tag/button/) | blocked | Browser title remained “Just a moment...”; no bypass or alternate-client retry. |
| B12 | [AIMRAN Library](https://library.aimran.es/) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B13 | [MicroKit UI](https://microkit.co/components) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B14 | [Kokonut UI](https://kokonutui.com/docs/buttons) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B15 | [useLayouts](https://uselayouts.com/components/buttons) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |
| B16 | [shadcn.io Buttons](https://www.shadcn.io/button) | captured | Initial reference/index view and one PageDown; individual effects not exhaustively exercised. |

The original artifact is `button-reference-evidence.zip`. Raw third-party scripts and DOM were temporary analysis inputs; retained records contain bounded metadata, source URLs, hashes and viewport screenshots. Third-party screenshots retain their original rights. The collector initially rejected a malformed registry before any site processing; the published successful capture uses the corrected `{sites: [...]}` structure.

## Delivery contents

- `buttons.html`: searchable standalone gallery, also supporting `?button=ID`.
- `buttons.mjs` + `button-catalog.mjs` + `buttons.css`: reusable components and shared configuration.
- `button-gallery.mjs` + `button-resources.json`: gallery and source mappings.
- `BUTTON_RESEARCH.md` and `BUTTON_COMPONENTS.md`: 16 source records, permissions, principles and all 20 component contracts.
- `button-source.zip`: small runnable source package with English documentation and the original-code license.
- `button-verification-manifest.json`: archive hashes and independently checked source/evidence metadata.

All current button files are directly browsable in GitHub. The earlier `study-source.zip` and `component-verification.zip` remain the separately verified 25-website study package.
