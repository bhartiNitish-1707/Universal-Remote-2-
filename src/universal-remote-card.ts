import { LitElement, html, TemplateResult, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { RemoteCardConfig, HomeAssistant, ButtonKey } from './types';
import { cardStyles } from './styles';
import './editor';

// ─── Button definitions ──────────────────────────────────────────────────────

const PLATFORM_ICONS: Record<string, string> = {
  'Fire TV': '🔥',
  'Android TV': '🤖',
  'Apple TV': '🍎',
  'Generic': '📺',
};

interface BtnDef {
  icon: string;
  label: string;
  service?: string;
  key?: string;
}

function getButtonDefs(platform: string): Record<ButtonKey | string, BtnDef> {
  const isAppleTV = platform === 'Apple TV';
  return {
    power:         { icon: 'mdi:power',                  label: 'Power',   service: 'media_player.toggle' },
    back:          { icon: 'mdi:arrow-left',              label: 'Back',    key: 'back' },
    home:          { icon: 'mdi:home',                    label: 'Home',    key: 'home' },
    menu:          { icon: 'mdi:menu',                    label: 'Menu',    key: isAppleTV ? 'menu' : 'settings' },
    play_pause:    { icon: 'mdi:play-pause',              label: 'Play',    service: 'media_player.media_play_pause' },
    rewind:        { icon: 'mdi:rewind',                  label: 'Rwd',     service: 'media_player.media_previous_track' },
    fast_forward:  { icon: 'mdi:fast-forward',            label: 'Fwd',     service: 'media_player.media_next_track' },
    mute:          { icon: 'mdi:volume-mute',             label: 'Mute',    service: 'media_player.volume_mute' },
    volume_up:     { icon: 'mdi:volume-high',             label: 'Vol+',    service: 'media_player.volume_up' },
    volume_down:   { icon: 'mdi:volume-low',              label: 'Vol-',    service: 'media_player.volume_down' },
    up:            { icon: 'mdi:chevron-up',              label: 'Up',      key: 'up' },
    down:          { icon: 'mdi:chevron-down',            label: 'Down',    key: 'down' },
    left:          { icon: 'mdi:chevron-left',            label: 'Left',    key: 'left' },
    right:         { icon: 'mdi:chevron-right',           label: 'Right',   key: 'right' },
    select:        { icon: 'mdi:checkbox-blank-circle',   label: 'OK',      key: 'select' },
    app_switch:    { icon: 'mdi:view-grid',               label: 'Apps',    key: 'app_switch' },
    search:        { icon: 'mdi:magnify',                 label: 'Search',  key: 'search' },
    input_select:  { icon: 'mdi:import',                  label: 'Input',   service: 'media_player.select_source' },
    channel_up:    { icon: 'mdi:chevron-double-up',       label: 'Ch+',     key: 'channel_up' },
    channel_down:  { icon: 'mdi:chevron-double-down',     label: 'Ch-',     key: 'channel_down' },
    record:        { icon: 'mdi:record',                  label: 'Rec',     key: 'record' },
    stop:          { icon: 'mdi:stop',                    label: 'Stop',    service: 'media_player.media_stop' },
    previous:      { icon: 'mdi:skip-previous',           label: 'Prev',    service: 'media_player.media_previous_track' },
    next:          { icon: 'mdi:skip-next',               label: 'Next',    service: 'media_player.media_next_track' },
    subtitle:      { icon: 'mdi:subtitles',               label: 'Sub',     key: 'subtitle' },
    info:          { icon: 'mdi:information-outline',     label: 'Info',    key: 'info' },
    touchpad:      { icon: 'mdi:gesture-swipe',           label: 'Touch',   key: 'touchpad' },
    space:         { icon: '',                            label: '',        key: 'space' },
  };
}

const DEFAULT_ROWS: Record<string, Array<Array<string>>> = {
  'Fire TV': [
    ['power', 'back', 'home', 'menu'],
    ['touchpad'],
    ['rewind', 'play_pause', 'fast_forward'],
    ['volume_down', 'mute', 'volume_up'],
  ],
  'Android TV': [
    ['power', 'back', 'home', 'app_switch'],
    ['touchpad'],
    ['rewind', 'play_pause', 'fast_forward'],
    ['volume_down', 'mute', 'volume_up'],
  ],
  'Apple TV': [
    ['power', 'back', 'home', 'menu'],
    ['touchpad'],
    ['previous', 'play_pause', 'next'],
    ['volume_down', 'mute', 'volume_up'],
  ],
  'Generic': [
    ['power', 'back', 'home'],
    ['up', 'space', 'space'],
    ['left', 'select', 'right'],
    ['down', 'space', 'space'],
    ['play_pause', 'stop', 'mute'],
  ],
};

// ─── Card ──────────────────────────────────────────────────────────────────

@customElement('universal-remote-card')
export class UniversalRemoteCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: RemoteCardConfig;
  @state() private _touchActive = false;

  private _touchStartX = 0;
  private _touchStartY = 0;
  private _swipeThreshold = 30;
  private _lastSwipeTime = 0;

  static get styles() {
    return [cardStyles];
  }

  static async getConfigElement() {
    await import('./editor');
    return document.createElement('universal-remote-card-editor');
  }

  static getStubConfig(): RemoteCardConfig {
    return {
      type: 'custom:universal-remote-card',
      title: 'Fire TV',
      platform: 'Fire TV',
      rows: DEFAULT_ROWS['Fire TV'],
    };
  }

  public setConfig(config: RemoteCardConfig): void {
    if (!config) throw new Error('Invalid configuration');
    this._config = {
      platform: 'Fire TV',
      color_scheme: 'dark',
      ...config,
    };
  }

  getCardSize(): number {
    return 5;
  }

  // ─── Actions ──────────────────────────────────────────────────────────────

  private async _pressRemoteKey(key: string): Promise<void> {
    const { remote_id, media_player_id } = this._config;
    if (remote_id) {
      await this.hass.callService('remote', 'send_command', {
        entity_id: remote_id,
        command: key,
      });
    } else if (media_player_id) {
      // Fallback: map directional keys to media_player services
      const serviceMap: Record<string, [string, string]> = {
        select: ['media_player', 'media_play_pause'],
      };
      const svc = serviceMap[key];
      if (svc) {
        await this.hass.callService(svc[0], svc[1], {
          entity_id: media_player_id,
        });
      }
    }
  }

  private async _callMediaService(service: string, extra?: Record<string, unknown>): Promise<void> {
    const { media_player_id } = this._config;
    if (!media_player_id) return;
    const [domain, svc] = service.split('.');
    await this.hass.callService(domain, svc, {
      entity_id: media_player_id,
      ...extra,
    });
  }

  private async _handleButtonPress(btnKey: string): Promise<void> {
    const platform = this._config.platform || 'Fire TV';
    const defs = getButtonDefs(platform);
    const def = defs[btnKey];
    if (!def) return;

    // Check custom action first
    const customActions = this._config.custom_actions;
    if (customActions && customActions[btnKey]) {
      const ca = customActions[btnKey];
      if (ca.action === 'call-service' && ca.service) {
        const [domain, svc] = ca.service.split('.');
        await this.hass.callService(domain, svc, ca.service_data || {});
        return;
      }
    }

    if (def.service) {
      await this._callMediaService(def.service);
    } else if (def.key && def.key !== 'space' && def.key !== 'touchpad') {
      await this._pressRemoteKey(def.key);
    }
  }

  // ─── Touchpad ─────────────────────────────────────────────────────────────

  private _onTouchStart(ev: TouchEvent): void {
    this._touchStartX = ev.touches[0].clientX;
    this._touchStartY = ev.touches[0].clientY;
    this._touchActive = true;

    // Ripple effect
    const tp = ev.currentTarget as HTMLElement;
    const ripple = document.createElement('div');
    ripple.className = 'touchpad-ripple';
    const rect = tp.getBoundingClientRect();
    ripple.style.left = `${ev.touches[0].clientX - rect.left}px`;
    ripple.style.top = `${ev.touches[0].clientY - rect.top}px`;
    tp.appendChild(ripple);
    setTimeout(() => ripple.remove(), 400);
  }

  private _onTouchEnd(ev: TouchEvent): void {
    this._touchActive = false;
    const now = Date.now();
    const dx = ev.changedTouches[0].clientX - this._touchStartX;
    const dy = ev.changedTouches[0].clientY - this._touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (now - this._lastSwipeTime < 300) return;
    this._lastSwipeTime = now;

    if (absDx < 10 && absDy < 10) {
      // Tap = select
      this._handleButtonPress('select');
    } else if (absDx > this._swipeThreshold || absDy > this._swipeThreshold) {
      if (absDx > absDy) {
        this._handleButtonPress(dx > 0 ? 'right' : 'left');
      } else {
        this._handleButtonPress(dy > 0 ? 'down' : 'up');
      }
    }
    ev.preventDefault();
  }

  private _onMouseSwipe(direction: string): void {
    this._handleButtonPress(direction);
  }

  // ─── Render helpers ───────────────────────────────────────────────────────

  private _renderButton(btnKey: string): TemplateResult {
    if (btnKey === 'space') {
      return html`<div class="spacer"></div>`;
    }
    if (btnKey === 'touchpad') {
      return this._renderTouchpad();
    }
    if (btnKey === 'dpad') {
      return this._renderDpad();
    }

    const platform = this._config.platform || 'Fire TV';
    const defs = getButtonDefs(platform);
    const def = defs[btnKey];
    if (!def) {
      return html`<div class="spacer"></div>`;
    }

    return html`
      <button
        class="remote-btn ${btnKey === 'power' ? 'power-btn' : ''}"
        title="${def.label}"
        @click=${() => this._handleButtonPress(btnKey)}
        aria-label="${def.label}"
      >
        <ha-icon icon="${def.icon}"></ha-icon>
        <span class="btn-label">${def.label}</span>
      </button>
    `;
  }

  private _renderDpad(): TemplateResult {
    return html`
      <div class="dpad-container">
        <div class="spacer"></div>
        ${this._renderDpadBtn('up', 'mdi:chevron-up', 'Up')}
        <div class="spacer"></div>
        ${this._renderDpadBtn('left', 'mdi:chevron-left', 'Left')}
        <button
          class="remote-btn dpad-center"
          @click=${() => this._handleButtonPress('select')}
          aria-label="Select"
        >
          <ha-icon icon="mdi:checkbox-blank-circle"></ha-icon>
        </button>
        ${this._renderDpadBtn('right', 'mdi:chevron-right', 'Right')}
        <div class="spacer"></div>
        ${this._renderDpadBtn('down', 'mdi:chevron-down', 'Down')}
        <div class="spacer"></div>
      </div>
    `;
  }

  private _renderDpadBtn(key: string, icon: string, label: string): TemplateResult {
    return html`
      <button
        class="remote-btn"
        @click=${() => this._handleButtonPress(key)}
        aria-label="${label}"
      >
        <ha-icon icon="${icon}"></ha-icon>
      </button>
    `;
  }

  private _renderTouchpad(): TemplateResult {
    return html`
      <div
        class="touchpad ${this._touchActive ? 'swiping' : ''}"
        @touchstart=${this._onTouchStart}
        @touchend=${this._onTouchEnd}
        @touchcancel=${() => { this._touchActive = false; }}
      >
        <span class="touchpad-icon">👆</span>
        <span class="touchpad-hint">Swipe to navigate · Tap to select</span>
        <div style="display:flex;gap:6px;margin-top:8px;">
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe('left')} aria-label="Left">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe('up')} aria-label="Up">
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._handleButtonPress('select')} aria-label="OK">
            <ha-icon icon="mdi:checkbox-blank-circle"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe('down')} aria-label="Down">
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="remote-btn" style="width:36px;height:36px;" @click=${() => this._onMouseSwipe('right')} aria-label="Right">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>
      </div>
    `;
  }

  private _renderStatusBar(): TemplateResult | typeof nothing {
    const { media_player_id } = this._config;
    if (!media_player_id || !this.hass) return nothing;
    const entity = this.hass.states[media_player_id];
    if (!entity) return nothing;
    const state = entity.state;
    const isOn = state !== 'off' && state !== 'unavailable' && state !== 'unknown';
    const mediaTitle = (entity.attributes as Record<string, string>)['media_title'] || '';

    return html`
      <div class="status-bar">
        <div class="status-entity">
          <div class="status-dot ${isOn ? 'on' : 'off'}"></div>
          ${media_player_id.replace('media_player.', '')}
        </div>
        <div class="status-state">${mediaTitle || state}</div>
      </div>
    `;
  }

  render(): TemplateResult {
    if (!this._config) return html``;

    const { title, platform = 'Fire TV', rows, color_scheme = 'dark' } = this._config;
    const activeRows = rows || DEFAULT_ROWS[platform] || DEFAULT_ROWS['Generic'];
    const platformEmoji = PLATFORM_ICONS[platform] || '📺';

    return html`
      <ha-card>
        <div class="card-container" color-scheme="${color_scheme}">
          ${title ? html`
            <div class="card-title">
              ${title}
              <span class="platform-badge">${platformEmoji} ${platform}</span>
            </div>
          ` : nothing}

          <div class="rows-container">
            ${activeRows.map((row) => html`
              <div class="button-row">
                ${row.map((btn) => this._renderButton(btn))}
              </div>
            `)}
          </div>

          ${this._renderStatusBar()}
        </div>
      </ha-card>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'universal-remote-card': UniversalRemoteCard;
  }
}
