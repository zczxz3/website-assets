# Button Atlas — component contracts

> Repository layout: source, demos and direct commands in this guide are relative to `buttons/`. Run direct commands after `cd buttons` from the repository root; root npm tasks select that directory automatically. See [migration notes](../docs/REPOSITORY_LAYOUT.md).

20 original native-button components. **Runtime dependencies: none.** Include `buttons.css`, keep `buttons.mjs` beside `button-catalog.mjs`, and serve over HTTP.

```html
<link rel="stylesheet" href="buttons.css">
<div id="save"></div>
<script type="module">
import {mountButton} from './buttons.mjs';
const control = mountButton(document.querySelector('#save'), {
  effect: 'async', label: 'Save changes', size: 'md', duration: 420,
  accent: '#c8ff62', ink: '#152014', surface: '#18211d',
  onAction: async ({signal}) => {
    const response = await fetch('/api/save', {method: 'POST', signal});
    if (!response.ok) throw new Error('Save failed');
  }
});
// control.setDisabled(true);
// control.destroy(); // aborts work and removes only its owned wrapper
</script>
```

The gallery uses a local 900 ms demonstration Promise; it sends no save request. Integrators supply `onAction` for real persistence. Non-async effects emit activation but do not silently navigate, write data or infer a completed remote operation.

## Shared options and interaction contract

| Option | Default | Contract |
| --- | --- | --- |
| `effect` | `fill` | One of the 20 IDs below; invalid IDs throw. |
| `label` | Catalog label | Plain text; duplicated and decorative text is hidden from accessibility APIs. |
| `size` | `md` | `sm`, `md`, `lg`; minimum height 44, 50, 60 CSS px. |
| `duration` | `420` | Finite number from 80 to 4000 ms; visual transition duration. It does not change network timing. |
| `accent`, `ink`, `surface` | Lime, dark ink, dark green | CSS color values; use a contrasting theme pair. |
| `motion` | System preference | `false` disables decorative motion. OS reduced-motion always takes precedence. |
| `disabled` | `false` | Native disabled state; can be changed with `setDisabled`. |
| `onAction` | No external work | Async effect awaits a Promise receiving `{signal}`. Other decorative effects receive `{event}`. Undo/menu expose their own events. |

Every control is `<button type="button">`. Enter and Space use native activation; focus has a visible outline. Pointer press and release also update `data-phase`. Touch does not need hover and does not trigger magnetic tracking. Buttons have a stable accessible name; async labels change with outcome. Status text uses a polite live region.

Events bubble: `button-activate` (`detail.effect`), `button-state` (`detail.state`), `button-select` (`detail.action`). The menu is an ordinary disclosure containing native buttons, not an ARIA application menu; Tab moves through choices and Escape closes it and restores focus. Undo is a local reversible state, without an expiry timer. Long-press confirmation, real destructive operations, Shader rendering and React adapters are not implemented in this first button batch.

`destroy()` is idempotent, aborts pending tasks, invalidates stale completions, cancels owned animation frames/timers/WAAPI animations and preserves existing host children. Filter IDs are unique per instance. No idle JS animation loop runs; pointer springs terminate at rest. Canvas uses a fixed 100×36 backing store and at most six frames per activation. Ripple uses one particle; sparks use twelve. Repeated bursts replace the previous burst. SVG filters and animated shadows still need device-specific performance profiling.

## Per-component research records

The source link is a **technique reference**, not a claim that this code reproduces the exact upstream animation. Default/hover/press/release below specifies the independent implementation. HTML structure comes from `mountButton`; selectors are scoped by `data-effect`. The standalone URL, shared options, keyboard/touch contract, performance notes and attribution together cover the ten requested research fields.

### 01. Curtain fill — `fill` / Basic

- **Reference:** [Hover.css](https://ianlunn.github.io/Hover/); credited to Ian Lunn. Official site and license.txt separate personal/open-source from commercial terms. Do not treat all uses as unrestricted MIT.
- **Default → hover → press → release:** outline → fill travels upward → compress → fill persists while hovered.
- **Principle:** Translated pseudo-element fills the button.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=fill]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'fill'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Curtain fill](buttons.html?button=fill).

### 02. Border trace — `border` / Basic

- **Reference:** [Animated Buttons Colorion](https://animatedbuttons.colorion.co/); credited to Colorion. MIT stated on the gallery.
- **Default → hover → press → release:** thin outline → corners extend → compress → trace retracts on leave.
- **Principle:** Two inset borders scale from opposing corners.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=border]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'border'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Border trace](buttons.html?button=border).

