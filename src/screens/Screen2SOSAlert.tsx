import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../types';
import { StackHeader } from '../components/StackHeader';

interface Screen2Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen2SOSAlert: React.FC<Screen2Props> = ({ onNavigate }) => {
  const [secondsLeft, setSecondsLeft] = useState(8);
  const [isCancelled, setIsCancelled] = useState(false);
  const [isFired, setIsFired] = useState(false);
  const [sliderPos, setSliderPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [sirenActive, setSirenActive] = useState(false);
  const [cancelToast, setCancelToast] = useState(false);

  const startXRef = useRef(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  const totalOffset = 326.72; // 2 * PI * 52

  useEffect(() => {
    if (isCancelled || isFired) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFired(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isCancelled, isFired]);

  const progressFraction = secondsLeft / 8;
  const currentOffset = totalOffset - progressFraction * totalOffset;

  const handlePointerDown = (clientX: number) => {
    if (isCancelled) return;
    setIsDragging(true);
    startXRef.current = clientX - sliderPos;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDragging || isCancelled) return;
    const track = trackRef.current;
    const knob = knobRef.current;
    if (!track || !knob) return;

    const maxSlide = track.clientWidth - knob.clientWidth - 8;
    let newX = clientX - startXRef.current;
    if (newX < 0) newX = 0;
    if (newX > maxSlide) newX = maxSlide;

    setSliderPos(newX);

    if (newX >= maxSlide * 0.9) {
      // Completed slide
      setIsDragging(false);
      setIsCancelled(true);
      setSliderPos(maxSlide);
      setCancelToast(true);
      setTimeout(() => {
        onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'push_back');
      }, 1500);
    }
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (!isCancelled) {
      setSliderPos(0);
    }
  };

  return (
    <div
      className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary"
      onMouseMove={(e) => handlePointerMove(e.clientX)}
      onMouseUp={handlePointerUp}
      onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
      onTouchEnd={handlePointerUp}
    >
      <StackHeader
        title="Modo Emergencia Activo"
        onBack={() => onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'push_back')}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full px-4 pb-12 pt-2 space-y-5">
          {/* Glowing Emergency Banner Notification */}
          <div className="relative overflow-hidden rounded-xl bg-error-container/40 p-4 text-center backdrop-blur-md shadow-lg border border-error-container">
            <div className="absolute inset-0 bg-gradient-to-r from-error/10 via-primary-container/20 to-error/10 animate-pulse"></div>
            <div className="relative flex items-center justify-center gap-2">
              <span
                className="material-symbols-outlined text-primary-container text-[24px] animate-bounce"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
              <span className="font-label-lg text-label-lg text-on-error-container tracking-wider uppercase font-bold">
                ¡Alerta SOS Activada!
              </span>
              <span
                className="material-symbols-outlined text-primary-container text-[24px] animate-bounce"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warning
              </span>
            </div>
            <p className="relative mt-1 font-body-md text-body-md text-on-surface-variant font-medium">
              Protocolo de emergencia AIVRA en curso. Mantenga la calma.
            </p>
          </div>

          {/* Countdown Hero Section */}
          <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-surface-container-high shadow-xl relative overflow-hidden border border-surface-container-highest">
            <div className="absolute -top-10 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative flex items-center justify-center w-52 h-52 my-2">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="text-surface-variant"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="52"
                  stroke="currentColor"
                  strokeWidth="8"
                ></circle>
                <circle
                  id="countdown-circle"
                  className="text-primary-container transition-all duration-1000 ease-linear"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="52"
                  stroke="currentColor"
                  strokeDasharray="326.72"
                  strokeDashoffset={isCancelled ? 326.72 : currentOffset}
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>

              {/* Inside Circle Content */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="font-label-sm text-label-sm text-on-surface-variant tracking-widest uppercase mb-1">
                  {isCancelled ? 'ALERTA DETENIDA' : isFired ? 'ESTADO' : 'Impacto En'}
                </span>
                <span
                  id="countdown-timer"
                  className="font-display-hero-mobile text-display-hero-mobile text-on-surface tracking-tight font-extrabold"
                >
                  {isCancelled ? '00:00' : isFired ? 'DISPARADO' : `00:0${secondsLeft}`}
                </span>
                <span className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider mt-0.5">
                  {isCancelled ? 'CANCELADA' : 'segundos'}
                </span>
              </div>
            </div>

            {/* Mode Badge */}
            <div className="mt-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest border border-surface-container-high">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
              <span className="font-label-sm text-label-sm text-on-surface tracking-wider uppercase font-bold">
                {isCancelled
                  ? 'CANCELACIÓN REGISTRADA'
                  : isFired
                  ? 'DESPACHO PRIORITARIO ACTIVO'
                  : 'ALERTA SOS ENVIÁNDOSE...'}
              </span>
            </div>
          </div>

          {/* Cancellation Slider Component */}
          <div className="flex flex-col space-y-2">
            <div
              id="slider-track"
              ref={trackRef}
              className="relative w-full h-16 bg-surface-container rounded-full overflow-hidden select-none touch-none shadow-md flex items-center justify-center px-2 border border-surface-container-highest/60"
            >
              <div
                id="slider-progress"
                style={{ width: `${sliderPos + 56}px` }}
                className="absolute left-0 top-0 bottom-0 bg-surface-variant/80 transition-all duration-75"
              ></div>

              <div className="relative z-0 pointer-events-none flex items-center justify-center gap-2 text-on-surface-variant font-label-lg text-label-lg opacity-85">
                <span>{isCancelled ? 'Alerta Cancelada' : 'Deslizar para Cancelar'}</span>
                {!isCancelled && (
                  <span className="material-symbols-outlined text-[20px] animate-pulse">
                    keyboard_double_arrow_right
                  </span>
                )}
              </div>

              <div
                id="slider-knob"
                ref={knobRef}
                style={{ transform: `translateX(${sliderPos}px)` }}
                onMouseDown={(e) => handlePointerDown(e.clientX)}
                onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
                onClick={() => {
                  // Direct click-to-cancel shortcut for convenience
                  setIsCancelled(true);
                  setCancelToast(true);
                  setTimeout(() => {
                    onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'push_back');
                  }, 1200);
                }}
                className="absolute left-1 top-1 bottom-1 w-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing transition-transform select-none"
              >
                <span className="material-symbols-outlined text-[28px]">
                  {isCancelled ? 'check' : 'shield'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-center">
              <span className="material-symbols-outlined text-[15px] text-outline">fingerprint</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Código de seguridad o huella requerida para cancelar
              </span>
            </div>
          </div>

          {/* Live Dispatch Telemetry Pipeline */}
          <div className="flex flex-col rounded-xl bg-surface-container p-4 space-y-3 shadow-md border border-surface-container-highest/30">
            <div className="flex items-center justify-between pb-1">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">
                Estado de Despacho en Vivo
              </span>
              <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high px-2 py-0.5 rounded-full font-bold">
                AIVRA LIVE-SYNC
              </span>
            </div>

            {/* Step 1: GPS Fixed */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
              <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">my_location</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-[14px] leading-5 text-on-surface font-semibold truncate">
                    Ubicación GPS fijada
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary bg-surface-dim px-2 py-0.5 rounded-full font-bold">
                    Listo
                  </span>
                </div>
                <p className="font-body-md text-[13px] leading-4 text-on-surface-variant truncate mt-0.5">
                  Av. Javier Prado 1420 (Precisión 3m)
                </p>
              </div>
            </div>

            {/* Step 2: Guardian Notification */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-[14px] leading-5 text-on-surface font-semibold truncate">
                    Notificando Guardianes
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary bg-surface-dim px-2 py-0.5 rounded-full font-bold">
                    En curso
                  </span>
                </div>
                <p className="font-body-md text-[13px] leading-4 text-on-surface-variant truncate mt-0.5">
                  Enviando SMS y llamada prioritaria a 3 contactos
                </p>
              </div>
            </div>

            {/* Step 3: Ambient Audio Recording */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-low border border-surface-container">
              <div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-on-error shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px] animate-pulse">mic</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-[14px] leading-5 text-on-surface font-semibold truncate">
                    Grabación de Audio Activa
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                    <span className="font-label-sm text-label-sm text-error font-bold">Grabando</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-body-md text-[13px] leading-4 text-on-surface-variant">
                    30 seg guardados en nube segura
                  </span>
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-0.5 h-2 bg-error animate-pulse"></span>
                    <span className="w-0.5 h-3 bg-error"></span>
                    <span className="w-0.5 h-1.5 bg-error animate-pulse"></span>
                    <span className="w-0.5 h-2.5 bg-error"></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: AIVRA Central */}
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-surface-container-low opacity-80 border border-surface-container">
              <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-[14px] leading-5 text-on-surface font-semibold truncate">
                    Central de Asistencia AIVRA
                  </span>
                  <span className="font-label-sm text-label-sm text-outline bg-surface-dim px-2 py-0.5 rounded-full font-bold">
                    En cola
                  </span>
                </div>
                <p className="font-body-md text-[13px] leading-4 text-on-surface-variant truncate mt-0.5">
                  Canal de telemetría directo reservado 24/7
                </p>
              </div>
            </div>
          </div>

          {/* Direct High-Ergonomic Emergency Actions */}
          <div className="flex flex-col space-y-3 pt-2">
            <a
              href="tel:105"
              className="w-full h-14 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg font-bold flex items-center justify-center gap-3 shadow-xl hover:opacity-95 active:scale-[0.98] transition-transform"
            >
              <span
                className="material-symbols-outlined text-[26px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                phone_in_talk
              </span>
              <span>LLAMAR AL 105 / 911 DE INMEDIATO</span>
            </a>

            <button
              id="siren-btn"
              type="button"
              onClick={() => setSirenActive(!sirenActive)}
              className={`w-full h-13 py-3.5 rounded-xl font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2.5 shadow-md active:scale-[0.98] transition-all cursor-pointer ${
                sirenActive
                  ? 'bg-error-container text-on-error-container ring-2 ring-error'
                  : 'bg-surface-container-highest text-on-surface hover:bg-surface-bright'
              }`}
            >
              <span className="material-symbols-outlined text-secondary text-[22px]">
                {sirenActive ? 'campaign' : 'volume_up'}
              </span>
              <span>
                {sirenActive
                  ? 'Sirena de Pulsera Emitiendo (95dB)'
                  : 'Activar Sirena Sonora de Pulsera (95dB)'}
              </span>
            </button>
          </div>

          {cancelToast && (
            <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-surface-bright text-on-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-secondary z-50 animate-in fade-in">
              <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
              <div className="flex flex-col">
                <span className="font-bold text-sm">Alerta SOS Cancelada</span>
                <span className="text-xs text-on-surface-variant">
                  Se ha transmitido la señal de desactivación con éxito.
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
