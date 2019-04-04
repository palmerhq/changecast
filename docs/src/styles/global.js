import { css } from '@emotion/core'
import 'normalize.css'
import { fonts } from './typography'

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    height: 100%;
    font-family: ${fonts.regular}, sans-serif;
    font-style: normal;
    line-height: 1.15;
    text-rendering: optimizeLegibility;
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -ms-overflow-style: scrollbar;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *::-moz-selection,
  *::-moz-selection {
    color: white;
    background-color: #4d61fc;
  }

  *::-moz-selection,
  *::selection {
    color: white;
    background-color: #4d61fc;
  }

  body {
    background-color: white;
    color: #3d3d3d;
  }
  body.state-fixed-body {
    overflow: hidden;
  }

  p {
    margin-bottom: 1em;
    margin-top: 1em;
    line-height: 1.4;
  }

  hr {
    box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  input,
  button,
  select,
  optgroup,
  textarea {
    margin: 0;
  }

  button,
  input {
    border: none;
    background: none;
    overflow: visible;
  }

  button {
    border-radius: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 0.5em;
    margin-top: 0.5em;
    line-height: 1.3;
    color: #303030;
  }
`
