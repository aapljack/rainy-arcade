# Rainy Arcade

A simple noise generator that mixes classic arcade ambience with rainfall to recreate the feel of a rainy day spent in the arcade. Live at [rainyarca.de](https://rainyarca.de).

## Overview

Rainy Arcade plays two looping audio layers — arcade ambience and rain — that you start together with a single Play/Stop control. Each layer has its own volume slider so you can balance the mix. The arcade layer can be swapped between four era recordings (1981, 1983, 1986, 1992) sourced from Andy Hofle's [Arcade Ambience Project](http://arcade.hofle.com/).

The app is a single-page React app with no backend. It is deployed as a static site to GitHub Pages under the custom domain `rainyarca.de` (see `CNAME`).

### Audio playback

Each `<audio>` element is routed through a Web Audio `GainNode` and the slider drives `gain.value` instead of the element's `volume` property. iOS Safari ignores `HTMLMediaElement.volume`, so the gain-node path is what makes volume control work on mobile — and it works identically on desktop, so there's no runtime device detection.

A few constraints the implementation has to honor:

- `createMediaElementSource()` can only be called once per element (per spec), so the wiring runs inside an init guard to survive React StrictMode's double-invoked effects in development.
- iOS suspends the `AudioContext` until a user gesture resumes it, so the play handler calls `audioContext.resume()` before `.play()`.

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

The site is hosted on GitHub Pages and served from the custom domain in `CNAME`.

### Automatic deploys (default)

The `deploy` GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on every push to `main`. It builds the app and publishes `build/` to the `gh-pages` branch via [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages), preserving the `rainyarca.de` CNAME. The workflow can also be triggered by hand from the Actions tab via `workflow_dispatch` — useful for re-running a deploy without pushing a commit.

### Manual deploys (fallback)

The `gh-pages` npm package is still wired up for local deploys:

```
npm run deploy
```

This runs `npm run build` first (via the `predeploy` script), then pushes `build/` to the `gh-pages` branch directly from your machine. Handy if Actions is down or for ad-hoc deploys from a branch other than `main`.

The `homepage` field in `package.json` is set to the production URL so asset paths resolve correctly under either path.

## Continuous integration

The `CI` workflow (`.github/workflows/ci.yml`) runs on every pull request targeting `main`. It installs deps with `npm ci`, builds with `npm run build`, and runs the Jest suite once. Build failures or failing tests block the PR before merge.

## Credits

- Arcade audio: [Arcade Ambience Project](http://arcade.hofle.com/) by Andy Hofle
- Cartridge font: [SimpleBits](https://simplebits.com/collections/fonts/products/cartridge-font) by Dan Cederholm
