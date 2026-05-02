export interface RemoteCardConfig {
  type: string;
  title?: string;
  media_player_id?: string;
  remote_id?: string;
  platform?: 'Fire TV' | 'Android TV' | 'Apple TV' | 'Generic';
  rows?: Array<Array<string>>;
  custom_actions?: Record<string, CustomAction>;
  enable_touchpad?: boolean;
  touchpad_height?: number;
  button_size?: number;
  button_style?: 'default' | 'round' | 'square';
  color_scheme?: 'dark' | 'light' | 'auto';
}

export interface CustomAction {
  action: 'call-service' | 'more-info' | 'navigate' | 'url' | 'none';
  service?: string;
  service_data?: Record<string, unknown>;
  navigation_path?: string;
  url_path?: string;
  confirmation?: boolean;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService: (domain: string, service: string, serviceData?: Record<string, unknown>) => Promise<void>;
  callWS: <T>(msg: Record<string, unknown>) => Promise<T>;
  connection: {
    subscribeEvents: (callback: (event: HassEvent) => void, eventType: string) => Promise<() => void>;
  };
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
  context: {
    id: string;
    parent_id: string | null;
    user_id: string | null;
  };
}

export interface HassEvent {
  event_type: string;
  data: Record<string, unknown>;
  origin: string;
  time_fired: string;
  context: Record<string, unknown>;
}

export type ButtonKey =
  | 'power' | 'back' | 'home' | 'menu'
  | 'play_pause' | 'rewind' | 'fast_forward'
  | 'mute' | 'volume_up' | 'volume_down'
  | 'up' | 'down' | 'left' | 'right' | 'select'
  | 'touchpad'
  | 'app_switch' | 'search' | 'input_select'
  | 'channel_up' | 'channel_down'
  | 'record' | 'stop'
  | 'previous' | 'next'
  | 'subtitle' | 'info'
  | 'space';

export interface ButtonDefinition {
  icon: string;
  label: string;
  action: (hass: HomeAssistant, config: RemoteCardConfig) => void;
}

// Augment Window for HA custom card registry
declare global {
  interface Window {
    customCards: Array<{
      type: string;
      name: string;
      description?: string;
      preview?: boolean;
      documentationURL?: string;
    }>;
  }
}
