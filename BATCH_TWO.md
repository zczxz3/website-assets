# Batch Two — studies 16–25

Ten author case studies and public text entries were reviewed on 2026-11-04. This batch adds ten selected technique prototypes; complete original-site reconstruction is not established.

| ID | Reference | Selected module | Source-documented mechanism | Independent limits |
| --- | --- | --- | --- | --- |
| 16 | [San Rita](https://sanrita.ca/) | `topographic-trail.mjs` | Author documents Next.js, React Three Fiber, Blender height-map topology, DatoCMS and Lenis. | Synthetic terrain with Canvas projection; no geographic height-map data, baked textures, production camera paths or routing. |
| 17 | [Podium](https://podium.global/) | `film-distortion.mjs` | Author documents Zustand, Next.js, React, GSAP ScrollTrigger/Flip, Lenis and Three.js/R3F. | Procedural shader; no original films, imagery, production shared-element routing or media pipeline. |
| 18 | [Ten Years Away](https://ten.375.studio/) | `comic-rail.mjs` | Author describes a printed comic adapted into a scroll-driven WebGL experience. | DOM rail and procedural SVG illustrations; no recovered comic artwork, fBm background or original WebGL scene. |
| 19 | [The Spark](https://spark.thedigitalpanda.com/) | `cinematic-city.mjs` | Author describes scroll-controlled camera, character and tracking states within a story-first experience. | CPU-projected original city; no production character rigs, lighting pipeline or projected original textures. |
| 20 | [Juan Mora Romero](https://juanmoraromero.com/) | `infinite-posters.mjs` | Author documents Next.js, React Three Fiber, GSAP, an endless draggable Lab, channel split and wind-blown posters. | Canvas channel offsets and analytic wave deformation; not a cloth physics solver, original GLSL pipeline or copied posters. |
| 21 | [Maria Vasilyeva](https://www.mariavasilyeva.com/) | `melody-grid.mjs` | Author describes music as the organizing framework for layout, movement and sound. | Synthesized tones and Canvas bars; no original recordings, project images or recovered production audio engine. |
| 22 | [Chasing the Moment](https://chasing-the-moment.byholm.co/) | `runner-camera.mjs` | Author documents a five-stage browser webfilm made with Three.js and GLSL. | Simplified stick figure and CPU projection; no original rig, full five-scene film or shattering postprocessing. |
| 23 | [Yichen Xie](https://yichenxie.com/) | `sdf-bubbles.mjs` | Author explicitly describes WebGL rendering, blended distance fields, drawing and popping bubble interactions. | Bounded pool of 12 circles; no infinite canvas, full spring system or original project content. |
| 24 | [ULTRAGRID](https://ultragrid.studio/) | `isometric-office.mjs` | Author confirms Blender modeling, Spline scene interactions, Webflow, GSAP and Osmo. | Procedural projected boxes and native controls; no Spline model or original desk assets. Object raycasting is not implemented. |
| 25 | [Heron AI](https://heronaiapp.com/) | `blueprint-workflow.mjs` | Author describes architectural drawings, annotations and an Observe–Advise–Act–Learn homepage; article tags GSAP. | Canvas illustration only; no actual code-compliance engine, BIM integration or product agent. |

## Author references

- 16: https://tympanus.net/codrops/2026/03/24/digital-craft-wild-soul-building-san-ritas-topographic-web-experience/
- 17: https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/
- 18: https://tympanus.net/codrops/2026/07/08/ten-years-away-designing-an-interactive-comic-for-studio375s-tenth-anniversary/
- 19: https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/
- 20: https://tympanus.net/codrops/2026/10/22/juan-mora-romero-portfolio/
- 21: https://tympanus.net/codrops/2026/10/20/maria-vasilyeva-portfolio/
- 22: https://tympanus.net/codrops/2026/10/12/chasing-the-moment/
- 23: https://tympanus.net/codrops/2026/10/06/yichen-xie-portfolio/
- 24: https://tympanus.net/codrops/2026/09/30/ultragrid-portfolio/
- 25: https://tympanus.net/codrops/2026/10/12/heron-ai/

## Evidence and reproduction

The source ZIP contains six research sections per site. `components/batch-two.mjs` contains the shared original implementations; each named module is an independent mount entry. Original captures and prototype checks are separate workflows. Capture results are below; the latest component results are in STUDY_VERIFICATION.md.

## Priority

16 → 20 → 17 → 18 → 19 are the requested first research tier. Current demos isolate one core mechanism per reference. Next passes should add original-behavior recordings, exact routes and timings, production asset pipelines, real cloth/character rigs and accessible mobile alternatives where applicable.

The web text reader could not retrieve Juan’s original homepage; the author article was available. The Spark exposes a press-and-hold entry and desktop recommendation. Yichen’s extracted text includes a WebGL compatibility message. These text observations do not establish successful rendering.

## Bounded original capture results

Run: https://github.com/zczxz3/website-assets/actions/runs/41763844104

All 10 returned HTTP 200. Nine bounded entry/PageDown scenarios completed; Chasing the Moment retained incomplete evidence. Static subsets: four completed, three failed and three not run; these are limited script inputs, not full audits.

| Site | Browser | Observed view and limit |
| --- | --- | --- |
| 16 San Rita | captured | Map labels and markers visible; full terrain texture behavior not exercised. |
| 17 Podium | captured | Opening loader remained visible; cinematic hero and project transitions not exercised. |
| 18 Ten Years Away | captured | Opening year and sound-entry prompt visible; full comic progression not exercised. |
| 19 The Spark | captured | Press-and-hold entry visible; full narrative not entered. |
| 20 Juan Mora Romero | captured | Portfolio home and project grid visible; endless Lab and cloth views not entered. |
| 21 Maria Vasilyeva | captured | Horizontal project-note composition visible; original audio not enabled. |
| 22 Chasing the Moment | partial | Intro graphic visible, but capture incomplete after initial state. |
| 23 Yichen Xie | captured | Bubble composition and navigation visible; original draw/pop not exercised. |
| 24 ULTRAGRID | captured | Isometric desk and points of interest visible; full object navigation not exercised. |
| 25 Heron AI | captured | Architectural building illustration and technical UI visible; full product workflow not exercised. |

Original public evidence is preserved in `batch-two-reference-evidence.zip`; sanitized reports and one reference screenshot per site are also inside the source package. The original entry gates were not bypassed. `captured` refers to the finite scenario, not complete application rendering.

## Verified prototype delivery

All 25 studies passed desktop/mobile functional checks. The complete suite passed 58/58 browser scenarios and 17/17 Node checks. See [verification](STUDY_VERIFICATION.md). This remains selected-mechanism reconstruction; complete original-site parity is not established.

![Original procedural desk study](https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/batch-two-preview.png)
