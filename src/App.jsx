import React, { useState } from 'react';
import SettingsPanel from './components/SettingsPanel';
import PreviewArea from './components/PreviewArea';
import CodePanel from './components/CodePanel';
import styles from './App.module.css';

const App = () => {
const [config, setConfig] = useState({
  text: 'Hello! I am a tooltip',
  shape: 'rectangle',
  position: 'top',
  bgColor: '#333',
  textColor: '#fff',
  fontSize: '14px',
  fontWeight: 'normal',
  width: '150px',
  borderColor: '#000000',
  boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
  fontFamily: 'Arial',
  trigger: 'hover',
  animation: 'fade',
  bgImage: '',
  shadowColor: '#000',
  borderRadius: 8,
});


  return (
    <>
    <header className={styles.header}>
  <h1 className={styles.title}>Tooltip Sandbox</h1>
</header>

    <div className={`${styles.app} ${styles.hideScrollbar}`}>
      <div className={`${styles.sidebar} ${styles.hideScrollbar}`}>
        <h2 className={styles.sidebarHeader}> Tooltip Customizer</h2>
        <SettingsPanel config={config} setConfig={setConfig} />
      </div>
      <div className={styles.preview}>
        <h2 className={styles.heading}>Live Preview</h2>
        <PreviewArea config={config} />
      </div>
      <div className={`${styles.sidebar} ${styles.hideScrollbar}`}>
        <h1 className={styles.sidebarHeader}> Generated Code</h1>
        <CodePanel config={config} />
      </div>
    </div>
    </>
  );
};

export default App;
