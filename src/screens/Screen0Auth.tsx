import React, { useState } from 'react';
import { ScreenId } from '../types';
import { StackHeader } from '../components/StackHeader';

interface Screen0Props {
  onNavigate: (screen: ScreenId, transition?: 'none' | 'push' | 'push_back' | 'slide_up') => void;
}

export const Screen0Auth: React.FC<Screen0Props> = ({ onNavigate }) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('AivraPass2025!');
  const [name, setName] = useState('Valentina Torres');
  const [email, setEmail] = useState('valentina@ejemplo.com');
  const [phone, setPhone] = useState('987 654 321');
  const [pin, setPin] = useState(['8', '3', '5', '0']);
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(true);

  const generateRandomPin = () => {
    const newPin = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10).toString());
    setPin(newPin);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col antialiased selection:bg-secondary/30 selection:text-secondary">
      <StackHeader
        title="Modo Emergencia Activo"
        onBack={() => onNavigate('1. Inicio - Estado de Pulsera y Dashboard', 'push_back')}
      />

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-safe bg-surface max-w-md mx-auto">
        <div className="flex flex-col w-full px-4 pb-12 pt-2 gap-6 select-none">
          {/* Brand Identity & Tactical Beacon */}
          <div className="flex flex-col items-center text-center relative pt-2">
            <div className="absolute -top-4 w-32 h-32 rounded-full bg-secondary/15 blur-2xl pointer-events-none"></div>
            <div className="absolute -top-1 w-20 h-20 rounded-full bg-primary-container/20 blur-xl pointer-events-none"></div>

            {/* Shield Emblem */}
            <div className="relative w-16 h-16 rounded-2xl bg-surface-container-high flex items-center justify-center shadow-lg mb-3 border border-surface-container-highest">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/20 via-transparent to-primary-container/10"></div>
              <span
                className="material-symbols-outlined text-secondary text-[34px] relative z-10"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-tertiary flex items-center justify-center ring-2 ring-surface">
                <span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest animate-ping"></span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm uppercase tracking-wider mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              AIVRA SENTINEL V4.2
            </div>

            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-bold">
              {authMode === 'register' ? 'Crear Cuenta AIVRA' : 'Iniciar Sesión AIVRA'}
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px] mt-1 text-center">
              Protección biométrica y enlace directo a tu pulsera táctica Sentinel.
            </p>

            {/* Tactical Segmented Control Switcher */}
            <div className="w-full mt-5 p-1 rounded-xl bg-surface-container-lowest flex items-center justify-between border border-surface-container-high/40">
              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-surface-container-high text-secondary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">person_add</span>
                Crear Cuenta
              </button>
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-2 rounded-lg font-label-lg text-label-lg transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'login'
                    ? 'bg-surface-container-high text-secondary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                Iniciar Sesión
              </button>
            </div>
          </div>

          {/* Form Section 1: Identidad del Usuario */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Paso 01 • Datos Personales
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Cifrado Local</span>
            </div>

            {/* Nombre Completo */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">badge</span>
                Nombre y Apellidos
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Valentina Torres"
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                />
                <span
                  className="material-symbols-outlined absolute right-3.5 text-tertiary text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>

            {/* Correo Electrónico */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-secondary text-[16px]">mail</span>
                Correo Electrónico
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  alternate_email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="valentina@ejemplo.com"
                  className="w-full pl-11 pr-10 py-3 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                />
                <span
                  className="material-symbols-outlined absolute right-3.5 text-tertiary text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            </div>
          </div>

          {/* Form Section 2: Línea Directa de Seguridad / SOS Dispatch */}
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 relative overflow-hidden border border-surface-container">
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-secondary/5 blur-xl pointer-events-none"></div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    phone_in_talk
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                    Línea Directa de Seguridad
                  </h3>
                  <p className="font-label-sm text-label-sm text-primary">Canal crítico de auxilio</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-secondary font-label-sm text-label-sm font-semibold">
                SMS OTP
              </span>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Este número telefónico es utilizado para verificar alertas SOS en tiempo real y coordinar enlaces con tu red de guardianes.
            </p>

            {/* Selector de País y Teléfono Móvil */}
            <div className="flex items-center gap-2 w-full mt-1">
              <div className="h-12 px-3 rounded-xl bg-surface-container flex items-center gap-2 cursor-pointer text-on-surface font-label-lg text-label-lg shrink-0 border border-surface-container-high">
                <span className="text-[18px]">🇵🇪</span>
                <span className="font-telemetry-num text-telemetry-num text-on-surface">+51</span>
                <span className="material-symbols-outlined text-outline text-[18px]">arrow_drop_down</span>
              </div>
              <div className="relative flex-1 flex items-center">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="987 654 321"
                  className="w-full h-12 px-3.5 pr-10 rounded-xl bg-surface-container text-on-surface font-telemetry-num text-telemetry-num tracking-wider placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                />
                <span className="material-symbols-outlined absolute right-3 text-secondary text-[20px]">
                  cell_tower
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm pt-1">
              <span className="material-symbols-outlined text-secondary text-[14px]">shield_with_heart</span>
              <span>Requiere validación por SMS de 6 dígitos tras registro.</span>
            </div>
          </div>

          {/* Form Section 3: Seguridad de la Cuenta */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Paso 02 • Credenciales y PIN
              </span>
              <span className="font-label-sm text-label-sm text-tertiary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Alta Seguridad
              </span>
            </div>

            {/* Contraseña Maestra */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">lock</span>
                  Contraseña Maestra
                </label>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Mín. 8 caracteres</span>
              </div>

              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                  key
                </span>
                <input
                  id="master-pwd"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-surface-container text-on-surface font-body-md text-body-md tracking-wider placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary transition-colors"
                />
                <button
                  id="toggle-pwd"
                  type="button"
                  aria-label="Alternar visibilidad de contraseña"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-outline hover:text-on-surface flex items-center justify-center p-1"
                >
                  <span className="material-symbols-outlined text-[20px]" id="pwd-icon">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Indicador de Fuerza de Contraseña */}
              <div className="grid grid-cols-4 gap-1.5 mt-1">
                <div className="h-1 rounded-full bg-tertiary"></div>
                <div className="h-1 rounded-full bg-tertiary"></div>
                <div className="h-1 rounded-full bg-tertiary"></div>
                <div className="h-1 rounded-full bg-tertiary/40"></div>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary pl-0.5">
                Nivel Robusto: Contiene números y caracteres especiales
              </span>
            </div>

            {/* PIN Rápido Antialarma */}
            <div className="p-4 rounded-xl bg-surface-container flex flex-col gap-3 border border-surface-container-highest/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-container text-[20px]">pin</span>
                  <span className="font-headline-sm text-headline-sm text-on-surface">
                    PIN Rápido Antialarma
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-error-container/40 text-primary font-label-sm text-label-sm font-semibold">
                  4 Dígitos
                </span>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Código secreto e instantáneo para desactivar falsas alertas sonoras sin levantar sospechas ante un agresor.
              </p>

              {/* 4 PIN Boxes */}
              <div className="flex items-center justify-between gap-3 pt-1">
                {pin.map((digit, idx) => (
                  <div
                    key={idx}
                    className="flex-1 h-12 rounded-xl bg-surface-container-high flex items-center justify-center font-telemetry-num text-telemetry-num text-on-surface shadow-inner border border-surface-container-highest/60"
                  >
                    {digit}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={generateRandomPin}
                  className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">shuffle</span>
                  Generar PIN Seguro Aleatorio
                </button>
              </div>
            </div>

            {/* Biometric Hardware Access Toggle */}
            <div
              id="bio-toggle"
              onClick={() => setBiometricsEnabled(!biometricsEnabled)}
              className="p-3.5 rounded-xl bg-surface-container flex items-center justify-between cursor-pointer group border border-surface-container-highest/30"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">fingerprint</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Autenticación Biométrica
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Acceso ultra veloz con Face ID o Huella
                  </span>
                </div>
              </div>

              <div
                className={`w-12 h-7 rounded-full flex items-center p-0.5 transition-colors ${
                  biometricsEnabled ? 'bg-secondary-container' : 'bg-surface-container-highest'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-on-secondary shadow-md flex items-center justify-center transition-transform ${
                    biometricsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                >
                  {biometricsEnabled && (
                    <span
                      className="material-symbols-outlined text-secondary text-[14px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Wristband Preview Badge */}
          <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">watch</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  Pulsera Sentinel Lista
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Sincronización BLE 5.3 disponible
                </span>
              </div>
            </div>
            <span className="flex items-center gap-1 text-tertiary font-label-sm text-label-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              CERCANA
            </span>
          </div>

          {/* Terms & Data Encryption Compliance Check */}
          <label className="flex items-start gap-3 px-1 cursor-pointer">
            <button
              type="button"
              onClick={() => setTermsAccepted(!termsAccepted)}
              className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                termsAccepted ? 'bg-secondary-container text-on-secondary' : 'bg-surface-container border border-outline'
              }`}
            >
              {termsAccepted && (
                <span className="material-symbols-outlined text-[16px] font-bold">check</span>
              )}
            </button>
            <span className="font-label-md text-label-md text-on-surface-variant leading-snug">
              Acepto los{' '}
              <a href="#" className="text-secondary underline" onClick={(e) => e.preventDefault()}>
                Términos de Servicio
              </a>{' '}
              y autorizo el Cifrado Criptográfico de Grado Militar (
              <strong className="text-on-surface font-semibold">AES-256</strong>) para mi historial
              telemétrico y biométrico.
            </span>
          </label>

          {/* CTA Primario: Siguiente Fase del Protocolo (Matches xpath required: //button[.//span[contains(text(), 'Continuar a Vinculación de Pulsera')]]) */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              type="button"
              onClick={() => onNavigate('6. Onboarding y Vinculación de Pulsera', 'push')}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-secondary via-secondary-container to-secondary text-on-secondary font-label-lg text-label-lg font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              <span>Continuar a Vinculación de Pulsera</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            {/* Social / Alternate Single Sign-On Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-surface-container-highest"></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                O continúa con
              </span>
              <div className="flex-1 h-px bg-surface-container-highest"></div>
            </div>

            {/* Quick Auth Buttons (Google & Apple) */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onNavigate('6. Onboarding y Vinculación de Pulsera', 'push')}
                className="h-12 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors border border-surface-container-highest/30 cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Google SSO</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('6. Onboarding y Vinculación de Pulsera', 'push')}
                className="h-12 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors border border-surface-container-highest/30 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 170 170">
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.7-7.85-12.04-14.31-6.19-9.24-11.13-19.78-14.82-31.6-3.69-11.82-5.54-22.9-5.54-33.24 0-14.3 3.63-26.06 10.89-35.29 7.25-9.23 16.29-13.9 27.12-14.02 5.25 0 10.95 1.34 17.11 4.02 6.16 2.68 10.14 4.08 11.94 4.2 1.45 0 5.49-1.46 12.12-4.38 6.63-2.92 12.44-4.25 17.43-4 12.77.62 23.01 5.39 30.73 14.31-11.08 6.74-16.51 16.03-16.31 27.86.2 9.54 3.96 17.65 11.27 24.31 7.32 6.67 15.86 10.42 25.62 11.27-2.12 6.53-4.66 12.92-7.61 19.17zM119.22 31.84c0-7.39 2.65-14.34 7.96-20.85 5.3-6.51 11.85-10.49 19.64-11.95.89 7.27-1.45 14.18-7.03 20.73-5.58 6.55-12.44 10.59-20.57 12.07z" />
                </svg>
                <span>Apple ID</span>
              </button>
            </div>
          </div>

          {/* Bottom Link To Login */}
          <div className="text-center pt-2">
            <p className="font-body-md text-body-md text-on-surface-variant">
              ¿Ya tienes una pulsera registrada?
              <button
                type="button"
                onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
                className="text-secondary font-label-lg text-label-lg font-semibold hover:underline ml-1 cursor-pointer"
              >
                {authMode === 'register' ? 'Iniciar Sesión' : 'Registrarse'}
              </button>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
