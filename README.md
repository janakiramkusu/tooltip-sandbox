# 🧰 Tooltip Sandbox – Custom Tooltip Generator

A fully interactive React-based **Tooltip Customizer** that allows you to design and generate HTML + CSS code for beautiful, accessible tooltips. With real-time preview and code export, this sandbox empowers developers and designers to create pixel-perfect tooltips with no hassle.

## 🚀 Live Features

### 🎛️ Tooltip Customizer Tabs
- **General Settings**
  - Tooltip Text (editable live)
  - Shape: Rectangle, Rounded, Speech Bubble
  - Trigger: Hover, Click, Focus
  - Position: Top, Right, Bottom, Left

- **Style Settings**
  - Background Color
  - Text Color
  - Font Size (px)
  - Width (px)

- **Advanced Settings**
  - **Typography**
    - Font Family: Inter, Roboto, Georgia, Courier New
    - Font Weight: Normal, Bold, Lighter, or numeric (100–900)

  - **Effects**
    - Border Radius (px)
    - Box Shadow: None, Soft, Strong
    - Shadow Color
    - Background Texture URL
    - Border Color
    - Tooltip Animation: Fade, Slide, Zoom

### ⚡ Real-Time Live Preview
Every configuration change is instantly reflected in a live preview area to simulate the actual appearance and interaction of the tooltip.

### 🧩 Code Generator
Auto-generates a fully functional and responsive HTML/CSS snippet that you can:
- **Copy with one click**
- **Paste directly into your web project**

The generated code includes:
- Semantic HTML
- Accessible roles and attributes (`aria-describedby`, `role="tooltip"`)
- Clean, reusable CSS with transitions and responsive layout

---

## 📂 Project Structure

```bash
src/
├── components/
│   ├── SettingsPanel.jsx    # Configurable tabs (General, Style, Advanced)
│   ├── PreviewArea.jsx      # Live preview renderer for tooltip
│   ├── CodePanel.jsx        # Code display with syntax highlighting
├── App.jsx                  # Root component that ties everything together
├── App.module.css           # App-wide styles
