import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RemoteCardConfig, HomeAssistant } from './types';
import { editorStyles } from './styles';

@customElement('universal-remote-card-editor')
export class UniversalRemoteCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RemoteCardConfig;

  static get styles() {
    return [editorStyles];
  }

  public setConfig(config: RemoteCardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: CustomEvent): void {
    if (!this._config || !this.hass) return;
    const target = ev.target as HTMLInputElement & { configValue?: string };
    const value = target.value;
    const key = target.configValue;
    if (!key) return;

    this._config = { ...this._config, [key]: value };
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config: this._config } })
    );
  }

  render() {
    if (!this.hass || !this._config) return html``;

    const mediaPlayerEntities = Object.keys(this.hass.states).filter((e) =>
      e.startsWith('media_player.')
    );
    const remoteEntities = Object.keys(this.hass.states).filter((e) =>
      e.startsWith('remote.')
    );

    return html`
      <div class="editor">
        <div class="editor-row">
          <label>Title</label>
          <ha-textfield
            .label=${'Card Title'}
            .value=${this._config.title || ''}
            .configValue=${'title'}
            @input=${this._valueChanged}
          ></ha-textfield>
        </div>

        <div class="editor-row">
          <label>Platform</label>
          <ha-select
            .label=${'Platform'}
            .value=${this._config.platform || 'Fire TV'}
            .configValue=${'platform'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="Fire TV">Fire TV</mwc-list-item>
            <mwc-list-item value="Android TV">Android TV</mwc-list-item>
            <mwc-list-item value="Apple TV">Apple TV</mwc-list-item>
            <mwc-list-item value="Generic">Generic</mwc-list-item>
          </ha-select>
        </div>

        <div class="editor-row">
          <label>Media Player Entity</label>
          <ha-select
            .label=${'Media Player'}
            .value=${this._config.media_player_id || ''}
            .configValue=${'media_player_id'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${mediaPlayerEntities.map(
              (e) => html`<mwc-list-item value="${e}">${e}</mwc-list-item>`
            )}
          </ha-select>
        </div>

        <div class="editor-row">
          <label>Remote Entity</label>
          <ha-select
            .label=${'Remote'}
            .value=${this._config.remote_id || ''}
            .configValue=${'remote_id'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="">None</mwc-list-item>
            ${remoteEntities.map(
              (e) => html`<mwc-list-item value="${e}">${e}</mwc-list-item>`
            )}
          </ha-select>
        </div>

        <div class="editor-row">
          <label>Color Scheme</label>
          <ha-select
            .label=${'Color Scheme'}
            .value=${this._config.color_scheme || 'dark'}
            .configValue=${'color_scheme'}
            @selected=${this._valueChanged}
            @closed=${(ev: Event) => ev.stopPropagation()}
          >
            <mwc-list-item value="dark">Dark</mwc-list-item>
            <mwc-list-item value="light">Light</mwc-list-item>
            <mwc-list-item value="auto">Auto</mwc-list-item>
          </ha-select>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-remote-card-editor': UniversalRemoteCardEditor;
  }
}