### 03. Magnetic pull — `magnetic` / Magnetic

- **Reference:** [Codrops Magnetic Buttons](https://tympanus.net/codrops/2020/08/05/magnetic-buttons/); credited to Manoela Ilic / Codrops. Linked codrops/MagneticButtons repository is MIT.
- **Default → hover → press → release:** centered → follows pointer → compress → spring returns on leave.
- **Principle:** Bounded pointer displacement with a damped spring.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=magnetic]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'magnetic'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Magnetic pull](buttons.html?button=magnetic).

### 04. Layered pull — `parallax` / Magnetic

- **Reference:** [Codrops Magnetic Buttons](https://tympanus.net/codrops/2020/08/05/magnetic-buttons/); credited to Manoela Ilic / Codrops. Linked codrops/MagneticButtons repository is MIT.
- **Default → hover → press → release:** centered layers → two displacement amplitudes → compress → both layers spring home.
- **Principle:** Label shifts farther than its outer shell.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=parallax]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'parallax'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Layered pull](buttons.html?button=parallax).

### 05. Rising tide — `wave` / Liquid

- **Reference:** [Codrops Button Experiments](https://tympanus.net/codrops/hub/tag/button/); credited to Multiple creators credited on each experiment. Index has no single reusable-code license; check each linked project.
- **Default → hover → press → release:** solid pill → wave surface rises → compress → surface recedes.
- **Principle:** Rounded oversized pseudo-element rises and rotates.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=wave]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'wave'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Rising tide](buttons.html?button=wave).

### 06. Soft morph — `blob` / Liquid

- **Reference:** [Codrops Button Experiments](https://tympanus.net/codrops/hub/tag/button/); credited to Multiple creators credited on each experiment. Index has no single reusable-code license; check each linked project.
- **Default → hover → press → release:** rounded rectangle → organic silhouette → compress → returns to base radius.
- **Principle:** Border radius interpolates between asymmetric shapes.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=blob]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'blob'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Soft morph](buttons.html?button=blob).

### 07. Light sweep — `shine` / Light

- **Reference:** [Magic UI](https://magicui.design/); credited to Magic UI / Dillion. Core repository LICENSE.md is MIT; separate Pro assets are outside that finding.
- **Default → hover → press → release:** dark surface → one highlight sweep → compress → highlight resets.
- **Principle:** Translated skewed highlight crosses a clipped surface.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=shine]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'shine'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Light sweep](buttons.html?button=shine).

### 08. Orbit border — `halo` / Light

- **Reference:** [Aceternity UI](https://ui.aceternity.com/categories/button); credited to Aceternity UI. Free category and separate Pro offer observed; verify the exact component terms.
- **Default → hover → press → release:** static border → border rotates while engaged → compress → rotation stops.
- **Principle:** Rotating conic gradient sits behind an inset surface.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=halo]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'halo'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Orbit border](buttons.html?button=halo).

### 09. Rolling label — `roll` / Text

- **Reference:** [MicroKit UI](https://microkit.co/components); credited to henriquegpb and contributors. Official henriquegpb/microkit repository shows MIT.
- **Default → hover → press → release:** first row → second row rises → compress → first row returns.
- **Principle:** Two visual label rows translate through an overflow window.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=roll]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'roll'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Rolling label](buttons.html?button=roll).

### 10. Letter lift — `stagger` / Text

- **Reference:** [Animated Buttons Colorion](https://animatedbuttons.colorion.co/); credited to Colorion. MIT stated on the gallery.
- **Default → hover → press → release:** baseline → sequential vertical offsets → compress → characters settle.
- **Principle:** Decorative character spans use indexed transition delays.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=stagger]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'stagger'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Letter lift](buttons.html?button=stagger).

### 11. Tactile key — `depth` / Physics

- **Reference:** [useLayouts](https://uselayouts.com/components/buttons); credited to useLayouts contributors. Button page states MIT; preserve required notices when copying substantial code.
- **Default → hover → press → release:** raised key → slight lift → moves into base → returns to raised position.
- **Principle:** Shadow offset represents depth and shrinks on press.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=depth]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'depth'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Tactile key](buttons.html?button=depth).

### 12. Perspective tilt — `tilt` / Physics

