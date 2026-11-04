# Verification — Motion Atlas 0.3

**PASSED: 58/58 REA browser scenarios, 17/17 Node checks and 41/41 pre-extraction source comparisons.**

- Run: https://github.com/zczxz3/website-assets/actions/runs/41764993014
- Tested commit: `fb86adab1ad7792f0fefe1989fde6b26ac5fb5c2`
- Source ZIP SHA-256: `5a59a7acca1af7c2d3aa095f8b919358c6744d690023ab5a20e52ee95f82029a`
- Component evidence ZIP SHA-256: `ae93f04606dd000f8616b637a0892b52079e1d9f751463a1b9f312495b7d9e11`
- Runtime: REA 6.8.0, Node 24.22.1, matching Playwright Chromium, Ubuntu 24.04.

## Coverage

| Group | Passed |
| --- | ---: |
| 25 desktop studies, width 1280 | 25/25 |
| 25 mobile studies, width 390 | 25/25 |
| Normal motion: MERSI, particles, film shader, SDF | 4/4 |
| Gallery search/filter scenarios | 2/2 |
| Gallery lifecycle | 1/1 |
| Runtime fixture with eight assertions | 1/1 |

Every scenario requires complete Evidence and no page errors. Primary controls must change observable state. WebGL unsupported states fail. The new suite also enables synthesized sound, adds an SDF bubble and selects the comic scroll-follow mode. This does not establish a real device audio-quality measurement or exhaustive interaction coverage.

All 58 screenshot hashes were rechecked. The updated mobile previews and isometric office were visually reviewed. The floor is rendered before office geometry, and the blueprint starts with visible geometry. Normal-motion cases supplement the reduced-motion functional suite. No measured FPS, complete accessibility audit or visual equivalence to production sites is claimed.

The authoritative component result is `component-checks/summary.json` inside `component-verification.zip`. Packaging results are in `package-verification.json`. The source ZIP contains 306 files and all six sections for each of 25 sites.

## Original references, batch two

Run: https://github.com/zczxz3/website-assets/actions/runs/41763844104

All ten HTTP entry requests returned 200. Nine bounded entry/PageDown scenarios completed; Chasing the Moment was partial. Static subsets: four completed, three failed and three not run. Loading states, entry gates and complete rendering are distinguished in [BATCH_TWO.md](BATCH_TWO.md). Raw production code is not included as reusable source; reference screenshots keep their own rights.

Original evidence is preserved separately in `batch-two-reference-evidence.zip`. Original reference coverage and prototype validation are different results.
