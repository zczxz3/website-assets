# Website Assets — Technique Studies and Motion Components

25 site-inspired technique studies (not reconstructed websites), 16 button resources and 26 foundation resources, with independently written reusable interaction studies and installable Studio modules. Lists overlap; these are topic counts, not unique-site counts. English research, code and integration notes.

## Start here

[Independent package consumer verification](LIBRARY_VERIFICATION.md): strict TypeScript compilation and two Chromium consumer scenarios passed.

- [Installable package and typed API](LIBRARY.md): 20 original button presets plus menu, async-task and reorder bindings. Install `zczxz3-website-assets-motion-0.4.0.tgz` from the repository root; npm registry publication is not claimed.
- Study implementations are directly available in `components/`. **No source ZIP extraction is needed** to import them. Per-site folders are reference wrappers around shared modules, not independent reconstructed sites.
- [Evidence and licensing boundaries](DISTRIBUTION.md). Reference-site fidelity, independent consumer integration and demo regression are different verification claims.

**Version 0.3 demo regression (not reference-site fidelity):** 58/58 REA browser scenarios, 17/17 Node checks and 41/41 source comparisons passed. [Verification](STUDY_VERIFICATION.md).

![Motion Atlas gallery](https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/gallery-preview-v3.png)

## Button topic

[Button Atlas research](BUTTON_RESEARCH.md) adds 20 original native-button components across 10 families. [Component contracts and API](BUTTON_COMPONENTS.md). Start a local HTTP server and open `buttons.html`; every button file is directly available in the repository and needs no source ZIP extraction. [Button verification](BUTTON_VERIFICATION.md): 45 Playwright scenarios, 2 REA scenarios and 7 Node tests passed. Original reference capture limitations are recorded separately from the 25-site checks below.

## Modular Website Studio foundations

[Foundation guide](FOUNDATION_GUIDE.md) adds **30 installable static modules**: 20 native fields, disclosures, cards, navigation, feedback, data and layout patterns, plus 10 Button Atlas adaptations. [Review of 26 resources](FOUNDATION_RESEARCH.md) separates usable static sources, framework/runtime adapters, generators and unresolved licenses.

Download [foundation-pack.zip](foundation-pack.zip), extract it, then install one ZIP from `installable/` using Studio's **模块 → ＋ 安装模块 ZIP**. Or open [foundation-showcase.mws.json](foundation-showcase.mws.json) as a complete editable project. Run a local server and open `foundation.html` for filtering, live theme/HTML editing and customized module ZIP downloads. Exported modules have no runtime dependencies; original source and MIT notices are included.

[Foundation verification](FOUNDATION_VERIFICATION.md): **33 Studio core tests, 63 Chromium scenarios and 2 REA scenarios passed**, including real UI installation of all 30 modules and a save/reopen/export round trip. This pack does not enable script modules in Studio.

![Foundation workbench](https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/foundation-preview.png)

## Frontend Queue — Batch 03

[50-target queue and English analysis](QUEUE_RESEARCH.md): 23 basic, 17 advanced and 10 full-site targets. [20 new effect contracts](QUEUE_EFFECTS.md) add targets, triggers, parameters, export recipes and reduced-motion requirements; their implementations remain queued. Six bounded original studies connect **menu, loading, selection and spinner controls → project ordering → an editable portfolio**. The remaining 41 implementations are queued; React Bits, GSAP and Lusion are reference-only.

Open `queue.html` with a local HTTP server. Edit project data, drag or use keyboard controls, save/reopen edits, and export linked offline HTML pages or a Studio project. [Source pack](queue-source.zip), [ready-made website](queue-website.zip), [Studio project](queue-portfolio.mws.json), [installable static card](queue-card.zip), and [verification](QUEUE_VERIFICATION.md). This is an original static portfolio recipe, not a complete port of the upstream Next.js application.

[Queue verification](QUEUE_VERIFICATION.md): **10 Node tests, 2 Studio core tests, 15 Chromium scenarios and 2 REA scenarios passed**. [Reusable API examples](QUEUE_COMPONENTS.md).

![Queue Lab](https://github.com/zczxz3/website-assets/releases/download/evidence-v0.3/queue-preview.png)

## Research and components

- [Batch two: references 16–25](BATCH_TWO.md): terrain, GLSL grain/distortion, horizontal comic, camera narrative, infinite posters, sound, runner, SDF bubbles, isometric navigation and engineering drawings.
- [Consolidated research](RESEARCH.md) and [delivery overview](OVERVIEW.md).
- [Component API](COMPONENT_API.md) and directly browsable [module source](components/).
- [Original renderer limitations](BROWSER_LIMITATIONS.md).
- [Machine-readable checksums and coverage](verification-manifest.json).

These are component-level technique reconstructions. Exact original routes, artwork, complete timelines, character rigs, physical cloth and production datasets are outside the verified scope. Every new study records the implementation difference. Original code is MIT-licensed; original-site reference material retains its own rights.

## Run

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. The gallery has no runtime npm dependency. Shared modules are directly available; the 25 research directory trees, six research sections each, are inside `study-source.zip`.

`mount(host)` returns `destroy()`. Keep shared module dependencies and include `styles.css`. New shader modules need WebGL; sound requires an explicit action. Motion preference, pause, offscreen suspension and cleanup follow the shared runtime.

## Reproduce verification

```sh
node --test component-tests.mjs
python3 package_studies.py verify
```

The GitHub workflow uses pinned REA 6.8.0 on a standard Ubuntu runner. The component archive is `component-verification.zip`; original second-batch evidence is `batch-two-reference-evidence.zip`. Original-demo evidence is preserved in the evidence-v0.3 Release. Third-party capture archives are no longer distributed from the current branch. Use the package directly, or use a shallow clone for local study; no online deployment is required.
