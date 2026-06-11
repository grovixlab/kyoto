# Kyoto Clock Overlay - Contributing Guide

Welcome to the Kyoto Clock Overlay project! This application is designed to be a lightweight, highly customizable Browser Source for OBS Studio, complete with an interactive dashboard.

## Architecture

The project is split into two logical parts:

### 1. The Configuration Dashboard
- `index.html`: The HTML structure of the dashboard UI.
- `dashboard.css`: Styling for the configuration panel, designed to look like a clean, structured web console.
- `dashboard.js`: Handles form inputs, generates the URL, and updates the live preview iframe.

### 2. The Clock Overlay (OBS Source)
- `clock.html`: The semantic structure of the clock itself.
- `clock.css`: The visual design system, utilizing CSS Custom Properties for easy theming.
- `clock.js`: The application logic responsible for timekeeping and applying user configuration.

**Note:** As per project guidelines, there are no inline comments in the source files. Please refer to this document to understand the application flow.

## Configuration Export / Import
The dashboard allows users to export and import their configs via a `.txt` file. Under the hood, this file contains a plain JSON object representing the state of all configurable inputs. When a file is uploaded, `dashboard.js` parses the JSON, updates the UI components, and regenerates the URL.

## Custom CSS Configuration

Advanced users can inject their own custom CSS through the `customCss` URL parameter. The dashboard provides a text area and draggable chips representing the main clock components:

| Selector | Description |
| :--- | :--- |
| `#clock-container` | The main wrapper for the entire overlay. |
| `.time-display` | The wrapper around the time digits (hours, minutes, seconds). |
| `#hours` | The text element displaying the hours. |
| `#minutes` | The text element displaying the minutes. |
| `#seconds` | The text element displaying the seconds. |
| `.ampm` | The text element displaying the AM/PM indicator. |
| `.separator` | The colon `:` separators between time units. |
| `.date-display` | The wrapper around the date text. |

## URL Parameters

Users customize the clock overlay either via the Dashboard or by manually appending query parameters to the `clock.html` URL (e.g. `clock.html?theme=neon&format=24`). The application automatically parses these on startup.

| Parameter | Options / Format | Default | Description |
| :--- | :--- | :--- | :--- |
| `format` | `12`, `24` | `12` | Time format (12-hour or 24-hour). |
| `theme` | `glass`, `neon`, `minimal`, `custom` | `glass` | Visual theme. `custom` relies on the `bg` parameter. |
| `font` | Any Google Font name (e.g. `Outfit`, `Roboto Mono`) | `Inter` | Primary font family. Make sure it's loaded in `clock.html` if adding new ones. |
| `color` | CSS color (hex, rgb, etc.) | `#ffffff` | Primary text color. |
| `accent` | CSS color (hex, rgb, etc.) | `#00ffcc` | Accent color used for seconds, borders, shadows (depends on theme). |
| `bg` | CSS color (rgba, hex) | `rgba(15, 15, 20, 0.4)` | Background color, mainly used for `custom` theme. |
| `scale` | Number (e.g., `0.5`, `1.5`) | `1` | Scaling factor to easily resize the entire overlay. |
| `borderRadius` | Number (e.g., `24`, `0`) | `24` | The border radius of the clock container in pixels. |
| `animation`| `none`, `flip`, `slide` | `none` | Micro-animations triggered when digits change. |
| `showHours`| `true`, `false` | `true` | Toggles the hours display. |
| `showMinutes`| `true`, `false` | `true` | Toggles the minutes display. |
| `showSeconds`| `true`, `false` | `true` | Toggles the seconds display. |
| `showDate` | `true`, `false` | `true` | Toggles the date display below the time. |
| `showAmPm` | `true`, `false` | `true` | Toggles the AM/PM indicator (only applies if `format` is `12`). |
| `textShadow` | `true`, `false` | `true` | Toggles the drop shadow on the text. |
| `textBorder` | `true`, `false` | `false` | Toggles the outline (stroke) on the text. |
| `textBorderSize` | Number (e.g., `1`, `5`) | `1` | The thickness of the text outline in pixels. |
| `textBorderColor` | CSS color (hex, rgb) | `#000000` | The color of the text outline. |

## Adding a New Theme

1. Add a new CSS class in `clock.css` named `.theme-{name}`.
2. Override any CSS Custom Properties (Variables) like `--bg-color`, `--border-color`, `--shadow-color`.
3. In `clock.js` `applyConfig()`, add an `else if` condition to apply your new class to `dom.container` based on `CONFIG.theme`.
4. Update `index.html` to add the new theme option to the `<select id="theme">` dropdown.

## Adding a New Animation

1. Create a keyframe animation in `clock.css` (e.g., `@keyframes bounce`).
2. Add a utility class `.anim-{name}` that applies your animation.
3. Users can now use `?animation={name}` in the URL. `clock.js` will automatically remove and re-apply this class whenever a time component changes.
4. Update `index.html` to add the new animation option to the `<select id="animation">` dropdown.
