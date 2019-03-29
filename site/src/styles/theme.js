const fontSize = '16px'

const color = {
  text: '#24292e',
  accent: '#586069',
}

const breakpoint = {
  small: 400,
  medium: 800,
  large: 1200,
  xlarge: 1600,
}

const media = {
  small: `@media(min-width: ${breakpoint.small}px)`,
  medium: `@media(min-width: ${breakpoint.medium}px)`,
  large: `@media(min-width: ${breakpoint.large}px)`,
  xlarge: `@media(min-width: ${breakpoint.xlarge}px)`,
}

const markdown = {
  color: {
    blockquote: '#24292e',
    accent: '#d6d6d6',
    background: 'white',
    text: '#24292e',
  },
}

const code = {
  color: {
    background: 'initial',
    comment: 'gray',
    punctuation: 'black',
    deleted: 'red',
    inserted: 'green',
    string: 'black',
    keyword: 'black',
    function: 'black',
    variable: 'black',
  },
}

export const theme = {
  fontSize,
  color,
  breakpoint,
  media,
  markdown,
  code,
}
