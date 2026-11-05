# Reusing the Queue components

> Repository layout: source, demos and direct commands in this guide are relative to `queue/`. Run direct commands after `cd queue` from the repository root; root npm tasks select that directory automatically. See [migration notes](../docs/REPOSITORY_LAYOUT.md).

The runnable example is `queue.html`. `queue-components.mjs` has no dependencies and does not access the DOM until a binding function is called. Import it in a browser ES module. `queue.css` styles the complete demo application; do not import its global page resets into an unrelated product. Keep your own scoped button, focus, panel and input styles when integrating the behavior functions.

## Menu binding — B07

```html
<button id="toggle" type="button" aria-controls="navigation" aria-expanded="false">Menu</button>
<nav id="navigation" hidden><a href="#work">Work</a></nav>
<script type="module">
  import {bindMenu} from './queue-components.mjs';
  const menu = bindMenu(document.querySelector('#toggle'), document.querySelector('#navigation'));
  // menu.set(true); menu.set(false); menu.destroy();
</script>
```

The panel is initially closed. Click, Enter and Space activate the native button. Escape from the panel closes it and returns focus. Animate the button's `[aria-expanded]` state; the binding itself does not enforce a visual style. Use unique `aria-controls` / panel IDs for each instance. `destroy()` removes its event listeners and closes the panel.

## Async action — B08

`bindAsync(button, liveStatus, task)` returns `run()`, `cancel()`, `phase` and `destroy()`. Pass a native button and a status element with `role="status"` and `aria-live="polite"`. The task receives an `AbortSignal` and must honor it before committing results.

```js
const action = bindAsync(button, status, async signal => {
  const response = await fetch('/projects.json', {signal});
  if (!response.ok) throw Error('Could not load projects. Try again.');
  const data = await response.json();
  if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
  applyProjects(data);
});
// Call action.cancel() from a separate Cancel button.
// Call action.destroy() when the containing view is removed.
```

The binding blocks a second request while one is pending. It sets `data-state` to idle/loading/success/error, `aria-busy`, disabled state and a status message. No fake delay or progress percentage is generated. Copy only the `.async` / `.spinner` rules when using the example visuals, rename them into your component namespace, and retain the reduced-motion override. App-specific labels and messages can be adapted in the original source. This slice exposes a task API, not a complete generalized localization package.

## Selection and spinners — B09/B10

Checkboxes, radio groups and switches remain native inputs with associated labels. The demo uses `#showBlog`, a checkbox with `role="switch"`, and a named radio group; checked state changes the exported website model. Their CSS uses `:checked` and `:focus-visible`. Keep native elements, focus indicators and labels when changing appearance.

The spinner is an `aria-hidden` span containing four children. `.dots` / `.wave` choose the keyframes. Child delays are 110 ms apart; the cycle is 900 ms. The live status carries the meaning, so decorative dots need no repeated announcements. Reduced motion stops the animation while the loading state and status text remain visible.

## Ordering — A05

`bindReorder(root, {onMove, onAdd, announce})` returns `destroy()`. Use `[data-row="stable-id"]` for each existing item and a native button with `data-handle data-id="stable-id"` as its grip. Shelf grips also set `data-library="true"`.

- `onMove(id, targetId)` commits a reordered source model after release or an arrow key.
- `onAdd(templateId, targetId)` inserts from the shelf before an existing target.
- `announce(message)` writes a polite status message.

Pointer capture supports mouse, pen and touch. Apply `touch-action:none` to grips only; the surrounding page must remain scrollable. ArrowUp/ArrowDown on a grip reorder within its list. Escape and pointer cancellation cancel an uncommitted drag. Provide move-up/down and Add buttons as in the demo. Cross-list nested sorting, arbitrary-grid heuristics, automatic edge scrolling and multi-selection are outside this binding's scope.

The model owns the order: update it in the callbacks and regenerate the DOM, preview and export from that model. A DOM-only reorder would lose the change when saving.

## Portfolio recipe — F03

`validateModel`, `createHistory`, `websiteFiles` and `studioProject` are exported by `queue-model.mjs`. Use the sample JSON as the editable content format. Titles, descriptions, articles and names are plain text, not arbitrary HTML or MDX. One to twelve projects are supported. Cover colors and the accent use six-digit hex colors; external social links require HTTPS.

`websiteFiles(model)` returns a map of linked HTML pages plus `portfolio.css`; `zipFiles(files)` packages that map without npm dependencies. `studioProject(model)` returns the actual Studio v1 project envelope. Import that JSON using **打开项目**. The generated pages use native links and work offline after extraction. The static `queue-card.zip` installs separately through **模块 → ＋ 安装模块 ZIP**.

This recipe uses original geometric cover art and text. It is not a Next.js/React/MDX port of Magic UI Portfolio. The original reference's routing/content architecture informed the decomposition; its resume data, logos and implementation are not bundled. See [research](QUEUE_RESEARCH.md) for source pins and license boundaries and [verification](QUEUE_VERIFICATION.md) for tested behavior.
