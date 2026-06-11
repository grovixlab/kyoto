# Kyoto Clock Overlay - Contributing Guide

Welcome to the Kyoto Clock Overlay project! This application is designed to be a lightweight, highly customizable Browser Source for OBS Studio.

## Architecture

The project consists of three core files:
- `index.html`: The semantic structure of the clock.
- `styles.css`: The visual design system, utilizing CSS Custom Properties for easy theming.
- `app.js`: The application logic responsible for timekeeping and applying user configuration.

**Note:** As per project guidelines, there are no inline comments in the source files. Please refer to this document to understand the application flow.

## Configuration Parameters

Users customize the clock overlay by appending query parameters to the URL (e.g. `index.html?theme=neon&format=24`). The application automatically parses these on startup.

| Parameter | Options / Format | Default | Description |
| :--- | :--- | :--- | :--- |
| `format` | `12`, `24` | `12` | Time format (12-hour or 24-hour). |
| `theme` | `glass`, `neon`, `minimal`, `custom` | `glass` | Visual theme. `custom` relies on the `bg` parameter. |
| `font` | Any Google Font name (e.g. `Outfit`, `Roboto Mono`) | `Inter` | Primary font family. Make sure it's loaded in `index.html` if adding new ones. |
| `color` | CSS color (hex, rgb, etc.) | `#ffffff` | Primary text color. |
| `accent` | CSS color (hex, rgb, etc.) | `#00ffcc` | Accent color used for seconds, borders, shadows (depends on theme). |
| `bg` | CSS color (rgba, hex) | `rgba(15, 15, 20, 0.4)` | Background color, mainly used for `custom` theme. |
| `scale` | Number (e.g., `0.5`, `1.5`) | `1` | Scaling factor to easily resize the entire overlay. |
| `animation`| `none`, `flip`, `slide` | `none` | Micro-animations triggered when digits change. |
| `showSeconds`| `true`, `false` | `true` | Toggles the seconds display. |
| `showDate` | `true`, `false` | `true` | Toggles the date display below the time. |
| `showAmPm` | `true`, `false` | `true` | Toggles the AM/PM indicator (only applies if `format` is `12`). |

## Adding a New Theme

1. Add a new CSS class in `styles.css` named `.theme-{name}`.
2. Override any CSS Custom Properties (Variables) like `--bg-color`, `--border-color`, `--shadow-color`.
3. In `app.js` `applyConfig()`, add an `else if` condition to apply your new class to `dom.container` based on `CONFIG.theme`.

## Adding a New Animation

1. Create a keyframe animation in `styles.css` (e.g., `@keyframes bounce`).
2. Add a utility class `.anim-{name}` that applies your animation.
3. Users can now use `?animation={name}` in the URL. `app.js` will automatically remove and re-apply this class whenever a time component changes.
