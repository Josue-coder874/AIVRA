/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ScreenId, TransitionType } from './types';
import { Screen1Dashboard } from './screens/Screen1Dashboard';
import { Screen0Auth } from './screens/Screen0Auth';
import { Screen2SOSAlert } from './screens/Screen2SOSAlert';
import { Screen3SafeRoute } from './screens/Screen3SafeRoute';
import { Screen4Guardians } from './screens/Screen4Guardians';
import { Screen5Plans } from './screens/Screen5Plans';
import { Screen6Onboarding } from './screens/Screen6Onboarding';
import { Screen7History } from './screens/Screen7History';
import { Screen8Config } from './screens/Screen8Config';
import { useBraceletBridge } from './bracelet/bridge';

const BraceletPrototype = React.lazy(() =>
  import('./bracelet/BraceletPrototype').then((module) => ({
    default: module.BraceletPrototype,
  })),
);

export default function App() {
  if (window.location.pathname === '/pulsera') {
    return (
      <React.Suspense fallback={<div className="min-h-screen bg-[#141416]" />}>
        <BraceletPrototype />
      </React.Suspense>
    );
  }

  return <ApplicationApp />;
}

function ApplicationApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>(
    '1. Inicio - Estado de Pulsera y Dashboard'
  );
  const [transition, setTransition] = useState<TransitionType>('none');
  const [historyStack, setHistoryStack] = useState<ScreenId[]>([
    '1. Inicio - Estado de Pulsera y Dashboard',
  ]);
  const [showScreenSwitcher, setShowScreenSwitcher] = useState(false);
  const braceletConnection = useBraceletBridge((event) => {
    if (event.type === 'sos-activated') {
      setTransition('slide_up');
      setCurrentScreen('2. Alerta SOS y Cuenta Regresiva');
      setHistoryStack((prev) => [...prev, '2. Alerta SOS y Cuenta Regresiva']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (event.type === 'sos-cancelled') {
      setCurrentScreen('1. Inicio - Estado de Pulsera y Dashboard');
      setHistoryStack((prev) => [...prev, '1. Inicio - Estado de Pulsera y Dashboard']);
    }
  });

  const navigateTo = (screen: ScreenId, trans: TransitionType = 'none') => {
    setTransition(trans);
    setCurrentScreen(screen);
    setHistoryStack((prev) => [...prev, screen]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut (Alt + S) to toggle quick screen switcher for easy reviewing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 's' || e.key === 'S')) {
        setShowScreenSwitcher((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const allScreens: ScreenId[] = [
    '1. Inicio - Estado de Pulsera y Dashboard',
    '8. Configuración de Pulsera y Palabra Clave',
    '0. Registro e Inicio de Sesión',
    '5. Planes de Suscripción y Cobertura',
    '6. Onboarding y Vinculación de Pulsera',
    '3. Recorrido Seguro y Monitoreo',
    '7. Historial de Alertas e Incidentes',
    '2. Alerta SOS y Cuenta Regresiva',
    '4. Contactos de Confianza y Activación',
  ];

  const getTransitionClass = () => {
    switch (transition) {
      case 'slide_up':
        return 'animate-in slide-in-from-bottom-8 duration-300';
      case 'push':
        return 'animate-in slide-in-from-right-8 duration-250';
      case 'push_back':
        return 'animate-in slide-in-from-left-8 duration-250';
      case 'none':
      default:
        return 'animate-in fade-in duration-150';
    }
  };

  return (
    <div className="min-h-screen bg-[#060e20] text-[#dae2fd] flex flex-col justify-start">
      {/* Desktop / Tester Quick Access Indicator */}
      <div className="hidden lg:flex fixed top-3 right-4 z-50 items-center gap-2">
        <button
          type="button"
          onClick={() => setShowScreenSwitcher(!showScreenSwitcher)}
          className="px-3 py-1.5 rounded-full bg-surface-container-high/90 hover:bg-surface-bright text-secondary text-xs font-semibold backdrop-blur-md border border-surface-container-highest shadow-xl flex items-center gap-1.5 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">view_carousel</span>
          <span>Selector de Pantallas ({allScreens.findIndex((s) => s === currentScreen) + 1}/9)</span>
        </button>
      </div>

      {/* Screen Switcher Modal for Easy QA */}
      {showScreenSwitcher && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-surface-container-high p-5 border border-surface-container-highest shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">explore</span>
                <h3 className="font-headline-sm text-on-surface font-bold">Navegación Rápida</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowScreenSwitcher(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="mt-4 flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto">
              {allScreens.map((s, idx) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    navigateTo(s, 'none');
                    setShowScreenSwitcher(false);
                  }}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                    currentScreen === s
                      ? 'bg-secondary text-on-secondary font-bold'
                      : 'bg-surface-container hover:bg-surface-container-highest text-on-surface'
                  }`}
                >
                  <span className="truncate">{s}</span>
                  <span className="font-mono opacity-60">#{idx}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Screen Container with responsive tactical phone layout */}
      <div className={`w-full min-h-screen ${getTransitionClass()}`}>
        {currentScreen === '1. Inicio - Estado de Pulsera y Dashboard' && (
          <Screen1Dashboard
            onNavigate={navigateTo}
            braceletConnection={braceletConnection}
          />
        )}
        {currentScreen === '0. Registro e Inicio de Sesión' && (
          <Screen0Auth onNavigate={navigateTo} />
        )}
        {currentScreen === '2. Alerta SOS y Cuenta Regresiva' && (
          <Screen2SOSAlert onNavigate={navigateTo} />
        )}
        {currentScreen === '3. Recorrido Seguro y Monitoreo' && (
          <Screen3SafeRoute onNavigate={navigateTo} />
        )}
        {currentScreen === '4. Contactos de Confianza y Activación' && (
          <Screen4Guardians onNavigate={navigateTo} />
        )}
        {currentScreen === '5. Planes de Suscripción y Cobertura' && (
          <Screen5Plans onNavigate={navigateTo} />
        )}
        {currentScreen === '6. Onboarding y Vinculación de Pulsera' && (
          <Screen6Onboarding onNavigate={navigateTo} />
        )}
        {currentScreen === '7. Historial de Alertas e Incidentes' && (
          <Screen7History onNavigate={navigateTo} />
        )}
        {currentScreen === '8. Configuración de Pulsera y Palabra Clave' && (
          <Screen8Config onNavigate={navigateTo} />
        )}
      </div>
    </div>
  );
}
