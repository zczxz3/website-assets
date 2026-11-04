# Independent study verification

**Result: PASSED — 31/31 real REA browser checks, plus 6/6 algorithm checks.**

- Successful run: https://github.com/zczxz3/website-assets/actions/runs/41754711044
- Tested commit: `238f076ff7b44db1f0504e63a7077f3b7db33c13`
- Tested source bundle SHA-256: `d93136a4b2a9b7bddbd5a060351bc8e81d6d4d15b56235748c87956f32b42855`
- Runtime: REA 6.8.0, Node 24.22.1, matching Playwright Chromium on Ubuntu 24.04
- Original local-code evidence archive: `component-verification.zip`
- Archive SHA-256: `3944f6607a3a01d1942c563b4fc26b983e14147b8912bfc7afc3637a958d90d1`

The authoritative final result inside the archive is `component-checks/summary.json`. The archive-root `verification.json` is a legacy bootstrap placeholder inherited from the original runtime-fixture workflow; it is not the component test result. The downloaded archive is preserved unchanged so its SHA-256 remains verifiable.

## Browser coverage

Every independent study was mounted through HTTP at desktop width 1280 and mobile width 390. Each check required complete REA Evidence, a successful interaction with an observable state change, no page errors and an integrity-checked screenshot. WebGL initialization was required for the particle study; an unsupported renderer was not treated as success.

A further gallery case switched through color, book, WebGL, dithering and editorial components, checking style/class cleanup, remounting and zero page errors. The tests run with reduced-motion preferences to make the functional snapshots stable; they do not measure complete animation quality or performance.

| Study | Desktop | Mobile |
| --- | --- | --- |
| 01 MERSI Architecture | Passed | Passed |
| 02 Obys Agency | Passed | Passed |
| 03 GT Flexa | Passed | Passed |
| 04 NIPPON COLORS | Passed | Passed |
| 05 Stripe Press | Passed | Passed |
| 06 The Boat | Passed | Passed |
| 07 Short Trip | Passed | Passed |
| 08 Igloo Inc. | Passed | Passed |
| 09 Bruno Simon | Passed | Passed |
| 10 Patatap | Passed | Passed |
| 11 Human Terrain | Passed | Passed |
| 12 Earth Nullschool | Passed | Passed |
| 13 Land Lines | Passed | Passed |
| 14 Mechanical Watch | Passed | Passed |
| 15 LOW←TECH MAGAZINE | Passed | Passed |

Gallery teardown/remount check: **Passed**.

## Algorithm coverage

Six Node tests check normalized stroke-match invariance, polyline arc resampling, two-color dithering and endpoint preservation, linear/clamped height encoding, bilinear interpolation and longitude wrapping, and vehicle integration across update rates.

## Visual review and fixes

Desktop and mobile screenshots were reviewed. The vehicle ground was moved to a separate render pass so it does not hide the car. Component teardown now restores host styles and classes. Narrow editorial typography was reduced to fit its column. Tests were rerun after these changes.

The original reference websites and these independent prototypes are distinct: these 31 checks validate the prototypes, not complete recovery of the original sites. Original loading-state and entry-gate limitations remain documented in RESEARCH.md. No frame-rate, asset-loading or production accessibility certification is claimed.
