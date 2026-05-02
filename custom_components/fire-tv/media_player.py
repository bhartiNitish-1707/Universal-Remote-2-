"""Media player platform support for Firemote."""

from __future__ import annotations

from homeassistant.components.media_player import (
    MediaPlayerEntity,
    SUPPORT_TURN_ON,
    SUPPORT_TURN_OFF,
    SUPPORT_VOLUME_SET,
    SUPPORT_VOLUME_STEP,
    SUPPORT_PLAY,
    SUPPORT_PAUSE,
    SUPPORT_PLAY_MEDIA,
    SUPPORT_STOP,
    SUPPORT_NEXT_TRACK,
    SUPPORT_PREVIOUS_TRACK,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN].setdefault("device_data", {})
    hass.data[DOMAIN]["device_data"][entry.entry_id] = entry.data
    hass.async_add_job(hass.config_entries.async_forward_entry_setup(entry, "media_player"))
    return True


async def async_setup_platform(hass: HomeAssistant, config, async_add_entities, discovery_info=None):
    if discovery_info is None:
        return
    async_add_entities([FiremoteMediaPlayer(discovery_info)])


class FiremoteMediaPlayer(MediaPlayerEntity):
    def __init__(self, config_entry: ConfigEntry) -> None:
        self._config_entry = config_entry
        self._name = config_entry.title
        self._state = "idle"
        self._volume_level = 0.5

    @property
    def name(self) -> str:
        return self._name

    @property
    def unique_id(self) -> str:
        return f"{self._config_entry.unique_id}_media_player"

    @property
    def supported_features(self) -> int:
        return (
            SUPPORT_TURN_ON
            | SUPPORT_TURN_OFF
            | SUPPORT_VOLUME_SET
            | SUPPORT_VOLUME_STEP
            | SUPPORT_PLAY
            | SUPPORT_PAUSE
            | SUPPORT_PLAY_MEDIA
            | SUPPORT_STOP
            | SUPPORT_NEXT_TRACK
            | SUPPORT_PREVIOUS_TRACK
        )

    @property
    def state(self) -> str:
        return self._state

    @property
    def volume_level(self) -> float:
        return self._volume_level

    async def async_turn_on(self) -> None:
        self._state = "playing"

    async def async_turn_off(self) -> None:
        self._state = "off"

    async def async_set_volume_level(self, volume: float) -> None:
        self._volume_level = volume

    async def async_media_play(self) -> None:
        self._state = "playing"

    async def async_media_pause(self) -> None:
        self._state = "paused"

    async def async_media_play_pause(self) -> None:
        self._state = "paused" if self._state == "playing" else "playing"

    async def async_media_stop(self) -> None:
        self._state = "idle"

    async def async_media_next_track(self) -> None:
        self._state = "playing"

    async def async_media_previous_track(self) -> None:
        self._state = "playing"

    @property
    def available(self) -> bool:
        return True
