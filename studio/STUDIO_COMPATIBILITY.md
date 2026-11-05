# Studio compatibility — verified 2026-11-04

> Repository layout: source, demos and direct commands in this guide are relative to `studio/`. Run direct commands after `cd studio` from the repository root; root npm tasks select that directory automatically. See [migration notes](../docs/REPOSITORY_LAYOUT.md).

> Historical evidence: results below refer to their recorded source revision. Current directory-migration checks are reported separately in [organization verification](../docs/ORGANIZATION_VERIFICATION.md).

[Successful workflow 41792728119](https://github.com/zczxz3/website-assets/actions/runs/41792728119). Tested assets revision: `8d71c1a100eb679131002d4d76df574af8c3b4be`. The Studio repositories were checked out at fixed revisions and were not modified by this integration.

| Consumer revision | Checks passed | Actual scope |
|---|---|---|
| main `3f989b2be833f468db600c24aa49194abf5f918e` | 33/33 | Validate and register all 31 ZIP modules, save/reopen their manifests; open/edit/export the native shelf; enforce runtime/planned distribution boundaries |
| feat/portfolio-workbench `737dd6a883902d580d7fd8bab60b78bbf2697bcd` | 33/33 | All 31 ZIPs through actual insertModule: duplicate instances, nested-page insertion, one shared CSS file, one correct reference per page, undo/redo, source comments preserved, text edit, save/reopen/export; native shelf and catalog checks |
| fix/module-roundtrip `88d847eb8234dc821a6ef9e2f618a5d823d0ac93` | 33/33 | Same repaired insertion and round-trip contract |

Every matrix job also rebuilt the collection and compared its SHA-256 with the committed archive. Original JSON test reports were downloaded and their GitHub artifact digests verified; see `studio-compatibility-results.json`.

The 31 modules reuse 30 existing Foundation implementations and the existing Queue project card. This is a compatible distribution and contract check, not 31 new component implementations. The collection is 135,639 bytes and includes individual installable ZIPs, a two-page native project, license, catalog and a separate runtime tarball. The runtime tarball is not a Studio static module.

## What to use

For cross-page insertion, use one of the verified repaired Studio branches or a later revision containing that fix. Main still lacks the unified insertModule export and has known legacy insertion limitations; its 33 passes do not assert those limitations are fixed. This work does not merge branches or change the Studio application.

Extract `studio-components.zip`, then install one file from `installable/` using **模块 → ＋ 安装模块 ZIP**. For an already-composed editable shelf, open `studio-shelf.mws.json` through **打开项目**. No npm installation is required for these static modules.

## Limits

These are source/core integration tests, not new browser rendering or assistive-technology tests. Earlier Foundation/Queue browser records are separate evidence against their recorded revisions. Custom property panels, JS module lifecycle hooks, automatic upgrades, remote catalogs and runtime effect installation are not present in the current Studio interface. E01–E20 remain planned; the installable catalog does not claim otherwise.

No online deployment was configured.
