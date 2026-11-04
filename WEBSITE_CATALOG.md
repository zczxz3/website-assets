# Website study catalog

15 references supplied by the project owner, organized for reusable frontend motion research. All 15 have first-pass research and an independently runnable component prototype. See [RESEARCH.md](RESEARCH.md) for measured original-site coverage and limitations. The complete per-site directory structures are packaged in `study-source.zip`; shared component source is also directly browsable in `components/`.

The brief below preserves the original study targets. It is not a declaration that every target interaction or production technology has been recovered. REA runtime verification passed; see [REA_VERIFICATION.md](REA_VERIFICATION.md).

## Priority order

MERSI Architecture → Obys Agency → The Boat → Igloo Inc. → Bruno Simon → Human Terrain → Earth Nullschool → GT Flexa.

## Index

| ID | Website | Category | Priority | Proposed component extraction |
| --- | --- | --- | --- | --- |
| 01 | [MERSI Architecture](https://www.mersi-architecture.com/) | Layout and transitions | 1 | SharedElementTransition; ProjectRail |
| 02 | [Obys Agency](https://obys.agency/) | Layout and transitions | 2 | TextReveal; CursorFollower; ProjectGrid |
| 03 | [GT Flexa](https://gt-flexa.com/) | Layout and transitions | 8 | VariableTypeController |
| 04 | [NIPPON COLORS](https://nipponcolors.com/) | Layout and transitions | Later | ColorThemeTransition |
| 05 | [Stripe Press](https://press.stripe.com/) | Layout and transitions | Later | BookPreview; PointerTilt |
| 06 | [The Boat](https://www.sbs.com.au/theboat/) | Art and immersive interaction | 3 | ScrollStory; LayeredParallax |
| 07 | [Short Trip](https://alexanderperrin.com.au/paper/shorttrip/) | Art and immersive interaction | Later | SceneScroller; VehicleInput |
| 08 | [Igloo Inc.](https://www.igloo.inc/) | Art and immersive interaction | 4 | ParticleMorph |
| 09 | [Bruno Simon](https://bruno-simon.com/) | Art and immersive interaction | 5 | FollowCamera; VehicleController; WorldMarker |
| 10 | [Patatap](https://patatap.com/) | Art and immersive interaction | Later | KeyVisualSampler |
| 11 | [Human Terrain](https://pudding.cool/2018/10/city_3d/) | Maps and scientific visualization | 6 | PopulationTerrain; CameraFlight |
| 12 | [Earth Nullschool](https://earth.nullschool.net/) | Maps and scientific visualization | 7 | FlowField; GlobeControls; DataLegend |
| 13 | [Land Lines](https://lines.chromeexperiments.com/) | Maps and scientific visualization | Later | StrokeMatcher; ImageMosaic |
| 14 | [Mechanical Watch](https://ciechanow.ski/mechanical-watch/) | Maps and scientific visualization | Later | ModelSection; ParameterSlider |
| 15 | [LOW←TECH MAGAZINE](https://solar.lowtechmagazine.com/) | Maps and scientific visualization | Later | DitherImage; ResourceBudget |

## Research briefs

### 01. MERSI Architecture

- Original: https://www.mersi-architecture.com/
- Planned directory: `sites/01-mersi-architecture/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Architectural editorial layout, photography, restrained transitions.
- Study targets: Shared-image transition; horizontal project browsing; image scale and masks.
- Candidate reusable components: SharedElementTransition; ProjectRail.
- Review note: GSAP Flip and Lenis are study targets supplied by the user; confirm against live evidence.
- Owner-supplied technical reference: https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/

### 02. Obys Agency

- Original: https://obys.agency/
- Planned directory: `sites/02-obys-agency/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Experimental typography and a bold studio identity.
- Study targets: Large text reveals; pointer interaction; image/video switches; grid and horizontal layouts.
- Candidate reusable components: TextReveal; CursorFollower; ProjectGrid.
- Review note: Confirm the current live implementation before naming its dependencies.

### 03. GT Flexa

- Original: https://gt-flexa.com/
- Planned directory: `sites/03-gt-flexa/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Variable typography and modern graphic design.
- Study targets: Animated font width and weight; interactive composition; text deformation.
- Candidate reusable components: VariableTypeController.
- Review note: Use an appropriately licensed variable font for independent implementations.

### 04. NIPPON COLORS

- Original: https://nipponcolors.com/
- Planned directory: `sites/04-nippon-colors/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Japanese minimalism and traditional color presentation.
- Study targets: Full-screen color changes; linked labels; theme state transitions.
- Candidate reusable components: ColorThemeTransition.
- Review note: Treat palette presentation, identity and implementation as separate study items.

### 05. Stripe Press

- Original: https://press.stripe.com/
- Planned directory: `sites/05-stripe-press/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Editorial design and dimensional book presentation.
- Study targets: Book rotation; pointer-driven perspective; product detail motion; scroll pacing.
- Candidate reusable components: BookPreview; PointerTilt.
- Review note: Book cover art and photography need their own reuse permissions.

### 06. The Boat

- Original: https://www.sbs.com.au/theboat/
- Planned directory: `sites/06-the-boat/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Ink illustration and cinematic interactive storytelling.
- Study targets: Scroll narrative; layered parallax; synchronized text; ambient audio.
- Candidate reusable components: ScrollStory; LayeredParallax.
- Review note: Recreate interaction logic with original artwork and audio.

### 07. Short Trip

- Original: https://alexanderperrin.com.au/paper/shorttrip/
- Planned directory: `sites/07-short-trip/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Pencil drawing and a playable illustrated scene.
- Study targets: Horizontal scrolling; layered depth; vehicle controls; continuous scenery.
- Candidate reusable components: SceneScroller; VehicleInput.
- Review note: Do not assume the original artwork or game code is reusable.

### 08. Igloo Inc.

- Original: https://www.igloo.inc/
- Planned directory: `sites/08-igloo-inc/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Abstract particle art and immersive motion.
- Study targets: Particle formation and dispersion; pointer response; shape transitions.
- Candidate reusable components: ParticleMorph.
- Review note: WebGL is a study target; verify actual rendering technology from evidence.

### 09. Bruno Simon

- Original: https://bruno-simon.com/
- Planned directory: `sites/09-bruno-simon/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: A game-like 3D portfolio and interactive environment.
- Study targets: Vehicle physics; spatial navigation; camera follow; collision and content markers.
- Candidate reusable components: FollowCamera; VehicleController; WorldMarker.
- Review note: Check the repository license and third-party asset licenses separately.
- Owner-supplied technical reference: https://github.com/brunosimon/folio-2025

### 10. Patatap

- Original: https://patatap.com/
- Planned directory: `sites/10-patatap/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Geometric visual performance and sound interaction.
- Study targets: Keyboard-triggered shapes; audio synchronization; easing and generative graphics.
- Candidate reusable components: KeyVisualSampler.
- Review note: Provide mute, focus handling and a user gesture before starting audio.

### 11. Human Terrain

- Original: https://pudding.cool/2018/10/city_3d/
- Planned directory: `sites/11-human-terrain/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Population as a 3D landscape.
- Study targets: Population-to-height mapping; geographic mesh; camera flights; time comparison.
- Candidate reusable components: PopulationTerrain; CameraFlight.
- Review note: Record dataset sources, geographic resolution and applicable licenses.

### 12. Earth Nullschool

- Original: https://earth.nullschool.net/
- Planned directory: `sites/12-earth-nullschool/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Global weather, animated flow fields and scientific layers.
- Study targets: Wind particles; globe projection; scientific color scales; layer selection.
- Candidate reusable components: FlowField; GlobeControls; DataLegend.
- Review note: Record data timestamps and units; do not describe historical data as live.

### 13. Land Lines

- Original: https://lines.chromeexperiments.com/
- Planned directory: `sites/13-land-lines/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Drawing and satellite imagery as geographic art.
- Study targets: Stroke capture; outline matching; image stitching; real-time interaction.
- Candidate reusable components: StrokeMatcher; ImageMosaic.
- Review note: Check repository, imagery and external service terms independently.
- Owner-supplied technical reference: https://github.com/ofZach/landlines

### 14. Mechanical Watch

- Original: https://ciechanow.ski/mechanical-watch/
- Planned directory: `sites/14-mechanical-watch/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Technical illustration and interactive mechanical explanation.
- Study targets: Section views; rotation; parameter sliders; synchronized technical diagrams.
- Candidate reusable components: ModelSection; ParameterSlider.
- Review note: A proposed teaching component is not evidence of the original site's internal stack.

### 15. LOW←TECH MAGAZINE

- Original: https://solar.lowtechmagazine.com/
- Planned directory: `sites/15-low-tech-magazine/`
- Status: first-pass analysis and independent component prototype; production-specific coverage is recorded in RESEARCH.md
- Visual direction: Low-energy publishing and printed halftone aesthetics.
- Study targets: Dithering; limited-color images; publication typography; resource budgets.
- Candidate reusable components: DitherImage; ResourceBudget.
- Review note: Check code, content and image licenses separately.
- Owner-supplied technical reference: https://github.com/lowtechmag/solar_v2

## Standard site layout

| Path | Required contents |
| --- | --- |
| `01-original/` | Original URL, observation date, public reference links, bounded capture evidence |
| `02-analysis/` | Page structure, visual system, motion behavior, measured versus inferred stack |
| `03-assets/` | Original or explicitly reusable assets, attribution and license register |
| `04-reconstruction/` | Independently runnable implementation and run instructions |
| `05-components/` | Isolated components, inputs, cleanup behavior and accessibility notes |
| `06-demo/` | Reproduction steps, captures, screenshots or videos, known differences |
| `README.md` | Stack, principles, links, evidence, progress and component export links |

## Definition of done

A site is complete only when its selected interactions have recorded evidence, an independent runnable implementation, reusable components, responsive behavior, keyboard access, reduced-motion handling and a stated performance budget. A directory or screenshot alone does not count as a reconstruction.

Record each technical claim as observed, documented by a primary source, inferred, or unverified. Keep source URLs and observation dates. Collect only the public pages and resources needed for a specific interaction; do not bulk mirror entire websites. If a site presents a persistent access block, record it and stop that capture.

Review loading sequences, scroll and parallax, text masks and deformation, shared-element transitions, pointer and hover effects, filters, WebGL/Three.js particles, timelines and easing, responsive layouts, and resource loading as relevant to each site. Implementations should prefer small dependencies and explicit teardown of listeners, animation frames and GPU resources.
