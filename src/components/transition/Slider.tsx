import { useCallback, useEffect, useRef, useState } from 'preact/hooks';

import type { TransitionComponent } from '../../types';

const Slider: TransitionComponent = ({
  children,
  direction = 'in',
  onTransitionEnd,
  delay,
}) => {
  const visible = direction === 'in';
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerHeight, setContainerHeight] = useState(visible ? 'auto' : 0);

  // Whether the content is currently partially or wholly visible. This is
  // different from `visible` when collapsing as it is true until the collapse
  // animation completes.
  const [contentVisible, setContentVisible] = useState(visible);

  // Adjust the container height when the `visible` prop changes.
  useEffect(() => {
    const isVisible = containerHeight !== 0;
    if (visible === isVisible) {
      // Do nothing after the initial mount.
      return;
    }

    const el = containerRef.current!;
    if (visible) {
      // Show the content synchronously so that we can measure it here.
      el.style.display = '';

      // Make content visible in future renders.
      setContentVisible(true);

      // When expanding, transition the container to the current fixed height
      // of the content. After the transition completes, we'll reset to "auto"
      // height to adapt to future content changes.
      setContainerHeight(el.scrollHeight);
    } else {
      // When collapsing, immediately change the current height to a fixed height
      // (in case it is currently "auto"), force a synchronous layout,
      // then transition to 0.
      //
      // These steps are needed because browsers will not animate transitions
      // from "auto" => "0" and may not animate "auto" => fixed height => 0
      // if the layout tree transitions directly from "auto" => 0.
      el.style.height = `${el.scrollHeight}px`;

      // Force a sync layout.
      el.getBoundingClientRect();

      setContainerHeight(0);
    }
  }, [containerHeight, visible]);

  const handleTransitionEnd = useCallback(
    (e: TransitionEvent) => {
      // Only transitions on the actual component and for the "height" property
      // are relevant "in"/"out" transitions.
      if (e.target !== containerRef.current || e.propertyName !== 'height') {
        return;
      }

      if (visible) {
        setContainerHeight('auto');
      } else {
        // When the collapse animation completes, stop rendering the content so
        // that the browser has fewer nodes to render and the content is removed
        // from keyboard navigation.
        setContentVisible(false);
      }
      onTransitionEnd?.(direction);
    },
    [setContainerHeight, visible, onTransitionEnd, direction],
  );

  const isFullyVisible = containerHeight === 'auto';

  return (
    <div
      // nb. Preact uses "ontransitionend" rather than "onTransitionEnd".
      // See https://bugs.chromium.org/p/chromium/issues/detail?id=961193
      //
      // @ts-ignore
      ontransitionend={handleTransitionEnd}
      ref={containerRef}
      style={{
        display: contentVisible ? '' : 'none',
        height: containerHeight,

        // When the Slider is fully open, overflow is made visible so that
        // focus rings, which may extend outside the bounds of the Slider content,
        // are visible.
        overflow: isFullyVisible ? 'visible' : 'hidden',
        transition: `height 0.15s ease-in`,

        transitionDelay: delay,
      }}
    >
      {children}
    </div>
  );
};

export default Slider;
