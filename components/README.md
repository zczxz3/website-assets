# Independent motion components

Fifteen original ES modules expose `mount(host, options)`, returning `destroy()`. Keep `core.mjs` and `frame-scheduler.mjs` beside the selected module and include the root `styles.css` for the supplied presentation. No third-party runtime dependency is required.

The shared scheduler stops offscreen/background work and repaints paused scenes on demand. Dispose components before replacing their host. Cleanup releases listeners, observers, animation frames and module-owned GPU/audio resources. The shared lifecycle ignores late state writes and completes remaining cleanup even if a disposer throws.

See [the component API](../COMPONENT_API.md), [delivery overview](../OVERVIEW.md) and [upgrade notes](../UPGRADE_NOTES.md) for integration constraints and verification scope. Population defaults remain synthetic, particle rendering requires WebGL, and real variable font axes require a separately licensed font.
