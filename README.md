# Website Assets — Motion Atlas

25 distinctive website references with independently written reusable interaction studies. English research, code and integration notes.

**Version 0.3 verified:** 58/58 REA browser scenarios, 17/17 Node checks and 41/41 source comparisons passed. [Verification](STUDY_VERIFICATION.md).

![Motion Atlas gallery](gallery-preview-v3.png)

## Research and components

- [Batch two: references 16–25](BATCH_TWO.md): terrain, GLSL grain/distortion, horizontal comic, camera narrative, infinite posters, sound, runner, SDF bubbles, isometric navigation and engineering drawings.
- [Consolidated research](RESEARCH.md) and [delivery overview](OVERVIEW.md).
- [Component API](COMPONENT_API.md) and directly browsable [module source](components/).
- [Original renderer limitations](BROWSER_LIMITATIONS.md).
- [Machine-readable checksums and coverage](verification-manifest.json).

These are component-level technique reconstructions. Exact original routes, artwork, complete timelines, character rigs, physical cloth and production datasets are outside the verified scope. Every new study records the implementation difference. Original code is MIT-licensed; original-site reference material retains its own rights.

## Run

```sh
python3 -m zipfile -e study-source.zip .
python3 -m http.server 8000
```

Open `http://localhost:8000`. The gallery has no runtime npm dependency. Shared modules are directly available; the 25 full site directory trees, six research sections each, are inside `study-source.zip`.

`mount(host)` returns `destroy()`. Keep shared module dependencies and include `styles.css`. New shader modules need WebGL; sound requires an explicit action. Motion preference, pause, offscreen suspension and cleanup follow the shared runtime.

## Reproduce verification

```sh
node --test component-tests.mjs
python3 package_studies.py verify
```

The GitHub workflow uses pinned REA 6.8.0 on a standard Ubuntu runner. The component archive is `component-verification.zip`; original second-batch evidence is `batch-two-reference-evidence.zip`. Artifact files are preserved in the repository as well as Actions, so the research does not rely on Actions retention.
