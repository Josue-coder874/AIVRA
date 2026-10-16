import React, { useState } from 'react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreenName: string;
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreenName, onNavigate }) => {
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_12px_rgba(0,0,0,0.35)] border-b border-surface-container-high/40">
        <div className="h-16 px-4 flex items-center justify-between gap-3 max-w-md mx-auto">
          {/* Logo & Section Title */}
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'none')}
          >
            <img
              alt="AIVRA Emblem Logo"
              className="h-8 w-auto object-contain"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7GpdzTCEy9Zgiir2ZvSGCknJfipQgtquwfEaGOlhzZJlyAfMZF3jZRA3IEVXegD2Ph0aFyDyEXIap3h76EhXzS7EbGEchTSSGf2PrbVoW0dSn6HWR4QtiHDKm1dxIVPoENGQYqEnwYVBqjQ5UUBOeROYBE892HOjfIWRXDDnPank1EJVZ8Zc5slNEoxHHSLPbIUYNsoi7skkQR3R_pORJpnNp3M9nzTGhQDUsXt5oow_N4IIG79G7yg"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                  AIVRA
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface-variant font-normal opacity-40">
                  /
                </span>
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase truncate max-w-[120px]">
                  {currentScreenName}
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse-dot"></span>
                <span className="font-label-sm text-label-sm text-tertiary tracking-normal uppercase">
                  Pulsera Conectada
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-1.5 relative">
            <button
              aria-label="Notificaciones"
              type="button"
              onClick={() => setShowNotificationModal(!showNotificationModal)}
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-colors relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary-container ring-2 ring-surface"></span>
            </button>

            <button
              aria-label="Perfil de Usuario"
              type="button"
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="relative flex items-center justify-center rounded-full focus:outline-none"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-secondary/40 hover:ring-secondary transition-all"
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-06c7OhSSLqJad34-NuBQkKwZT0QlrD0NQdRM1nocvwDf0dBkfn1Yv-qQtTDuQzAZ9KpZ6kLsy7o-Z-KRbzQgPpFa3iNz2SX_69BlYdxgIx6B4IYGi5WCTMx1J6uJbCCNtvx0-cPtoEmd_UCO6XK4s_GqtKS-rnCemx48GkIcWaw0MIWX_22jhwokERKMapF2W4LnSPe5IwdDInY9rTtK3dApL3W1Jte2idJwnWLM5t5EoL14rqaAzg"
              />
            </button>

            {/* Account Quick Dropdown */}
            {showAccountMenu && (
              <div className="absolute top-14 right-0 w-60 rounded-xl bg-surface-container-high border border-surface-container-highest shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2 border-b border-surface-container">
                  <p className="font-label-md text-on-surface font-bold truncate">Valentina Torres</p>
                  <p className="font-label-sm text-on-surface-variant text-[11px] truncate">valentina@ejemplo.com</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[10px] font-bold">
                    Sentinel Band BLE 5.3
                  </span>
                </div>
                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    onNavigate('0. Registro e Inicio de Sesión', 'push');
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-on-surface hover:bg-surface-container flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">manage_accounts</span>
                  Cambiar Cuenta / Login
                </button>
                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    onNavigate('8. Configuración de Pulsera y Palabra Clave', 'push');
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-on-surface hover:bg-surface-container flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">tune</span>
                  Ajustes de Periférico
                </button>
                <button
                  onClick={() => {
                    setShowAccountMenu(false);
                    onNavigate('5. Planes de Suscripción y Cobertura', 'none');
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs text-on-surface hover:bg-surface-container flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                  Planes de Cobertura
                </button>
              </div>
            )}

            {/* Notification Drawer Popover */}
            {showNotificationModal && (
              <div className="absolute top-14 right-0 w-72 rounded-xl bg-surface-container-high border border-surface-container-highest shadow-2xl p-3 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-on-surface font-semibold">Notificaciones</span>
                  <span className="text-[10px] text-secondary font-bold">1 Nueva</span>
                </div>
                <div className="py-2.5 flex flex-col gap-2">
                  <div className="p-2 rounded-lg bg-surface-container flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">verified</span>
                    <div>
                      <p className="font-medium text-on-surface">Telemetría de pulsera OK</p>
                      <p className="text-[11px] text-on-surface-variant">Último pulso hace 1 min. Batería al 88%.</p>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-surface-container flex items-start gap-2 text-xs">
                    <span className="material-symbols-outlined text-tertiary text-[16px] shrink-0 mt-0.5">group</span>
                    <div>
                      <p className="font-medium text-on-surface">Elena y Carlos en guardia</p>
                      <p className="text-[11px] text-on-surface-variant">Canal de SMS y llamada enlazados.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
