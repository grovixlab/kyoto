# Kyoto Clock Overlay

[![Sponsor SajadTroy](https://img.shields.io/badge/Sponsor-SajadTroy-ea4aaa?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/SajadTroy)

**🚀 Live App:** [https://kyoto-lac.vercel.app/](https://kyoto-lac.vercel.app/)

Kyoto is a lightweight, highly customizable clock overlay designed specifically as a Browser Source for OBS Studio and other live streaming software. Built entirely with vanilla HTML, CSS, and JavaScript, it can be hosted anywhere (like GitHub Pages or Vercel) without needing a backend server.

## Features

- **Interactive Configuration Dashboard**: Easily customize your overlay through a clean, modern web interface.
- **Live Preview**: See exactly how your clock will look as you tweak the settings.
- **Customizable Appearance**: Change themes (Glassmorphism, Cyberpunk, Minimal, Custom), fonts, colors, background, border-radius, and scaling.
- **Text Effects**: Add custom borders (strokes) and drop-shadows to the clock text to make it stand out against your stream.
- **Component Toggles**: Independently show or hide hours, minutes, seconds, AM/PM, and the date.
- **Micro-animations**: Smooth, performant CSS animations (Flip or Slide) when time digits change.

## Usage

### Using the Dashboard

1. Visit the live hosted dashboard: [https://kyoto-lac.vercel.app/](https://kyoto-lac.vercel.app/) (or open `index.html` locally).
2. Use the controls on the left panel to customize the clock to your liking.
3. Once you're happy with the live preview, click **Generate & Copy URL**.
4. In OBS Studio, add a new **Browser Source** and paste the copied URL into the URL field. (Set dimensions appropriately, e.g., Width: 600, Height: 300).

### Manual Configuration

The actual clock overlay is located at `clock.html`. You can manually pass query parameters to it if you prefer not to use the dashboard.

Example:
`clock.html?theme=neon&format=24&showSeconds=false`

Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for a full list of available URL parameters and instructions on how to add new themes or animations.

## Project Structure

This project uses purely vanilla frontend technologies:
- `index.html` / `dashboard.css` / `dashboard.js`: The Configuration UI.
- `clock.html` / `clock.css` / `clock.js`: The actual OBS overlay application.

Feel free to fork the project and modify the CSS or JavaScript to fit your specific streaming brand!

## Sponsor

If you find this project helpful for your streams, please consider sponsoring!
[Sponsor SajadTroy on GitHub](https://github.com/sponsors/SajadTroy)

## License

MIT License