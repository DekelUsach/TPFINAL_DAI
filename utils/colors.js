// utils/colors.js - Tema de colores para la aplicación de plantas con estética premium
export const colors = {
  // Paleta principal inspirada en jardines botánicos
  primary: {
    ultraLight: '#EAF7EE',   // Musgo en rocío
    light: '#B8E6C6',        // Salvia
    main: '#3C8D5D',         // Hoja húmeda
    dark: '#1E5C34',         // Bosque profundo
    ultraDark: '#103921',    // Pino sombrío
  },

  // Paleta secundaria para contrastes sofisticados
  secondary: {
    blush: '#F6D1C1',
    terracotta: '#C8825B',
    sand: '#D8C3A5',
    mist: '#9FB3C8',
  },

  // Acentos vibrantes pero refinados
  accent: {
    lime: '#D2FF72',
    amber: '#FFC857',
    orchid: '#C77DFF',
    coral: '#FF7F6A',
  },

  // Capas y superficies
  surface: {
    base: '#F5F8F4',
    raised: '#FFFFFF',
    muted: '#EEF3ED',
    outline: '#D8E2DA',
    translucent: 'rgba(255, 255, 255, 0.6)',
  },

  // Tipografía
  text: {
    dominant: '#0F2D1F',
    primary: '#224A33',
    secondary: '#4F6B59',
    muted: '#7D8D83',
    inverse: '#F4FFF7',
  },

  // Estados semánticos
  states: {
    success: '#3C8D5D',
    successSoft: 'rgba(60, 141, 93, 0.16)',
    warning: '#E2B93B',
    warningSoft: 'rgba(226, 185, 59, 0.18)',
    danger: '#DE5B5B',
    dangerSoft: 'rgba(222, 91, 91, 0.18)',
    info: '#3E7CB1',
    infoSoft: 'rgba(62, 124, 177, 0.16)',
  },

  // Sombras y halos
  shadow: {
    soft: 'rgba(17, 59, 37, 0.08)',
    medium: 'rgba(17, 59, 37, 0.16)',
    strong: 'rgba(17, 59, 37, 0.24)',
  },

  // Destellos de luz para efectos neomórficos
  glow: {
    primary: 'rgba(210, 255, 114, 0.4)',
    accent: 'rgba(255, 200, 87, 0.35)',
  },
};

// Gradientes predefinidos con dinamismo orgánico
export const gradients = {
  canopy: ['#1E5C34', '#3C8D5D', '#B8E6C6'],
  sunrise: ['#FFC857', '#FF7F6A', '#C77DFF'],
  morningMist: ['#EEF3ED', '#9FB3C8'],
  lagoon: ['#0C3C30', '#264D79'],
  glassCard: ['rgba(255,255,255,0.86)', 'rgba(245,248,244,0.9)'],
};

// Función utilitaria para gradientes (pensada para web / estilos inline)
export const createGradient = (palette, direction = '135deg') => {
  return `linear-gradient(${direction}, ${palette.join(', ')})`;
};

// Tipografía
export const typography = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 26,
    display: 34,
  },
  fontWeight: {
    hairline: '200',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeight: {
    compact: 1.25,
    standard: 1.4,
    spacious: 1.65,
  },
};

// Espaciado consistente
export const spacing = {
  xxs: 2,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius
export const borderRadius = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  pill: 999,
  full: 9999,
};

// Sombras
export const shadows = {
  sm: {
    shadowColor: colors.shadow.soft,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 22,
    elevation: 6,
  },
  lg: {
    shadowColor: colors.shadow.strong,
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 1,
    shadowRadius: 36,
    elevation: 14,
  },
};

export const blur = {
  light: 12,
  medium: 18,
  strong: 26,
};
