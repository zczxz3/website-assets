# Component API

Serve the repository through HTTP. The gallery has no runtime dependency or package installation requirement:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. To expand the full per-site research folders first:

```sh
python3 -m zipfile -e study-source.zip .
```

## Minimal integration

```js
import { mount } from './components/particle-morph.mjs';
const component = mount(document.querySelector('.demo-stage'));
// Before replacing the view:
component.destroy();
```

Use `styles.css` for the supplied presentation. A demo host should have a nonzero width and at least 440 CSS pixels of height. Each module has its own rendering and controls; `core.mjs` and `frame-scheduler.mjs` supply the shared runtime. Keep both beside the imported module.

| Module | Public options or additional exports |
| --- | --- |
| `shared-transition.mjs` | `mount(host, {duration=850})`; native dialog, cancellable FLIP geometry and focus restoration |
| `text-reveal.mjs` | `mount(host)`; replay and layout controls |
| `variable-type.mjs` | `mount(host, {fontFamily,nativeWidthAxis})`; separately licensed variable font; set nativeWidthAxis to true to disable geometric width fallback |
| `color-theme.mjs` | `palette`; returned `select(index)` |
| `book-tilt.mjs` | `mount(host)`; pointer and range rotation |
| `ink-story.mjs` | `mount(host)`; scene wheel and narrative range |
| `scene-scroller.mjs` | `mount(host)`; hold buttons and arrow keys |
| `particle-morph.mjs` | `mount(host)`; WebGL required; reports unsupported if absent |
| `vehicle-world.mjs` | `stepVehicle(car, throttle, steering, dt)` with seconds for dt |
| `key-visual-sampler.mjs` | `mount(host)`; explicit audio enable and keyboard notes |
| `population-terrain.mjs` | `mount(host, {gridA,gridB,size})`; `heightFromValue`, `syntheticField`, `prepareGrids` |
| `flow-field.mjs` | `bilinear(grid,nx,ny,x,y)`; wrapped longitude and clamped latitude |
| `stroke-matcher.mjs` | `resample`, `normalize`, `strokeDistance` |
| `mechanism-section.mjs` | `mount(host)`; illustrative exploded-view gear train |
| `dither-image.mjs` | `orderedDither`, `floydSteinberg`; 8-bit grayscale input |

Population grids must contain `size * size` finite scalar values in the same units and geometry. The shared min/max range across both grids maps linearly to height; no quantile clipping or histogram equalization replaces that base encoding.

Canvas-based 3D prototypes use an explicit 3D projection rather than Three.js. The particle module uses WebGL and GLSL. None of the default demos claims live weather, real population values, commercial font files, original recordings or original satellite imagery.

Call `destroy()` before removing or replacing a component. It aborts listeners, disconnects observers and cancels animation loops. The particle component deletes GPU resources; the sampler closes its audio context. Mounting the same module again creates a new independent instance.

## Version 0.2 behavior

- The gallery supports word search, category filters, `?study=ID` links and browser back/forward navigation. Filter state is reset when restoring a history entry so the selected study remains discoverable. The pause preference is stored locally when storage is available.
- Offscreen and background Canvas/WebGL loops stop scheduling continuous frames. Paused or reduced-motion scenes repaint after input, resize or scroll. Held keys and pointers can still drive explicitly controlled motion. Animation time does not include suspended time.
- `lifecycle(host)` exposes `destroyed`; late state writes are ignored. All cleanup callbacks run even when one throws; an `AggregateError` is then raised after restoring the host.
- `loop(host, draw, life)` returns an object with `invalidate()` for programmatic changes that do not emit input events. It is disposed automatically through the supplied lifecycle.
- Population grid `size` is an integer from 2 to 128 for this CPU prototype. Values must be finite numbers. Inputs are cloned. If only `gridA` is supplied, it is reused as the second scenario. Both synthetic grids follow a supplied size. Custom input is labeled as custom data, and the shared min/max linear mapping is retained.
- The ink study follows native page scrolling; its slider switches to manual progress. Select **Follow page scroll** to restore automatic progress.

Run `python3 package_studies.py verify` before changing or expanding the source archive. After changing source files in a fully expanded checkout, run `python3 package_studies.py build` to rebuild and verify the deterministic ZIP. CI checks source parity before extraction.
