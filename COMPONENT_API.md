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

Use `styles.css` for the supplied presentation. A demo host should have a nonzero width and at least 440 CSS pixels of height. Each module has its own rendering and controls; `core.mjs` is the only shared runtime import.

| Module | Public options or additional exports |
| --- | --- |
| `shared-transition.mjs` | `mount(host)`; native dialog and FLIP geometry |
| `text-reveal.mjs` | `mount(host)`; replay and layout controls |
| `variable-type.mjs` | `mount(host, {fontFamily})`; separately licensed variable font |
| `color-theme.mjs` | `palette`; returned `select(index)` |
| `book-tilt.mjs` | `mount(host)`; pointer and range rotation |
| `ink-story.mjs` | `mount(host)`; scene wheel and narrative range |
| `scene-scroller.mjs` | `mount(host)`; hold buttons and arrow keys |
| `particle-morph.mjs` | `mount(host)`; WebGL required; reports unsupported if absent |
| `vehicle-world.mjs` | `stepVehicle(car, throttle, steering, dt)` with seconds for dt |
| `key-visual-sampler.mjs` | `mount(host)`; explicit audio enable and keyboard notes |
| `population-terrain.mjs` | `mount(host, {gridA,gridB,size})`; `heightFromValue`, `syntheticField` |
| `flow-field.mjs` | `bilinear(grid,nx,ny,x,y)`; wrapped longitude and clamped latitude |
| `stroke-matcher.mjs` | `resample`, `normalize`, `strokeDistance` |
| `mechanism-section.mjs` | `mount(host)`; illustrative exploded-view gear train |
| `dither-image.mjs` | `orderedDither`, `floydSteinberg`; 8-bit grayscale input |

Population grids must contain `size * size` finite scalar values in the same units and geometry. The shared min/max range across both grids maps linearly to height; no quantile clipping or histogram equalization replaces that base encoding.

Canvas-based 3D prototypes use an explicit 3D projection rather than Three.js. The particle module uses WebGL and GLSL. None of the default demos claims live weather, real population values, commercial font files, original recordings or original satellite imagery.

Call `destroy()` before removing or replacing a component. It aborts listeners, disconnects observers and cancels animation loops. The particle component deletes GPU resources; the sampler closes its audio context. Mounting the same module again creates a new independent instance.
