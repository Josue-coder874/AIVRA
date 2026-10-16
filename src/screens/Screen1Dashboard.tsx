import React, { useState, useRef } from 'react';
import { ScreenId } from '../types';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { BraceletEvent } from '../bracelet/bridge';

interface Screen1Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
  braceletConnection?: Pick<Extract<BraceletEvent, { type: 'connection' }>, 'connected' | 'batteryLevel'> | null;
}

export const Screen1Dashboard: React.FC<Screen1Props> = ({ onNavigate, braceletConnection }) => {
  const [testFeedbackVisible, setTestFeedbackVisible] = useState(false);
  const [testing, setTesting] = useState(false);
  const pressTimerRef = useRef<number | null>(null);

  const handleTestClick = () => {
    setTesting(true);
    setTestFeedbackVisible(true);

    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate([120, 80, 120]);
    }

    setTimeout(() => {
      setTestFeedbackVisible(false);
      setTesting(false);
    }, 3200);
  };

  const handleSOSPressStart = () => {
    pressTimerRef.current = window.setTimeout(() => {
      onNavigate('2. Alerta SOS y Cuenta Regresiva', 'slide_up');
    }, 1500);
  };

  const handleSOSPressEnd = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <Header currentScreenName="Inicio" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full px-4 pb-28 gap-4 pt-3">
          {/* System Diagnostics Header Banner */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-container-low shadow-sm border border-surface-container/60">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                <span className="absolute w-2.5 h-2.5 rounded-full bg-tertiary animate-ping opacity-75"></span>
              </div>
              <span className="font-label-md text-label-md text-on-surface">
                Protección activa en segundo plano
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-tertiary font-bold tracking-wider uppercase">
              En Guardia
            </span>
          </div>

          {/* Sentinel Hardware Telemetry Card - Clicking this leads to Screen 8 */}
          <div
            className="bg-surface-container relative overflow-hidden rounded-xl p-4 shadow-md flex flex-col gap-3.5 cursor-pointer hover:bg-surface-container-high transition-colors border border-surface-container-highest/40 group"
            onClick={() => onNavigate('8. Configuración de Pulsera y Palabra Clave', 'push')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onNavigate('8. Configuración de Pulsera y Palabra Clave', 'push');
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary shadow-inner group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">watch</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                      AIVRA Sentinel Band
                    </h2>
                    <span
                      className="material-symbols-outlined text-secondary text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                  <p className="font-label-sm text-label-sm text-secondary tracking-wide uppercase">
                    {braceletConnection
                      ? braceletConnection.connected
                        ? 'Pulsera vinculada • Demo'
                        : 'Pulsera desconectada'
                      : 'Bluetooth BLE 5.3 Conectado'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">battery_charging_full</span>
                  <span className="font-telemetry-num text-telemetry-num leading-none">
                    {braceletConnection?.batteryLevel ?? 88}%
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px] mt-0.5">
                  {braceletConnection?.connected ? 'Dato simulado en vivo' : '~4 días restantes'}
                </span>
              </div>
            </div>

            {/* Battery level custom track */}
            <div className="w-full h-1.5 rounded-full bg-surface-container-lowest overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-secondary to-tertiary rounded-full"
                style={{ width: `${braceletConnection?.batteryLevel ?? 88}%` }}
              ></div>
            </div>

            {/* Micro-Metrics Data Strip */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              <div className="flex flex-col p-2.5 rounded-lg bg-surface-container-low shadow-sm">
                <div className="flex items-center gap-1 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">
                    satellite_alt
                  </span>
                  <span className="font-label-sm text-label-sm text-[10px] uppercase tracking-wider">
                    GPS
                  </span>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  Excelente
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">
                  ±2m precisión
                </span>
              </div>

              <div className="flex flex-col p-2.5 rounded-lg bg-surface-container-low shadow-sm">
                <div className="flex items-center gap-1 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    ecg_heart
                  </span>
                  <span className="font-label-sm text-label-sm text-[10px] uppercase tracking-wider">
                    Sensores
                  </span>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">3/3</span>
                <span className="font-label-sm text-label-sm text-tertiary text-[10px]">
                  100% Operativos
                </span>
              </div>

              <div className="flex flex-col p-2.5 rounded-lg bg-surface-container-low shadow-sm">
                <div className="flex items-center gap-1 text-on-surface-variant mb-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">sync</span>
                  <span className="font-label-sm text-label-sm text-[10px] uppercase tracking-wider">
                    Sinc
                  </span>
                </div>
                <span className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                  Hace 1 min
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">
                  Canal seguro
                </span>
              </div>
            </div>
          </div>

          {/* Primary SOS Trigger Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-error-container/30 to-surface-container-high p-5 shadow-lg flex flex-col items-center text-center gap-4 border border-error-container/40">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse-dot"></span>
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-primary font-bold">
                Respuesta Inmediata SOS
              </span>
            </div>

            {/* Tactile Emergency Button With Dual-Layer Bezel */}
            <div className="relative flex items-center justify-center my-1">
              <div className="absolute w-36 h-36 rounded-full bg-primary-container/20 blur-xl pointer-events-none"></div>
              <div className="w-32 h-32 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-[inset_0_4px_8px_rgba(0,0,0,0.8)]">
                <button
                  id="sosTriggerButton"
                  type="button"
                  aria-label="Activar Alerta SOS de Emergencia"
                  onClick={() => onNavigate('2. Alerta SOS y Cuenta Regresiva', 'slide_up')}
                  onMouseDown={handleSOSPressStart}
                  onMouseUp={handleSOSPressEnd}
                  onMouseLeave={handleSOSPressEnd}
                  onTouchStart={handleSOSPressStart}
                  onTouchEnd={handleSOSPressEnd}
                  className="relative group w-28 h-28 rounded-full bg-gradient-to-br from-primary-container via-[#dc2626] to-on-primary-fixed-variant text-on-primary-container flex flex-col items-center justify-center shadow-[0_8px_24px_rgba(255,84,81,0.55)] active:scale-95 transition-all select-none focus:outline-none cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[38px] font-bold drop-shadow">
                    e911_emergency
                  </span>
                  <span className="font-headline-sm text-headline-sm font-extrabold tracking-tight mt-0.5 drop-shadow">
                    SOS
                  </span>
                  <span className="absolute inset-0 rounded-full border-2 border-white/25 pointer-events-none group-active:scale-105 transition-transform"></span>
                </button>
              </div>
            </div>

            {/* Guidance Subtitle & Instructions */}
            <div className="flex flex-col gap-1 max-w-[280px]">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Alerta Satelital & Red Guardianes
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant text-[13px] leading-relaxed">
                Presiona <strong className="text-on-surface font-semibold">3 veces</strong> el botón
                físico de tu pulsera o{' '}
                <strong className="text-on-surface font-semibold">mantén pulsado 2s</strong> aquí.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low text-on-surface-variant border border-surface-container-high">
              <span className="material-symbols-outlined text-[15px] text-tertiary">lock</span>
              <span className="font-label-sm text-label-sm text-[11px]">
                Transmisión cifrada militar AES-256
              </span>
            </div>
          </div>

          {/* Interactive Test Mode Card (Simulador AIVRA) */}
          <div className="rounded-xl bg-surface-container p-4 shadow-md flex flex-col gap-3 border border-surface-container-highest/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">vibration</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">
                    Simulador de Prueba
                  </h3>
                  <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-secondary">
                    Modo Seguro
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant text-[13px] mt-1 leading-snug">
                  Comprueba la vibración háptica de tu pulsera y altavoz sin emitir alarmas reales a
                  la central.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                id="quickTestBtn"
                type="button"
                disabled={testing}
                onClick={handleTestClick}
                className={`flex-1 py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-surface-bright active:scale-[0.98] transition-all text-secondary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 ${
                  testing ? 'opacity-60' : ''
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {testing ? 'hourglass_top' : 'play_arrow'}
                </span>
                <span>{testing ? 'Enviando pulso...' : 'Iniciar Prueba Rápida'}</span>
              </button>

              <button
                type="button"
                aria-label="Configuración de pruebas"
                onClick={() => onNavigate('8. Configuración de Pulsera y Palabra Clave', 'push')}
                className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>

            {/* Micro-feedback simulated alert toast */}
            {testFeedbackVisible && (
              <div
                id="testFeedback"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-tertiary-container/30 text-on-surface transition-all border border-tertiary-container/50 animate-in fade-in"
              >
                <span className="material-symbols-outlined text-tertiary text-[18px]">
                  check_circle
                </span>
                <span className="font-label-sm text-label-sm text-[12px]">
                  Vibración táctil enviada a AIVRA Sentinel (0.4s)
                </span>
              </div>
            )}
          </div>

          {/* Safety Quick Navigation Tiles */}
          <div className="flex flex-col gap-2 pt-1">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider px-1">
              Accesos Directos de Seguridad
            </h3>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Recorrido Seguro Card */}
              <a
                href="#recorrido"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('3. Recorrido Seguro y Monitoreo', 'push');
                }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-[0.99] transition-all shadow-sm border border-surface-container-highest/30 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">navigation</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface text-[15px]">
                        Recorrido Seguro
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-sm text-label-sm text-[10px]">
                        GPS Listo
                      </span>
                    </div>
                    <span className="font-body-md text-body-md text-on-surface-variant text-[12px] truncate">
                      Geovallas y rastreo continuo en tiempo real
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </a>

              {/* Guardianes Card */}
              <a
                href="#contactos"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('4. Contactos de Confianza y Activación', 'push');
                }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-[0.99] transition-all shadow-sm border border-surface-container-highest/30 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-tertiary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">supervisor_account</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface text-[15px]">
                        Mis Guardianes
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm text-[10px]">
                        3 Activos
                      </span>
                    </div>
                    <span className="font-body-md text-body-md text-on-surface-variant text-[12px] truncate">
                      Elena, Carlos y Central de Urgencias 112
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </a>

              {/* Historial SOS Card */}
              <a
                href="#historial"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('7. Historial de Alertas e Incidentes', 'push');
                }}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container hover:bg-surface-container-high active:scale-[0.99] transition-all shadow-sm border border-surface-container-highest/30 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[22px]">history</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface text-[15px]">
                        Historial SOS
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm text-[10px]">
                        Hoy
                      </span>
                    </div>
                    <span className="font-body-md text-body-md text-on-surface-variant text-[12px] truncate">
                      Todo tranquilo, sin incidentes detectados
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                  chevron_right
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Navigation currentScreen="1. Inicio - Estado de Pulsera y Dashboard" onNavigate={onNavigate} />
    </div>
  );
};
