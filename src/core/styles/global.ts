import { css } from '@emotion/react'

const fonts = css`
  @font-face {
    font-family: 'Setup Grotesk';
    src: url('/fonts/SetupGrotesk-Light.woff2') format('woff2'),
      url('/fonts/SetupGrotesk-Light.woff') format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Setup Grotesk';
    src: url('/fonts/SetupGrotesk-Medium.woff2') format('woff2'),
      url('/fonts/SetupGrotesk-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
      url('/fonts/roboto-v20-latin-ext_latin-regular.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-ext_latin-regular.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local(''),
      url('/fonts/roboto-v20-latin-ext_latin-500.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-ext_latin-500.woff') format('woff');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local(''),
      url('/fonts/roboto-v20-latin-ext_latin-700.woff2') format('woff2'),
      url('/fonts/roboto-v20-latin-ext_latin-700.woff') format('woff');
  }
`

const nprogress = css`
  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: currentColor;

    position: fixed;
    z-index: 1031;
    top: 0;
    left: 0;

    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px currentColor, 0 0 5px currentColor;
    opacity: 1;

    -webkit-transform: rotate(3deg) translate(0px, -4px);
    -ms-transform: rotate(3deg) translate(0px, -4px);
    transform: rotate(3deg) translate(0px, -4px);
  }

  .nprogress-custom-parent {
    overflow: hidden;
    position: relative;
  }

  .nprogress-custom-parent #nprogress .bar {
    position: absolute;
  }
`

const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  font,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    font-weight: inherit;
    font-style: inherit;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
  }

  :focus {
    outline: 0;
  }

  ol,
  ul {
    list-style: none;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
  }
  caption,
  th,
  td {
    text-align: left;
    font-weight: normal;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
  }

  blockquote,
  q {
    quotes: '' '';
  }

  button {
    font-size: 100%;
    font-family: inherit;
    border: 0;
    padding: 0;
    background: unset;
  }

  a:visited,
  a:any-link {
    color: currentColor;
    text-decoration: none;
  }

  html {
    /* This is here because of expand / collapse animations */
    overflow-anchor: none;
  }

  body {
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;

    scroll-behavior: smooth;
    min-height: 100%;
  }

  #__next {
    overflow-x: hidden;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }
`

export const global = { fonts, nprogress, reset }
