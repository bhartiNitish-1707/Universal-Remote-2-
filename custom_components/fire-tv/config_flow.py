"""Config flow for Firemote."""

from __future__ import annotations

import voluptuous as vol

from homeassistant import config_entries
from homeassistant.core import callback
from homeassistant.data_entry_flow import FlowResult

from .const import CONF_HOST, CONF_NAME, DOMAIN


class FiremoteConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
    VERSION = 1
    CONNECTION_CLASS = config_entries.CONN_CLASS_LOCAL_POLLING

    async def async_step_user(self, user_input: dict | None = None) -> FlowResult:
        if user_input is None:
            return self.async_show_form(
                step_id="user",
                data_schema=vol.Schema(
                    {
                        vol.Required(CONF_NAME, default="Firemote"): str,
                        vol.Required(CONF_HOST, default="192.168.1.17"): str,
                    }
                ),
            )

        await self.async_set_unique_id(user_input[CONF_HOST])
        self._abort_if_unique_id_configured()
        return self.async_create_entry(title=user_input[CONF_NAME], data=user_input)
