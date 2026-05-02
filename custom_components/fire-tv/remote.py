"""Remote platform support for Firemote."""

from __future__ import annotations

from homeassistant.components.remote import RemoteEntity, SUPPORT_SEND_COMMAND, SUPPORT_TURN_ON, SUPPORT_TURN_OFF
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .const import DOMAIN


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})
    hass.data[DOMAIN].setdefault("device_data", {})
    hass.data[DOMAIN]["device_data"][entry.entry_id] = entry.data
    hass.async_add_job(hass.config_entries.async_forward_entry_setup(entry, "remote"))
    return True


async def async_setup_platform(hass: HomeAssistant, config, async_add_entities, discovery_info=None):
    if discovery_info is None:
        return
    async_add_entities([FiremoteRemote(discovery_info)])


class FiremoteRemote(RemoteEntity):
    def __init__(self, config_entry: ConfigEntry) -> None:
        self._config_entry = config_entry
        self._name = config_entry.title
        self._state = None

    @property
    def name(self) -> str:
        return self._name

    @property
    def unique_id(self) -> str:
        return f"{self._config_entry.unique_id}_remote"

    @property
    def supported_features(self) -> int:
        return SUPPORT_SEND_COMMAND | SUPPORT_TURN_ON | SUPPORT_TURN_OFF

    async def async_turn_on(self) -> None:
        self._state = "on"

    async def async_turn_off(self) -> None:
        self._state = "off"

    async def async_send_command(self, command, **kwargs) -> None:
        self._state = "on"

    @property
    def available(self) -> bool:
        return True
