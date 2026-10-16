import React from 'react';
import { ScreenId } from '../types';

interface NavigationProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onNavigate }) => {
  const isInicio = currentScreen === '1. Inicio - Estado de Pulsera y Dashboard';
  const isRecorrido = currentScreen === '3. Recorrido Seguro y Monitoreo';
  const isContactos = currentScreen === '4. Contactos de Confianza y Activación';
  const isPlanes = currentScreen === '5. Planes de Suscripción y Cobertura';

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-2xl shadow-[0_-8px_32px_rgba(0,0,0,0.45)] border-t border-surface-container-high/30"
      data-active-classes="text-secondary font-bold"
    >
      <div className="flex justify-between items-center h-20 px-2 max-w-md mx-auto relative">
        {/* Inicio */}
        <a
          href="#inicio"
          data-path="inicio"
          aria-label="Inicio"
          aria-current={isInicio ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'none');
          }}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-colors ${
            isInicio
              ? 'text-secondary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">shield</span>
          <span className="font-label-sm text-label-sm tracking-tight">Inicio</span>
        </a>

        {/* Recorrido */}
        <a
          href="#recorrido"
          data-path="recorrido"
          aria-label="Recorrido"
          aria-current={isRecorrido ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('3. Recorrido Seguro y Monitoreo', 'none');
          }}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-colors ${
            isRecorrido
              ? 'text-secondary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">route</span>
          <span className="font-label-sm text-label-sm tracking-tight">Recorrido</span>
        </a>

        {/* SOS Central Button */}
        <div className="relative -top-4 flex flex-col items-center justify-center">
          <a
            href="#alerta-sos"
            data-path="alerta-sos"
            aria-label="Alerta SOS"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('2. Alerta SOS y Cuenta Regresiva', 'slide_up');
            }}
            className="w-16 h-16 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_4px_24px_rgba(255,84,81,0.45)] animate-sos-pulse active:scale-95 transition-transform cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-[30px] font-bold leading-none text-on-primary-container">
                sos
              </span>
            </div>
          </a>
          <span className="mt-1 font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold text-[9px]">
            SOS
          </span>
        </div>

        {/* Contactos */}
        <a
          href="#contactos"
          data-path="contactos"
          aria-label="Contactos"
          aria-current={isContactos ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('4. Contactos de Confianza y Activación', 'none');
          }}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-colors ${
            isContactos
              ? 'text-secondary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">group</span>
          <span className="font-label-sm text-label-sm tracking-tight">Contactos</span>
        </a>

        {/* Planes y Cuenta */}
        <a
          href="#planes-y-cuenta"
          data-path="planes-y-cuenta"
          aria-label="Planes y Cuenta"
          aria-current={isPlanes ? 'page' : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate('5. Planes de Suscripción y Cobertura', 'none');
          }}
          className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-xl transition-colors ${
            isPlanes
              ? 'text-secondary font-bold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">verified_user</span>
          <span className="font-label-sm text-label-sm tracking-tight">Cuenta</span>
        </a>
      </div>
    </nav>
  );
};
