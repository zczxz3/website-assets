# Website Assets

Reusable frontend techniques and offline component tools for **Modular Website Studio**. English source, research and integration notes. No hosted service is required.

## Choose what you need

| Goal | Open | Delivered scope |
| --- | --- | --- |
| Install editable Studio components | [Studio integration](studio/STUDIO_INTEGRATION.md) · [download pack](studio/studio-components.zip) | 31 static modules; install an individual ZIP from `installable/` |
| Open a complete editable sample | [Studio shelf](studio/studio-shelf.mws.json) | Native two-page project with the same 31 modules |
| Customize fields, cards, menus and layouts | [Foundation guide](foundation/FOUNDATION_GUIDE.md) · [local workbench](foundation/foundation.html) | 30 original static modules, included in the 31-module Studio pack |
| Use button effects in your own frontend | [Typed API and installation](library/LIBRARY.md) · [package](library/zczxz3-website-assets-motion-0.4.0.tgz) | 20 button presets and 3 DOM interaction bindings |
| Explore visual techniques | [Motion Atlas](motion/index.html) · [API](motion/COMPONENT_API.md) · [source](motion/components/) | 25 site-inspired component studies; full original websites are not reconstructed |
| Edit and export an offline portfolio | [Queue Lab](queue/queue.html) · [component API](queue/QUEUE_COMPONENTS.md) | 6 bounded studies; 41 targets queued and 3 reference-only |

Counts overlap: the Foundation modules and button adaptations are part of the Studio collection, not additional modules. Runtime JavaScript effects cannot be installed through Studio's current static-module interface.

## Local use

Clone or download this repository, then run from its root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open **http://127.0.0.1:8000/** for the local launcher. Gallery pages use browser-native modules and do not need npm dependencies. Open HTML through this local server; file URLs cannot reliably load module scripts or JSON.

For Studio, download [studio-components.zip](studio/studio-components.zip), extract it, then select one ZIP under `installable/` using **模块 → ＋ 安装模块 ZIP**. Open `studio-shelf.mws.json` using **打开项目**. The collection ZIP itself is not an individual module ZIP.

For an application consuming the runtime library:

```sh
npm install /path/to/website-assets/library/zczxz3-website-assets-motion-0.4.0.tgz
```

This is a local tarball distribution; npm registry and CDN publication are not claimed.

## Repository map

| Directory | Responsibility |
| --- | --- |
| [motion/](motion/) | 25 studies, shared lifecycle/rendering modules, gallery, study source pack and research |
| [buttons/](buttons/) | Button Atlas source, demo, contracts, references and regression tools |
| [foundation/](foundation/) | Static modules, visual workbench, deterministic pack builder and tests |
| [queue/](queue/) | Research queue, interaction recipes, portfolio editor and export tools |
| [studio/](studio/) | Integration contract, 31-module shelf, offline pack and compatibility tests |
| [library/](library/) | Typed runtime distribution, build tool and independent consumer fixture |
| [docs/](docs/) | Scope, distribution policy, overview and [directory migration guide](docs/REPOSITORY_LAYOUT.md) |
| [scripts/](scripts/) | Root task runner, repository checks and REA environment verification |
| [maintenance/](maintenance/) | Archived migration scripts and audit records; not current entrypoints |
| [.github/workflows/](.github/workflows/) | Active verification and capture workflows |

Source and its feature-specific guides, data, tests and downloadable packs stay together. [Old-to-new paths](docs/path-migration.json) cover every previously tracked file. The root no longer mixes six toolsets and their reports.

## Maintain and verify

```sh
npm test
npm run check
npm run verify:motion
npm run verify:foundation
npm run build:queue
npm run build:studio
npm run build:library
```

Node tests and repository checks do not need REA installed. Browser/REA workflows use the pinned dependencies in `package-lock.json`; install with `npm ci --ignore-scripts --omit=optional` on a supported Node version. Studio integration tests use the pinned upstream revisions recorded in [compatibility notes](studio/STUDIO_COMPATIBILITY.md).

## Evidence and reuse boundaries

[Current organization checks](docs/ORGANIZATION_VERIFICATION.md) describe this directory migration. Previous [motion](motion/STUDY_VERIFICATION.md), [button](buttons/BUTTON_VERIFICATION.md), [Foundation](foundation/FOUNDATION_VERIFICATION.md), [Queue](queue/QUEUE_VERIFICATION.md) and [consumer](library/LIBRARY_VERIFICATION.md) reports retain their original tested revisions and dates. Those are historical results, not a claim that this reorganization reran every browser scenario or reproduced original-site fidelity.

Original implementations are MIT-licensed. Third-party examples, artwork, dependencies and reference links retain their own licenses. See [distribution policy](docs/DISTRIBUTION.md). Original-demo evidence is preserved in the [evidence-v0.3 Release](https://github.com/zczxz3/website-assets/releases/tag/evidence-v0.3); no reference-site screenshot archives have been reintroduced. Git history is retained.
