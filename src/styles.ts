import { css } from 'lit';

export const cardStyles = css`
  :host {
    --urc-bg: #1a1a2e;
    --urc-surface: #16213e;
    --urc-surface-2: #0f3460;
    --urc-accent: #e94560;
    --urc-accent-2: #f5a623;
    --urc-text: #eaeaea;
    --urc-text-muted: #8892a4;
    --urc-border: rgba(233, 69, 96, 0.25);
    --urc-shadow: 0 4px 24px rgba(0,0,0,0.5);
    --urc-btn-size: 48px;
    --urc-btn-radius: 12px;
    --urc-transition: 0.15s ease;
    display: block;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
  }

  :host([color-scheme="light"]) {
    --urc-bg: #f0f4f8;
    --urc-surface: #ffffff;
    --urc-surface-2: #e2e8f0;
    --urc-accent: #e94560;
    --urc-accent-2: #f5a623;
    --urc-text: #1a202c;
    --urc-text-muted: #718096;
    --urc-border: rgba(233, 69, 96, 0.2);
  }

  .card-container {
    background: var(--urc-bg);
    border-radius: 20px;
    padding: 16px;
    box-shadow: var(--urc-shadow);
    border: 1px solid var(--urc-border);
    overflow: hidden;
    position: relative;
  }

  .card-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--urc-accent), var(--urc-accent-2), var(--urc-accent));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .card-title {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--urc-text-muted);
    margin: 4px 0 14px 2px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--urc-border);
  }

  .platform-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: rgba(233, 69, 96, 0.12);
    border: 1px solid rgba(233, 69, 96, 0.3);
    color: var(--urc-accent);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 2px 8px;
    border-radius: 20px;
    text-transform: uppercase;
    margin-left: 6px;
  }

  .rows-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .button-row {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .remote-btn {
    width: var(--urc-btn-size);
    height: var(--urc-btn-size);
    border-radius: var(--urc-btn-radius);
    background: var(--urc-surface);
    border: 1px solid var(--urc-border);
    color: var(--urc-text);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2px;
    transition: all var(--urc-transition);
    position: relative;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    outline: none;
    padding: 0;
  }

  .remote-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 70%);
    opacity: 0;
    transition: opacity var(--urc-transition);
  }

  .remote-btn:hover {
    background: var(--urc-surface-2);
    border-color: rgba(233, 69, 96, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(233, 69, 96, 0.2);
  }

  .remote-btn:hover::after {
    opacity: 1;
  }

  .remote-btn:active {
    transform: scale(0.92) translateY(0);
    background: var(--urc-accent);
    border-color: var(--urc-accent);
    box-shadow: 0 0 12px rgba(233, 69, 96, 0.5);
  }

  .remote-btn.power-btn {
    background: rgba(233, 69, 96, 0.1);
    border-color: rgba(233, 69, 96, 0.4);
    color: var(--urc-accent);
  }

  .remote-btn.power-btn:hover {
    background: var(--urc-accent);
    color: white;
  }

  .remote-btn.power-btn:active {
    background: #c73652;
  }

  .remote-btn ha-icon,
  .remote-btn .btn-icon {
    width: 20px;
    height: 20px;
    pointer-events: none;
    --mdc-icon-size: 20px;
  }

  .btn-label {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--urc-text-muted);
    pointer-events: none;
    line-height: 1;
  }

  .remote-btn:active .btn-label {
    color: rgba(255,255,255,0.8);
  }

  /* DPAD */
  .dpad-container {
    display: grid;
    grid-template-columns: repeat(3, var(--urc-btn-size));
    grid-template-rows: repeat(3, var(--urc-btn-size));
    gap: 4px;
    position: relative;
  }

  .dpad-container .remote-btn {
    border-radius: 8px;
  }

  .dpad-container .dpad-center {
    border-radius: 50%;
    background: linear-gradient(135deg, var(--urc-surface-2), var(--urc-surface));
    border-color: rgba(233, 69, 96, 0.5);
  }

  .dpad-container .dpad-center:active {
    background: var(--urc-accent);
  }

  /* Touchpad */
  .touchpad {
    width: 100%;
    max-width: 280px;
    height: 160px;
    background: var(--urc-surface);
    border: 1px solid var(--urc-border);
    border-radius: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 6px;
    position: relative;
    overflow: hidden;
    transition: all var(--urc-transition);
    touch-action: none;
  }

  .touchpad::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% 50%, rgba(233, 69, 96, 0.05) 0%, transparent 70%),
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 20px,
        rgba(255,255,255,0.02) 20px,
        rgba(255,255,255,0.02) 21px
      ),
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 20px,
        rgba(255,255,255,0.02) 20px,
        rgba(255,255,255,0.02) 21px
      );
  }

  .touchpad-hint {
    font-size: 11px;
    color: var(--urc-text-muted);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-weight: 600;
    pointer-events: none;
  }

  .touchpad-icon {
    font-size: 24px;
    opacity: 0.3;
    pointer-events: none;
  }

  .touchpad:hover {
    border-color: rgba(233, 69, 96, 0.5);
    background: var(--urc-surface-2);
  }

  .touchpad.swiping {
    border-color: var(--urc-accent);
    box-shadow: 0 0 16px rgba(233, 69, 96, 0.3);
  }

  .touchpad-ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(233, 69, 96, 0.3);
    transform: scale(0);
    animation: ripple 0.4s ease-out;
    pointer-events: none;
    width: 60px;
    height: 60px;
    margin-left: -30px;
    margin-top: -30px;
  }

  @keyframes ripple {
    to { transform: scale(3); opacity: 0; }
  }

  .spacer {
    width: var(--urc-btn-size);
    height: var(--urc-btn-size);
    visibility: hidden;
  }

  /* Volume slider area */
  .vol-group {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* Status bar */
  .status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding-top: 10px;
    border-top: 1px solid var(--urc-border);
  }

  .status-entity {
    font-size: 11px;
    color: var(--urc-text-muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #666;
  }

  .status-dot.on {
    background: #4ade80;
    box-shadow: 0 0 6px rgba(74, 222, 128, 0.5);
  }

  .status-dot.off {
    background: var(--urc-text-muted);
  }

  .status-state {
    font-size: 11px;
    color: var(--urc-text-muted);
    text-transform: capitalize;
  }
`;

export const editorStyles = css`
  .editor {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .editor-row {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  ha-textfield,
  ha-select {
    width: 100%;
  }
`;
