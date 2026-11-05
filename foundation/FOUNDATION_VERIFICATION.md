# Foundation verification

> Repository layout: source, demos and direct commands in this guide are relative to `foundation/`. Run direct commands after `cd foundation` from the repository root; root npm tasks select that directory automatically. See [migration notes](../docs/REPOSITORY_LAYOUT.md).

> Historical evidence: results below refer to their recorded source revision. Current directory-migration checks are reported separately in [organization verification](../docs/ORGANIZATION_VERIFICATION.md).

**Passed.** 33 Studio core tests, 63 Chromium browser scenarios and 2 unmodified REA scenarios completed successfully.

- [Successful workflow run](https://github.com/zczxz3/website-assets/actions/runs/41772507919)
- [Tested source commit](https://github.com/zczxz3/website-assets/tree/390c43867a478c4d5bec0682c5f42b58abb689a8)
- [Pinned Modular Website Studio](https://github.com/zczxz3/modular-website-studio/tree/3f989b2be833f468db600c24aa49194abf5f918e)
- Machine-readable results: `foundation-verification-manifest.json`.
- Preserved original runner artifact: `foundation-verification.zip`. Its reports remain available after Actions retention expires.

## Coverage

| Check | Result | What was exercised |
|---|---:|---|
| Pinned Studio production build | Passed | TypeScript and Vite build, without modifying Studio core |
| Deterministic collection archive | 222 entries | All source files, 30 installable ZIPs, component folders and editable showcase |
| Studio core | 33 tests | Parse each actual ZIP, install, reject duplicate module IDs, insert two instances, edit leaf text and instance style, save/reopen, export; full showcase import; customized UTF-8 ZIP; rejected script/dependency/permission inputs |
| Individual module browser cases | 60 | All 30 modules at 1280 and 390 CSS pixels; native pointer/touch and keyboard behavior where applicable; no horizontal overflow; reduced-motion animation disabled |
| Workbench browser cases | 2 | Search/filter, token editing, HTML editing, custom ZIP download and decoding, disallowed edit rejection, reset |
| Real Studio UI flow | 1 | Install and insert all 30 ZIPs through the actual UI, visually edit card text, modify a source style, save to disk, reopen that file, export the website, serve exported bytes without Studio and exercise native controls |
| REA CLI | 2 | Standalone native disclosure open/close with keyboard at 390 and 1280 pixels |
| Evidence integrity | 65 terminal screenshots | Independently recomputed screenshot SHA-256 values after download, plus all 11 recorded source hashes compared against delivered source |

Node: v24.22.1. REA: 6.8.0; matching Playwright/Chromium versions are recorded in `playwright-runtime.json` inside the evidence archive. The pinned Studio build emits an existing large-bundle warning for its editor chunks; it still exits successfully.

## Files and package sizes

`foundation-pack.zip`: **309,649 bytes**, containing the runnable workbench, 26-source review, 30 independent component directories, 30 installable ZIPs and a native editable project.

```text
SHA-256 e005ad58b6d3e6c78a3096c1f9c7d043856600628220897b56a558e1c15b7951
```

`foundation-verification.zip`: **4,998,992 bytes**.

```text
SHA-256 77ea1aaac21d92db340ff2e11c530eaf4e393259d605c958e4927c3a4f55e5ab
```

The browser-generated custom ZIPs and the saved/exported Studio project are retained inside the evidence archive. MIT notices are embedded in exported CSS as well as the per-module LICENSE files.

## Limits

This validates the pinned Studio version and Chromium on the Linux Actions runner. Mobile cases emulate viewport/touch; Safari, Firefox, real mobile hardware, assistive-technology use, full WCAG conformance, memory/FPS benchmarks and production backend behavior are not certified by these checks. Buttons and feedback patterns are explicitly static illustrations until application logic connects them. Links and example values require project-specific edits.

The 26 original resources were reviewed as public pages and indexes, not exhaustively browser-tested or copied. The independent modules are the verified executable deliverable. The existing Button Atlas retains the JavaScript effects that do not fit Studio's static v1 format.

Earlier runs `41771865875` and `41772143491` stopped at test-fixture mismatches (byte input, then insignificant CSS value whitespace). They are superseded by the successful run above; no failed run is counted as passing.

![Desktop workbench](https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/foundation-preview.png)
