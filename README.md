# 🔥 Universal Remote Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub release](https://img.shields.io/github/release/bhartiNitish-1707/Universal-Remote.svg)](https://github.com/bhartiNitish-1707/Universal-Remote/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A production-ready, fully customisable remote control Lovelace card for Home Assistant.  
Supports **Fire TV**, **Android TV**, **Apple TV**, and any generic media player or IR remote.

---

## Features

- 🎮 Full D-pad / touchpad navigation
- 🔥 Platform presets: Fire TV · Android TV · Apple TV · Generic
- 🧩 Fully configurable button rows
- ⚡ Live entity state display
- 🎨 Dark / Light / Auto colour schemes
- ✏️ Visual config editor in Lovelace UI
- 🔁 Backwards-compatible `custom:android-tv-card` alias

---

## Installation

### Via HACS (recommended)

1. Open **HACS** → **Frontend**
2. Click **⋮ → Custom repositories**
3. Enter URL: `https://github.com/bhartiNitish-1707/Universal-Remote`
4. Category: **Dashboard** (Lovelace)
5. Click **Add** → Search **Universal Remote Card** → **Install**
6. Hard-refresh your browser (`Ctrl+Shift+R`)

### Manual

1. Download `universal-remote-card.js` from the [latest release](https://github.com/bhartiNitish-1707/Universal-Remote/releases/latest)
2. Copy to `config/www/universal-remote-card.js`
3. Go to **Settings → Dashboards → Resources** → Add:

```
/local/universal-remote-card.js
```
Type: **JavaScript module**

---

## Resource URL (HACS install)

```
/hacsfiles/Universal-Remote/universal-remote-card.js
```

---

## Configuration

### Minimal

```yaml
type: custom:universal-remote-card
media_player_id: media_player.fire_tv
```

### Full Fire TV example

```yaml
type: custom:universal-remote-card
title: Fire TV
media_player_id: media_player.fire_tv
remote_id: remote.fire_tv
platform: Fire TV
color_scheme: dark
rows:
  - [power, back, home, menu]
  - [touchpad]
  - [rewind, play_pause, fast_forward]
  - [volume_down, mute, volume_up]
```

### Android TV

```yaml
type: custom:universal-remote-card
title: Living Room TV
media_player_id: media_player.android_tv
remote_id: remote.android_tv
platform: Android TV
rows:
  - [power, back, home, app_switch]
  - [touchpad]
  - [rewind, play_pause, fast_forward]
  - [volume_down, mute, volume_up]
```

### Apple TV

```yaml
type: custom:universal-remote-card
title: Apple TV
media_player_id: media_player.apple_tv
remote_id: remote.apple_tv
platform: Apple TV
rows:
  - [power, back, home, menu]
  - [touchpad]
  - [previous, play_pause, next]
  - [volume_down, mute, volume_up]
```

---

## Available Buttons

| Key | Description |
|-----|-------------|
| `power` | Power toggle |
| `back` | Back / Return |
| `home` | Home screen |
| `menu` | Menu / Settings |
| `play_pause` | Play / Pause |
| `rewind` | Rewind |
| `fast_forward` | Fast forward |
| `mute` | Toggle mute |
| `volume_up` / `volume_down` | Volume |
| `touchpad` | Swipe touchpad + nav buttons |
| `dpad` | Classic D-pad |
| `up` `down` `left` `right` | Directional |
| `select` | OK / Enter |
| `app_switch` | App switcher |
| `search` | Search |
| `space` | Invisible spacer |

---

## Build from source

```bash
git clone https://github.com/bhartiNitish-1707/Universal-Remote
cd Universal-Remote
npm install
npm run build
# Output: dist/universal-remote-card.js
```

---

## License

[MIT](LICENSE)
