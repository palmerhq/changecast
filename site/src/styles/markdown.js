import { css } from '@emotion/core'
import { theme } from './theme'

export const markdownStyles = css`
  a {
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  img {
    width: 100%;
    border-radius: 3px;
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
    border: 1px solid ${theme.markdown.color.accent};
    padding: 6px 13px;
  }

  table tr {
    border-top: 1px solid ${theme.markdown.color.accent};
  }

  table tr:nth-child(2n) {
    background-color: ${theme.markdown.color.background};
  }

  blockquote {
    padding: 0 1em;
    color: ${theme.markdown.color.blockquote};
    border-left: 0.25em solid ${theme.markdown.color.accent};
    font-size: 1.20112rem;
    line-height: 1.75rem;
    color: inherit;
    font-style: italic;
    opacity: 0.8;
  }

  // prism styles
  code[class*='language-'],
  pre[class*='language-'] {
    font-size: 0.9rem;
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
    border-radius: 3px;
  }

  /* Inline code */
  *:not(pre) > code[class*='language-'] {
    padding: 0.1em;
    font-size: 0.9em;
    border-radius: 0.3em;
    white-space: normal;
    word-break: break-word;
  }

  .token.comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${theme.code.color.comment};
  }

  .token.punctuation {
    color: ${theme.code.color.punctuation};
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
    color: ${theme.code.color.deleted};
  }

  .token.selector,
  .token.attr-name,
  .token.string,
  .token.char,
  .token.builtin,
  .token.inserted {
    color: ${theme.code.color.inserted};
  }

  .token.operator,
  .token.entity,
  .token.url,
  .language-css .token.string,
  .style .token.string {
    color: ${theme.code.color.string};
    background: hsla(0, 0%, 100%, 0.5);
  }

  .token.atrule,
  .token.attr-value,
  .token.keyword {
    color: ${theme.code.color.keyword};
  }

  .token.function,
  .token.class-name {
    color: ${theme.code.color.keyword};
  }

  .token.regex,
  .token.important,
  .token.variable {
    color: ${theme.code.color.variable};
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
