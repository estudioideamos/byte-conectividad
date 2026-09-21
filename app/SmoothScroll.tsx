"use client";

import { useEffect } from "react";

/** Smooth wheel input without transforming the page or changing sticky positioning. */
export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let target = window.scrollY;
    let current = target;
    let previousTime = 0;
    let direction = 0;

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      target = window.scrollY;
      previousTime = 0;
      current = target;
    };

    const animate = (time: number) => {
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16.67;
      previousTime = time;
      target = Math.max(0, Math.min(target, document.documentElement.scrollHeight - window.innerHeight));
      const remaining = target - current;
      if (Math.abs(remaining) < 1) {
        window.scrollTo({ top: target, behavior: "instant" });
        stop();
        return;
      }
      current += remaining * (1 - Math.exp(-elapsed / 220));
      window.scrollTo({
        top: current,
        behavior: "instant",
      });
      frame = requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey ||
          event.shiftKey || reducedMotion.matches || document.body.classList.contains("menu-open") ||
          Math.abs(event.deltaX) >= Math.abs(event.deltaY)) {
        stop();
        return;
      }

      // Preserve native controls and independently scrollable panels.
      for (const node of event.composedPath()) {
        if (!(node instanceof HTMLElement)) continue;
        if (node === document.body || node === document.documentElement) break;
        if (node.matches("input, textarea, select, [contenteditable=true], [data-native-scroll]") ||
            (/auto|scroll|overlay/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight)) {
          stop();
          return;
        }
      }

      event.preventDefault();
      const nextDirection = Math.sign(event.deltaY);
      if (!frame || direction !== nextDirection) current = target = window.scrollY;
      direction = nextDirection;
      const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.max(0, Math.min(
        target + event.deltaY * unit * 0.4,
        document.documentElement.scrollHeight - window.innerHeight,
      ));
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " ", "Escape"].includes(event.key)) stop();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("pointerdown", stop, { passive: true });
    window.addEventListener("touchstart", stop, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", stop);
    window.addEventListener("popstate", stop);
    window.addEventListener("resize", stop);
    reducedMotion.addEventListener("change", stop);
    return () => {
      stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", stop);
      window.removeEventListener("popstate", stop);
      window.removeEventListener("resize", stop);
      reducedMotion.removeEventListener("change", stop);
    };
  }, []);

  return null;
}