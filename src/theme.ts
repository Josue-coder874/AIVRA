export const APP_THEMES = {
  midnight: {
    label: 'Azul noche',
    swatch: '#0b1326',
  },
  graphite: {
    label: 'Grafito',
    swatch: '#171a1f',
  },
  violet: {
    label: 'Violeta',
    swatch: '#1b1428',
  },
  forest: {
    label: 'Bosque',
    swatch: '#10221c',
  },
} as const;

export type AppTheme = keyof typeof APP_THEMES;

export function isAppTheme(value: string | null): value is AppTheme {
  return value !== null && Object.hasOwn(APP_THEMES, value);
}
