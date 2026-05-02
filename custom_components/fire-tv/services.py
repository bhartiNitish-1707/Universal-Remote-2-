"""Firemote service registration."""

from __future__ import annotations

import voluptuous as vol

from homeassistant.const import ATTR_ENTITY_ID
from homeassistant.core import HomeAssistant, ServiceCall
from homeassistant.helpers import config_validation as cv

from .const import (
    DOMAIN,
    SERVICE_LAUNCH_APP,
    SERVICE_NAVIGATION,
    SERVICE_PLAY_PAUSE,
    SERVICE_POWER,
    SERVICE_SEND_KEY,
    SERVICE_VOLUME,
)

SERVICE_SEND_KEY_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_ENTITY_ID): cv.entity_ids,
        vol.Required("key"): str,
    }
)
SERVICE_POWER_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_ENTITY_ID): cv.entity_ids,
        vol.Optional("state", default="toggle"): vol.In(["on", "off", "toggle"]),
    }
)
SERVICE_NAVIGATION_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_ENTITY_ID): cv.entity_ids,
        vol.Required("direction"): str,
    }
)
SERVICE_VOLUME_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_ENTITY_ID): cv.entity_ids,
        vol.Required("level"): vol.Coerce(float),
    }
)
SERVICE_PLAY_PAUSE_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_ENTITY_ID): cv.entity_ids,
    }
)
SERVICE_LAUNCH_APP_SCHEMA = vol.Schema(
    {
        vol.Optional(ATTR_ENTITY_ID): cv.entity_ids,
        vol.Required("app"): str,
    }
)


async def async_register_services(hass: HomeAssistant) -> None:
    async def handle_send_key(call: ServiceCall) -> None:
        service_data = {"command": call.data["key"], "entity_id": call.data.get(ATTR_ENTITY_ID)}
        await hass.services.async_call("remote", "send_command", service_data, blocking=True)

    async def handle_power(call: ServiceCall) -> None:
        target = call.data.get(ATTR_ENTITY_ID)
        state = call.data["state"]
        if state == "on":
            await hass.services.async_call("remote", "turn_on", {ATTR_ENTITY_ID: target}, blocking=True)
        elif state == "off":
            await hass.services.async_call("remote", "turn_off", {ATTR_ENTITY_ID: target}, blocking=True)
        else:
            await hass.services.async_call("remote", "send_command", {"command": "power", ATTR_ENTITY_ID: target}, blocking=True)

    async def handle_navigation(call: ServiceCall) -> None:
        await hass.services.async_call(
            "remote",
            "send_command",
            {"command": call.data["direction"], ATTR_ENTITY_ID: call.data.get(ATTR_ENTITY_ID)},
            blocking=True,
        )

    async def handle_volume(call: ServiceCall) -> None:
        await hass.services.async_call(
            "remote",
            "send_command",
            {"command": f"volume_{call.data['level']}", ATTR_ENTITY_ID: call.data.get(ATTR_ENTITY_ID)},
            blocking=True,
        )

    async def handle_play_pause(call: ServiceCall) -> None:
        await hass.services.async_call(
            "media_player",
            "media_play_pause",
            {ATTR_ENTITY_ID: call.data.get(ATTR_ENTITY_ID)},
            blocking=True,
        )

    async def handle_launch_app(call: ServiceCall) -> None:
        await hass.services.async_call(
            "remote",
            "send_command",
            {"command": f"launch_app:{call.data['app']}", ATTR_ENTITY_ID: call.data.get(ATTR_ENTITY_ID)},
            blocking=True,
        )

    hass.services.async_register(
        DOMAIN,
        SERVICE_SEND_KEY,
        handle_send_key,
        schema=SERVICE_SEND_KEY_SCHEMA,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_POWER, handle_power, schema=SERVICE_POWER_SCHEMA)
    hass.services.async_register(
        DOMAIN,
        SERVICE_NAVIGATION,
        handle_navigation,
        schema=SERVICE_NAVIGATION_SCHEMA,
    )
    hass.services.async_register(
        DOMAIN, SERVICE_VOLUME, handle_volume, schema=SERVICE_VOLUME_SCHEMA)
    hass.services.async_register(
        DOMAIN,
        SERVICE_PLAY_PAUSE,
        handle_play_pause,
        schema=SERVICE_PLAY_PAUSE_SCHEMA,
    )
    hass.services.async_register(
        DOMAIN,
        SERVICE_LAUNCH_APP,
        handle_launch_app,
        schema=SERVICE_LAUNCH_APP_SCHEMA,
    )
