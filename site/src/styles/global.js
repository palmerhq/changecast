import { css } from '@emotion/core'
import '@reach/menu-button/styles.css'
import { theme } from './theme'
import { fonts } from './typography'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-family: ${fonts.regular}, sans-serif;
    font-size: 16px;
    font-weight: 400;
    font-style: normal;
    color: ${theme.color.text};
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
`
