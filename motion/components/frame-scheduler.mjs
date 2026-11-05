// One owned frame at a time. Paused scenes render only when invalidated.
export function createFrameScheduler({request, cancel, draw, isActive, isContinuous}) {
  let id = null, previous = null, elapsed = 0, dirty = true, destroyed = false;
  function schedule() {
    if (destroyed) return;
    if (!isActive()) {
      if (id !== null) cancel(id);
      id = null;
      previous = null;
      return;
    }
    if (id === null && (dirty || isContinuous())) id = request(tick);
  }
  function tick(timestamp) {
    id = null;
    if (destroyed || !isActive()) { previous = null; return; }
    const dt = previous === null ? 0 : Math.min(.04, Math.max(0, (timestamp - previous) / 1000));
    previous = timestamp;
    elapsed += dt;
    dirty = false;
    draw(elapsed, dt);
    if (!isContinuous()) previous = null;
    schedule();
  }
  return {
    invalidate() { if (!destroyed) { dirty = true; schedule(); } },
    destroy() { destroyed = true; if (id !== null) cancel(id); id = null; previous = null; },
  };
}
