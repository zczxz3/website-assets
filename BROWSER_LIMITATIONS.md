# Original-site rendering limitations

Observed on 2026-11-04 in the current cloud browser, after the bounded REA captures. These failures are renderer-capability limitations, not evidence that the sites are unavailable to normal desktop browsers or that an anti-bot system blocked them. No browser protection or renderer-security flag was changed.

| Original site | Direct observation | Consequence |
| --- | --- | --- |
| Igloo Inc. — https://www.igloo.inc/ | The rendered page states that WebGL2 is not supported by this browser and asks for an updated browser. | The immersive production scene could not be inspected in this browser. WebGL2 is a confirmed requirement; the exact particle implementation remains unverified. |
| Bruno Simon — https://bruno-simon.com/ | The page console reports `THREE.WebGPURenderer: WebGPU is not available, running under WebGL2 backend`, followed by a null-context `getSupportedExtensions` error in its public application bundle. | The complete interactive world could not initialize here. The primary-site documentation and open source remain valid technology references. |
| The Boat — https://www.sbs.com.au/theboat/ | The page remains at its loading screen. The console reports a null-context `getShaderPrecisionFormat` error inside `THREE.WebGLRenderer` in the public `scripts/main.js` bundle. | Three.js is directly observed in the renderer stack, but the full comic and scrolling progression could not be exercised in this browser. |

The separate GitHub runner did capture the opening views and retained the limitations described in RESEARCH.md. A complete capture of a loading state does not mean the underlying production scene rendered successfully. The independent component library is separately verified by 31 browser checks, including its own WebGL particle component; these tests do not remove the original-site limitations above.

A renderer-capable environment is required before claiming full runtime reverse engineering of these three production experiences. Their current independent demos are deliberately smaller technique reconstructions with original assets, and are not substitutes for missing production evidence.
