"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from "react";

const MARGIN = 16;
const DRAG_BREAKPOINT = 768;
const DRAG_THRESHOLD = 5;

const isDesktop = () => window.innerWidth >= DRAG_BREAKPOINT;
const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), Math.max(min, max));

type DragMode = "launcher" | "dialog";

interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

interface Anchor {
  right: number;
  bottom: number;
}

interface Gesture {
  pointerId: number;
  startX: number;
  startY: number;
  baseLeft: number;
  baseTop: number;
  width: number;
  height: number;
  moved: boolean;
}

export function useDraggableChatbot(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const anchorRef = useRef<Anchor | null>(null);
  const gestureRef = useRef<Gesture | null>(null);
  const didDragRef = useRef(false);
  const isOpenRef = useRef(isOpen);
  const insetsRef = useRef<Insets>({ top: 0, right: 0, bottom: 0, left: 0 });

  const [isDragging, setIsDragging] = useState(false);
  const [isPositioned, setIsPositioned] = useState(false);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const readInsets = useCallback(() => {
    const styles = getComputedStyle(document.documentElement);
    const value = (name: string) =>
      parseFloat(styles.getPropertyValue(name)) || 0;
    insetsRef.current = {
      top: value("--chat-safe-top"),
      right: value("--chat-safe-right"),
      bottom: value("--chat-safe-bottom"),
      left: value("--chat-safe-left"),
    };
  }, []);

  useEffect(() => {
    readInsets();
  }, [readInsets]);

  // Keep the element within the viewport's safe area (16px base margin + device inset).
  const bounds = useCallback((width: number, height: number) => {
    const insets = insetsRef.current;
    return {
      minLeft: MARGIN + insets.left,
      maxLeft: Math.max(
        MARGIN + insets.left,
        window.innerWidth - MARGIN - insets.right - width,
      ),
      minTop: MARGIN + insets.top,
      maxTop: Math.max(
        MARGIN + insets.top,
        window.innerHeight - MARGIN - insets.bottom - height,
      ),
    };
  }, []);

  // Place the wrapper's top-left at (left, top) and back-solve the stable
  // bottom-right anchor from the current element dimensions.
  const applyTopLeft = useCallback(
    (left: number, top: number, width: number, height: number) => {
      const insets = insetsRef.current;
      anchorRef.current = {
        right: window.innerWidth - MARGIN - insets.right - left - width,
        bottom: window.innerHeight - MARGIN - insets.bottom - top - height,
      };
      const container = containerRef.current;
      if (container) {
        container.style.transform = `translate3d(${left}px, ${top}px, 0)`;
      }
    },
    [],
  );

  // Derive the current element's top-left from the shared bottom-right anchor,
  // re-clamped to that element's size. Runs on every launcher <-> dialog swap
  // and on resize so both sizes map to the same logical position.
  const applyFromAnchor = useCallback(() => {
    const container = containerRef.current;
    const anchor = anchorRef.current;
    if (!container || !anchor) return;

    // offsetWidth/offsetHeight, not getBoundingClientRect: the latter returns
    // the transformed (scaled-while-dragging) box, which would corrupt the
    // anchor math.
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const insets = insetsRef.current;
    const right = clamp(
      anchor.right,
      MARGIN + insets.left,
      Math.max(
        MARGIN + insets.left,
        window.innerWidth - MARGIN - insets.right - width,
      ),
    );
    const bottom = clamp(
      anchor.bottom,
      MARGIN + insets.top,
      Math.max(
        MARGIN + insets.top,
        window.innerHeight - MARGIN - insets.bottom - height,
      ),
    );

    anchorRef.current = { right, bottom };
    container.style.transform = `translate3d(${window.innerWidth - MARGIN - insets.right - right - width}px, ${window.innerHeight - MARGIN - insets.bottom - bottom - height}px, 0)`;
  }, []);

  const syncPosition = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    if (isOpenRef.current && !isDesktop()) {
      // Mobile full-screen dialog ignores the shared anchor.
      container.style.transform = "";
      return;
    }
    if (anchorRef.current) applyFromAnchor();
  }, [applyFromAnchor]);

  // Re-position whenever the visible element switches (open or close).
  useEffect(() => {
    syncPosition();
  }, [isOpen, syncPosition]);

  useEffect(() => {
    const onResize = () => {
      readInsets();
      if (!gestureRef.current) syncPosition();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [readInsets, syncPosition]);

  useEffect(() => {
    document.body.style.userSelect = isDragging ? "none" : "";
    return () => {
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  const startGesture = (e: ReactPointerEvent<HTMLElement>, mode: DragMode) => {
    didDragRef.current = false;

    if (mode === "dialog" && !isDesktop()) return;
    if (mode === "dialog") {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, textarea, input")) return;
    }

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const anchor = anchorRef.current;
    const base = anchor
      ? {
          left:
            window.innerWidth -
            MARGIN -
            insetsRef.current.right -
            anchor.right -
            rect.width,
          top:
            window.innerHeight -
            MARGIN -
            insetsRef.current.bottom -
            anchor.bottom -
            rect.height,
        }
      : { left: rect.left, top: rect.top };

    gestureRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      baseLeft: base.left,
      baseTop: base.top,
      width: container.offsetWidth,
      height: container.offsetHeight,
      moved: false,
    };
  };

  const moveGesture = (e: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || e.pointerId !== gesture.pointerId) return;

    const dx = e.clientX - gesture.startX;
    const dy = e.clientY - gesture.startY;

    if (!gesture.moved) {
      if (Math.hypot(dx, dy) <= DRAG_THRESHOLD) return;
      gesture.moved = true;
      setIsDragging(true);
      setIsPositioned(true);
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        gestureRef.current = null;
        setIsDragging(false);
        return;
      }
    }

    const b = bounds(gesture.width, gesture.height);
    applyTopLeft(
      clamp(gesture.baseLeft + dx, b.minLeft, b.maxLeft),
      clamp(gesture.baseTop + dy, b.minTop, b.maxTop),
      gesture.width,
      gesture.height,
    );
  };

  const endGesture = (e: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || e.pointerId !== gesture.pointerId) return;

    gestureRef.current = null;
    if (gesture.moved) {
      didDragRef.current = true;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    }
    setIsDragging(false);
  };

  const onHeaderPointerDown = (e: ReactPointerEvent<HTMLElement>) =>
    startGesture(e, "dialog");
  const onLauncherPointerDown = (e: ReactPointerEvent<HTMLElement>) =>
    startGesture(e, "launcher");
  const resetDragFlag = () => {
    didDragRef.current = false;
  };

  // Keyboard alternative to dragging (chatbot.md §6/§8): arrow keys move the
  // panel in 10px increments, clamped to the same viewport bounds.
  const nudge = useCallback(
    (dx: number, dy: number) => {
      const container = containerRef.current;
      if (!container || !isDesktop()) return;

      const width = container.offsetWidth;
      const height = container.offsetHeight;
      const current = container.getBoundingClientRect();
      const b = bounds(width, height);
      applyTopLeft(
        clamp(current.left + dx, b.minLeft, b.maxLeft),
        clamp(current.top + dy, b.minTop, b.maxTop),
        width,
        height,
      );
      setIsPositioned(true);
    },
    [applyTopLeft, bounds],
  );

  const onHeaderKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    // Only respond when the handle itself is focused, so arrows used inside
    // the trash/close buttons (or the textarea) don't move the panel.
    if (e.target !== e.currentTarget) return;
    switch (e.key) {
      case "ArrowLeft":
        e.preventDefault();
        nudge(-10, 0);
        break;
      case "ArrowRight":
        e.preventDefault();
        nudge(10, 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        nudge(0, -10);
        break;
      case "ArrowDown":
        e.preventDefault();
        nudge(0, 10);
        break;
    }
  };

  const consumeDrag = () => {
    const dragged = didDragRef.current;
    didDragRef.current = false;
    return dragged;
  };

  return {
    containerRef,
    isDragging,
    isPositioned,
    consumeDrag,
    dragHandleProps: {
      onPointerDown: onHeaderPointerDown,
      onPointerMove: moveGesture,
      onPointerUp: endGesture,
      onPointerCancel: endGesture,
      onKeyDown: onHeaderKeyDown,
    },
    launcherDragHandleProps: {
      onPointerDown: onLauncherPointerDown,
      onPointerMove: moveGesture,
      onPointerUp: endGesture,
      onPointerCancel: endGesture,
      onFocus: resetDragFlag,
    },
  };
}