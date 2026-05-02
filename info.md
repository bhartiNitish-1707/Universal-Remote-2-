# Universal Remote Card

A feature-rich remote control card for Home Assistant supporting **Fire TV**, **Android TV**, **Apple TV**, and generic media players.

## Quick Install via HACS

1. Open HACS → **Frontend**
2. Click **⋮ → Custom repositories**
3. Add `https://github.com/your-org/Fire-Tv` with category **Lovelace**
4. Search **Universal Remote Card** → Install
5. Reload browser

## Add to Dashboard

```yaml
type: custom:universal-remote-card
title: Fire TV
media_player_id: media_player.fire_tv
remote_id: remote.fire_tv
platform: Fire TV
```

## Resource URL (manual)

```
/hacsfiles/Fire-Tv/universal-remote-card.min.js
```
