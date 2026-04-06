import { CSSProperties, TouchEvent, useMemo, useRef, useState } from 'react';

type SwipeDirection = 'right' | 'down' | 'both';

interface UseSwipeDismissOptions {
  direction?: SwipeDirection;
  threshold?: number;
  onDismiss: () => void;
}

interface TouchPoint {
  x: number;
  y: number;
}

const NO_OFFSET = { x: 0, y: 0 };

export const useSwipeDismiss = ({
  direction = 'both',
  threshold = 80,
  onDismiss,
}: UseSwipeDismissOptions) => {
  const startPointRef = useRef<TouchPoint | null>(null);
  const [offset, setOffset] = useState(NO_OFFSET);
  const [isDragging, setIsDragging] = useState(false);

  const reset = () => {
    startPointRef.current = null;
    setOffset(NO_OFFSET);
    setIsDragging(false);
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    const touch = event.touches[0];
    startPointRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  };

  const onTouchMove = (event: TouchEvent<HTMLElement>) => {
    if (!startPointRef.current) {
      return;
    }

    const touch = event.touches[0];
    const deltaX = touch.clientX - startPointRef.current.x;
    const deltaY = touch.clientY - startPointRef.current.y;

    if (direction === 'right') {
      setOffset({ x: Math.max(0, deltaX), y: 0 });
      return;
    }

    if (direction === 'down') {
      setOffset({ x: 0, y: Math.max(0, deltaY) });
      return;
    }

    if (Math.abs(deltaX) >= Math.abs(deltaY)) {
      setOffset({ x: Math.max(0, deltaX), y: 0 });
      return;
    }

    setOffset({ x: 0, y: Math.max(0, deltaY) });
  };

  const onTouchEnd = () => {
    const shouldDismiss =
      offset.x >= threshold ||
      offset.y >= threshold;

    reset();

    if (shouldDismiss) {
      onDismiss();
    }
  };

  const style = useMemo<CSSProperties>(
    () => ({
      transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
      transition: isDragging ? 'none' : 'transform 180ms ease-out',
    }),
    [isDragging, offset.x, offset.y],
  );

  return {
    bind: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel: reset,
    },
    style,
  };
};
