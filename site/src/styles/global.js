import { css } from '@emotion/core'
import { theme } from './theme'

import 'normalize.css'
import '@reach/menu-button/styles.css'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: ${theme.fontFamily};
    font-weight: 400;
    font-size: ${theme.fontSize};
    font-style: normal;
    color: ${theme.color.text};
    line-height: 1.58;
    background: #f7f7f7;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: transparent;
    -ms-overflow-style: scrollbar;
  }

  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1em;
  }
`
