# Website Assets for Modular Website Studio

## Confirmed interface

Reviewed 2026-11-04 against the actual source:

| Studio revision | Confirmed contract |
|---|---|
| main `3f989b2be833f468db600c24aa49194abf5f918e` | Static module ZIP and native project v1; cross-page insertion has known legacy limitations |
| feat/portfolio-workbench `737dd6a883902d580d7fd8bab60b78bbf2697bcd` | Unified insertModule transaction, per-page stylesheet references, encoded module CSS paths and shared manifest validation |
| fix/module-roundtrip `88d847eb8234dc821a6ef9e2f618a5d823d0ac93` | Same repaired static module insertion contract |

Sources: Studio `docs/formats.md`, `src/core/types.ts`, `src/core/modules.ts`, `src/core/module-validation.ts`, `src/core/io.ts`, `src/App.tsx` and preview implementation. Branch pins are research evidence; they are not a request to merge or modify Studio.

## Use locally

1. Extract `studio-components.zip`.
2. In Studio choose **模块 → ＋ 安装模块 ZIP** and select one ZIP from `installable/`.
3. Choose a parent container and click **＋ 添加到页面**. Edit text and styles, save, reopen and export through Studio's normal controls.
4. Alternatively, choose **打开项目** and open `studio-shelf.mws.json`. It contains all 31 registered components across a home and nested page, with local CSS files and editable source.

The collection ZIP is a distribution archive. Studio accepts its individual module ZIPs, not the collection as one module. No npm install is required for these 31 modules. The separate runtime tarball is included for application developers; do not feed it to the module installer.

## Packaging rules

Every installable ZIP has `module.json` at its root with id, semantic version, name, description, inline html/css, permissions:[] and dependencies:{}. The 30 Foundation modules and one original portfolio card retain their existing IDs and licenses. New packaging does not count them as 31 newly implemented components.

Classes and keyframes stay namespaced. Do not embed scripts, on-event attributes, dependencies, internal data-mws-id attributes or editor overlays. Studio owns source identities, placement and insertion transactions. Component defaults remain ordinary editable HTML/CSS; the alpha has no component-specific property-panel registration API.

Studio rejects duplicate installed IDs and does not upgrade existing page instances automatically. Uninstalling removes the library registration while retaining inserted HTML/CSS. With the repaired insertModule API, repeated instances share CSS and each using page receives one correct relative link; customized CSS is retained.

## Motion boundary

Pure CSS variants in this shelf can animate in the normal document and honor reduced motion. Native controls keep their own semantics. Buttons require application-specific actions before they perform business operations.

The current Studio editing iframe does not run project JavaScript. Static-module manifests reject runtime scripts, dependencies and lifecycle hooks. Magnetic tracking, async tasks, particle/Canvas/WebGL scenes and the E01–E20 planned effects therefore are not advertised as installable Studio modules. No runtime adapter or unsupported manifest field is invented here. A future Studio runtime interface must define mount/update/destroy, stable target binding, preview/export behavior and resource disposal before these can be integrated.

`studio-catalog.json` is an offline distribution index, not an API Studio already reads. It records installable paths, checksums, editable scope and limitations, and marks runtime/planned entries as non-installable.

## Verification

Compatibility assertions are in `studio-contract.test.ts` and execute inside unmodified pinned Studio checkouts. Results are recorded after execution in `STUDIO_COMPATIBILITY.md`. Prior Foundation/Queue browser reports remain separate evidence. No online deployment is needed.
