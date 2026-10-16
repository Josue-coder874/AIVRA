import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

interface Screen3Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen3SafeRoute: React.FC<Screen3Props> = ({ onNavigate }) => {
  const [totalSeconds, setTotalSeconds] = useState(18 * 60 + 27);
  const [autoCheckIn, setAutoCheckIn] = useState(true);
  const [fakeCallActive, setFakeCallActive] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const countdownFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs} min`;

  const addFiveMinutes = () => {
    setTotalSeconds((prev) => prev + 300);
  };

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2400);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <Header currentScreenName="Recorrido" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full pb-28 pt-1">
          {/* Status & Quick Telemetry Header Bar */}
          <div className="px-4 pt-3 pb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary">
                <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse-dot"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Monitoreo Activo
                </span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-low text-secondary font-label-sm text-label-sm border border-surface-container">
                <span className="material-symbols-outlined text-[14px]">satellite_alt</span>
                <span>GPS Cifrado</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-2 py-1 rounded-full border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[16px]">watch</span>
              <span>Haptic sync</span>
            </div>
          </div>

          {/* Interactive Night GPS Map Viewport */}
          <div className="px-4 py-2">
            <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-surface-container-lowest shadow-2xl flex flex-col justify-between p-3.5 select-none border border-surface-container-high/40">
              {/* Dark stylized vector map canvas background */}
              <div className="absolute inset-0 pointer-events-none opacity-90">
                <svg
                  className="w-full h-full object-cover"
                  fill="none"
                  viewBox="0 0 400 320"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="routeGradient" x1="60" y1="270" x2="330" y2="50" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4edea3" />
                      <stop offset="60%" stopColor="#4cd7f6" />
                      <stop offset="100%" stopColor="#acedff" />
                    </linearGradient>
                    <radialGradient id="safeCorridorA" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#00a572" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#00a572" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Ambient Lighting Zones */}
                  <circle cx="210" cy="140" r="85" fill="url(#safeCorridorA)" />
                  <circle cx="110" cy="220" r="70" fill="url(#safeCorridorA)" />

                  {/* Road network base */}
                  <path
                    d="M-20 60 L420 80 M-20 180 L420 160 M-20 280 L420 260"
                    stroke="#171f33"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M70 -20 L90 340 M210 -20 L190 340 M310 -20 L330 340"
                    stroke="#171f33"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <path
                    d="M-10 120 C100 130 180 80 280 110 S380 210 420 220"
                    fill="none"
                    stroke="#131b2e"
                    strokeWidth="18"
                  />

                  {/* Safe Illuminating Corridor Highlight */}
                  <path
                    d="M 60 270 Q 130 240 180 190 T 250 110 L 320 60"
                    fill="none"
                    stroke="#00a572"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeOpacity="0.35"
                  />

                  {/* Main Safe Path Polyline with High Neon Luminosity */}
                  <path
                    d="M 60 270 Q 130 240 180 190 T 250 110 L 320 60"
                    fill="none"
                    stroke="url(#routeGradient)"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Route Direction Micro-indicators */}
                  <circle cx="140" cy="216" r="3" fill="#4edea3" />
                  <circle cx="215" cy="150" r="3" fill="#4cd7f6" />
                  <circle cx="280" cy="88" r="3" fill="#acedff" />

                  {/* Safe haven node */}
                  <g transform="translate(195, 115)">
                    <circle cx="8" cy="8" r="10" fill="#171f33" />
                    <circle cx="8" cy="8" r="4" fill="#4edea3" />
                  </g>
                </svg>
              </div>

              {/* Top Map HUD Overlays */}
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container/90 backdrop-blur-md shadow-lg text-on-surface border border-surface-container-high">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">verified</span>
                  <span className="font-label-md text-label-md tracking-tight font-medium">
                    Corredor Seguro Activo
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    aria-label="Centrar ubicación"
                    className="w-9 h-9 rounded-full bg-surface-container/90 backdrop-blur-md text-on-surface hover:text-secondary flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[19px]">my_location</span>
                  </button>
                  <button
                    type="button"
                    aria-label="Capas de mapa"
                    className="w-9 h-9 rounded-full bg-surface-container/90 backdrop-blur-md text-on-surface hover:text-secondary flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[19px]">layers</span>
                  </button>
                </div>
              </div>

              {/* Location Markers */}
              {/* User Node */}
              <div className="absolute left-12 bottom-10 z-20 flex flex-col items-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-10 h-10 rounded-full bg-secondary/25 animate-ping"></span>
                  <span className="relative w-6 h-6 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-lg">
                    <span className="w-3.5 h-3.5 rounded-full bg-secondary shadow-[0_0_12px_#4cd7f6]"></span>
                  </span>
                </div>
                <span className="mt-1 px-2 py-0.5 rounded-md bg-surface-container-high/90 text-secondary font-label-sm text-label-sm tracking-wider uppercase backdrop-blur-sm">
                  Tú
                </span>
              </div>

              {/* Destination Node */}
              <div className="absolute right-14 top-10 z-20 flex flex-col items-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_0_16px_rgba(255,84,81,0.5)]">
                  <span className="material-symbols-outlined text-[18px]">home</span>
                </div>
                <span className="mt-1 px-2 py-0.5 rounded-md bg-surface-container-high/90 text-on-surface font-label-sm text-label-sm tracking-tight backdrop-blur-sm">
                  Hogar
                </span>
              </div>

              {/* Bottom Map Status Strip */}
              <div className="relative z-10 flex items-center justify-between w-full px-3 py-2 rounded-xl bg-surface-container-lowest/85 backdrop-blur-md border border-surface-container-high/40">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                  <span className="text-on-surface font-label-md text-label-md">
                    Iluminación óptima reportada (98%)
                  </span>
                </div>
                <span className="text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  Zona Tranquila
                </span>
              </div>
            </div>
          </div>

          {/* Primary Floating Route Overview Card */}
          <div className="px-4 pt-2 pb-1">
            <div className="p-4 rounded-2xl bg-surface-container text-on-surface shadow-xl flex flex-col gap-3.5 border border-surface-container-highest/30">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">directions_walk</span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      Destino en ruta
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface truncate font-semibold">
                      Oficina Central → Hogar
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-telemetry-num text-telemetry-num text-secondary">14 min</span>
                  <span className="block font-label-sm text-label-sm text-on-surface-variant">
                    1.2 km restantes
                  </span>
                </div>
              </div>

              <div className="h-px w-full bg-surface-variant opacity-40"></div>

              {/* Live Telemetry Metrics Row */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2.5 border border-surface-container">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[18px]">speed</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Velocidad</span>
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">4.8 km/h</span>
                    <span className="font-label-sm text-label-sm text-tertiary">Ritmo habitual</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2.5 border border-surface-container">
                  <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[18px]">favorite</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Pulso AIVRA</span>
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">74 BPM</span>
                    <span className="font-label-sm text-label-sm text-secondary">Nivel de calma</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Temporizador de Seguridad (Check-in Countdown) */}
          <div className="px-4 py-2">
            <div className="p-4 rounded-2xl bg-surface-container-high text-on-surface shadow-md flex flex-col gap-3 border border-surface-container-highest/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">timer</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Temporizador de Seguridad
                    </h3>
                    <p className="font-label-sm text-label-sm text-on-surface-variant">
                      Alerta automática si no confirmas arribo
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Countdown Display */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest border border-surface-container">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide">
                    Tiempo máximo de llegada
                  </span>
                  <span
                    id="countdown-val"
                    className="font-headline-lg-mobile text-headline-lg-mobile text-secondary font-bold tracking-tight"
                  >
                    {countdownFormatted}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={addFiveMinutes}
                  className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface-variant hover:text-secondary font-label-md text-label-md transition-colors flex items-center gap-1 active:scale-95 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>+5 min</span>
                </button>
              </div>

              {/* Toggle: Check-in automático con pulsera */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex flex-col pr-3">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Check-in automático de pulsera
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-xs">
                    Detecta cuando cruzas la puerta del hogar
                  </span>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoCheckIn}
                  onClick={() => setAutoCheckIn(!autoCheckIn)}
                  className={`w-12 h-7 rounded-full flex items-center p-0.5 transition-colors cursor-pointer ${
                    autoCheckIn ? 'bg-secondary' : 'bg-surface-container'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full bg-on-secondary-fixed shadow-md transform transition-transform ${
                      autoCheckIn ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Guardian Sharing Module */}
          <div className="px-4 py-2">
            <div className="p-4 rounded-2xl bg-surface-container text-on-surface flex flex-col gap-3 border border-surface-container-highest/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-[20px]">group</span>
                  <span className="font-headline-sm text-headline-sm font-semibold">Guardianes en vivo (2)</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary bg-tertiary/10 px-2.5 py-0.5 rounded-full border border-tertiary/20">
                  Recibiendo telemetría
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-xs">
                Mamá y Carlos tienen visibilidad de tu ruta en tiempo real y recibirán aviso inmediato
                ante cualquier parada imprevista.
              </p>

              {/* Guardian Contact Chips */}
              <div className="flex items-center gap-3 py-1">
                {/* Guardian 1 */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low flex-1 min-w-0 border border-surface-container">
                  <div className="relative">
                    <img
                      className="w-9 h-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Mamá"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCtpEgec-_Xig3F6MIi3k3g6KjAiOa9743kGSxRZBiYu33_VGJ0chWdjshY4npZVboOIfOiQ8N5UGH9SUAKjCNYZXTyKo0jXJg56CITZHJwIqMxsuBxEW_Fz3Au4pmUNZjuE0BN0B0nbXRN23sT43Lsso-8D9Stjt2NYGN__XYwTP7iLefqIGSuxfkNtAuRSteQB9vWFpipzs2kIqR6X2Wcb-xhsWELXY37EYL6ii4EnqgXUTR1vp2nQ"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-tertiary"></span>
                  </div>
                  <div className="flex flex-col min-w-0 truncate">
                    <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                      Mamá
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                      Siguiendo ruta
                    </span>
                  </div>
                </div>

                {/* Guardian 2 */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low flex-1 min-w-0 border border-surface-container">
                  <div className="relative">
                    <img
                      className="w-9 h-9 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                      alt="Carlos M."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPC7Hke99DRfo2xeWdCBlfPe01iIkFT_Ap0p8No4yO2gzLjXka5M4C6eOfdn_u7NEMcjGXUwGx4dxCtUm6DQoPMVVECXhofjVCPqlE7AOA9gpw8SdQQd5Jz-xmfpkokH2iZUPmWT2rHQd0ucUV7mLFa48ICjNmkoqoYjrWETa4joznwDNmwGtRf7EVm4j_eNf-MwdXx94X_1Z_XDkHFte1VrO-tUqHHZULCYXlra7NZ0sl-z8WHSkgCw"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-tertiary"></span>
                  </div>
                  <div className="flex flex-col min-w-0 truncate">
                    <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                      Carlos M.
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                      Conectado
                    </span>
                  </div>
                </div>
              </div>

              {/* Action: Share Encrypted Temp Link */}
              <button
                type="button"
                onClick={handleShare}
                className="w-full mt-1 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-secondary font-label-lg text-label-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">link</span>
                <span>Compartir enlace temporal cifrado</span>
              </button>
            </div>
          </div>

          {/* Quick Tactical Actions During Walk */}
          <div className="px-4 py-2">
            <div className="flex flex-col gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider px-1">
                Acciones Rápidas de Seguridad
              </span>
              <div className="grid grid-cols-2 gap-3">
                {/* Action 1: Fake Incoming Call */}
                <button
                  type="button"
                  onClick={() => setFakeCallActive(true)}
                  className="p-3.5 rounded-2xl bg-surface-container-high hover:bg-surface-bright text-left flex flex-col justify-between gap-3 shadow-md transition-all active:scale-[0.98] border border-surface-container-highest/30 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="w-9 h-9 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                      chevron_right
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Simular llamada
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Para evadir situaciones incómodas
                    </span>
                  </div>
                </button>

                {/* Action 2: Route Deviation Vibration Warning */}
                <div className="p-3.5 rounded-2xl bg-surface-container-high text-left flex flex-col justify-between gap-3 shadow-md border border-surface-container-highest/30">
                  <div className="flex items-center justify-between w-full">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">vibration</span>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Alerta de desvío
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Vibra a más de 100m de la ruta
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Reassurance Banner */}
          <div className="px-4 pt-2">
            <div className="p-3 rounded-xl bg-surface-container-lowest text-on-surface flex items-center gap-3 border border-surface-container">
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <p className="font-label-sm text-label-sm text-on-surface-variant flex-1">
                Telemetría biométrica y trayecto encriptados de extremo a extremo con el centro AIVRA
                Response.
              </p>
            </div>
          </div>

          {/* Toast */}
          {shareToast && (
            <div className="fixed bottom-24 left-4 right-4 max-w-md mx-auto bg-surface-bright text-on-surface p-3 rounded-xl shadow-xl flex items-center gap-2.5 z-50 animate-in fade-in border border-secondary">
              <span className="material-symbols-outlined text-secondary text-[20px]">link</span>
              <span className="text-xs font-semibold">
                Enlace seguro temporal copiado al portapapeles (Válido 60 min).
              </span>
            </div>
          )}

          {/* Fake Incoming Call Modal */}
          {fakeCallActive && (
            <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-between p-8 animate-in fade-in">
              <div className="text-center pt-12 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center mb-4 ring-4 ring-secondary/30 animate-pulse">
                  <span className="material-symbols-outlined text-[48px] text-secondary">
                    person
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">Mamá (Llamada entrante)</h3>
                <p className="text-sm text-secondary mt-1">Llamada de seguridad simulada...</p>
              </div>

              <div className="w-full max-w-xs flex items-center justify-around pb-12">
                <button
                  type="button"
                  onClick={() => setFakeCallActive(false)}
                  className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[30px]">call_end</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFakeCallActive(false)}
                  className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  <span className="material-symbols-outlined text-[30px]">call</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Navigation currentScreen="3. Recorrido Seguro y Monitoreo" onNavigate={onNavigate} />
    </div>
  );
};
