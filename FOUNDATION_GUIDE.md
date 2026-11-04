# Foundation modules for Modular Website Studio

30 original static modules: 20 foundations and 10 Button Atlas adaptations. No npm install, API key, external font or runtime JavaScript is required by the exported modules. Source code and documentation are English. [Resource review](FOUNDATION_RESEARCH.md) · [Verification](https://github.com/zczxz3/website-assets/blob/main/FOUNDATION_VERIFICATION.md).

## Install

1. Download and extract `foundation-pack.zip`.
2. Open Modular Website Studio. Choose **模块 → ＋ 安装模块 ZIP**.
3. Select one ZIP from `installable/`, such as `accordion.zip`.
4. Select the intended parent container and click **＋ 添加到页面** on the installed module.
5. Edit leaf text visually or edit HTML/CSS in source. Save the project, then export the website ZIP.

The outer collection ZIP is not itself a module. Individual ZIPs have `module.json` at their root. Studio v1 does not upgrade an already-installed ID; uninstall the library entry first or use a new ID. Uninstalling keeps instances already inserted into the page. Existing instance CSS is not replaced automatically by reinstalling the same ID: edit its `modules/foundation-*.css` file or use a new ID when changing module styles.

For the full catalog, **打开项目** → `foundation-showcase.mws.json`. This is a native editable Studio project, with all 30 modules already installed. It is a convenience showcase; the individual ZIP import path is separately tested.

## Run the workbench

```sh
python3 -m zipfile -e foundation-pack.zip foundation
cd foundation
python3 -m http.server 8000
```

Open `http://localhost:8000/foundation.html`. Search or filter, select a module, change color/radius/spacing/timing, edit HTML and download a new module ZIP. Downloads use a `-custom` ID so they can coexist with the original module. Rename that ID in `module.json` when keeping multiple customized versions. The preview uses a scriptless sandbox; the downloaded module contains HTML/CSS only. The workbench is an authoring utility, not code injected into exported components.

## Component contract

Each module folder includes `module.json`, `component.html`, `component.css`, `demo.html`, `README.md` and `LICENSE`. The JSON registry includes category, source references, implementation method, supported behavior, editable fields and explicit limitations. This metadata is removed from the installable manifest.

- Root classes and keyframes are prefixed `mf-`; module IDs start `foundation/`.
- Tokens: `--mf-accent`, `--mf-ink`, `--mf-surface`, `--mf-radius`, `--mf-space`, `--mf-duration`. Set on a module root to affect one instance; edit its class rule to affect all instances of that module. Not every token changes every pattern: button radius/spacing variants and loader loop durations have deliberate local rules.
- Native text/select/checkbox/range/details controls retain normal keyboard and touch behavior. Repeated instances do not share HTML IDs or radio-group names.
- Buttons include focus, hover, pressed and disabled styling. They are visual controls without business handlers. Back arrow does not navigate, plan card does not buy, switch does not request permissions, and loaders are illustrative until application code replaces them.
- Motion stops under `prefers-reduced-motion`. Focus remains visible. Color customization can reduce contrast; review your final palette. CSS-only hover animation is not a substitute for accessible state.
- Links use example.com: replace destinations before publishing. Source exports do not persist unsaved native input values; HTML attributes/defaults are authoritative.

## Button bridge

Included: fill, border, wave, blob, shine, halo, roll, stagger, depth and back. These are small independently authored adaptations of this repository's Button Atlas patterns, with static markup and namespaced CSS.

The other Button Atlas effects remain in `buttons.mjs`: magnetic, parallax, tilt, ripple, sparks, async, undo, menu, goo and noise. Most need event/runtime code; goo needs instance-safe SVG filter IDs. They are not falsely advertised as Studio static v1 modules. Use their existing runtime API separately until Studio defines a script-module contract.

## Scope and provenance

Third-party sites are references only. This pack redistributes no third-party component snippets, icon sets, images or fonts. All pack implementations are original MIT-licensed code. The reviewed license statements are dated and scoped in `foundation-resources.json`; free access alone is not treated as a redistribution license.

## Rebuild

```sh
python3 foundation-pack.py build
python3 foundation-pack.py verify
```

The builder uses canonical registry data and deterministic ZIP metadata. `foundation-pack-manifest.json` records every collection entry's SHA-256 and byte length. Compatibility tests target Studio commit `3f989b2be833f468db600c24aa49194abf5f918e`. See the verification report for the actual tested commit, results and browser limits.
