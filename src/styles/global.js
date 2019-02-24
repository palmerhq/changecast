import { css } from '@emotion/core'
import 'normalize.css'
import { theme } from './theme'

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
    color: ${theme.text};
    -webkit-font-smoothing: antialiased;
    line-height: 1.58;
    background: #f7f7f7;
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
