import React, { useRef, useEffect, useState } from 'react';
import Tooltip from './Tooltip';
import styles from './PreviewArea.module.css';

const PreviewArea = ({ config }) => {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      setPosition({
        x: rect.width / 2 - 75,
        y: rect.height / 2 - 20,
      });
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    let dragging = false;

    const handleMouseDown = (e) => {
      dragging = true;
    };

    const handleMouseMove = (e) => {
      if (dragging && container) {
        const containerRect = container.getBoundingClientRect();
        const tooltipWidth = 150; // Approximate width
        const tooltipHeight = 40; // Approximate height

        // Boundaries
        const minX = 0;
        const minY = 0;
        const maxX = containerRect.width - tooltipWidth;
        const maxY = containerRect.height - tooltipHeight;

        const newX = Math.min(Math.max(e.clientX - containerRect.left - 75, minX), maxX);
        const newY = Math.min(Math.max(e.clientY - containerRect.top - 20, minY), maxY);

        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      dragging = false;
    };

    wrapper.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      wrapper.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div className={styles.previewContainer} ref={containerRef}>
      <div
        ref={wrapperRef}
        className={styles.tooltipHolder}
        style={{ top: position.y, left: position.x }}
      >
        <Tooltip {...config}>
  <button
  className={styles.previewButton}
  tabIndex={config.trigger === 'focus' ? 0 : undefined}
>
  {config.trigger.charAt(0).toUpperCase() + config.trigger.slice(1)} me
</button>

</Tooltip>

      </div>
    </div>
  );
};

export default PreviewArea;
