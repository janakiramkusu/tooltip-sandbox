import React, { useState } from 'react';
import styles from './SettingsPanel.module.css';

const SettingsPanel = ({ config, setConfig }) => {
  const [activeTab, setActiveTab] = useState('general');

  const update = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const renderColorInput = (label, key) => (
    <label className={styles.colorLabel}>
      {label}
      <div className={styles.colorInputWrapper}>
        <input
          type="color"
          value={config[key]}
          onChange={e => update(key, e.target.value)}
          className={styles.colorInput}
        />
        <span className={styles.colorCode}>{config[key].toUpperCase()}</span>
      </div>
    </label>
  );

  return (
    <div className={styles.panel}>
      <div className={styles.tabs}>
        {['general', 'style', 'advanced'].map(tab => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        {activeTab === 'general' && (
          <>
            <label>
              Tooltip Text
              <input
                value={config.text}
                onChange={e => update('text', e.target.value)}
              />
            </label>

            <label>
              Shape
              <select
                value={config.shape}
                onChange={e => update('shape', e.target.value)}
              >
                <option value="rectangle">Rectangle</option>
                <option value="rounded">Rounded</option>
                <option value="speech-bubble">Speech Bubble</option>
              </select>
            </label>

            <label>
              Trigger
              <select
                value={config.trigger}
                onChange={e => update('trigger', e.target.value)}
              >
                <option value="hover">Hover</option>
                <option value="click">Click</option>
                <option value="focus">Focus</option>
              </select>
            </label>

            <label>
              Position
              <select
                value={config.position}
                onChange={e => update('position', e.target.value)}
              >
                <option value="top">Top</option>
                <option value="right">Right</option>
                <option value="bottom">Bottom</option>
                <option value="left">Left</option>
              </select>
            </label>
          </>
        )}

        {activeTab === 'style' && (
          <>
            {renderColorInput('Background Color', 'bgColor')}
            {renderColorInput('Text Color', 'textColor')}

            <label>
              Font Size (px)
              <input
                type="number"
                min="10"
                max="30"
                value={parseInt(config.fontSize)}
                onChange={e => update('fontSize', `${e.target.value}px`)}
              />
            </label>

            <label>
              Width (px)
              <input
                type="number"
                min="80"
                max="300"
                value={parseInt(config.width)}
                onChange={e => update('width', `${e.target.value}px`)}
              />
            </label>
          </>
        )}

        {activeTab === 'advanced' && (
          <>
            <h4 className={styles.sectionTitle}>Typography</h4>
            <label>
              Font Family
              <select
                value={config.fontFamily}
                onChange={e => update('fontFamily', e.target.value)}
              >
                <option value="Inter, sans-serif">Inter</option>
                <option value="Roboto, sans-serif">Roboto</option>
                <option value="Georgia, serif">Georgia</option>
                <option value="Courier New, monospace">Courier New</option>
              </select>
            </label>

            <h4 className={styles.sectionTitle}>Effects</h4>
            <label>
              Border Radius (px)
              <input
                type="number"
                value={config.borderRadius || 8}
                onChange={e => update('borderRadius', parseInt(e.target.value))}
              />
            </label>

            <label>
              Box Shadow
              <select
                value={config.boxShadow}
                onChange={e => update('boxShadow', e.target.value)}
              >
                <option value="none">None</option>
                <option value="0px 4px 8px rgba(0,0,0,0.1)">Soft</option>
                <option value="0px 8px 16px rgba(0,0,0,0.2)">Strong</option>
              </select>
            </label>

            {renderColorInput('Shadow Color', 'shadowColor')}

            <label>
              Background Texture URL
              <input
                type="text"
                placeholder="https://example.com/texture.png"
                value={config.bgImage || ''}
                onChange={e => update('bgImage', e.target.value)}
              />
            </label>

            {renderColorInput('Border Color', 'borderColor')}

            <label>
              Font Weight
              <select
                value={config.fontWeight}
                onChange={e => update('fontWeight', e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
                <option value="lighter">Lighter</option>
                {[100, 200, 300, 400, 500, 600, 700, 800, 900].map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </label>

            <label>
              Tooltip Animation
              <select
                value={config.animation}
                onChange={e => update('animation', e.target.value)}
              >
                <option value="fade">Fade</option>
                <option value="zoom">Zoom</option>
                <option value="slide">Slide</option>
              </select>
            </label>
          </>
        )}
      </div>
    </div>
  );
};

export default SettingsPanel;
