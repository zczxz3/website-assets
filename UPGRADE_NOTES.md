# Motion Atlas 0.2 — Usability and runtime hardening

Implemented on 2026-11-04 (Asia/Shanghai). **Verified:** 36/36 REA browser scenarios, 14/14 Node checks and 29/29 source comparisons passed. [Successful run](https://github.com/zczxz3/website-assets/actions/runs/41761319184).

## Changes

1. Search the 15 studies by name, technique and multiple keywords; intersect results with category filters. A result count, empty state and reset action keep the list usable on desktop and mobile.
2. Switching studies updates `?study=ID`. Shareable links, page titles, back/forward restoration and stale-import guards retain the selected scene. The gallery remounts after a back-forward cache restoration.
3. Canvas/WebGL scheduling stops outside the viewport and in background documents. Paused scenes render on demand; held input remains interactive. Suspended time is excluded when resuming.
4. FLIP transitions tolerate repeated closing and teardown during an animation, without leaving a clone or writing late state into the host. Native dialog focus returns to its trigger.
5. Terrain inputs are validated before DOM allocation, cloned, labeled correctly and mapped using shared linear min/max. Geometry is rebuilt only when data blending changes.
6. Vehicle and tram inputs clear on focus loss, window blur, pointer cancellation and key release outside the host. The ink study uses native scrolling rather than consuming wheel events.
7. Search labels, a skip link, live status text and larger touch controls improve navigation. This is not a complete accessibility audit.
8. A deterministic packaging command and CI parity check prevent the directly browsable module source from drifting from the tested ZIP.

## Verification scope

The upgraded suite contains 36 REA browser scenarios: 30 desktop/mobile component checks, one gallery lifecycle scenario, two search/filter scenarios, two normal-motion scenarios and one real-browser runtime fixture with eight contract assertions. Node checks cover 14 algorithm, scheduling, catalog and data-validation cases. All passed in the run linked above. See [the verification report](STUDY_VERIFICATION.md) for evidence hashes and the precise limits of these checks.

The renderer limitations of the original Igloo, Bruno Simon and The Boat scenes remain documented in [BROWSER_LIMITATIONS.md](BROWSER_LIMITATIONS.md). This update strengthens the independent library; it does not establish complete original-site fidelity or measured frame-rate gains.
