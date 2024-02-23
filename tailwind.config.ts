import type { Config } from "tailwindcss"

export const PRIMARY = {
  DEFAULT: "#00B3B5",
  25: "#EEFFFF",
  50: "#E3FAFB",
  100: "#C7F1F1",
  200: "#A9EAEB",
  300: "#68DBDE",
  400: "#3ECDD0",
  500: "#2DC3C6",
  600: "#00B3B5",
  700: "#18A8AA",
  800: "#119799",
  900: "#0E8587",
}

export const ERROR = {
  DEFAULT: "#D92D20",
  25: "#FFFBFA",
  50: "#FEF3F2",
  100: "#FEE4E2",
  200: "#FECDCA",
  300: "#FDA29B",
  400: "#F97066",
  500: "#F04438",
  600: "#D92D20",
  700: "#B42318",
  800: "#912018",
  900: "#7A271A",
}

export const WARNING = {
  DEFAULT: "#DC6803",
  25: "#FFFCF5",
  50: "#FFFAEB",
  100: "#FEF0C7",
  200: "#FEDF89",
  300: "#FEC84B",
  400: "#FDB022",
  500: "#F79009",
  600: "#DC6803",
  700: "#B54708",
  800: "#93370D",
  900: "#7A2E0E",
}

export const SUCCESS = {
  DEFAULT: "#039855",
  25: "#F6FEF9",
  50: "#ECFDF3",
  100: "#D1FADF",
  200: "#A6F4C5",
  300: "#6CE9A6",
  400: "#32D583",
  500: "#12B76A",
  600: "#039855",
  700: "#027A48",
  800: "#05603A",
  900: "#054F31",
}

export const GRAY = {
  DEFAULT: "#475467",
  25: "#FCFCFD",
  50: "#F9FAFB",
  100: "#F2F4F7",
  200: "#EAECF0",
  300: "#D0D5DD",
  400: "#98A2B3",
  500: "#667085",
  600: "#475467",
  700: "#344054",
  800: "#1D2939",
  900: "#101828",
}

const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/rtu-components/dist/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
