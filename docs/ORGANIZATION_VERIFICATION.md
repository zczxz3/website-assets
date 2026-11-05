# Repository organization verification

Date: 2026-11-05. Base: `cdaabdccfa9e4391e37450ef197e22e5f4eea83d`.

## Delivered change

154 previously tracked files are preserved at their mapped paths; 138 paths move into feature or documentation directories. Root file count falls from **114 to 6**. The new root `index.html` is a local launcher. The original Motion Atlas remains in `motion/index.html`. See [the complete path mapping](path-migration.json).

The Studio collection retains the same 31 static module IDs and native two-page shelf. The 20-button / 3-binding runtime tarball is byte-identical to the prior distribution. The four public runtime code/CSS files were compared byte-for-byte with its contents. No editor changes, deployment, Git history rewrite or new reconstructed-site claims are included.

## Executed checks

| Check | Result |
| --- | --- |
| Existing Node regression suites | 34/34 passed: Motion 17, Buttons 7, Queue 10 |
| Actual Studio core contract suites | 68/68 passed: Foundation 33, Queue 2, Studio collection 33 |
| Studio test source inputs | 12 core/package/config inputs matched Git blob hashes from pinned main `3f989b2be833f468db600c24aa49194abf5f918e` |
| Current local links, static module imports, JavaScript/Python syntax and archive safety | `npm run check` passed |
| Motion source/archive comparisons | 41/41 passed; 281 archive entries, 25 research directories |
| Foundation deterministic pack | 222 archive entries and 30 individual module ZIPs verified |
| Repeated deterministic builds | 7 distributions byte-identical before/after rebuild |
| Local HTTP smoke checks | 15/15 launcher, gallery, source, catalog and download routes returned HTTP 200 |
| Workflow syntax | 11 YAML files parsed; 53 shell blocks passed `bash -n` |

The Studio tests used its unmodified pinned main core, with dependencies already available locally. The main API has the legacy cross-page insertion limitation documented in [Studio compatibility](../studio/STUDIO_COMPATIBILITY.md); the matrix tests retain separate repaired-branch coverage. Passing main's tests does not remove that limitation.

Evidence: [summary](organization-results.json), [Studio test output](../studio/organization-core-results.json), [matched source inputs](../studio/organization-source-pin.json), [rebuild checksums](organization-distributions.json).

## Boundaries

Browser UI, REA capture and screenshot suites were **not rerun locally** for this directory migration. Historical verification reports keep their original source revisions and hashes. The updated GitHub workflows provide those execution paths but are not counted as completed runs here.

The repository checker follows real static ES-module imports instead of treating generated export code strings as source imports. Queue route tests cover exported pages separately from repository links, so moving the gallery cannot silently redirect an exported portfolio's Home links.
