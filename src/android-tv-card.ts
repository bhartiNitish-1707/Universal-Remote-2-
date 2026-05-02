/**
 * android-tv-card.ts
 *
 * Backwards-compatible alias so existing configs using
 * `type: custom:android-tv-card` continue to work.
 */
import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RemoteCardConfig, HomeAssistant } from './types';
import { UniversalRemoteCard } from './universal-remote-card';

// Ensure the main card is registered
import './universal-remote-card';

@customElement('android-tv-card')
export class AndroidTvCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  private _inner?: UniversalRemoteCard;

  static getStubConfig(): RemoteCardConfig {
    return {
      type: 'custom:android-tv-card',
      title: 'Android TV',
      platform: 'Android TV',
    };
  }

  public setConfig(config: RemoteCardConfig): void {
    if (!this._inner) {
      this._inner = document.createElement('universal-remote-card') as UniversalRemoteCard;
      this.renderRoot.appendChild(this._inner);
    }
    this._inner.setConfig({ ...config, platform: config.platform || 'Android TV' });
  }

  protected updated(): void {
    if (this._inner) {
      this._inner.hass = this.hass;
    }
  }

  render(): TemplateResult {
    return html`<slot></slot>`;
  }

  createRenderRoot() {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'android-tv-card': AndroidTvCard;
  }
}
