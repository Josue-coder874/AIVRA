import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';

interface Screen4Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen4Guardians: React.FC<Screen4Props> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'contacts' | 'config'>('contacts');
  const [triplePulse, setTriplePulse] = useState(true);
  const [voiceTrigger, setVoiceTrigger] = useState(true);
  const [fallDetection, setFallDetection] = useState(true);
  const [sensitivity, setSensitivity] = useState<'Baja' | 'Media' | 'Alta'>('Alta');
  const [testingPing, setTestingPing] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('Familiar');

  const [guardiansList, setGuardiansList] = useState([
    {
      id: 1,
      name: 'Elena Rivas',
      role: 'Mamá',
      phone: '+51 987 654 321',
      status: 'VERIFICADO',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBG2vFgr52aex7SzH0049CeLogovN4tKwlguY3y-PrXks2pUcG2861wtZB9k2UTD-zyvxJ6N2PkjhB51ZDQxNQqBwD_vmIfjcO2rjRP6rBgSLnT1avEvEpohOHqJPZR6cEtBh1-n5Rk7iPXeUu2e2anDXuDUBuHjIqvMNKya7svFh34Spe6ZgKlUr34u1y8znMB_rvKw6gVSNgqqEwmTPcl5GJTy6POIfggj2gpwrSzPMOBjIVEI_06hA',
      badges: ['Llamada directa', 'SMS + GPS', 'Audio ambiente'],
      border: 'border-l-primary-container',
    },
    {
      id: 2,
      name: 'Carlos Gómez',
      role: 'Hermano',
      phone: '+51 912 345 678',
      status: 'VERIFICADO',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCMOJ-gfxzswaF1N7tMhNiS1fj89P8aaHyNlAoILMvNpqJ1rptiLfPy9EdNbIBqDV9EvBJ2K3v15E5SZADw6rUiYAexfJtJfQzfnePh13OAwTT440B4ExqcqjC8-4paCtK6ZydCGUpxCBZT-qhYPd_4YcYsbYopJrBlPTFdVVNcNz0_EKpMSLebF3-G2QLat8oQUBB6LH69xAQEhMN_fpfGmHjUAv50tCgNzlpwUK3aZ58NDJ4kQIESZw',
      badges: ['SMS + GPS', 'Retardo +15s'],
      border: 'border-l-secondary',
    },
    {
      id: 3,
      name: 'Valeria Mendoza',
      role: 'Amiga',
      phone: '+51 998 877 665',
      status: 'PENDIENTE',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCddxtiJOQFjmvnvqdJ3f77s8jdfLusPQh2RhQ_EH-U8b2N5gFfinJCKKFW_f_B28_wY_faBR0hojfaiQVoc0kgr-2GorcdH0dzr_ucLJWY3aadBaHNKtMKSZWGqicbZX2yHXCnqhYZPjtVjmPDfjqXtEw5-oF6jJdUnF7CU4yiFvqUlo9OtwHJqTq9RfrcCNbHQON1s7CHKX6ZUaEuj7-NmeINTGfoqp3GQjGKrayWBp9GzxUFN19FHA',
      badges: ['WhatsApp + GPS'],
      border: 'border-l-outline',
    },
  ]);

  const handleTestWristband = () => {
    setTestingPing(true);
    setPingSuccess(false);

    setTimeout(() => {
      setTestingPing(false);
      setPingSuccess(true);
      setTimeout(() => {
        setPingSuccess(false);
      }, 2500);
    }, 1200);
  };

  const handleAddGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContactName.trim()) return;

    setGuardiansList([
      ...guardiansList,
      {
        id: guardiansList.length + 1,
        name: newContactName.trim(),
        role: newContactRelation,
        phone: newContactPhone.trim() || '+51 900 000 000',
        status: 'PENDIENTE',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBCtpEgec-_Xig3F6MIi3k3g6KjAiOa9743kGSxRZBiYu33_VGJ0chWdjshY4npZVboOIfOiQ8N5UGH9SUAKjCNYZXTyKo0jXJg56CITZHJwIqMxsuBxEW_Fz3Au4pmUNZjuE0BN0B0nbXRN23sT43Lsso-8D9Stjt2NYGN__XYwTP7iLefqIGSuxfkNtAuRSteQB9vWFpipzs2kIqR6X2Wcb-xhsWELXY37EYL6ii4EnqgXUTR1vp2nQ',
        badges: ['SMS + GPS'],
        border: 'border-l-secondary',
      },
    ]);

    setNewContactName('');
    setNewContactPhone('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <Header currentScreenName="Contactos" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full pb-28 pt-1">
          {/* Top Ambient Banner / Safety Status */}
          <div className="px-4 pt-4 pb-2">
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-high p-4 shadow-lg border border-surface-container-highest/40">
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-secondary/10 blur-2xl pointer-events-none"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary shadow-inner">
                    <span
                      className="material-symbols-outlined text-[26px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      security
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Red de Protección
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-sm text-label-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                        Operativa
                      </span>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface-variant text-xs mt-0.5">
                      {guardiansList.length} guardianes listos ante una señal de emergencia
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Segmented Control Switcher */}
          <div className="px-4 py-3">
            <div
              id="view-tabs"
              className="p-1 rounded-xl bg-surface-container-lowest flex items-center gap-1 shadow-inner border border-surface-container-high/40"
            >
              <button
                id="tab-contacts-btn"
                type="button"
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-center font-label-md text-label-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'contacts'
                    ? 'bg-surface-container text-secondary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">group</span>
                <span>Guardianes ({guardiansList.length}/5)</span>
              </button>

              <button
                id="tab-config-btn"
                type="button"
                onClick={() => setActiveTab('config')}
                className={`flex-1 py-2.5 px-3 rounded-lg text-center font-label-md text-label-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'config'
                    ? 'bg-surface-container text-secondary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                <span>Configuración Pulsera</span>
              </button>
            </div>
          </div>

          {/* TAB 1: GUARDIAN CONTACTS SECTION */}
          {activeTab === 'contacts' && (
            <div id="section-contacts" className="flex flex-col gap-3 px-4 animate-in fade-in">
              <div className="flex items-center justify-between px-1">
                <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant">
                  Protocolo de Notificación Cascada
                </span>
                <span className="font-label-sm text-label-sm text-secondary">Secuencial #1 a #{guardiansList.length}</span>
              </div>

              {guardiansList.map((guardian, index) => (
                <div
                  key={guardian.id}
                  className="rounded-2xl bg-surface-container p-4 shadow-md relative overflow-hidden group border border-surface-container-highest/30"
                >
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      index === 0
                        ? 'bg-primary-container'
                        : index === 1
                        ? 'bg-secondary'
                        : 'bg-outline'
                    }`}
                  ></div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          className="w-12 h-12 rounded-full object-cover"
                          referrerPolicy="no-referrer"
                          alt={guardian.name}
                          src={guardian.avatar}
                        />
                        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-label-sm text-[10px] font-bold border border-surface-container">
                          {index + 1}°
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-label-lg text-label-lg text-on-surface font-semibold">
                            {guardian.name}
                          </h3>
                          <span
                            className={`font-label-sm text-label-sm px-2 py-0.5 rounded-md ${
                              index === 0
                                ? 'text-primary bg-primary-container/15'
                                : index === 1
                                ? 'text-secondary bg-secondary-container/20'
                                : 'text-on-surface-variant bg-surface-container-highest'
                            }`}
                          >
                            {guardian.role}
                          </span>
                        </div>
                        <p className="font-telemetry-num text-[13px] text-on-surface-variant tracking-wider mt-0.5">
                          {guardian.phone}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${
                        guardian.status === 'VERIFICADO'
                          ? 'bg-tertiary-container/20 text-tertiary'
                          : 'bg-surface-container-high text-outline'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        {guardian.status === 'VERIFICADO' ? 'verified' : 'sync'}
                      </span>
                      <span className="font-label-sm text-label-sm uppercase font-semibold">
                        {guardian.status}
                      </span>
                    </div>
                  </div>

                  {/* Action badges */}
                  <div className="mt-3.5 pt-3 flex flex-wrap items-center justify-between gap-1.5 bg-surface-container-low/60 -mx-4 -mb-4 p-3.5 border-t border-surface-container">
                    <div className="flex flex-wrap gap-1.5">
                      {guardian.badges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-surface-container-highest text-secondary text-[11px] font-label-sm font-medium"
                        >
                          <span className="material-symbols-outlined text-[13px]">
                            {badge.includes('Llamada')
                              ? 'phone_in_talk'
                              : badge.includes('SMS')
                              ? 'sms'
                              : badge.includes('Audio')
                              ? 'mic'
                              : badge.includes('WhatsApp')
                              ? 'share_location'
                              : 'schedule'}
                          </span>
                          {badge}
                        </span>
                      ))}
                    </div>

                    {guardian.status === 'PENDIENTE' && (
                      <button
                        type="button"
                        onClick={() => alert(`Invitación reenviada a ${guardian.name} por SMS y WhatsApp.`)}
                        className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Reenviar invitación</span>
                        <span className="material-symbols-outlined text-[14px]">send</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Add Guardian Card */}
              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="w-full mt-1 p-4 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-center gap-2.5 text-secondary group shadow-sm active:scale-[0.99] border border-dashed border-secondary/30 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[20px]">person_add</span>
                </div>
                <span className="font-label-lg text-label-lg font-semibold tracking-wide">
                  + Agregar Nuevo Guardián ({5 - guardiansList.length} cupos)
                </span>
              </button>
            </div>
          )}

          {/* TAB 2: WRISTBAND ACTIVATION CONFIGURATION */}
          {activeTab === 'config' && (
            <div id="section-config" className="flex flex-col gap-4 px-4 animate-in fade-in">
              {/* Sensitivity Master Banner */}
              <div className="rounded-2xl bg-surface-container-high p-4 flex items-center gap-3.5 shadow-md border border-surface-container-highest">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">watch</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      AIVRA Band v2.4
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-widest uppercase">
                      98% Batería
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-xs text-on-surface-variant truncate">
                    Sincronización continua BLE 5.3 + Satélite
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant">
                  Disparadores de Alerta SOS
                </span>
                <span className="font-label-sm text-label-sm text-secondary">Anti Falsa Alarma</span>
              </div>

              {/* Trigger 1: Triple Pulse */}
              <div className="rounded-2xl bg-surface-container p-4 shadow-sm flex flex-col gap-3 border border-surface-container-highest/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">touch_app</span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Activación por Pulso Triple
                      </h4>
                      <p className="font-body-md text-body-md text-xs text-on-surface-variant mt-0.5">
                        Presiona el botón de la pulsera 3 veces consecutivas en menos de 2 segundos.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      id="toggle-triple-pulse"
                      type="checkbox"
                      checked={triplePulse}
                      onChange={() => setTriplePulse(!triplePulse)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>

                <div className="flex items-center gap-2 pt-2 bg-surface-container-low/70 -mx-4 -mb-4 p-3 rounded-b-2xl border-t border-surface-container">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">vibration</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Confirmación háptica de 3 zumbidos silenciosos
                  </span>
                </div>
              </div>

              {/* Trigger 2: Voice Keyword */}
              <div className="rounded-2xl bg-surface-container p-4 shadow-sm flex flex-col gap-3 border border-surface-container-highest/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-secondary mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">record_voice_over</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                          Palabra Clave por Voz
                        </h4>
                        <span className="font-label-sm text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-secondary-container/20 text-secondary font-bold">
                          Mic Activo
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-xs text-on-surface-variant mt-0.5">
                        Reconocimiento local de bajo consumo sin conexión de datos.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      id="toggle-voice"
                      type="checkbox"
                      checked={voiceTrigger}
                      onChange={() => setVoiceTrigger(!voiceTrigger)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>

                <div className="mt-1 p-3 rounded-xl bg-surface-container-lowest flex items-center justify-between border border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">campaign</span>
                    <span className="font-headline-sm text-[15px] tracking-wide text-on-surface font-bold">
                      "AIVRA AUXILIO"
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newPhrase = prompt('Introduce la nueva frase secreta de socorro:', 'AIVRA AUXILIO');
                      if (newPhrase) alert(`Nueva frase configurada: "${newPhrase}"`);
                    }}
                    className="font-label-sm text-label-sm text-secondary hover:underline cursor-pointer"
                  >
                    Cambiar frase
                  </button>
                </div>
              </div>

              {/* Trigger 3: Fall & Impact Detection */}
              <div className="rounded-2xl bg-surface-container p-4 shadow-sm flex flex-col gap-3 border border-surface-container-highest/30">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-container mt-0.5">
                      <span className="material-symbols-outlined text-[22px]">personal_injury</span>
                    </div>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-on-surface font-semibold">
                        Detección de Caídas o Impacto
                      </h4>
                      <p className="font-body-md text-body-md text-xs text-on-surface-variant mt-0.5">
                        Acelerómetro y giroscopio calibrados para colisiones o forcejeos repentinos.
                      </p>
                    </div>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      id="toggle-falls"
                      type="checkbox"
                      checked={fallDetection}
                      onChange={() => setFallDetection(!fallDetection)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-surface after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>

                {/* Sensitivity Segment Selector */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Nivel de Sensibilidad
                    </span>
                    <span id="sensitivity-label" className="font-label-sm text-label-sm text-secondary font-bold">
                      Sensibilidad {sensitivity} {sensitivity === 'Alta' ? '(Recomendado)' : ''}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-surface-container-lowest border border-surface-container">
                    {(['Baja', 'Media', 'Alta'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSensitivity(level)}
                        className={`sens-btn py-1.5 text-center rounded-lg font-label-sm text-label-sm transition-all cursor-pointer ${
                          sensitivity === level
                            ? 'bg-surface-container text-secondary font-bold shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Diagnostic & Test Action Button */}
              <div className="rounded-2xl bg-surface-container-high p-4 flex flex-col gap-3 shadow-md mt-1 border border-surface-container-highest">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-tertiary">check_circle</span>
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Prueba de Diagnóstico Háptico
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                    Latencia: 18ms
                  </span>
                </div>

                <p className="font-body-md text-body-md text-xs text-on-surface-variant">
                  Emite una señal de prueba sin alertar a los contactos ni al centro de monitoreo.
                </p>

                <button
                  id="ping-band-btn"
                  type="button"
                  disabled={testingPing}
                  onClick={handleTestWristband}
                  className={`w-full py-3 px-4 rounded-xl font-label-lg text-label-lg tracking-wide uppercase flex items-center justify-center gap-2 active:scale-95 transition-all shadow-[0_0_16px_rgba(76,215,246,0.3)] cursor-pointer ${
                    pingSuccess
                      ? 'bg-tertiary text-on-tertiary'
                      : 'bg-secondary text-on-secondary-fixed'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      testingPing ? 'animate-spin' : ''
                    }`}
                    id="ping-icon"
                  >
                    {testingPing ? 'hourglass_empty' : pingSuccess ? 'check' : 'vibration'}
                  </span>
                  <span id="ping-text">
                    {testingPing
                      ? 'Enviando pulso...'
                      : pingSuccess
                      ? '¡Pulsera vibrando OK!'
                      : 'Hacer sonar y vibrar pulsera'}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Add Guardian Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="w-full max-w-sm rounded-2xl bg-surface-container-high p-5 border border-surface-container-highest shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Agregar Guardián</h3>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <form onSubmit={handleAddGuardian} className="mt-4 flex flex-col gap-3">
                  <div>
                    <label className="text-xs text-on-surface-variant block mb-1">Nombre Completo</label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Roberto Díaz"
                      value={newContactName}
                      onChange={(e) => setNewContactName(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-surface-container text-on-surface border border-surface-container-highest text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-on-surface-variant block mb-1">Teléfono Móvil</label>
                    <input
                      type="tel"
                      required
                      placeholder="+51 987 123 456"
                      value={newContactPhone}
                      onChange={(e) => setNewContactPhone(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-surface-container text-on-surface border border-surface-container-highest text-sm focus:outline-none focus:border-secondary"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-on-surface-variant block mb-1">Relación</label>
                    <select
                      value={newContactRelation}
                      onChange={(e) => setNewContactRelation(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-surface-container text-on-surface border border-surface-container-highest text-sm focus:outline-none focus:border-secondary"
                    >
                      <option value="Familiar">Familiar</option>
                      <option value="Pareja">Pareja</option>
                      <option value="Amigo(a)">Amigo(a)</option>
                      <option value="Compañero(a)">Compañero(a)</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 py-2.5 rounded-lg bg-surface-container text-on-surface-variant text-sm font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-2.5 rounded-lg bg-secondary text-on-secondary text-sm font-bold"
                    >
                      Guardar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>

      <Navigation currentScreen="4. Contactos de Confianza y Activación" onNavigate={onNavigate} />
    </div>
  );
};
