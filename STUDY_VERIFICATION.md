# Independent study verification — version 0.2

**PASSED: 36/36 REA browser scenarios, 14/14 Node unit checks and 29/29 published source-file comparisons.**

- Successful run: https://github.com/zczxz3/website-assets/actions/runs/41761319184
- Tested commit: `18a74a796438f97d56c14cc117651cbbee107a87`
- Tested source bundle SHA-256: `5d0f8b2033ce3a0e916dd93dbcddf04e7f7030f4547695492ac544a186cb8064`
- Preserved artifact: [component-verification.zip](component-verification.zip), 4,862,915 bytes
- Artifact SHA-256: `287f86720f1811b12542ebbddcbea1dc2dafef6e0d0229a1d134736198bbc6be`
- Runtime: REA 6.8.0, Node 24.22.1, matching Playwright Chromium on Ubuntu 24.04
- Review date: 2026-11-04 (Asia/Shanghai)

The authoritative browser result is **`component-checks/summary.json`** inside the evidence ZIP. `package-verification.json` records the pre-extraction source comparison. `bootstrap.json` records workflow initialization and is not the test result. All 36 screenshot hashes were checked against their captured Evidence; both published ZIP files were also checked for integrity.

## Browser coverage

| Scenario group | Passed | Scope |
| --- | ---: | --- |
| Desktop studies | 15/15 | Width 1280, reduced motion, observable interaction and no page errors |
| Mobile studies | 15/15 | Width 390, reduced motion, observable interaction and no page errors |
| Normal-motion studies | 2/2 | MERSI transition including completed close; Igloo-style WebGL particle interaction |
| Gallery search and filters | 2/2 | Desktop and mobile; deep link, search, empty state, reset, selection, permalink and pause |
| Gallery lifecycle | 1/1 | Five successive mounts, style cleanup, WebGL teardown and remount |
| Runtime fixture | 1/1 | Eight real-browser contract assertions, listed below |
| **Total** | **36/36** | All scenarios completed with no page errors |

All 15 independent prototypes passed at both widths. The particle checks require a working WebGL context; unsupported rendering is not accepted as a pass.

The runtime fixture includes eight assertions within one browser scenario:

1. Remaining cleanup runs even when one disposer throws; host styles, classes, attributes and data are restored.
2. Destroying an active FLIP transition leaves no clone or delayed host-state write.
3. Repeated closing during opening completes and restores focus to the trigger.
4. Actual browser draw calls stop when paused, repaint on input, resume, stop offscreen and remain stopped after destruction.
5. Invalid terrain input allocates no DOM, and supplied data is labeled as custom data.
6. Vehicle input releases when focus and keyup leave the component.
7. Gallery back/forward navigation restores selection and clears filters that would hide it.
8. Rapid switching mounts only the latest requested scene.

## Node coverage

The 14 checks cover six existing mathematical invariants, four scheduling behaviors, two catalog/URL behaviors and two grid-validation behaviors. Scheduling checks use an injected frame queue to verify cancellation and that paused scenes leave no pending frame. The browser fixture independently checks observed drawing behavior.

## Source and packaging checks

CI now compares all 29 published package source files against the ZIP **before extraction**. Missing modules, different bytes, duplicate paths, unsafe paths and missing site sections fail verification. A repeated local package build produced the identical SHA-256. The bundle contains 194 files, including all 15 site directories with six research sections each.

## Visual review and limits

The updated desktop/mobile gallery, ink narrative, terrain and particle screenshots were inspected. Controls and text fit the inspected mobile layouts. Verification establishes the listed functional cases, not exhaustive accessibility, touch-device compatibility, memory profiling or a measured frame-rate improvement. Most study checks use reduced motion; two study scenarios and the runtime fixture additionally exercise normal animation.

These results cover original component prototypes, not the complete production websites. Igloo, Bruno Simon and The Boat original-scene renderer limitations remain in [BROWSER_LIMITATIONS.md](BROWSER_LIMITATIONS.md).

The previous version passed 31 browser and six algorithm checks in [its historical run](https://github.com/zczxz3/website-assets/actions/runs/41754711044); the current evidence ZIP contains the version 0.2 results above.
