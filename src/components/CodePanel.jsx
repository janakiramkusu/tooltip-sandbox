// src/components/CodePanel.jsx
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodePanel.module.css';

const CodePanel = ({ config }) => {
  const {
    text,
    shape,
    position,
    animation,
    bgColor,
    textColor,
    fontSize,
    fontFamily,
    fontWeight,
    width,
    borderRadius,
    borderColor,
    boxShadow,
    shadowColor,
    bgImage,
    trigger,
  } = config;

  const borderRadiusValue =
    shape === 'rounded' ? `${borderRadius || 12}px` :
    shape === 'rectangle' ? '0px' :
    `${borderRadius || 8}px`;

  const shapeStyles = (() => {
    if (shape === 'speech-bubble') {
      const arrowColor = bgColor;
      const arrowBase = `
        .tooltip-box.speech-bubble::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border-style: solid;
        }
      `;
      const positions = {
        top: `
          .tooltip-box.speech-bubble::after {
            bottom: -10px;
            left: 10px;
            border-width: 10px 10px 0 10px;
            border-color: ${arrowColor} transparent transparent transparent;
          }
        `,
        bottom: `
          .tooltip-box.speech-bubble::after {
            top: -10px;
            left: 10px;
            border-width: 0 10px 10px 10px;
            border-color: transparent transparent ${arrowColor} transparent;
          }
        `,
        left: `
          .tooltip-box.speech-bubble::after {
            right: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 10px 0 10px 10px;
            border-color: transparent transparent transparent ${arrowColor};
          }
        `,
        right: `
          .tooltip-box.speech-bubble::after {
            left: -10px;
            top: 50%;
            transform: translateY(-50%);
            border-width: 10px 10px 10px 0;
            border-color: transparent ${arrowColor} transparent transparent;
          }
        `,
      };
      return arrowBase + (positions[position] || '');
    }
    return '';
  })();

  const animationStyles = (() => {
    switch (animation) {
      case 'fade':
        return `
          .tooltip-box.fade {
            transition: opacity 0.3s ease;
            opacity: 0;
          }
          .tooltip-wrapper:hover .tooltip-box.fade,
          .tooltip-wrapper:focus-within .tooltip-box.fade {
            opacity: 1;
          }
        `;
      case 'scale':
        return `
          .tooltip-box.scale {
            transition: transform 0.3s ease, opacity 0.3s ease;
            transform: scale(0.9);
            opacity: 0;
          }
          .tooltip-wrapper:hover .tooltip-box.scale,
          .tooltip-wrapper:focus-within .tooltip-box.scale {
            transform: scale(1);
            opacity: 1;
          }
        `;
      case 'slide':
        return `
          .tooltip-box.slide {
            transition: transform 0.3s ease, opacity 0.3s ease;
            transform: translateY(10px);
            opacity: 0;
          }
          .tooltip-wrapper:hover .tooltip-box.slide,
          .tooltip-wrapper:focus-within .tooltip-box.slide {
            transform: translateY(0);
            opacity: 1;
          }
        `;
      default:
        return '';
    }
  })();

  const triggerAttr = trigger === 'focus' ? 'tabindex="0"' : '';

  const fullHtmlCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Generated Tooltip</title>
  <style>
    body {
      font-family: ${fontFamily};
      margin: 0;
      padding: 0;
    }

    .center-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .tooltip-wrapper {
      position: relative;
      display: inline-block;
      outline: none;
    }

    .tooltip-wrapper button {
      padding: 12px 20px;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .tooltip-wrapper button:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }

    .tooltip-box {
      position: absolute;
      padding: 10px 14px;
      z-index: 1000;
      pointer-events: none;
      white-space: nowrap;
      opacity: 0.95;
    }

    .tooltip-box.top    { bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px; }
    .tooltip-box.bottom { top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px; }
    .tooltip-box.left   { right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px; }
    .tooltip-box.right  { left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px; }

    ${shapeStyles}
    ${animationStyles}
  </style>
</head>
<body>
  <div class="center-container">
    <span class="tooltip-wrapper" ${triggerAttr}>
      <button>${trigger.charAt(0).toUpperCase() + trigger.slice(1)} me</button>
      <span class="tooltip-box ${shape} ${position} ${animation}" style="
        background-color: ${bgColor};
        color: ${textColor};
        font-size: ${fontSize}px;
        font-family: ${fontFamily};
        font-weight: ${fontWeight};
        width: ${width};
        border-radius: ${borderRadiusValue};
        border: 1px solid ${borderColor};
        box-shadow: ${boxShadow ? `${boxShadow.split(' ').slice(0, -1).join(' ')} ${shadowColor}` : `0px 4px 8px ${shadowColor}`};
        background-image: url('${bgImage}');
        background-size: cover;
        background-repeat: no-repeat;
      ">
        ${text}
      </span>
    </span>
  </div>
</body>
</html>
`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullHtmlCode);
      alert('✅ Full HTML copied to clipboard!');
    } catch (err) {
      alert('❌ Failed to copy code.');
    }
  };

  return (
    <div className={styles.codePanel}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={handleCopy} className={styles.copyButton}>
          Copy Full HTML
        </button>
      </div>
      <SyntaxHighlighter language="html" style={oneDark} wrapLongLines className={styles.codeBlock}>
        {fullHtmlCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodePanel;
