# Website Assets — Motion Atlas

Research of 25 distinctive websites, with original reusable frontend interaction studies. All documentation and code comments are in English.

**Batch two (16–25):** ten new prototypes and [author-backed research notes](BATCH_TWO.md). Expanded verification is pending.

**Previous version 0.2 verified:** 36/36 REA browser scenarios, 14/14 unit checks and 29/29 published source comparisons passed. Search, shareable links, demand-driven rendering and stronger cleanup are included. [Upgrade notes](UPGRADE_NOTES.md) · [Verification report](STUDY_VERIFICATION.md).

**Start here:** [Delivery overview and categorized component index](OVERVIEW.md) — practical uses, reuse requirements, file locations, verification scope and prioritized follow-up work. [Machine-readable verification manifest](verification-manifest.json).

![Motion Atlas gallery](gallery-preview-v2.png)

## What is implemented

- 25 independent runnable studies, from editorial transitions and variable typography to WebGL particles, projected 3D worlds, flow fields, line matching and dithering.
- Directly browsable shared module source in `components/`, with a common `mount()` / `destroy()` lifecycle.
- An interactive gallery: `index.html`, `index.mjs`, `registry.mjs` and `styles.css`.
- A complete `study-source.zip` package with all 25 separate research directories, evidence, analysis, original asset notes, standalone demos, reusable exports and reproduction instructions.
- Bounded REA captures of the first 15 original public pages, with completeness and unverified production details recorded honestly.

This is a first-pass component library and research package, not a complete or pixel-identical reconstruction of all 15 websites. See [the findings](RESEARCH.md) for exact coverage and differences.

## Run locally

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The supplied gallery and components use native browser APIs and require no npm installation.

To expand all per-site research folders, standalone demo pages and reference screenshots:

```sh
python3 -m zipfile -e study-source.zip .
```

Then serve the root and open a standalone page under `sites/<site>/04-reconstruction/index.html`.

## Research and reuse

- [Research findings and observed technology](RESEARCH.md)
- [Specific original-site renderer limitations](BROWSER_LIMITATIONS.md)
- [Component API and integration](COMPONENT_API.md)
- [Original project catalog](WEBSITE_CATALOG.md)
- [Pinned REA runtime verification](REA_VERIFICATION.md)
- [Component verification report and preserved evidence](STUDY_VERIFICATION.md)
- [First original-site capture run](https://github.com/zczxz3/website-assets/actions/runs/41750252643)
- [Desktop/mobile component verification run](https://github.com/zczxz3/website-assets/actions/runs/41761319184)

The original studies use procedural artwork, synthesized sound and clearly labeled synthetic data. Original implementation code is MIT-licensed; reference screenshots and third-party materials keep their own rights. GT Flexa's commercial font, site photography, original game assets, sound recordings and production geographic datasets are not bundled as reusable material.

## Verification

`node --test component-tests.mjs` runs 14 algorithm, scheduling, catalog and data checks. CI verifies published source parity before expanding the deterministic source ZIP, then runs 36 real REA browser scenarios: 30 desktop/mobile studies, two normal-motion studies, two gallery navigation cases, one lifecycle case and one runtime fixture containing eight assertions. The full evidence is preserved in `component-verification.zip`.

For a fully expanded checkout, `python3 package_studies.py build` rebuilds and verifies the source bundle. `python3 package_studies.py verify` checks published-file parity without changing files.

REA 6.8.0 runs on a normal GitHub-hosted Ubuntu runner with its standard ownership checks. The current Work container's process namespace and browser IPC limitations remain unchanged. No additional model API key or repository secret is required.