- **Reference:** [CSS Button Creator](https://cssbuttoncreator.com/css-buttons/); credited to CSS Button Creator. Free copying advertised; a formal license was not verified.
- **Default → hover → press → release:** flat → tilts toward pointer → compress → rotation resets.
- **Principle:** Pointer coordinates map to bounded rotateX/rotateY.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=tilt]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'tilt'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Perspective tilt](buttons.html?button=tilt).

### 13. Radial ripple — `ripple` / Particle

- **Reference:** [React Bits](https://reactbits.dev/); credited to David Haz and contributors. Official repository states MIT + Commons Clause, not plain MIT. Pro is separate.
- **Default → hover → press → release:** clean surface → subtle surface lift → native press → finite radial wave.
- **Principle:** A click-origin disc scales and fades with WAAPI.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=ripple]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'ripple'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Radial ripple](buttons.html?button=ripple).

### 14. Spark burst — `sparks` / Particle

- **Reference:** [Kokonut UI](https://kokonutui.com/docs/buttons); credited to Kokonut UI / kokonut-labs. Core repository LICENSE is MIT; Pro content is separate.
- **Default → hover → press → release:** clean surface → subtle surface lift → native press → finite ray burst.
- **Principle:** Twelve short-lived decorative rays radiate from activation.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=sparks]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'sparks'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Spark burst](buttons.html?button=sparks).

### 15. Async save — `async` / State

- **Reference:** [Kokonut UI](https://kokonutui.com/docs/buttons); credited to Kokonut UI / kokonut-labs. Core repository LICENSE is MIT; Pro content is separate.
- **Default → hover → press → release:** idle → focus/surface cue → press then loading → success or failure; retry enabled.
- **Principle:** Single-flight Promise plus AbortSignal and explicit error/retry states.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=async]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'async'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Async save](buttons.html?button=async).

### 16. Save & undo — `undo` / State

- **Reference:** [MicroKit UI](https://microkit.co/components); credited to henriquegpb and contributors. Official henriquegpb/microkit repository shows MIT.
- **Default → hover → press → release:** unsaved → surface cue → native press → saved; next activation undoes.
- **Principle:** Reversible local state with an explicit undo action.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=undo]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'undo'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Save & undo](buttons.html?button=undo).

### 17. Expand actions — `menu` / Navigation

- **Reference:** [useLayouts](https://uselayouts.com/components/buttons); credited to useLayouts contributors. Button page states MIT; preserve required notices when copying substantial code.
- **Default → hover → press → release:** collapsed → icon moves → native press → expanded; Escape closes and restores focus.
- **Principle:** Disclosure button controls a linked action panel.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=menu]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'menu'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Expand actions](buttons.html?button=menu).

### 18. Directional arrow — `back` / Navigation

- **Reference:** [shadcn.io Buttons](https://www.shadcn.io/button); credited to shadcn.io; authors vary by item. Mixed free and Pro offerings; consult item and Pro license. Not identical to the shadcn/ui project.
- **Default → hover → press → release:** arrow and label → arrow moves left → compress → dispatches activation without forced navigation.
- **Principle:** Arrow and label translate in opposite directions.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=back]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'back'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Directional arrow](buttons.html?button=back).

### 19. SVG fusion — `goo` / Experimental

- **Reference:** [Codrops Button Experiments](https://tympanus.net/codrops/hub/tag/button/); credited to Multiple creators credited on each experiment. Index has no single reusable-code license; check each linked project.
- **Default → hover → press → release:** three merged circles → circles spread → compress → circles merge again.
- **Principle:** SVG blur and alpha matrix merge three decorative circles.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=goo]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'goo'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open SVG fusion](buttons.html?button=goo).

### 20. Canvas grain — `noise` / Experimental

- **Reference:** [React Bits](https://reactbits.dev/); credited to David Haz and contributors. Official repository states MIT + Commons Clause, not plain MIT. Pro is separate.
- **Default → hover → press → release:** static grain → contrast cue → native press → six discrete grain frames; no idle animation.
- **Principle:** Small procedural canvas redraws a finite grain burst.
- **Implementation:** native button, decorative span and accessible status in `buttons.mjs`; `.ba-button[data-effect=noise]` in `buttons.css`.
- **Configuration:** shared `accent`, `ink`, `surface`, `size`, `duration`, `motion`, `disabled`, `label`; mount with `effect: 'noise'`.
- **Input / performance:** native Enter/Space and touch activation; focus outline and reduced-motion behavior follow the shared contract. CSS effects have no JS frame loop; pointer/particle/filter/canvas costs are bounded as described above.
- **Standalone:** [Open Canvas grain](buttons.html?button=noise).
