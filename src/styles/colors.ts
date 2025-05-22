export const colors = {
  // Base Colors
  base: {
    black: {
      value: '#000000',
      light: '#000000',
      dark: '#FFFFFF',
    },
    white: {
      value: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#000000',
    },
  },

  // Inverse
  inverse: {
    black: {
      value: '#000000',
      light: '#000000',
      dark: '#000000',
    },
    white: {
      value: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#FFFFFF',
    },
  },

  // Layer
  layer: {
    elevated: {
      value: '#FFFFFF',
      light: '#FFFFFF',
      dark: '#1D1D24',
    },
    base: {
      value: '#F3F4F8',
      light: '#F3F4F8',
      dark: '#0F1217',
    },
    dim: {
      value: '#00000066', // 40% opacity
      light: '#00000066',
      dark: '#00000066',
    },
  },

  // Border
  border: {
    normal: {
      value: '#E7E9EC',
      light: '#E7E9EC',
      dark: '#3F3F4A',
    },
    neutral: {
      value: '#B1B8C0',
      light: '#B1B8C0',
      dark: '#62626C',
    },
  },

  // Container
  container: {
    normal: {
      value: '#FAFAFB',
      light: '#FAFAFB',
      dark: '#18171C',
    },
    neutral: {
      value: '#F3F4F8',
      light: '#F3F4F8',
      dark: '#1D1D24',
    },
    alternative: {
      value: '#E7E9EC',
      light: '#E7E9EC',
      dark: '#272730',
    },
    disabled: {
      value: '#E7E9EC',
      light: '#E7E9EC',
      dark: '#3F3F4A',
    },
    selected: {
      value: '#F2F3F5',
      light: '#F2F3F5',
      dark: '#2C2C34',
    },
    'selected-hover': {
      value: '#F2F3F5',
      light: '#F2F3F5',
      dark: '#2C2C34',
    },
  },

  // Contents
  contents: {
    normal: {
      value: '#B1B8C0',
      light: '#B1B8C0',
      dark: '#62626C',
    },
    neutral: {
      value: '#6D7582',
      light: '#6D7582',
      dark: '#C5C5CA',
    },
  },

  // Label
  label: {
    strong: {
      value: '#000000',
      light: '#000000',
      dark: '#FFFFFF',
    },
    normal: {
      value: '#151719',
      light: '#151719',
      dark: '#F2F3F5',
    },
    neutral: {
      value: '#505866',
      light: '#505866',
      dark: '#9E9EA2',
    },
    alternative: {
      value: '#B1B8C0',
      light: '#B1B8C0',
      dark: '#62626C',
    },
    disabled: {
      value: '#B1B8C0',
      light: '#B1B8C0',
      dark: '#62626C',
    },
  },

  // Decrease
  decrease: {
    value: '#3F94EE',
    light: '#3F94EE',
    dark: '#3F94EE',
  },
  'decrease-container': {
    value: '#E4F2FD',
    light: '#E4F2FD',
    dark: '#10263D',
  },

  // Negative
  negative: {
    error: {
      value: '#E6533E',
      light: '#E6533E',
      dark: '#E6533E',
    },
    'error-container': {
      value: '#FDECEE',
      light: '#FDECEE',
      dark: '#3D130C',
    },
  },

  // Positive
  positive: {
    value: '#0BBD49',
    light: '#0BBD49',
    dark: '#0BBD49',
  },
  'positive-container': {
    value: '#E6F7E9',
    light: '#E6F7E9',
    dark: '#003D0D',
  },

  // Primary
  primary: {
    value: '#FBC926',
    light: '#FBC926',
    dark: '#FBC926',
  },
  'primary-container': {
    value: '#FDF7DD',
    light: '#FDF7DD',
    dark: '#363221',
  },
} as const;

// 다크/라이트 테마 지원 함수
export const getColor = (colorKey: string, theme: 'light' | 'dark' = 'light'): string => {
  const colorPath = colorKey.split('.');
  let color: any = colors;

  for (const key of colorPath) {
    color = color[key];
  }

  if (typeof color === 'object' && color[theme]) {
    return color[theme];
  }

  return color?.value || color;
};

export const colorTokens = {
  baseBlack: 'var(--color-base-black)',
  baseWhite: 'var(--color-base-white)',

  inverseBlack: 'var(--color-inverse-black)',
  inverseWhite: 'var(--color-inverse-white)',

  layerElevated: 'var(--color-layer-elevated)',
  layerBase: 'var(--color-layer-base)',
  layerDim: 'var(--color-layer-dim)',

  borderNormal: 'var(--color-border-normal)',
  borderNeutral: 'var(--color-border-neutral)',

  containerNormal: 'var(--color-container-normal)',
  containerNeutral: 'var(--color-container-neutral)',
  containerAlternative: 'var(--color-container-alternative)',
  containerDisabled: 'var(--color-container-disabled)',
  containerSelected: 'var(--color-container-selected)',
  containerSelectedHover: 'var(--color-container-selected-hover)',

  contentsNormal: 'var(--color-contents-normal)',
  contentsNeutral: 'var(--color-contents-neutral)',

  labelStrong: 'var(--color-label-strong)',
  labelNormal: 'var(--color-label-normal)',
  labelNeutral: 'var(--color-label-neutral)',
  labelAlternative: 'var(--color-label-alternative)',
  labelDisabled: 'var(--color-label-disabled)',

  decrease: 'var(--color-decrease)',
  decreaseContainer: 'var(--color-decrease-container)',

  negativeError: 'var(--color-negative-error)',
  negativeErrorContainer: 'var(--color-negative-error-container)',

  positive: 'var(--color-positive)',
  positiveContainer: 'var(--color-positive-container)',

  primary: 'var(--color-primary)',
  primaryContainer: 'var(--color-primary-container)',
} as const;
