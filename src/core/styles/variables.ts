export const definitions = {
  c: {
    'sun-l-500': '45, 91%, 96%;',
    'sun-l-400': '43, 100%, 89%;',
    'sun-l-300': '42, 100%, 82%;',
    'sun-l-200': '43, 100%, 75%;',
    'sun-l-100': '43, 100%, 68%;',
    sun: '44, 100%, 59%;',
    'sun-d-100': '42, 69%, 51%;',
    'sun-d-200': '39, 62%, 44%;',
    'sun-d-300': '36, 58%, 36%;',
    'sun-d-400': '29, 52%, 29%;',
    'sun-d-500': '20, 40%, 21%;',
    'night-l-800': '187, 47%, 96%;',
    'night-l-700': '185, 44%, 95%;',
    'night-l-675': '187, 43%, 91%',
    'night-l-650': '181, 43%, 73%;',
    'night-l-600': '161, 70%, 79%;',
    'night-l-500': '167, 60%, 69%;',
    'night-l-400': '172, 56%, 57%;',
    'night-l-300': '176, 100%, 37%;',
    'night-l-200': '178, 97%, 30%;',
    'night-l-100': '182, 97%, 23%;',
    night: '187, 100%, 17%;',
    'night-d-100': '180, 67%, 13%;',
    'night-d-200': '156, 56%, 9%;',
    'night-text': '184, 6%, 47%;',
    'night-text-light': '187, 23%, 64%',
    warning: '3, 100%, 60%;',
    'warning-l-100': '0, 88%, 97%;',
    'warning-d': '3, 83%, 40%',
    alert: '20, 100%, 59%;',
    'alert-l-100': '20, 100%, 59%;',
    majesty: '256, 45%, 60%;',
    'majesty-l-100': '256, 100%, 96%',
    'almond-l-200': '36, 16%, 94%;',
    'almond-l-100': '37, 13%, 88%;',
    almond: '35, 13%, 82%;',
    'almond-d-100': '33, 5%, 64%;',
    'almond-d-200': '34, 3%, 47%;',
    'almond-d-300': '30, 3%, 31%;',
    'almond-d-400': '60, 2%, 16%;',
    white: '0, 0%, 100%;',
    black: '0, 0%, 0%;',
    red: '0, 88%, 97%',
    'sun-glow': '46, 100%, 50%',
    'sun-glow-dark': '40, 47%, 21%',
    'sun-overlay': '42, 79%, 61%',
    'coffee-brown': '43, 40%, 21%',
    santander: '5, 74%, 49%',
    gray: '176, 51%, 8%'
  },
  shadow: {
    1: '0px 5px 10px rgba(0, 0, 0, 0.05)',
    2: '0px 5px 20px rgba(0, 0, 0, 0.05)',
    3: '0px 8px 30px 2px rgba(0, 0, 0, 0.1)',
    4: '0px 30px 40px rgba(0, 0, 0, 0.15)',
    5: '0px 40px 50px rgba(0, 0, 0, 0.15)',
    6: '0px 10px 30px 10px rgba(0, 0, 0, 0.04);'
  },
  font: {
    text: "Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;",
    heading: "'Setup Grotesk', sans-serif;"
  },
  weight: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    black: 900
  },
  radius: {
    // TODO: refactor names
    'corner-smallest': '4px',
    'corner-smaller': '8px',
    'corner-small': '10px',
    'corner-medium': '12px',
    corner: '16px',
    'corner-mid': '20px',
    'corner-large': '32px',
    'corner-larger': '40px',
    'corner-largest': '50px',
    input: '4px',
    full: '9999px'
  },
  z: {
    'order-1': 15,
    'order-2': 30,
    'order-3': 45,
    'order-4': 60,
    sticky: 200,
    'modal-bg': 290,
    modal: 300,
    'modal-secondary': 295,
    notification: 400,
    over: 10002,
    'over-top': 10003,
    'over-navigation': 10004,
    top: 21474836471
  },
  time: {
    fast: '0.1s',
    'mid-fast': '0.175s',
    control: '0.3s',
    spinner: '1s'
  }
} as const

export const variables = {
  ':root': Object.entries(definitions).reduce<Record<string, string>>(
    (memo, [prefix, map]) => {
      Object.entries(map).forEach(([key, value]) => {
        memo[`--${prefix}-${key}`] = value
      })

      return memo
    },
    {}
  )
}

export function color(key: keyof (typeof definitions)['c'], opacity?: number) {
  if (opacity == null || opacity >= 1) {
    return `hsl(var(--c-${key}))`
  }
  return `hsla(var(--c-${key}), ${opacity})`
}

export function shadow(key: keyof (typeof definitions)['shadow']) {
  return `var(--shadow-${key})`
}

export function font(key: keyof (typeof definitions)['font']) {
  return `var(--font-${key})`
}

export function zIndex(key: keyof (typeof definitions)['z']) {
  return `var(--z-${key})`
}

export function time(key: keyof (typeof definitions)['time']) {
  return `var(--time-${key})`
}

export function radius(key: keyof (typeof definitions)['radius']) {
  return `var(--radius-${key})`
}

export function weight(key: keyof (typeof definitions)['weight']) {
  return `var(--weight-${key})`
}
