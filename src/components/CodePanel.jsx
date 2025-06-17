import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodePanel.module.css';

const CodePanel = ({ config }) => {
  const {
    text = 'Hello! I am a tooltip',
    bgColor = '#333',
    textColor = '#fff',
    fontSize = '14px',
    fontWeight = 'normal',
    width = '150px',
    borderColor = '#000',
    boxShadow = '0px 4px 12px rgba(0,0,0,0.2)',
    fontFamily = 'Arial, sans-serif',
    borderRadius = 8,
  } = config;

  const code = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Tooltip Demo</title>
  <style>
    body {
      height: 100vh;
      margin: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f4f4f4;
      font-family: ${fontFamily};
    }

    .tooltip-wrapper {
      position: relative;
      display: inline-block;
      cursor: pointer;
    }

    .tooltip-button {
      padding: 12px 24px;
      font-size: 16px;
      background-color: #444;
      color: white;
      border: none;
      border-radius: 6px;
    }

    .tooltip-box {
      position: absolute;
      bottom: 120%;
      left: 50%;
      transform: translateX(-50%);
      background-color: ${bgColor};
      color: ${textColor};
      padding: 10px 14px;
      border-radius: ${borderRadius}px;
      font-size: ${fontSize};
      font-weight: ${fontWeight};
      width: ${width};
      border: 1px solid ${borderColor};
      box-shadow: ${boxShadow};
      white-space: normal;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease;
      z-index: 1000;
    }

    .tooltip-wrapper:hover .tooltip-box {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(-50%) translateY(-4px);
    }
  </style>
</head>
<body>

  <div class="tooltip-wrapper">
    <button class="tooltip-button" aria-describedby="tooltip1">Hover Me</button>
    <div class="tooltip-box" id="tooltip1" role="tooltip">
      ${text}
    </div>
  </div>

</body>
</html>
`.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('✅ Full HTML code copied!');
    } catch (err) {
      alert('❌ Failed to copy code.');
    }
  };

  return (
    <div className={styles.codePanel}>
      <div className={styles.codeBlock}>
        <SyntaxHighlighter language="html" style={oneDark} wrapLongLines showLineNumbers>
          {code}
        </SyntaxHighlighter>
      </div>
      <button onClick={handleCopy} className={styles.copyButton}>
        Copy Full HTML
      </button>
    </div>
  );
};

export default CodePanel;
