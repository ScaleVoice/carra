import type { Config } from "tailwindcss"

export const PRIMARY = {
  DEFAULT: "#6F42C1",
  25: "#F1ECF9",
  50: "#E2D9F3",
  100: "#D4C6EC",
  200: "#C5B3E6",
  300: "#A98EDA",
  400: "#8C68CD",
  500: "#6F42C1",
  600: "#59359A",
  700: "#432874",
  800: "#2C1A4D",
  850: "#21143A",
  900: "#160D27",
  950: "#0B0713",
}

export const SUCCESS = {
  DEFAULT: "#11A44C",
  25: "#CCF3DC",
  50: "#B7EACC",
  100: "#A3E2BC",
  200: "#8ED9AC",
  300: "#64C78C",
  400: "#3BB66C",
  500: "#11A44C",
  600: "#0E833D",
  700: "#0A622E",
  800: "#07421E",
  850: "#053117",
  900: "#03210F",
  950: "#021008",
}

export const WARNING = {
  DEFAULT: "#FCA17D",
  25: "#FFF6F2",
  50: "#FEECE5",
  100: "#FEE3D8",
  200: "#FED9CB",
  300: "#FDC7B1",
  400: "#FDB497",
  500: "#FCA17D",
  600: "#D98664",
  700: "#B76A4C",
  800: "#944F33",
  850: "#834127",
  900: "#72331B",
  950: "60260E",
}

export const ERROR = {
  DEFAULT: "#EA1F3D",
  25: "#FDE9EC",
  50: "#FBD2D8",
  100: "#F9BCC5",
  200: "#F7A5B1",
  300: "#F2798B",
  400: "#EE4C64",
  500: "#EA1F3D",
  600: "#BB1931",
  700: "#8C1325",
  800: "#5E0C18",
  850: "#460912",
  900: "#2F060C",
  950: "#170306",
}

export const GRAY = {
  DEFAULT: "#475467",
  25: "#F5F5F5",
  50: "#E7E7E7",
  100: "#D0D0D0",
  200: "#B8B8B8",
  300: "#A0A0A0",
  400: "#717171",
  500: "#414141",
  600: "#121212",
  700: "#070707",
  800: "#000000",
}

const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      gridTemplateColumns: {
        sidebarOpened: "16rem calc(100vw - 16rem)",
        sidebarClosed: "5rem calc(100vw - 5rem)",
      },
      colors: {
        primary: PRIMARY,
        error: ERROR,
        warning: WARNING,
        success: SUCCESS,
        gray: GRAY,
      },
      width: {
        "100": "25rem",
        "110": "27.5rem",
        "160": "40rem",
        "200": "50rem",
      },
      height: {
        "200": "50rem",
      },
      flex: {
        2: "2 2 0%",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
} as Config

export default tailwindConfig
