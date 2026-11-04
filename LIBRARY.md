# Website Assets Motion 0.4

An experimental browser ES-module package containing 20 original button presets and three DOM bindings. It has TypeScript declarations and no runtime dependencies. The 25 site-inspired studies remain research demonstrations, outside this package's public API.

## Install without cloning the research repository

Download `zczxz3-website-assets-motion-0.4.0.tgz` from the repository root or the consumer-verification Actions artifact, then:

```sh
npm install ./zczxz3-website-assets-motion-0.4.0.tgz
```

This is an npm-compatible archive, not a claim that the package is published on npmjs.org. A registry CDN such as unpkg/jsDelivr is not supplied. The archive filename is versioned; avoid depending on mutable main-branch URLs.

```js
import {mountButton, bindMenu} from '@zczxz3/website-assets-motion';
import '@zczxz3/website-assets-motion/buttons.css';
const button = mountButton(document.querySelector('#cta'), {
  effect: 'magnetic', label: 'Explore', accent: '#a6d8ff',
  onAction: () => console.log('Activated')
});
// On view removal:
button.destroy();
```

CSS imports require a bundler. In a native browser, serve the extracted package through HTTP, link `buttons.css` and import `index.mjs` relatively. `consumer.html` in the source repository is a separate application fixture, not the research gallery.

## Contract and limitations

- `mountButton` owns one wrapper and preserves other host children. `destroy()` is idempotent. Theme colors, size, duration (80–4000 ms), motion and disabled state are configurable. Provide a real `onAction({signal})` for async buttons; the built-in empty task is only a demonstration fallback.
- `bindMenu` owns panel visibility and `aria-expanded`; Escape restores focus. Start with a native button, a unique `aria-controls` and matching panel ID.
- `bindAsync` takes an abortable task, suppresses concurrent runs and late commits, and writes status text. Current messages are project-oriented English; localization is not a packaged feature.
- `bindReorder` requires the documented `data-row`, `data-handle`, `data-id` structure. IDs must be safe simple identifiers. It does not implement arbitrary grids, nested sorting or edge auto-scroll. See `QUEUE_COMPONENTS.md` in the repository.
- Call destroy before unmounting. Native browser DOM APIs are required when mounting. Imports alone do not create DOM nodes.
- The old study `lifecycle()` clears host children and restores selected attributes, not previous child nodes. Use a dedicated empty host for those studies. It is not this package's public API.

## Verification meaning

The distribution workflow installs this packed tarball into a fresh consumer directory and tests real browser controls at desktop and mobile widths, plus TypeScript import/type errors. This checks the declared integration surface; it does not prove all frameworks, browsers, accessibility tools, performance budgets or visual fidelity to reference sites. Earlier REA checks exercise original demo behavior, not original-site reconstruction accuracy.

MIT covers original code only. No third-party screenshots, recordings, proprietary fonts, models, evidence archives or REA dependencies are included in the installable package.
