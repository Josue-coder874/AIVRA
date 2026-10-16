export type ScreenId =
  | '1. Inicio - Estado de Pulsera y Dashboard'
  | '8. Configuración de Pulsera y Palabra Clave'
  | '0. Registro e Inicio de Sesión'
  | '5. Planes de Suscripción y Cobertura'
  | '6. Onboarding y Vinculación de Pulsera'
  | '3. Recorrido Seguro y Monitoreo'
  | '7. Historial de Alertas e Incidentes'
  | '2. Alerta SOS y Cuenta Regresiva'
  | '4. Contactos de Confianza y Activación';

export type TransitionType = 'none' | 'push' | 'push_back' | 'slide_up';

export interface NavigationProps {
  currentScreen: ScreenId;
  navigateTo: (screen: ScreenId, transition?: TransitionType) => void;
}
