# Frontend Queue verification

**Passed:** 8 Node tests, 2 Studio core tests, 15 Chromium browser scenarios and 2 unmodified REA scenarios.

- [Successful workflow run](https://github.com/zczxz3/website-assets/actions/runs/41778681401)
- [Tested source](https://github.com/zczxz3/website-assets/tree/07e1155ad94811f2eb4c14a72213485b854e14e4)
- [Pinned Studio](https://github.com/zczxz3/modular-website-studio/tree/3f989b2be833f468db600c24aa49194abf5f918e)
- Original reports, screenshots and exported projects: [queue-verification.zip](queue-verification.zip)
- Machine-readable hashes: [queue-verification-manifest.json](queue-verification-manifest.json)

## Scope

| Check | Result | What was verified |
|---|---|---|
| Model and export | 8 tests | Source-backed reordering; undo/redo; invalid imports; route completeness; text escaping; HTTPS destination rules; ZIP metadata |
| Actual Studio core | 2 tests | Open/edit/save/reopen/export a seven-file project; install and reject duplicate static-card modules |
| Workbench and exports | 14 scenarios | At 1280 and 390 px: 30-item filters; native choices; three menu variants; keyboard focus; real request success/failure/retry/cancel; single-flight; dots/wave; reduced motion; mouse and emulated-touch drag; shelf addition; keyboard ordering; editable data and cover colors; save/open; offline linked pages; invalid input preservation |
| Actual Studio UI | 1 scenario | Open the configured project; change its title; install and insert the ZIP card; save; reopen; export; preserve article and all pages |
| REA CLI | 2 scenarios | Standalone menu open/close at 390 and 1280 px, with keyboard activation and original DOM/event/screenshot evidence |
| Integrity | 17 screenshots | Recomputed terminal screenshot hashes and compared all 17 recorded source hashes against delivered files |

The Studio production build passed. Runtime: Node 24.22.1, REA 6.8.0, and matching Playwright Chromium; exact browser version and path are inside `playwright-runtime.json` in the original archive. No Studio core changes were made.

## What this delivery means

Six targets have **bounded, independent implementations**: B07–B10, A05 and the F03 portfolio recipe. Twenty-one targets remain queued; A09, A10 and F10 remain reference-only. The 28 upstream repository heads are pinned, but upstream applications have not been built or completely reconstructed. See [English research and acceptance criteria](QUEUE_RESEARCH.md) and [component APIs](QUEUE_COMPONENTS.md).

The initial run `41777673420` passed 14 browser scenarios and both core tests but exposed a test locator tied to the old title and an REA instrumentation incompatibility with an opaque-origin iframe. The title locator was corrected; REA now tests an independent control page. The workbench keeps its opaque preview sandbox, and the full preview/export flow remains covered by Chromium tests. No failures from that run are counted as passes. Runs `41778170700` and `41778432644` were cancelled after screenshot collection waited on an offscreen iframe animation. Static screenshot capture now uses Playwright’s bounded animation handling; interaction assertions still run before screenshots.

Mobile means Chromium touch/viewport emulation, not physical iOS/Android hardware. Safari, Firefox, assistive technology audits, full WCAG conformance, measured performance budgets, backend services and the entire original Next.js portfolio are outside these results. Dragging has no automatic edge scroll; move buttons and arrow keys cover long lists.

## Downloads

- [Source and 30 research folders](queue-source.zip): **166,695 bytes**, 51 entries.
- [Ready-made offline website](queue-website.zip): linked HTML and CSS, no scripts or remote assets.
- [Editable Studio project](queue-portfolio.mws.json).
- [Installable original project card](queue-card.zip).
- Evidence archive: **1,496,302 bytes**.

```text
source SHA-256   2afc1ff61eff19e5dce553b5be13ef5051218b9f1b8736588ae5f14db3a2a434
evidence SHA-256 0b31c9ebcc46e7ffe340724883799fb71c2da0fa2bc9cfaeae86f44b070ef228
```

![Queue Lab](queue-preview.png)
