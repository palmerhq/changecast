import { css } from '@emotion/core'
import { theme } from './theme'

export const globalStyles = css`
  html {
    box-sizing: border-box;
    font-family: ${theme.fontFamily};
    font-weight: 400;
    font-size: ${theme.fontSize};
    font-style: normal;
    color: ${theme.text};
    -webkit-font-smoothing: antialiased;
    line-height: 1.58;
  }

  body {
    padding-bottom: 4rem;
  }

  a {
    color: ${theme.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`
