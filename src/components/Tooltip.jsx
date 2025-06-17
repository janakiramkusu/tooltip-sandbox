import React, { useState, useRef, useEffect } from 'react';
import styles from './Tooltip.module.css';

const Tooltip = ({
  text,
  shape = 'rectangle',
  position = 'top',
  bgColor = '#333',
  textColor = '#fff',
  fontSize = '14px',
  fontWeight = 'normal',
  width = '150px',
  borderColor = '#000',
  boxShadow = '0px 4px 12px rgba(0,0,0,0.2)',
  fontFamily = 'Arial',
  trigger = 'hover',
  animation = 'fade',
  bgImage = '',
  shadowColor = '#000',
  borderRadius = 8,     
  children,
}) => {

  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef(null);
  const wrapperRef = useRef(null);

  // Accessibility ESC key close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerHandlers = {
    hover: {
      onMouseEnter: () => setVisible(true),
      onMouseLeave: () => setVisible(false),
    },
    click: {
      onClick: () => setVisible((prev) => !prev),
    },
    focus: {
      onFocus: () => setVisible(true),
      onBlur: () => setVisible(false),
    },
  };

  const handlers = triggerHandlers[trigger] || {};

  return (
    <div
      className={styles.wrapper}
      {...handlers}
      ref={wrapperRef}
      tabIndex={trigger === 'focus' ? 0 : undefined}
      aria-describedby="tooltip"
    >
      {children}
      {visible && (
        <div
          id="tooltip"
          role="tooltip"
          ref={tooltipRef}
          className={`${styles.tooltip} ${styles[position]} ${styles[shape]} ${styles[animation]}`} // ✅ animation class
          style={{
  '--bgColor': bgColor,
  backgroundColor: bgColor,
  color: textColor,
  fontSize,
  fontWeight,
  width,
  fontFamily,
  border: `1px solid ${borderColor}`,
  boxShadow: boxShadow === 'none' ? 'none' : boxShadow.replace(/rgba?\([^)]+\)/, shadowColor), 
  backgroundImage: bgImage ? `url(${bgImage})` : 'none',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  borderRadius: `${borderRadius}px`,
  transition: 'all 0.3s ease',
}}        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
