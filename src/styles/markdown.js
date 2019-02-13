import { css } from '@emotion/core'
import { theme } from './theme'

export const markdownStyles = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${theme.heading};
    > a {
      color: ${theme.heading};
      text-decoration: none;
      &:hover {
        color: ${theme.link};
      }
    }
  }

  h1 {
    font-size: 3rem;
  }

  a {
    color: ${theme.link};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 100%;
  }

  table {
    display: block;
    overflow: auto;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
  }

  table th {
    font-weight: 600;
  }

  table td,
  table th {
    border: 1px solid ${theme.accent};
    padding: 6px 13px;
  }

  table tr {
    background-color: ${theme.background};
    border-top: 1px solid ${theme.accent};
  }

  table tr:nth-child(2n) {
    background-color: ${theme.accent};
  }

  blockquote {
    padding: 0 1em;
    color: ${theme.heading};
    border-left: 0.25em solid ${theme.accent};
    font-size: 1.20112rem;
    line-height: 1.75rem;
    color: inherit;
    font-style: italic;
    opacity: 0.8;
  }

  // prism styles
  code[class*='language-'],
  pre[class*='language-'] {
    color: ${theme.codeColor};
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;

    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;

    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
  }

  @media print {
    code[class*='language-'],
    pre[class*='language-'] {
      text-shadow: none;
    }
  }

  /* Code blocks */
  pre[class*='language-'] {
    padding: 1em;
    margin: 0.5em 0;
    overflow: auto;
  }

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    background: ${theme.codeBackground};
  }

  /* Inline code */
  :not(pre) > code[class*='language-'] {
    padding: 0.1em;
    font-size: 0.9em;
    border-radius: 0.3em;
    white-space: normal;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${theme.codeComment};
  }

  .token.punctuation {
    color: ${theme.codePunctuation};
  }

  .namespace {
    opacity: 0.7;
  }

  .token.property,
  .token.tag,
  .token.boolean,
  .token.number,
  .token.constant,
  .token.symbol,
  .token.deleted {
    color: ${theme.codeDeleted};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${theme.codeInserted};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${theme.codeString};
    background: hsla(0, 0%, 100%, 0.5);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${theme.codeKeyword};
  }

  .token.function,
  .token.class-name {
    color: ${theme.codeFunction};
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: ${theme.codeVariable};
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }

  .token.entity {
    cursor: help;
  }
`
