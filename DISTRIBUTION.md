# Distribution, evidence and rights

This repository contains original technique studies, not 25 restored websites. Per-site HTML and re-export wrappers point at shared implementations. Small wrapper files are navigation/organization, not evidence of complete reconstruction.

## What tests establish

1. Demo regression: original examples render and respond to the tested interactions.
2. Consumer integration: the packed public API installs into a separate application and passes the declared browser/type checks.
3. Reference fidelity: not established. No verified pixel, timing, route or content parity with the original sites is claimed.

Passing one category does not imply the others. Mobile tests use Chromium emulation. Browser and assistive-technology coverage remains limited.

## Storage policy

Historical original-demo evidence and preview images are moved from the default branch to the `evidence-v0.3` Release. Small installable/source packs stay where current verification requires them. New evidence belongs in Actions artifacts or Releases, not Git source commits. `distribution-migration.json` records paths and original hashes.

Third-party reference screenshot archives are removed from the default branch and are not republished as Release assets. The study source archive is sanitized to retain source, analysis and original URLs, without reference images. Unknown rights are not treated as MIT.

Existing Git history still contains earlier binaries and reference captures. This migration does **not** erase history or guarantee a small full-history clone. Use `git clone --depth 1` or the small versioned package. A complete history purge is a separate disruptive operation affecting existing clones and commit links; it has not been performed. Adding Git LFS now would not by itself remove historical blobs, and is unnecessary for code-only package consumers.

MIT covers our original code and procedural demonstration graphics. It does not license third-party websites, screenshots, trademarks, fonts, audio, models or data. Original sources are linked for research; no blanket redistribution permission is asserted.

## Online preview

The distribution workflow prepares a code-only gallery artifact. GitHub Pages must be enabled for Actions deployment before a live hosted gallery can be claimed. The release also includes `gallery.zip`, which can be served as static files. No external analytics or third-party reference screenshots are included.
