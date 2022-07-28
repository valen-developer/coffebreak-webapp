export type alertTypes = 'succes' | 'warning' | 'danger' | 'info';

export interface Alert {
  uuid: string;
  message: string;
  subtitle?: string;
  type: alertTypes;
  autoClose: boolean;
  fadeOut?: boolean;
  onClick?: () => void;
}
