import React, { useEffect, useRef, useState } from 'react';
import {
  Activity,
  Battery,
  Bluetooth,
  Check,
  ChevronRight,
  CircleHelp,
  ExternalLink,
  Hand,
  Info,
  Radio,
  RotateCcw,
  Shield,
  Smartphone,
  X,
} from 'lucide-react';
import { BraceletScene } from './BraceletScene';
import {
  BraceletEvent,
  createBraceletChannel,
  readStoredConnection,
  storeBraceletConnection,
} from './bridge';
import './bracelet.css';

const INITIAL_BATTERY = 88;
const SOS_DELAY_SECONDS = 8;

export const BraceletPrototype: React.FC = () => {
  const [initialConnection] = useState(() => readStoredConnection());
  const [connected, setConnected] = useState(initialConnection?.connected ?? false);
  const [batteryLevel, setBatteryLevel] = useState(initialConnection?.batteryLevel ?? INITIAL_BATTERY);
  const [alertActive, setAlertActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(SOS_DELAY_SECONDS);
  const [autoRotate, setAutoRotate] = useState(true);
  const [colorway, setColorway] = useState<'rose' | 'graphite' | 'silver'>('rose');
  const [showInfo, setShowInfo] = useState(false);
  const [bridgeAvailable] = useState(() => typeof BroadcastChannel !== 'undefined');
  const [notice, setNotice] = useState('');
  const channelRef = useRef<BroadcastChannel | null>(null);
  const alertSharedRef = useRef(false);
  const noticeTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    document.title = 'Pulsera AIVRA | Prototipo 3D interactivo';
    channelRef.current = createBraceletChannel();
    return () => {
      channelRef.current?.close();
      if (noticeTimeoutRef.current !== null) {
        window.clearTimeout(noticeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!alertActive) return;
    const timer = window.setInterval(() => {
      setSecondsLeft((remaining) => {
        if (remaining <= 1) {
          window.clearInterval(timer);
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [alertActive]);

  const showNotice = (message: string) => {
    setNotice(message);
    if (noticeTimeoutRef.current !== null) {
      window.clearTimeout(noticeTimeoutRef.current);
    }
    noticeTimeoutRef.current = window.setTimeout(() => setNotice(''), 3200);
  };

  const sendEvent = (event: BraceletEvent) => {
    if (!channelRef.current) {
      showNotice('Este navegador no permite la sincronización entre pestañas.');
      return false;
    }
    if (event.type === 'connection') {
      storeBraceletConnection(event.connected, event.batteryLevel);
    } else if (event.type === 'battery' && connected) {
      storeBraceletConnection(true, event.batteryLevel);
    }
    channelRef.current.postMessage(event);
    return true;
  };

  const toggleConnection = () => {
    const next = !connected;
    if (!sendEvent({ type: 'connection', connected: next, batteryLevel })) return;
    setConnected(next);
    showNotice(next
      ? 'Pulsera de demostración vinculada con la app.'
      : 'Pulsera desconectada de la app de demostración.');
  };

  const changeBattery = (value: number) => {
    setBatteryLevel(value);
    if (connected) sendEvent({ type: 'battery', batteryLevel: value });
  };

  const activateSOS = () => {
    if (alertActive) return;
    setSecondsLeft(SOS_DELAY_SECONDS);
    setAlertActive(true);
    alertSharedRef.current = connected
      && sendEvent({ type: 'sos-activated', activatedAt: Date.now() });
    showNotice(alertSharedRef.current
      ? 'Señal SOS de prueba enviada a la app.'
      : 'Alerta local activada. Vincula la app para compartir la señal.');
  };

  const cancelSOS = () => {
    setAlertActive(false);
    setSecondsLeft(SOS_DELAY_SECONDS);
    if (alertSharedRef.current) {
      sendEvent({ type: 'sos-cancelled', cancelledAt: Date.now() });
      alertSharedRef.current = false;
    }
    showNotice('Prueba SOS cancelada.');
  };

  return (
    <div className="bracelet-app">
      <header className="bracelet-topbar">
        <a className="bracelet-brand" href="/pulsera" aria-label="AIVRA - prototipo de pulsera">
          <span className="bracelet-brand-mark"><Shield size={18} strokeWidth={1.8} /></span>
          <span className="bracelet-brand-copy">
            <small>AIVRA SENTINEL</small>
            <strong>Pulsera Pro <em>3D LIVE</em></strong>
          </span>
        </a>
        <div className="bracelet-topbar-right">
          <a className="bracelet-app-link" href="/" target="_blank" rel="noreferrer">
            <Smartphone size={15} />
            <span>Abrir aplicativo</span>
            <ExternalLink size={13} />
          </a>
          <button
            className="bracelet-info-button"
            type="button"
            onClick={() => setShowInfo(true)}
            aria-label="Detalles del modelo"
            title="Detalles del modelo"
          >
            <Info size={17} />
          </button>
        </div>
      </header>

      <main className="bracelet-layout">
        <section className="bracelet-copy">
          <div className={`bracelet-alert-card ${alertActive ? 'is-alerting' : ''}`}>
            <div className="bracelet-alert-icon">
              {alertActive ? <Radio size={19} /> : <Activity size={19} />}
            </div>
            <div className="bracelet-alert-copy">
              <span className="bracelet-card-kicker">
                {alertActive ? 'PROTOCOLO DE PRUEBA' : 'ESTADO DE LA PULSERA'}
              </span>
              <strong>{alertActive ? 'SOS activado' : connected ? 'Vinculada a la app' : 'Lista para vincular'}</strong>
              <span>
                {alertActive
                  ? secondsLeft > 0
                    ? `La alerta de prueba se puede cancelar · 00:0${secondsLeft}`
                    : 'Simulación de alerta completada'
                  : 'Pulsa el botón del modelo 3D o activa una prueba.'}
              </span>
            </div>
            {alertActive && (
              <button className="bracelet-cancel-icon" onClick={cancelSOS} aria-label="Cancelar alerta SOS">
                <X size={18} />
              </button>
            )}
          </div>

          <div className="bracelet-controls">
            <button
              className={`bracelet-sos-button ${alertActive ? 'active' : ''}`}
              onClick={alertActive ? cancelSOS : activateSOS}
            >
              {alertActive ? <X size={18} /> : <Radio size={18} />}
              <span>{alertActive ? 'Cancelar prueba SOS' : 'Probar botón SOS'}</span>
              {!alertActive && <ChevronRight size={17} />}
            </button>
            <p className="bracelet-control-hint">
              <Hand size={14} />
              Mantén pulsado el botón SOS del dispositivo para pedir ayuda.
            </p>
          </div>

          <div className="bracelet-link-card">
            <div className="bracelet-link-heading">
              <div className={`bracelet-bluetooth-icon ${connected ? 'connected' : ''}`}>
                <Bluetooth size={17} />
              </div>
              <div>
                <span className="bracelet-card-kicker">ENLACE DE DEMOSTRACIÓN</span>
                <strong>{connected ? 'Aplicativo vinculado' : 'Conecta con el aplicativo'}</strong>
              </div>
              <span className={`bracelet-link-dot ${connected ? 'connected' : ''}`} />
            </div>
            <p>
              {connected
                ? 'Batería y señales SOS se comparten entre pestañas del mismo navegador.'
                : 'Abre el aplicativo en otra pestaña y vincula esta pulsera de prueba.'}
            </p>
            <button
              className={`bracelet-link-button ${connected ? 'is-connected' : ''}`}
              onClick={toggleConnection}
            >
              {connected ? <Check size={16} /> : <Bluetooth size={16} />}
              {connected ? 'Desvincular demo' : 'Vincular con la app'}
            </button>
            {!bridgeAvailable && (
              <div className="bracelet-bridge-warning">
                BroadcastChannel no está disponible en este navegador; no se podrá sincronizar.
              </div>
            )}
          </div>

          <div className="bracelet-battery-card">
            <div className="bracelet-battery-top">
              <span><Battery size={16} /> Batería simulada</span>
              <strong>{batteryLevel}%</strong>
            </div>
            <input
              aria-label="Nivel de batería simulado"
              type="range"
              min="5"
              max="100"
              value={batteryLevel}
              onChange={(event) => changeBattery(Number(event.target.value))}
              style={{ '--battery-progress': `${batteryLevel}%` } as React.CSSProperties}
            />
            <span className="bracelet-battery-caption">
              {connected ? 'El nivel también se actualiza en el aplicativo.' : 'Ajusta para simular el estado del dispositivo.'}
            </span>
          </div>

          <div className="bracelet-footnote">
            <CircleHelp size={14} />
            <span>Simulación web: no requiere pulsera física ni envía alertas reales.</span>
          </div>
        </section>

        <section className={`bracelet-visual ${alertActive ? 'alert-active' : ''}`} aria-label="Vista 3D de la pulsera">
          <div className="bracelet-visual-top">
            <div>
              <span className="bracelet-card-kicker">AIVRA SENTINEL</span>
              <strong>Smartband Pro Edition</strong>
            </div>
            <span className="bracelet-live-tag"><span /> 3D LIVE</span>
          </div>

          <div className="bracelet-render-area">
            <div className="bracelet-render-glow" />
            <div className="bracelet-render-ring ring-one" />
            <div className="bracelet-render-ring ring-two" />
            <div className="bracelet-rotate-hint">
              <RotateCcw size={13} />
              Arrastra para rotar en 360°
            </div>
            <BraceletScene
              alertActive={alertActive}
              onActivate={activateSOS}
              autoRotate={autoRotate}
              colorway={colorway}
              batteryLevel={batteryLevel}
            />
            {alertActive && <div className="bracelet-alert-wave wave-one" />}
            {alertActive && <div className="bracelet-alert-wave wave-two" />}
            <div className="bracelet-3d-caption">
              <span className="bracelet-live-dot" />
              {alertActive ? 'BOTÓN SOS ACTIVADO' : 'ARRASTRA PARA GIRAR · PULSA SOS'}
            </div>
          </div>

          <div className="bracelet-finish-panel">
            <div className="bracelet-finish-heading">
              <span>ACABADO &amp; CORREA</span>
              <button
                className="bracelet-auto-rotate"
                type="button"
                onClick={() => setAutoRotate((rotating) => !rotating)}
                aria-pressed={autoRotate}
              >
                <span className={autoRotate ? 'is-rotating' : ''} />
                Giro automático {autoRotate ? 'Activado' : 'Pausado'}
              </button>
            </div>
            <div className="bracelet-color-options">
              <button
                className={`bracelet-color-option ${colorway === 'rose' ? 'selected' : ''}`}
                type="button"
                onClick={() => setColorway('rose')}
                aria-pressed={colorway === 'rose'}
              >
                <span className="bracelet-color-chip rose" />
                <span><strong>Rose Gold</strong><small>Foto original</small></span>
              </button>
              <button
                className={`bracelet-color-option ${colorway === 'graphite' ? 'selected' : ''}`}
                type="button"
                onClick={() => setColorway('graphite')}
                aria-pressed={colorway === 'graphite'}
              >
                <span className="bracelet-color-chip graphite" />
                <span><strong>Graphite</strong><small>Negro mate</small></span>
              </button>
              <button
                className={`bracelet-color-option ${colorway === 'silver' ? 'selected' : ''}`}
                type="button"
                onClick={() => setColorway('silver')}
                aria-pressed={colorway === 'silver'}
              >
                <span className="bracelet-color-chip silver" />
                <span><strong>Silver</strong><small>Cromo platino</small></span>
              </button>
            </div>
          </div>

          <div className="bracelet-specs">
            <div><span>01</span><strong>Chasis metálico</strong><small>Acabado premium</small></div>
            <div><span>02</span><strong>Pantalla AMOLED</strong><small>Frontal curvado 2.5D</small></div>
            <div><span>03</span><strong>Silicona suave</strong><small>Correa flexible</small></div>
          </div>
        </section>
      </main>

      {notice && <div className="bracelet-toast" role="status">{notice}</div>}
      {showInfo && (
        <div className="bracelet-modal-backdrop" role="presentation" onClick={() => setShowInfo(false)}>
          <section
            className="bracelet-info-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bracelet-info-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="bracelet-modal-close" type="button" onClick={() => setShowInfo(false)} aria-label="Cerrar detalles">
              <X size={18} />
            </button>
            <span className="bracelet-card-kicker">AIVRA SENTINEL · MODELO CONCEPTUAL</span>
            <h2 id="bracelet-info-title">Diseñada para estar cerca.</h2>
            <p>Una smartband compacta con pantalla AMOLED curva, chasis metálico y correa de silicona. El botón de auxilio permite iniciar la simulación SOS del prototipo.</p>
            <div className="bracelet-info-spec"><Shield size={17} /><span>Resistencia al agua conceptual: 50 m ATM</span></div>
            <div className="bracelet-info-spec"><Radio size={17} /><span>Las señales de esta demo no contactan servicios de emergencia</span></div>
          </section>
        </div>
      )}
      <footer className="bracelet-footer">
        <span>© AIVRA · PROTOTIPO DE DISPOSITIVO</span>
        <span>Modelo 3D interactivo · Simulación, no producto médico</span>
      </footer>
    </div>
  );
};
