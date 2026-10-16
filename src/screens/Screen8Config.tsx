import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Header } from '../components/Header';
import { Navigation } from '../components/Navigation';
import { APP_THEMES, type AppTheme } from '../theme';

interface Screen8Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
  theme: AppTheme;
  onThemeChange: (theme: AppTheme) => void;
}

export const Screen8Config: React.FC<Screen8Props> = ({ onNavigate, theme, onThemeChange }) => {
  const [hapticIntensity, setHapticIntensity] = useState<'Suave' | 'Fuerte' | 'Máxima Emergencia'>('Máxima Emergencia');
  const [voiceKeywordEnabled, setVoiceKeywordEnabled] = useState(true);
  const [secretPhrase, setSecretPhrase] = useState('Código Centinela 105');
  const [isEditingPhrase, setIsEditingPhrase] = useState(false);
  const [triggerMode, setTriggerMode] = useState<'taps' | 'hold'>('hold');
  const [fallDetection, setFallDetection] = useState(true);
  const [impactSensitivity, setImpactSensitivity] = useState<'Media' | 'Alta (Deportes)'>('Alta (Deportes)');
  const [cloudAudio, setCloudAudio] = useState(true);
  const [testingBand, setTestingBand] = useState(false);
  const [testBandSuccess, setTestBandSuccess] = useState(false);
  const [isCalibratingVoice, setIsCalibratingVoice] = useState(false);

  const handleTestBand = () => {
    setTestingBand(true);
    setTestBandSuccess(false);

    setTimeout(() => {
      setTestingBand(false);
      setTestBandSuccess(true);
      setTimeout(() => {
        setTestBandSuccess(false);
      }, 2500);
    }, 1200);
  };

  const handleUnpair = () => {
    if (confirm('¿Estás seguro de que deseas desvincular la Pulsera Sentinel? Los sensores de auxilio se desactivarán temporalmente.')) {
      onNavigate('6. Onboarding y Vinculación de Pulsera', 'push');
    }
  };

  const handleCalibrateVoice = () => {
    setIsCalibratingVoice(true);
    setTimeout(() => {
      setIsCalibratingVoice(false);
      alert('Calibración completada: Umbral neuronal ajustado a 82 dB para voz susurrada.');
    }, 2000);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <Header currentScreenName="Inicio" onNavigate={onNavigate} />

      <main className="flex-1 flex flex-col relative w-full pt-16 bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full pb-32">
          {/* Header Title Section */}
          <div className="px-4 pt-4 pb-2 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[20px]">full_hd</span>
                <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
                  Ajustes de Periférico
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm flex items-center gap-1.5 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                BLE 5.3 En línea
              </span>
            </div>

            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
              Sentinel Core & Sensores
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-xs">
              Calibración de telemetría táctil, audio biométrico y gatillos de rescate.
            </p>
          </div>

          <div className="px-4 flex flex-col gap-4 mt-2">
            <section
              className="rounded-xl bg-surface-container p-4 shadow-md flex flex-col gap-3 border border-surface-container-highest/40"
              aria-labelledby="appearance-title"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">palette</span>
                </div>
                <div>
                  <h2 id="appearance-title" className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Color de fondo
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    Personaliza la apariencia de la aplicación
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2" role="group" aria-label="Opciones de color de fondo">
                {(Object.entries(APP_THEMES) as [AppTheme, (typeof APP_THEMES)[AppTheme]][]).map(
                  ([themeId, option]) => {
                    const isSelected = theme === themeId;

                    return (
                      <button
                        key={themeId}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onThemeChange(themeId)}
                        className={`flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left transition-colors ${
                          isSelected
                            ? 'border-secondary bg-surface-container-high text-on-surface'
                            : 'border-surface-container-high hover:border-outline text-on-surface-variant'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className="h-5 w-5 shrink-0 rounded-full border border-white/20"
                          style={{ backgroundColor: option.swatch }}
                        />
                        <span className="font-label-sm text-label-sm font-semibold">{option.label}</span>
                        {isSelected && (
                          <span className="material-symbols-outlined ml-auto text-[16px] text-secondary">
                            check
                          </span>
                        )}
                      </button>
                    );
                  },
                )}
              </div>
            </section>

            {/* Hardware Status Card */}
            <div className="rounded-xl bg-surface-container p-4 shadow-md flex flex-col gap-4 relative overflow-hidden border border-surface-container-highest/40">
              <div className="absolute -right-10 -bottom-10 w-36 h-36 rounded-full bg-secondary/5 blur-2xl pointer-events-none"></div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary relative shadow-inner">
                    <span className="material-symbols-outlined text-[28px]">watch</span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-tertiary rounded-full"></span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      AIVRA Sentinel Band v2.4
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-label-sm text-label-sm text-tertiary font-semibold">
                        Firmware v2.4.1 (Actualizado)
                      </span>
                      <span className="text-on-surface-variant font-label-sm opacity-40">•</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                        Batería: 94%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Haptic Feedback Selector */}
              <div className="flex flex-col gap-2 pt-1 border-t border-surface-container-high">
                <div className="flex justify-between items-center">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Intensidad Háptica (Pulsos de Alerta)
                  </span>
                  <span id="haptic-label" className="font-label-sm text-label-sm text-secondary font-bold">
                    {hapticIntensity}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-surface-container-lowest border border-surface-container" id="haptic-selector">
                  {(['Suave', 'Fuerte', 'Máxima Emergencia'] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      data-val={level}
                      onClick={() => setHapticIntensity(level)}
                      className={`haptic-btn py-2 px-1 rounded-lg text-center font-label-sm text-label-sm transition-all cursor-pointer ${
                        hapticIntensity === level
                          ? 'bg-surface-container-high text-secondary shadow-sm font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {level === 'Máxima Emergencia' ? 'Máxima' : level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Voice Trigger Module */}
            <div className="rounded-xl bg-surface-container p-4 shadow-md flex flex-col gap-4 border border-surface-container-highest/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[20px]">mic</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      Palabra Clave de Voz
                    </h2>
                    <p className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                      Detección neuronal en hardware
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="mic-toggle"
                    type="checkbox"
                    checked={voiceKeywordEnabled}
                    onChange={() => setVoiceKeywordEnabled(!voiceKeywordEnabled)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-secondary-container peer-checked:after:bg-on-secondary-fixed after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface">
                    Frase / Clave Secreta de Auxilio
                  </label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface border border-surface-container">
                    <span className="material-symbols-outlined text-secondary text-[20px]">key</span>
                    <input
                      type="text"
                      value={secretPhrase}
                      onChange={(e) => setSecretPhrase(e.target.value)}
                      readOnly={!isEditingPhrase}
                      className={`bg-transparent border-none outline-none w-full font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/40 ${
                        isEditingPhrase ? 'ring-1 ring-secondary rounded px-1' : ''
                      }`}
                    />
                    <button
                      type="button"
                      title={isEditingPhrase ? 'Guardar clave' : 'Cambiar clave'}
                      onClick={() => setIsEditingPhrase(!isEditingPhrase)}
                      className="text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {isEditingPhrase ? 'check' : 'edit'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Mic Sensitivity Visualizer */}
                <div className="p-3 rounded-xl bg-surface-container-high flex flex-col gap-2 border border-surface-container-highest/40">
                  <div className="flex justify-between items-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase text-[10px]">
                      Sensibilidad Micrófono Sub-Vocal
                    </span>
                    <span className="font-telemetry-num text-telemetry-num text-secondary">
                      82 dB
                    </span>
                  </div>

                  <div className="flex items-end gap-1 h-5 w-full px-1">
                    <div className="flex-1 bg-secondary rounded-full h-1/4 animate-pulse"></div>
                    <div className="flex-1 bg-secondary rounded-full h-2/4"></div>
                    <div className="flex-1 bg-secondary rounded-full h-3/4"></div>
                    <div className="flex-1 bg-secondary rounded-full h-full"></div>
                    <div className="flex-1 bg-secondary rounded-full h-2/3"></div>
                    <div className="flex-1 bg-secondary rounded-full h-3/5"></div>
                    <div className="flex-1 bg-secondary rounded-full h-4/5 animate-pulse"></div>
                    <div className="flex-1 bg-surface-variant rounded-full h-1/4"></div>
                    <div className="flex-1 bg-surface-variant rounded-full h-1/4"></div>
                    <div className="flex-1 bg-surface-variant rounded-full h-1/4"></div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isCalibratingVoice}
                  onClick={handleCalibrateVoice}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-secondary flex items-center justify-center gap-2 transition-colors active:scale-[0.99] font-label-lg text-label-lg cursor-pointer"
                >
                  <span className={`material-symbols-outlined text-[18px] ${isCalibratingVoice ? 'animate-pulse' : ''}`}>
                    graphic_eq
                  </span>
                  <span>{isCalibratingVoice ? 'Calibrando voz susurrada...' : 'Grabar y Calibrar Voz'}</span>
                </button>
              </div>
            </div>

            {/* Physical Hardware Triggers */}
            <div className="rounded-xl bg-surface-container p-4 shadow-md flex flex-col gap-4 border border-surface-container-highest/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">touch_app</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Disparadores Físicos
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    Acciones manuales e inerciales
                  </p>
                </div>
              </div>

              {/* Trigger Pattern Selection */}
              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md text-on-surface">
                  Pulsación Requerida para SOS
                </span>

                <div className="grid grid-cols-2 gap-2" id="trigger-mode">
                  <button
                    type="button"
                    data-mode="taps"
                    onClick={() => setTriggerMode('taps')}
                    className={`trigger-card p-3 rounded-xl text-left flex flex-col gap-1 transition-all cursor-pointer border ${
                      triggerMode === 'taps'
                        ? 'bg-surface-container-high border-secondary'
                        : 'bg-surface-container-lowest border-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-secondary text-[20px]">dialpad</span>
                      {triggerMode === 'taps' && (
                        <span className="check-icon material-symbols-outlined text-[16px] text-secondary">
                          check_circle
                        </span>
                      )}
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      3 Toques Rápidos
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                      Cadencia discreta (1.2s)
                    </span>
                  </button>

                  <button
                    type="button"
                    data-mode="hold"
                    onClick={() => setTriggerMode('hold')}
                    className={`trigger-card p-3 rounded-xl text-left flex flex-col gap-1 transition-all cursor-pointer border ${
                      triggerMode === 'hold'
                        ? 'bg-surface-container-high border-primary'
                        : 'bg-surface-container-lowest border-surface-container'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="material-symbols-outlined text-primary text-[20px]">timer</span>
                      {triggerMode === 'hold' && (
                        <span className="check-icon material-symbols-outlined text-[16px] text-primary">
                          check_circle
                        </span>
                      )}
                    </div>
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      Mantener 3s
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                      Evita falsos positivos
                    </span>
                  </button>
                </div>
              </div>

              {/* Fall & Crash Detection */}
              <div className="pt-2 flex flex-col gap-3 border-t border-surface-container-high">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Impacto & Caída Libre (6-Ejes)
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                      G-Sensor y Giroscopio militar
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fallDetection}
                      onChange={() => setFallDetection(!fallDetection)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-tertiary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-tertiary-container peer-checked:after:bg-on-tertiary-fixed after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Sensibilidad de Impacto
                  </span>
                  <div className="flex gap-1 bg-surface-container-high p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setImpactSensitivity('Media')}
                      className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors cursor-pointer ${
                        impactSensitivity === 'Media'
                          ? 'bg-tertiary text-on-tertiary font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Media
                    </button>
                    <button
                      type="button"
                      onClick={() => setImpactSensitivity('Alta (Deportes)')}
                      className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors cursor-pointer ${
                        impactSensitivity === 'Alta (Deportes)'
                          ? 'bg-tertiary text-on-tertiary font-bold'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Alta (Deportes)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Permissions and Background Privacy */}
            <div className="rounded-xl bg-surface-container p-4 shadow-md flex flex-col gap-3 border border-surface-container-highest/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Permisos & Telemetría
                  </h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    Seguridad de grado criptográfico
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">
                    Acceso GPS Permanente
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    Coordenadas en segundo plano
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1 border border-tertiary/20">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  Activo - AES-256
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface">
                    Audio de Emergencia en la Nube
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px]">
                    Transmisión encriptada al activar SOS
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={cloudAudio}
                    onChange={() => setCloudAudio(!cloudAudio)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-secondary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-secondary-container peer-checked:after:bg-on-secondary-fixed after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>

            {/* Actions Section */}
            <div className="flex flex-col gap-2.5 mt-2">
              <button
                id="test-band-btn"
                type="button"
                disabled={testingBand}
                onClick={handleTestBand}
                className={`w-full py-3 px-4 rounded-xl font-label-lg text-label-lg uppercase tracking-wider font-bold shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform cursor-pointer ${
                  testBandSuccess
                    ? 'bg-tertiary text-on-tertiary'
                    : 'bg-secondary text-on-secondary hover:bg-secondary-container'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${testingBand ? 'animate-spin' : ''}`}>
                  {testingBand ? 'sync' : testBandSuccess ? 'check' : 'sensors'}
                </span>
                <span>
                  {testingBand
                    ? 'Enviando Pulso Táctil...'
                    : testBandSuccess
                    ? '¡Pulso Confirmado (32ms)!'
                    : 'Probar Configuración de Pulsera'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleUnpair}
                className="w-full py-3 px-4 rounded-xl bg-surface-container-high hover:bg-error-container/20 text-error font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.98] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">link_off</span>
                <span>Desvincular Pulsera Sentinel</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Navigation currentScreen="8. Configuración de Pulsera y Palabra Clave" onNavigate={onNavigate} />
    </div>
  );
};
