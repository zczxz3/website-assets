# Package consumer verification

> Repository layout: source, demos and direct commands in this guide are relative to `library/`. Run direct commands after `cd library` from the repository root; root npm tasks select that directory automatically. See [migration notes](../docs/REPOSITORY_LAYOUT.md).

> Historical evidence: results below refer to their recorded source revision. Current directory-migration checks are reported separately in [organization verification](../docs/ORGANIZATION_VERIFICATION.md).

[Workflow 41790254974](https://github.com/zczxz3/website-assets/actions/runs/41790254974) passed on 2026-11-04.

- Packed the original public API, then installed its tarball into a fresh consumer directory.
- TypeScript 5.9.3 strict NodeNext compilation passed, including an expected rejection of an invalid effect name.
- Chromium at 1280 and 390 pixels passed: magnetic-button activation, menu keyboard opening and Escape from panel, actual JSON fetch success, idempotent button destruction, preserved host children and detached menu listeners. Reduced motion was enabled.
- The sanitized study source passed 41 source comparisons and retained 25 research directory structures.

These are two focused consumer scenarios, not tests of all presets, framework adapters, browsers or reference-site fidelity. Reorder behavior remains covered by the earlier Studio/Queue suite, not this new consumer fixture.

The delivered tarball differs from the tested tarball only in README installation instructions. Code, CSS, declarations and package metadata are byte-identical. See `library-verification.json` for hashes. The Actions artifact contains original screenshots, results, package and a static gallery ZIP.

Evidence migration is recorded in DISTRIBUTION.md. Online deployment was declined by the user. The consumer CI workflow is read-only. Installation is supported from the repository tarball; npm registry and CDN publication are not claimed.
