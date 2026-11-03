# Website Assets

A research workspace for distinctive websites and independently runnable, reusable frontend motion components. Repository documentation and code comments are written in English.

## REA verification comes first

The current ChatGPT Work execution container can start REA's CLI and MCP server, but its process namespace and local browser IPC do not support the full analysis workflow. This repository uses a standard GitHub-hosted Ubuntu runner to execute the original REA CLI with its normal checks.

The **Verify REA** workflow installs the pinned dependency lock, provisions the matching Playwright Chromium build, and runs two local fixtures:

1. JavaScript application analysis with retained JSON evidence and parse-coverage checks.
2. A browser scenario that clicks a local fixture button and verifies the resulting DOM.

The workflow retains stdout, stderr, exit codes and the final verification report. A failed or incomplete check is not reported as success. No model API key or extra GitHub secret is needed for these fixtures.

Website collection and reconstruction stay paused until the verification workflow passes. Running a workflow on a GitHub runner does not remove or change the restrictions of the ChatGPT Work container.

## Run

Open **Actions → Verify REA → Run workflow**. The workflow also starts when its verification files are committed to the default branch. Download the `rea-verification` artifact to inspect the original evidence and `verification.json`.

GitHub Actions execution is subject to the repository's existing Actions availability and usage allowance. This project does not enable paid services or change billing settings.

## Planned website research layout

Each site will have independent `01-original`, `02-analysis`, `03-assets`, `04-reconstruction`, `05-components`, `06-demo` and `README.md` paths. Third-party references and original assets remain distinct from independently implemented components; licenses and attribution are recorded per item.
