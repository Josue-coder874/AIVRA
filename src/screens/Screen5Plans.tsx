import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

interface Screen5Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen5Plans: React.FC<Screen5Props> = ({ onNavigate }) => {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [selectedPlanModal, setSelectedPlanModal] = useState<string | null>(null);

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <Header currentScreenName="Planes Y Cuenta" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full pb-28 pt-2">
          <div className="px-4 py-4 flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full bg-secondary-container/20 text-secondary border border-secondary/20">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Seguridad y Respaldo
              </span>
            </div>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
              Protege lo que más importa
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-xs">
              Tu pulsera AIVRA incluye cobertura básica gratuita de por vida. Elige mayor respaldo y
              respuesta táctica con cobertura avanzada.
            </p>
          </div>

          {/* Billing Switcher (Mensual / Anual) */}
          <div className="px-4 mb-6">
            <div className="bg-surface-container-lowest p-1 rounded-full flex items-center justify-between shadow-inner border border-surface-container-high/40">
              <button
                id="btn-monthly"
                type="button"
                onClick={() => setBilling('monthly')}
                className={`flex-1 py-2 px-3 rounded-full text-center font-label-md text-label-md transition-all duration-300 cursor-pointer ${
                  billing === 'monthly'
                    ? 'bg-surface-container-high text-secondary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Mensual
              </button>

              <button
                id="btn-annual"
                type="button"
                onClick={() => setBilling('annual')}
                className={`flex-1 py-2 px-3 rounded-full text-center font-label-md text-label-md transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer ${
                  billing === 'annual'
                    ? 'bg-surface-container-high text-secondary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>Anual</span>
                <span className="px-1.5 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-label-sm text-[9px] font-bold tracking-tight">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Plan Cards Container */}
          <div className="flex flex-col gap-5 px-4">
            {/* Plan 1: Esencial */}
            <div className="rounded-2xl p-5 bg-surface-container-low shadow-md relative overflow-hidden border border-surface-container">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">Esencial</h3>
                    <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm">
                      Gratis
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-0.5 text-xs">
                    Protección individual base
                  </p>
                </div>
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">shield_person</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
                    S/ 0
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant">/ mes</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">
                  Incluido de por vida con tu hardware
                </span>
              </div>

              <div className="space-y-2.5 mb-5 pt-3 border-t border-surface-container">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface text-xs">
                    Botón SOS a 2 contactos guardianes
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface text-xs">
                    SMS de emergencia con coordenadas GPS
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface text-xs">
                    Pruebas de pulsera ilimitadas
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">check_circle</span>
                  <span className="font-body-md text-body-md text-on-surface text-xs">
                    Alerta inteligente de batería baja
                  </span>
                </div>
              </div>

              <button
                type="button"
                disabled
                className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface-variant font-label-lg text-label-lg flex items-center justify-center gap-2 cursor-default opacity-85"
              >
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                <span>Plan Actual Activo</span>
              </button>
            </div>

            {/* Plan 2: AIVRA Premium */}
            <div className="rounded-2xl p-5 bg-surface-container-high shadow-xl relative overflow-hidden border border-primary-container/40">
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary-container/15 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex justify-between items-start mb-2">
                <div className="flex flex-col">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold w-fit mb-2 shadow-[0_0_12px_rgba(255,84,81,0.3)]">
                    <span className="material-symbols-outlined text-[13px]">local_fire_department</span>
                    <span>MÁS RECOMENDADO</span>
                  </div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    AIVRA Premium
                  </h3>
                </div>

                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-container/20 text-primary">
                  <span className="material-symbols-outlined text-[22px]">security</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span
                    id="price-premium"
                    className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-extrabold"
                  >
                    {billing === 'monthly' ? 'S/ 19.90' : 'S/ 190.00'}
                  </span>
                  <span
                    id="period-premium"
                    className="font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    {billing === 'monthly' ? '/ mes' : '/ año'}
                  </span>
                </div>
                <span
                  id="sub-premium"
                  className="font-label-sm text-label-sm text-secondary font-medium"
                >
                  {billing === 'monthly'
                    ? 'Facturación mensual estándar'
                    : 'Equivalente a S/ 15.83 al mes (ahorras S/ 48.80)'}
                </span>
              </div>

              <div className="space-y-3 mb-6 pt-2 border-t border-surface-container">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Hasta 5 guardianes con llamada automática prioritaria
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Monitoreo 'Recorrido Seguro' continuo en tiempo real
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Grabación de audio ambiental encriptada en la nube
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Sensor inteligente de caídas y colisiones de impacto
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Detección de desviación de ruta y zonas de riesgo
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlanModal('AIVRA Premium')}
                className="w-full py-3.5 px-5 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(255,84,81,0.4)] active:scale-[0.98] transition-transform font-bold cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">bolt</span>
                <span>Comenzar 14 días gratis</span>
              </button>

