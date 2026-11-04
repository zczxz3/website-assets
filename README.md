# Website Assets

A research workspace for 15 distinctive websites and independently runnable, reusable frontend motion components. Documentation and code comments are written in English.

## Current status

**REA verification passed** on the GitHub-hosted Ubuntu runner. REA 6.8.0 completed JavaScript analysis and a Chromium interaction scenario with measured DOM changes and confirmed browser cleanup.

- [Successful verification run](https://github.com/zczxz3/website-assets/actions/runs/41742962494)
- [Verification results and original evidence](REA_VERIFICATION.md)
- [15-site catalog, priorities and component targets](WEBSITE_CATALOG.md)

Website research is now ready to begin. The catalog is a study brief; no public website is marked as captured or reconstructed yet.

## Run REA verification

Open **Actions → Verify REA → Run workflow**. Changes to the workflow, verification script or dependency lock also trigger it. The workflow installs locked dependencies, provisions matching Playwright Chromium, and runs a small local JavaScript and browser fixture. No model API key or extra repository secret is required.

The `rea-verification` artifact retains original stdout, stderr, exit codes, command records and `verification.json`. Required checks fail on errors or incomplete evidence. A preserved report archive is committed with the verification notes.

The current ChatGPT Work container can start the CLI and MCP server but cannot perform the full workflow because of process namespace and browser IPC restrictions. REA runs on the standard GitHub runner with its normal checks. This does not change the Work container's restrictions.

## Research structure

Each site will have `01-original/`, `02-analysis/`, `03-assets/`, `04-reconstruction/`, `05-components/`, `06-demo/` and `README.md`. See the catalog for the contents and completion criteria.

The goal is a collection of composable frontend components with runnable demos. Attribute references, record asset licenses, and use original or explicitly reusable material for independent implementations.
