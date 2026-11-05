# Repository layout and migration

The flat root at `cdaabdccfa9e4391e37450ef197e22e5f4eea83d` is organized by feature. This is a physical path migration, with build and workflow entrypoints updated; the editor repository is unchanged.

| Previous path | Current path |
| --- | --- |
| `index.html`, `index.mjs`, `styles.css`, `components/` | `motion/` |
| `BUTTON_*.md`, `button-*`, `buttons.*`, `verify_buttons*` | `buttons/` |
| `FOUNDATION_*.md`, `foundation*` | `foundation/` |
| `QUEUE_*.md`, `queue*`, `frontend-research-queue.csv` | `queue/` |
| `STUDIO_*.md`, `studio*` | `studio/` |
| `LIBRARY*.md`, `library*`, `consumer.html`, runtime `.tgz` | `library/` |
| Distribution policy, overview and REA environment results | `docs/` |
| Completed `distribution-migrate*` records and root workflow copy | `maintenance/` |

The complete mapping, including metadata and workflow files, is [path-migration.json](path-migration.json). A new root `index.html` is a local launcher. The original Motion Atlas entrypoint is now `motion/index.html`.

## Commands and imports

Run the npm tasks in the root README from the repository root. To invoke an existing feature tool directly, enter its directory first, for example `cd queue` followed by `node queue-pack.mjs`. Shared REA dependencies remain at root `node_modules/`, and the upstream test checkout remains at root `studio-fixture/`.

Applications importing directly from a checkout must update paths: `components/core.mjs` becomes `motion/components/core.mjs`; `buttons.mjs` becomes `buttons/buttons.mjs`; `queue-components.mjs` becomes `queue/queue-components.mjs`. Imports from the installable `@zczxz3/website-assets-motion` package are unchanged. Component implementations and the published runtime tarball are unchanged by this migration.

The current builders run inside their feature directories. Distribution archives retain their own flat internal filenames so extracted demos do not require the repository's directory hierarchy. Foundation and Queue source packs and the Motion source ZIP are refreshed when included sources change; original third-party captures are not added.

## Evidence

Verification manifests and Release evidence are historical records tied to their original source revisions. Their embedded filenames and hashes deliberately retain that original meaning; use the migration map to locate the corresponding current source. Do not reinterpret those hashes as proof of current-path browser execution.

`maintenance/` is an audit archive. Its old scripts assume the earlier flat root and must not be run as current migration tools. Active workflows live only under `.github/workflows/`.
