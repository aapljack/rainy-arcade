# Rainy Arcade

A simple noise generator that mixes classic arcade ambience with rainfall to recreate the feel of a rainy day spent in the arcade. Live at [rainyarca.de](https://rainyarca.de).

## Overview

Rainy Arcade plays two looping audio layers — arcade ambience and rain — that you start together with a single Play/Stop control. Each layer has its own volume slider so you can balance the mix. The arcade layer can be swapped between four era recordings (1981, 1983, 1986, 1992) sourced from Andy Hofle's [Arcade Ambience Project](http://arcade.hofle.com/).

The app is a single-page React app with no backend. It is deployed as a static site to GitHub Pages under the custom domain `rainyarca.de` (see `CNAME`).

### Audio playback

- Desktop browsers use the native `<audio>` element with its `volume` property bound to each slider.
- iOS and other mobile browsers ignore the HTML `volume` property, so the app routes audio through a Web Audio `GainNode` to control volume. Device detection picks the right path at runtime.

### Project layout

```
src/
  App.js                  app shell
  App.scss                global styles
  components/
    arcadeAudio.jsx       top-level UI: play/stop, era picker, two players
    audioPlayer.jsx       per-layer player with volume slider
    dropdownMenu.jsx      arcade era selector
    rainAudio.jsx         standalone rain audio component
    errorBoundary.jsx     React error boundary
    Label.jsx             shared label component
  audio/                  mp3/mp4/wav source files
  images/                 SVG icons and logo
  fonts/                  Cartridge font files
public/
  index.html              page shell, social meta tags, GA snippet
  icon192.png, icon512.png, favicon.ico, social-image.jpg
  CNAME                   custom domain for GitHub Pages
```

## Getting started

### Prerequisites

- Node.js (a version compatible with `react-scripts` 5)
- npm

### Install

```
npm install
```

### Run locally

```
npm start
```

This starts the Create React App dev server at [http://localhost:3000](http://localhost:3000) with hot reload.

### Run tests

```
npm test
```

Launches the Jest watcher provided by `react-scripts`.

### Build for production

```
npm run build
```

Outputs an optimized bundle to the `build/` directory.

## Deployment

The site is hosted on GitHub Pages and served from the custom domain in `CNAME`. The `gh-pages` package handles publishing.

```
npm run deploy
```

This runs `npm run build` first (via the `predeploy` script), then pushes the contents of `build/` to the `gh-pages` branch. GitHub Pages serves that branch at [rainyarca.de](https://rainyarca.de).

The `homepage` field in `package.json` is set to the production URL so asset paths resolve correctly.

## Credits

- Arcade audio: [Arcade Ambience Project](http://arcade.hofle.com/) by Andy Hofle
- Cartridge font: [SimpleBits](https://simplebits.com/collections/fonts/products/cartridge-font) by Dan Cederholm