              <p className="text-center font-label-sm text-label-sm text-on-surface-variant mt-2 opacity-80 text-[11px]">
                Sin cobro anticipado. Cancela en cualquier momento.
              </p>
            </div>

            {/* Plan 3: AIVRA Familiar Pro */}
            <div className="rounded-2xl p-5 bg-surface-container-low shadow-md relative overflow-hidden border border-surface-container">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    AIVRA Familiar Pro
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs">
                    Protección integral del núcleo
                  </p>
                </div>
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-surface-container text-secondary">
                  <span className="material-symbols-outlined text-[20px]">family_restroom</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span
                    id="price-family"
                    className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold"
                  >
                    {billing === 'monthly' ? 'S/ 34.90' : 'S/ 335.00'}
                  </span>
                  <span
                    id="period-family"
                    className="font-label-md text-label-md text-on-surface-variant font-semibold"
                  >
                    {billing === 'monthly' ? '/ mes' : '/ año'}
                  </span>
                </div>
                <span
                  id="sub-family"
                  className="font-label-sm text-label-sm text-on-surface-variant text-[11px]"
                >
                  {billing === 'monthly'
                    ? 'Cobertura para todo el grupo'
                    : 'Equivalente a S/ 27.90 al mes (ahorras S/ 83.80)'}
                </span>
              </div>

              <div className="space-y-3 mb-5 pt-2 border-t border-surface-container">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Hasta 4 pulseras vinculadas en la misma cuenta
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Alertas de auxilio simultáneas para toda la familia
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">
                    check_circle
                  </span>
                  <span className="font-body-md text-body-md text-on-surface leading-tight text-xs">
                    Conexión prioritaria con servicios de auxilio médico y patrullaje local
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedPlanModal('AIVRA Familiar Pro')}
                className="w-full py-3 px-4 rounded-xl bg-surface-container-highest text-on-surface font-label-lg text-label-lg flex items-center justify-center gap-2 hover:bg-surface-bright active:scale-[0.98] transition-all font-semibold cursor-pointer"
              >
                <span>Elegir Plan Familiar</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-8 px-5 py-4 mx-4 rounded-xl bg-surface-container-lowest/80 flex flex-col gap-3 border border-surface-container">
            <div className="flex items-center justify-around gap-2 text-center">
              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[18px]">lock_reset</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Cancela cuando quieras
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]">enhanced_encryption</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Cifrado de grado médico
                </span>
              </div>

              <div className="flex flex-col items-center gap-1.5 flex-1">
                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">support_agent</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Soporte 24/7 de emergencia
                </span>
              </div>
            </div>

            <div className="pt-2 text-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant opacity-60">
                AIVRA Telemetry Platform • ISO 27001 Certified Security
              </span>
            </div>
          </div>

          {/* Subscription confirmation modal */}
          {selectedPlanModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-2xl bg-surface-container-high p-5 border border-surface-container-highest shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                  <h3 className="font-headline-sm text-on-surface font-bold">Activar {selectedPlanModal}</h3>
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(null)}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant mt-3 leading-relaxed">
                  Has seleccionado {selectedPlanModal} ({billing === 'monthly' ? 'Facturación Mensual' : 'Facturación Anual con 20% descuento'}). Los primeros 14 días son gratuitos.
                </p>
                <div className="mt-4 p-3 rounded-lg bg-surface-container flex items-center justify-between">
                  <span className="text-xs text-on-surface">Total hoy:</span>
                  <span className="font-bold text-secondary text-sm">S/ 0.00 (Prueba Gratis)</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPlanModal(null)}
                    className="flex-1 py-2.5 rounded-lg bg-surface-container text-on-surface-variant text-sm font-semibold"
                  >
                    Volver
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(`¡Excelente! Cobertura ${selectedPlanModal} activada con éxito.`);
                      setSelectedPlanModal(null);
                    }}
                    className="flex-1 py-2.5 rounded-lg bg-primary-container text-on-primary-container text-sm font-bold"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Navigation currentScreen="5. Planes de Suscripción y Cobertura" onNavigate={onNavigate} />
    </div>
  );
};
