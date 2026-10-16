import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

interface Screen7Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen7History: React.FC<Screen7Props> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'todas' | 'sos' | 'simulacion' | 'sistema'>('todas');
  const [exporting, setExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [playingAudio, setPlayingAudio] = useState(false);

  const handleExportPDF = () => {
    setExporting(true);
    setExportSuccess(false);

    setTimeout(() => {
      setExporting(false);
      setExportSuccess(true);
      setTimeout(() => {
        setExportSuccess(false);
      }, 2500);
    }, 1200);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <Header currentScreenName="Inicio" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full pb-28">
          {/* Status Aura / Peace of Mind Banner */}
          <section className="px-4 pt-3 pb-2">
            <div className="relative overflow-hidden rounded-xl bg-surface-container-high p-4 shadow-md border border-surface-container-highest">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-tertiary/10 blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center text-tertiary shrink-0">
                    <span
                      className="material-symbols-outlined text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                        18 días
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-highest text-tertiary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse-dot"></span>
                        Protegido
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant text-xs">
                      Sin incidentes críticos ni alertas abiertas
                    </p>
                  </div>
                </div>

                <button
                  aria-label="Auditoría rápida"
                  type="button"
                  onClick={() => alert('Auditoría Criptográfica AIVRA: 100% Invariantes verificados sin brechas telemétricas.')}
                  className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-secondary hover:bg-surface-container-highest transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">policy</span>
                </button>
              </div>

              {/* Quick Telemetry Snapshot Ribbon */}
              <div className="mt-3.5 pt-3 grid grid-cols-3 gap-2 bg-surface-container-low/70 rounded-lg p-2.5 border border-surface-container">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[9px]">
                    Eventos Totales
                  </span>
                  <span className="font-telemetry-num text-telemetry-num text-on-surface mt-0.5">
                    14
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[9px]">
                    Latencia SOS
                  </span>
                  <span className="font-telemetry-num text-telemetry-num text-secondary mt-0.5">
                    1.2s
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[9px]">
                    Batería Pulsera
                  </span>
                  <span className="font-telemetry-num text-telemetry-num text-tertiary mt-0.5">
                    92%
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Filter Pills Bar */}
          <section className="px-4 py-2 sticky top-16 z-30 bg-surface/95 backdrop-blur-md">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" id="filter-container">
              <button
                type="button"
                data-filter="todas"
                onClick={() => setFilter('todas')}
                className={`filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md shadow-sm transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  filter === 'todas'
                    ? 'bg-secondary text-on-secondary font-semibold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">clear_all</span>
                Todas (14)
              </button>

              <button
                type="button"
                data-filter="sos"
                onClick={() => setFilter('sos')}
                className={`filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  filter === 'sos'
                    ? 'bg-secondary text-on-secondary font-semibold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                Alertas SOS
              </button>

              <button
                type="button"
                data-filter="simulacion"
                onClick={() => setFilter('simulacion')}
                className={`filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  filter === 'simulacion'
                    ? 'bg-secondary text-on-secondary font-semibold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                Simulaciones
              </button>

              <button
                type="button"
                data-filter="sistema"
                onClick={() => setFilter('sistema')}
                className={`filter-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  filter === 'sistema'
                    ? 'bg-secondary text-on-secondary font-semibold'
                    : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                Batería / Red
              </button>
            </div>
          </section>

          {/* Timeline Stream */}
          <div className="px-4 py-3 space-y-4">
            {/* Month Segment Header */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">
                  calendar_month
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface tracking-wide">
                  Marzo 2025
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                Bitácora Criptográfica
              </span>
            </div>

            {/* Event 1: Critical SOS Event */}
            {(filter === 'todas' || filter === 'sos') && (
              <article
                className="timeline-card rounded-xl bg-surface-container p-4 shadow-md space-y-3.5 border border-surface-container-highest/40"
                data-category="sos"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-[0_2px_12px_rgba(255,84,81,0.3)]">
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        emergency
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface text-[15px]">
                          Alerta SOS Activada
                        </h3>
                      </div>
                      <span className="font-label-sm text-label-sm text-primary tracking-wide">
                        12 Mar, 23:40:18 PET
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm uppercase tracking-wider shrink-0 flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[13px]">check_circle</span>
                    Cancelada con PIN
                  </span>
                </div>

                {/* Incident Sub-state Box */}
                <div className="bg-surface-container-low rounded-lg p-3 space-y-2 border border-surface-container">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant font-label-md text-label-md">
                      Resolución de Seguridad
                    </span>
                    <span className="text-tertiary font-label-sm text-label-sm font-semibold">
                      PIN Maestro Autenticado
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                    Pulsador de hardware sostenido por 3s. Cancelación completada dentro de la ventana
                    de gracia mediante código táctil en pulsera Sentinel.
                  </p>
                </div>

                {/* Static Map Snippet */}
                <div className="rounded-xl overflow-hidden relative shadow-inner border border-surface-container-high">
                  <div
                    className="w-full h-32 bg-surface-container-high bg-cover bg-center flex items-end p-2.5"
                    data-location="Av. Javier Prado Este 2400, Lima, Perú"
                    style={{
                      backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBweRrjlXFIPOlB_9IpnJ7Bc2DHmnZFA7ATimnLntaK2rvMS6ZIZWOSLeNGzgwOEpUNPcpmNulCTbVuWrNOMhyIYgZWCUNz2n4c0aL_DOVcgLqszV4WN2Nmsa66K-TczTIfazbz-HaIPch4ZOIWaevoJ8Yp1-iZKA31mJ2wEwKRMRMDSUT3UagHRuTsrpGXCbzwUrOMa-6yqyp98T0TX79UqUBWEvbpcWWWv_NVh4wNBqGrIHKqUWujxw')`,
                    }}
                  >
                    <div className="bg-surface-dim/85 backdrop-blur-md px-2.5 py-1.5 rounded-lg flex items-center gap-2 max-w-[90%] border border-surface-container-high">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 animate-pulse">
                        location_pin
                      </span>
                      <div className="truncate">
                        <span className="font-label-sm text-label-sm text-on-surface block truncate font-bold">
                          Av. Javier Prado Este 2400
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block text-[9px] -mt-0.5">
                          Coords: -12.0894, -77.0018 (GPS / Gal. +/- 3m)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry Dispatch Indicators */}
                <div className="space-y-2 pt-1">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider text-[10px]">
                    Trazabilidad de Despacho Inmediato
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high text-xs border border-surface-container">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px]">sms</span>
                        <span className="font-body-md text-body-md text-on-surface">
                          3 SMS de socorro con live tracking
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        1.2s de entrega
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high text-xs border border-surface-container">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary text-[16px]">
                          phone_in_talk
                        </span>
                        <span className="font-body-md text-body-md text-on-surface">
                          Llamada a "Mamá (Contacto #1)"
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-tertiary font-bold">
                        Atendida (42s)
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high text-xs border border-surface-container">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px]">mic</span>
                        <span className="font-body-md text-body-md text-on-surface">
                          30s audio ambiental perimetral
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        AES-256 Guardado
                      </span>
                    </div>
                  </div>
                </div>

                {/* Forensic CTA */}
                <div className="pt-1 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => setPlayingAudio(!playingAudio)}
                    className="w-full py-2.5 px-3 rounded-lg bg-surface-container-highest hover:bg-surface-bright text-secondary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors active:scale-[0.99] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {playingAudio ? 'pause' : 'graphic_eq'}
                    </span>
                    <span>
                      {playingAudio
                        ? 'Reproduciendo Audio Perimetral (00:14 / 00:30)...'
                        : 'Reproducir Evidencia y Reporte Forense'}
                    </span>
                  </button>

                  {playingAudio && (
                    <div className="p-3 bg-surface-container-low rounded-lg flex items-center gap-3 animate-in fade-in border border-secondary/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                      <div className="flex-1">
                        <div className="flex justify-between text-[10px] text-on-surface-variant mb-1">
                          <span>Canal 01: Audio Ambiental Cifrado</span>
                          <span className="text-secondary font-bold">SHA-256 Valid</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                          <div className="h-full bg-secondary w-1/2 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )}

            {/* Event 2: System Simulation Test */}
            {(filter === 'todas' || filter === 'simulacion') && (
              <article
                className="timeline-card rounded-xl bg-surface-container p-4 shadow-md space-y-3 border border-surface-container-highest/30"
                data-category="simulacion"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">troubleshoot</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface text-[15px]">
                        Simulador de Alerta y Vibración
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wide">
                        10 Mar, 18:15:02 PET
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/15 text-secondary font-label-sm text-label-sm uppercase tracking-wider shrink-0 flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Exitoso
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-lg p-3 space-y-2 border border-surface-container">
                  <p className="font-body-md text-body-md text-on-surface text-xs leading-relaxed">
                    Prueba programada de verificación integral de sensores. Se validó la respuesta
                    aero-háptica de la pulsera Sentinel y transductor acústico sin emitir notificaciones
                    a la red de guardianes.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-tertiary text-[14px]">
                        vibration
                      </span>
                      <span>Vibrador táctil: 100% OK</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-tertiary text-[14px]">
                        volume_up
                      </span>
                      <span>Sirena 95dB: Operativa</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-tertiary text-[14px]">
                        satellite_alt
                      </span>
                      <span>Fix Satelital: 0.8s</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-tertiary text-[14px]">
                        cell_tower
                      </span>
                      <span>Red Externa: Silenciada</span>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Event 3: Preventive Warning Battery / Network */}
            {(filter === 'todas' || filter === 'sistema') && (
              <article
                className="timeline-card rounded-xl bg-surface-container p-4 shadow-md space-y-3 border border-surface-container-highest/30"
                data-category="sistema"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[24px]">battery_alert</span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface text-[15px]">
                        Batería de Pulsera al 15%
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant tracking-wide">
                        05 Mar, 09:10:44 PET
                      </span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-primary font-label-sm text-label-sm uppercase tracking-wider shrink-0 font-bold">
                    Aviso Preventivo
                  </span>
                </div>

                <div className="bg-surface-container-low rounded-lg p-3 border border-surface-container">
                  <div className="flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                      send_to_mobile
                    </span>
                    <div className="space-y-1">
                      <p className="font-body-md text-body-md text-on-surface text-xs leading-relaxed">
                        Notificación push despachada a teléfono vinculado con estimación de 6.5 horas de
                        funcionamiento en modo de resguardo pasivo.
                      </p>
                      <div className="flex items-center gap-2 pt-1 font-label-sm text-label-sm text-tertiary font-bold">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                        <span>Carga completada a las 10:22 AM (100%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Event 4: Routine Self-Diagnostic */}
            {(filter === 'todas' || filter === 'sistema') && (
              <article
                className="timeline-card rounded-xl bg-surface-container p-4 shadow-md space-y-2 border border-surface-container-highest/30"
                data-category="sistema"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface-variant flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">sync_saved_locally</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface text-[13px]">
                        Sincronización Periódica de Claves AES
                      </h4>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        01 Mar, 04:00:00 PET
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
                    Cifrado OK
                  </span>
                </div>
              </article>
            )}
          </div>

          {/* Sticky Export Action Card for Legal/Insurance Evidence */}
          <section className="px-4 pt-3 pb-1">
            <div className="rounded-xl bg-surface-container-high p-4 flex flex-col gap-3 shadow-lg relative overflow-hidden border border-surface-container-highest">
              <div className="absolute top-0 right-0 w-28 h-28 bg-secondary/5 rounded-full blur-xl pointer-events-none"></div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary shrink-0">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface text-sm font-semibold">
                    Certificado de Validez Jurídica
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant text-xs leading-relaxed">
                    Las alertas y audios de AIVRA contienen firma hash SHA-256 admisible ante
                    autoridades judiciales, policía nacional y aseguradoras.
                  </p>
                </div>
              </div>

              <button
                id="export-pdf-btn"
                type="button"
                disabled={exporting}
                onClick={handleExportPDF}
                className={`w-full py-3 px-4 rounded-lg font-label-lg text-label-lg uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md cursor-pointer font-bold ${
                  exportSuccess
                    ? 'bg-tertiary text-on-tertiary'
                    : 'bg-secondary text-on-secondary hover:bg-secondary-container'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[20px] ${
                    exporting ? 'animate-spin' : ''
                  }`}
                >
                  {exporting
                    ? 'progress_activity'
                    : exportSuccess
                    ? 'check_circle'
                    : 'file_download'}
                </span>
                <span>
                  {exporting
                    ? 'Compilando Cifrado SHA-256...'
                    : exportSuccess
                    ? 'PDF Descargado con Éxito'
                    : 'Exportar Historial Forense (PDF Cifrado)'}
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>

      <Navigation currentScreen="7. Historial de Alertas e Incidentes" onNavigate={onNavigate} />
    </div>
  );
};
