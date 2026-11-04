# Button Atlas — resource research

Checked on **2026-11-04**. This topic adds **16 reference resources and 20 independently implemented button studies across 10 families**. The existing 25 website studies retain their own numbering.

Start [the local gallery](buttons.html), read [component contracts](BUTTON_COMPONENTS.md), or inspect [source](buttons.mjs) and [CSS](buttons.css). No framework, build step, CDN, external font, artwork download or runtime npm package is required for these reconstructions.

## Evidence and limits

The table records what official pages or repositories said on the review date. Resource counts are publisher claims, not an exhaustive independent audit. The reconstruction mechanics are our own implementation choices; they do not establish the original site's exact source, timing or dependencies. Live original-page capture is bounded to one page, its initial view and one PageDown; it does not verify every upstream hover/press/release interaction. Our own components receive detailed input tests separately.

## Resource catalog

| ID | Reference | Author / attribution | Useful research direction | Permission observation |
| --- | --- | --- | --- | --- |
| B01 | [CSS Buttons](https://cssbuttons.io/) | Community contributors (per-card attribution) | Community buttons with author and code links; visual examples require the live page. | Per-item permission; follow linked Uiverse entry. No umbrella license verified. |
| B02 | [Hover.css](https://ianlunn.github.io/Hover/) | Ian Lunn | Organized transforms, fills, borders, shadows and icon motion. | Official site and license.txt separate personal/open-source from commercial terms. Do not treat all uses as unrestricted MIT. |
| B03 | [Button Interaction Specs](https://github.com/jsabutis/button-interaction-specs) | jsabutis | 131 effects stated by the repository; consistent base button helps compare mechanisms. | MIT label observed in official repository. |
| B04 | [Animated Buttons Colorion](https://animatedbuttons.colorion.co/) | Colorion | 99 CSS effects stated by the page; shared color token and reduced-motion support documented. | MIT stated on the gallery. |
| B05 | [CSS Button Creator](https://cssbuttoncreator.com/css-buttons/) | CSS Button Creator | 141 examples in 13 styles stated by the page; hover, active and focus states documented. | Free copying advertised; a formal license was not verified. |
| B06 | [Amo Hover](https://amo-hover.vercel.app/) | Amo; individual author not identified | 48 buttons in the search index; live text exposes color, speed and radius controls. Count not independently enumerated. | Copying supported by the UI; formal license not verified. |
| B07 | [Aceternity UI](https://ui.aceternity.com/categories/button) | Aceternity UI | Magnetic, moving-border, hover-gradient and stateful buttons listed. | Free category and separate Pro offer observed; verify the exact component terms. |
| B08 | [Magic UI](https://magicui.design/) | Magic UI / Dillion | React-oriented effects library and source repository. | Core repository LICENSE.md is MIT; separate Pro assets are outside that finding. |
| B09 | [React Bits](https://reactbits.dev/) | David Haz and contributors | Creative React effects; dependency and input behavior vary by component. | Official repository states MIT + Commons Clause, not plain MIT. Pro is separate. |
| B10 | [Codrops Magnetic Buttons](https://tympanus.net/codrops/2020/08/05/magnetic-buttons/) | Manoela Ilic / Codrops | Article describes pointer attraction, independently displaced layers, border fill and depth. | Linked codrops/MagneticButtons repository is MIT. |
| B11 | [Codrops Button Experiments](https://tympanus.net/codrops/hub/tag/button/) | Multiple creators credited on each experiment | Curated experiments include SVG electricity, magnetic response and hover effects. | Index has no single reusable-code license; check each linked project. |
| B12 | [AIMRAN Library](https://library.aimran.es/) | AIMRAN | Index lists magnetic, ripple, loading/success, rolling-text and many other controls. | Free library claim observed; formal license not found on the inspected index. |
| B13 | [MicroKit UI](https://microkit.co/components) | henriquegpb and contributors | Product microinteractions, click feedback and state transitions. | Official henriquegpb/microkit repository shows MIT. |
| B14 | [Kokonut UI](https://kokonutui.com/docs/buttons) | Kokonut UI / kokonut-labs | Button collection includes async feedback and particle success behavior. | Core repository LICENSE is MIT; Pro content is separate. |
| B15 | [useLayouts](https://uselayouts.com/components/buttons) | useLayouts contributors | 11 React/Motion/Tailwind buttons stated by page, including save, delete, tactile and expanding actions. | Button page states MIT; preserve required notices when copying substantial code. |
| B16 | [shadcn.io Buttons](https://www.shadcn.io/button) | shadcn.io; authors vary by item | 35 buttons stated by page; multiple surface and light effects carry Pro labels. | Mixed free and Pro offerings; consult item and Pro license. Not identical to the shadcn/ui project. |

## License evidence links

- [Hover.css license file](https://github.com/IanLunn/Hover/blob/master/license.txt) and its live licensing section distinguish personal/open-source and commercial offerings.
- [Magic UI core license](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md): MIT. This does not cover every product sold under the same brand.
- [React Bits repository](https://github.com/DavidHDev/react-bits): MIT + Commons Clause stated in the license section.
- [Codrops MagneticButtons](https://github.com/codrops/MagneticButtons): MIT repository and author credits.
- [MicroKit repository](https://github.com/henriquegpb/microkit): MIT repository label.
- [Kokonut core license](https://github.com/kokonut-labs/kokonutui/blob/main/LICENSE): MIT.
- [shadcn.io license](https://www.shadcn.io/license): Pro terms; inspect exact item scope. shadcn.io is not interchangeable with shadcn/ui.

Permission notes are observations, not a replacement license for upstream work. No original button CSS, JS, React component, paid template or proprietary artwork is redistributed as part of this implementation. The repository's original Button Atlas code uses its existing MIT license. Upstream screenshots retain their original rights.

## Practical research order

1. **Basic, Text and Physics:** small CSS-only surfaces, useful on product pages and forms. Start with fill, trace, rolling label and tactile depth.
2. **State and Navigation:** prioritize task completion, failure/retry, undo, keyboard focus and disclosure behavior before decorative movement.
3. **Magnetic, Particle and Light:** selectively add pointer tracking, finite bursts and active-only highlights to high-value actions.
4. **Liquid and Experimental:** isolated demos for SVG filter and canvas exploration. Profile on target hardware before using many instances together.

## Reproduce

```sh
python3 -m http.server 8000
# Open http://localhost:8000/buttons.html
node --test button-tests.mjs
```

For a single effect, use `buttons.html?button=magnetic` (or another public ID). Files live directly in the repository; the earlier `study-source.zip` remains the separate 25-website package.

## Verification

Validation is in progress; the final report is published only after the workflow evidence is inspected.
