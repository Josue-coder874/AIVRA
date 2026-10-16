import { useEffect, useRef, useState } from 'react';

export type BraceletEvent =
  | { type: 'connection'; connected: boolean; batteryLevel: number }
  | { type: 'battery'; batteryLevel: number }
  | { type: 'sos-activated'; activatedAt: number }
  | { type: 'sos-cancelled'; cancelledAt: number };

const CHANNEL_NAME = 'aivra-bracelet-prototype';
const STORAGE_KEY = 'aivra-bracelet-prototype-connection';

export function readStoredConnection() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  const [connectedValue, batteryValue] = stored.split(':');
  const batteryLevel = Number(batteryValue);
  if (
    (connectedValue !== 'true' && connectedValue !== 'false')
    || !Number.isInteger(batteryLevel)
    || batteryLevel < 0
    || batteryLevel > 100
  ) {
    return null;
  }
  return { connected: connectedValue === 'true', batteryLevel };
}

export function storeBraceletConnection(connected: boolean, batteryLevel: number) {
  window.localStorage.setItem(STORAGE_KEY, `${connected}:${batteryLevel}`);
}

export function createBraceletChannel(): BroadcastChannel | null {
  if (typeof BroadcastChannel === 'undefined') return null;
  return new BroadcastChannel(CHANNEL_NAME);
}

export function useBraceletBridge(onEvent: (event: BraceletEvent) => void) {
  const [connection, setConnection] = useState<{
    connected: boolean;
    batteryLevel: number;
  } | null>(null);
  const onEventRef = useRef(onEvent);
  onEventRef.current = onEvent;

  useEffect(() => {
    setConnection(readStoredConnection());
    const channel = createBraceletChannel();
    const onStorage = (storageEvent: StorageEvent) => {
      if (storageEvent.key === STORAGE_KEY) {
        setConnection(readStoredConnection());
      }
    };
    window.addEventListener('storage', onStorage);
    if (!channel) return () => window.removeEventListener('storage', onStorage);

    channel.onmessage = (message: MessageEvent<BraceletEvent>) => {
      const event = message.data;
      if (event.type === 'connection') {
        setConnection({
          connected: event.connected,
          batteryLevel: event.batteryLevel,
        });
      } else if (event.type === 'battery') {
        setConnection((current) => current
          ? { ...current, batteryLevel: event.batteryLevel }
          : current);
      }
      onEventRef.current(event);
    };

    return () => {
      window.removeEventListener('storage', onStorage);
      channel.close();
    };
  }, []);

  return connection;
}
