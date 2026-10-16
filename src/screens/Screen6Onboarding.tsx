import React, { useState } from 'react';
import { ScreenId } from '../types';
import { StackHeader } from '../components/StackHeader';

interface Screen6Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen6Onboarding: React.FC<Screen6Props> = ({ onNavigate }) => {
  const [selectedBlood, setSelectedBlood] = useState('O+');
  const [conditions, setConditions] = useState<string[]>(['Asma Inducida', 'Penicilina (Severa)']);
  const [newCondition, setNewCondition] = useState('');
  const [deviceConnected, setDeviceConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [toast, setToast] = useState<{ title: string; desc: string } | null>(null);

  const bloodTypes = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

  const showToast = (title: string, desc: string) => {
    setToast({ title, desc });
    setTimeout(() => {
      setToast(null);
    }, 2800);
  };

  const handleConnectDevice = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setDeviceConnected(true);
      showToast('Hardware Sentinel Conectado', 'AIVRA Sentinel Band - #8841 enlazada firmemente.');
    }, 1200);
  };

  const addCondition = () => {
    if (newCondition.trim() && !conditions.includes(newCondition.trim())) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition('');
    }
  };

  const removeCondition = (item: string) => {
    setConditions(conditions.filter((c) => c !== item));
  };

  const handleContinue = () => {
    showToast('Perfil Biométrico Configurado', 'Redirigiendo a monitoreo en vivo...');
    setTimeout(() => {
      onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'push');
    }, 500);
  };

  const handleDemo = () => {
    showToast('Modo Demostración Activo', 'Accediendo con telemetría simulada...');
    setTimeout(() => {
      onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'push');
    }, 500);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <StackHeader
        title="Modo Emergencia Activo"
        onBack={() => onNavigate('0. Registro e Inicio de Sesión', 'push_back')}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full px-4 pb-12 pt-2 gap-4 text-on-surface select-none">
          {/* Stepper de Progreso */}
          <section className="flex flex-col gap-1 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">
                  2
                </span>
                <span className="font-label-lg text-label-lg text-secondary tracking-wide uppercase font-semibold">
                  Paso 2 de 3
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Configuración Segura
              </span>
            </div>

            <div className="flex items-center gap-1.5 w-full mt-1">
              <div className="h-1.5 rounded-full bg-secondary flex-1"></div>
              <div className="h-1.5 rounded-full bg-secondary flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/40 animate-pulse"></div>
              </div>
              <div className="h-1.5 rounded-full bg-surface-container-high flex-1"></div>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Enlaza tu terminal táctico biométrico y sincroniza la telemetría vital encriptada.
            </p>
          </section>

          {/* Radar Escáner BLE con Feedback Animado */}
          <section className="bg-surface-container-low rounded-xl p-4 flex flex-col items-center relative overflow-hidden shadow-md border border-surface-container">
            <div className="w-full flex items-center justify-between mb-2 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">
                  Escaneo Bluetooth BLE Activo
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                2.4 GHz Ultra-Low Latency
              </span>
            </div>

            {/* Contenedor del Radar Interactivo */}
            <div className="relative w-48 h-48 my-2 flex items-center justify-center">
              <div
                className="absolute w-44 h-44 rounded-full bg-secondary/5 animate-ping opacity-60"
                style={{ animationDuration: '3.2s' }}
              ></div>
              <div className="absolute w-36 h-36 rounded-full bg-secondary/10 animate-pulse"></div>
              <div className="absolute w-24 h-24 rounded-full bg-surface-container-high shadow-inner flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center shadow-lg">
                  <span
                    className="material-symbols-outlined text-secondary text-[30px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    sensors
                  </span>
                </div>
              </div>

              {/* Satélites de señal */}
              <div className="absolute top-3 right-8 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#4cd7f6]"></div>
              <div className="absolute bottom-5 left-10 w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#4edea3]"></div>
            </div>

            <div className="z-10 text-center flex flex-col items-center max-w-xs mt-1">
              <div className="flex items-center gap-1.5 text-secondary">
                <span className="material-symbols-outlined text-[18px]">cell_tower</span>
                <span className="font-label-lg text-label-lg tracking-wide uppercase font-semibold">
                  Buscando Dispositivo Cercano
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-xs">
                Rango de detección seguro fijado a &lt; 1.5 metros.
              </p>
            </div>

            {/* Guía de acción táctil */}
            <div className="w-full mt-3 bg-surface-container rounded-lg p-3 flex items-start gap-2.5 border border-surface-container-high">
              <div className="p-2 rounded-lg bg-surface-container-highest text-secondary shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">touch_app</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Gesto de Activación Requerido:
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs">
                  Mantén presionado el botón táctil de tu pulsera durante{' '}
                  <strong className="text-on-surface font-semibold">5 segundos</strong> hasta que vibre
                  2 veces y emita un destello azul.
                </p>
              </div>
            </div>
          </section>

          {/* Tarjeta de Dispositivo Encontrado */}
          <section className="bg-surface-container rounded-xl p-4 flex flex-col gap-3 shadow-md border border-surface-container-highest/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary relative">
                  <span className="material-symbols-outlined text-[28px]">watch</span>
                  <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-tertiary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[10px] text-on-tertiary font-bold">
                      check
                    </span>
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      AIVRA Sentinel Band
                    </h2>
                    <span className="px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm">
                      #8841
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-tertiary flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                    {deviceConnected ? 'Dispositivo Vinculado Exitosamente' : 'Listo para sincronización encriptada'}
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetría de Conexión Inmediata */}
            <div className="grid grid-cols-2 gap-2 bg-surface-container-low p-2.5 rounded-lg border border-surface-container">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">
                  signal_cellular_alt
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Señal RSSI
                  </span>
                  <span className="font-telemetry-num text-telemetry-num text-on-surface">
                    -42 dBm{' '}
                    <span className="font-label-sm text-label-sm text-tertiary font-normal">
                      (Excelente)
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-[20px]">
                  battery_charging_90
                </span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Batería Inicial
                  </span>
                  <span className="font-telemetry-num text-telemetry-num text-on-surface">
                    92%{' '}
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-normal">
                      (Óptimo)
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de Conexión BLE */}
            <button
              id="btnConnect"
              type="button"
              disabled={connecting || deviceConnected}
              onClick={handleConnectDevice}
              className={`w-full h-12 rounded-lg font-label-lg text-label-lg flex items-center justify-center gap-2 uppercase tracking-wider font-bold shadow-md transition-all active:scale-[0.98] cursor-pointer ${
                deviceConnected
                  ? 'bg-tertiary text-on-tertiary'
                  : 'bg-secondary text-on-secondary hover:bg-secondary-container'
              } ${connecting ? 'opacity-80' : ''}`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {connecting ? 'sync' : deviceConnected ? 'check_circle' : 'bluetooth_connected'}
              </span>
              <span id="btnConnectLabel">
                {connecting
                  ? 'Enlazando Claves BLE...'
                  : deviceConnected
                  ? 'Dispositivo Vinculado'
                  : 'Conectar Dispositivo'}
              </span>
            </button>
          </section>

          {/* Imagen Contextual Táctica de la Pulsera */}
          <div className="w-full h-44 rounded-xl overflow-hidden relative shadow-md bg-surface-container-low border border-surface-container">
            <img
              alt="AIVRA Sentinel Hardware"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYD_LRXYOrQShaxhSSz_75g7VYAoggq0hnzSBdRltzIzi1vSRFH3RG34Xz10IiLV1q9FXjjgamPBXrgiLd9RObu6meRIP9pPd0TSlsjhA6sibqHc-55zkqajkwQO_Xucetyv9EUWUoYemEONo0Hn0f21IV78L01hmMllDiRZgqMBOJXBFyCzkHeY3eKHuK_uYix0PGCkr40wtnqtBu8PBiUsiTgkQk72sZcxZWEsNI4adAmMTDGwc4kw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-tertiary text-[18px]">
                  verified_user
                </span>
                <span className="font-label-sm text-label-sm text-on-surface tracking-wider uppercase">
                  Cifrado Militar AES-256 Activo
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary bg-surface-container-high/80 px-2 py-0.5 rounded backdrop-blur">
                Firmware v2.4
              </span>
            </div>
          </div>

          {/* Formulario Táctico de Datos Médicos Previos */}
          <section className="bg-surface-container-low rounded-xl p-4 flex flex-col gap-3 shadow-md border border-surface-container">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-error text-[22px]">
                  medical_services
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Ficha Médica para Respuesta Rápida
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant text-xs">
                Estos datos se transmiten automáticamente a rescatistas y contactos de emergencia
                cuando se activa el protocolo SOS.
              </p>
            </div>

            {/* Selector de Grupo Sanguíneo */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-error">water_drop</span>
                Grupo Sanguíneo (Selección Inmediata)
              </label>

              <div className="grid grid-cols-4 gap-2">
                {bloodTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedBlood(type)}
                    className={`blood-btn h-11 rounded-lg font-label-lg text-label-lg font-bold transition-colors cursor-pointer ${
                      selectedBlood === type
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-surface-container-highest text-on-surface hover:bg-surface-bright'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <input id="selectedBloodGroup" type="hidden" value={selectedBlood} />
            </div>

            {/* Condiciones Médicas y Alergias Críticas */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="medicalConditions"
                className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">
                  warning
                </span>
                Alergias o Condiciones Preexistentes
              </label>

              <div className="relative bg-surface-container rounded-lg p-2.5 flex flex-col gap-2 border border-surface-container-high">
                <div className="flex flex-wrap gap-1.5" id="tagContainer">
                  {conditions.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm border border-surface-container-highest"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeCondition(item)}
                        className="text-on-surface-variant hover:text-error ml-0.5 cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="medicalConditions"
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCondition();
                      }
                    }}
                    placeholder="Escribe otra condición (ej. Diabetes Tipo 1)..."
                    className="bg-transparent flex-1 text-on-surface placeholder:text-on-surface-variant font-body-md text-body-md focus:outline-none py-1"
                  />
                  <button
                    type="button"
                    onClick={addCondition}
                    className="w-8 h-8 rounded-lg bg-surface-container-highest text-secondary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Teléfono de Enlace de Emergencia Verificado */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="verifiedPhone"
                className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px] text-tertiary">
                  phone_android
                </span>
                Línea Directa de Emergencia (SMS & Llamadas)
              </label>

              <div className="flex items-center gap-2 bg-surface-container rounded-lg p-2.5 border border-surface-container-high">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-surface-container-high text-on-surface font-label-lg text-label-lg">
                  <span className="font-bold">🇵🇪 +51</span>
                </div>
                <input
                  id="verifiedPhone"
                  type="tel"
                  defaultValue="987 654 321"
                  className="bg-transparent flex-1 text-on-surface placeholder:text-on-surface-variant font-body-lg text-body-lg font-bold tracking-wider focus:outline-none"
                />
                <div className="flex items-center gap-1 text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span className="font-label-sm text-label-sm uppercase font-semibold">Validado</span>
                </div>
              </div>
            </div>
          </section>

          {/* Imagen de Respaldo y Confianza Médica */}
          <div className="w-full h-32 rounded-xl overflow-hidden relative shadow-md bg-surface-container-low border border-surface-container">
            <img
              alt="Respaldo Operativo"
              className="w-full h-full object-cover opacity-60"
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCkOI2i2gfRnC5wN1Sf2WGzbxXWYa_GrxEZsLennl2_1AXvElVm4593cJZPlzChY9QAok7UKChnoiO36cSFZLed0NwTLdWhxdqERM-iLRZMsURD1j-mVlW_0WW_ifp4W99NUYIWhIuULLtjNPYsCy25geJUuE8SIpgwQXM56Kx92FWvbxEYDNU7llCYvhhn_a3lfBMmIjBqA-ZvezQtcIWl2HJ0f1zOgCu-NZ_98tnVguGc_9X8ITe3g"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
            <div className="absolute inset-y-0 left-4 flex flex-col justify-center max-w-[240px]">
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                Protocolo Guardián
              </span>
              <p className="font-body-md text-body-md text-on-surface font-semibold mt-0.5 leading-snug text-xs">
                Integración directa con centros de despacho médico y geolocalización satelital.
              </p>
            </div>
          </div>

          {/* Controles Principales de Finalización y Demo */}
          {/* Matches xpath: //button[@id='btnSubmit'] AND //button[.//span[contains(text(), 'Omitir por ahora')]] */}
          <section className="flex flex-col gap-2.5 pt-1">
            <button
              id="btnSubmit"
              type="button"
              onClick={handleContinue}
              className="w-full h-14 rounded-lg bg-primary-container text-on-primary-container font-headline-sm text-headline-sm flex items-center justify-center gap-2 font-bold shadow-lg shadow-primary-container/20 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Confirmar y Continuar al Dashboard</span>
              <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
            </button>

            <button
              type="button"
              onClick={handleDemo}
              className="w-full h-11 rounded-lg bg-surface-container-highest text-on-surface font-label-lg text-label-lg hover:bg-surface-bright transition-colors uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-secondary">explore</span>
              <span>Omitir por ahora y probar modo demo</span>
            </button>
          </section>

          {/* Notificación Toast Táctica */}
          {toast && (
            <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto bg-surface-bright text-on-surface p-4 rounded-xl shadow-2xl flex items-center gap-3 border border-surface-container-highest z-50 animate-in fade-in slide-in-from-bottom-3">
              <span className="material-symbols-outlined text-tertiary text-[24px]">task_alt</span>
              <div className="flex flex-col flex-1">
                <span className="font-label-lg text-label-lg font-bold" id="toastTitle">
                  {toast.title}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant text-xs" id="toastDesc">
                  {toast.desc}
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
