// CSSType's FontWeightProperty is too restrictive.
const bold = 700
const containerWidth = 1000

const color = {
  white: '#fff',
  black: '#000',
  blue: '#2F86D7',
  red: '#CC0000',
  yellow: '#F8DC57',
  green: '#1CF5BA',
  purple: '#5E21D9',
  grayDarker: '#252527',
  gray: '#5F656D',
  grayLighter: '#8C95A1',
  grayLightest: '#DDE5E8',
  offWhiteLightest: '#F7FBFB',
  offWhiteLighter: '#EFF7F8',
  offWhite: '#EFEFEF',
  twitter: '#1da1f2',
  github: '#000',
  instagram: '#ed4956',
  facebook: '#4267b2',
  linkedin: '#0073b1',
  dribbble: '#c142a0',
  inherit: 'inherit',
}

const media = {
  small: '@media (min-width: 500px)',
  medium: '@media (min-width: 700px)',
  large: '@media (min-width: 1200px)',
}

const shadow = {
  medium: '0 5px 15px rgba(0,0,0,.07)',
  large: '0 15px 35px rgba(50,50,93,.1)',
}

export const theme = {
  media,
  color,
  shadow,
  containerWidth,
  mono: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
  bold,
  sharedStyles: {
    markdown: {
      maxWidth: 700,
      width: '100%',
      margin: '0 auto',
      '& .dropcap': {
        float: 'left',
        fontSize: 53,
        fontWeight: 500,
        lineHeight: 1,
        position: 'relative',
        paddingRight: 8,
      },
      '& ::-moz-selection': {
        background: `rgba(0,85,255,.99)`,
        color: color.white,
      },

      '& ::selection': {
        background: `rgba(0,85,255,.99)`,
        color: color.white,
      },
      '& p a, & li a, & li code a': {
        fontWeight: 'inherit',
        color: color.blue,
        textDecoration: 'underline',
      },
      '& h1, & h2, & h3, & h4, & h5, & h6, & p, & ul, & ol ': {
        marginBottom: '1.875rem',
      },
      '& h1': {
        fontSize: '3rem',
        lineHeight: '1.2',
      },
      '& h2': {
        fontSize: '2.25rem',
      },
      '& h3': {
        fontSize: '1.75rem',
      },
      '& h4': {
        fontSize: '1.25rem',
      },
      '& h5': {
        fontSize: '1rem',
      },
      '& h6': {
        fontSize: '.875rem',
        textTransform: 'uppercase',
      },
      '& h1, & h2, & h3, & h4': {
        fontWeight: bold,
      },
      '& ol': {
        listStyle: 'number',
      },
      '& ul li': {
        margin: '0 0 10px 16px',
        '&:before': {
          float: 'left',
          marginLeft: -16,
          color: color.grayLighter,
          content: '-',
        },
      },
      '& table': {
        display: 'block',
        width: '100%',
        overflow: 'auto',
        borderSpacing: 0,
        borderCollapse: 'collapse',
        marginBottom: '1rem',
      },
      '& table thead th': {
        fontSize: '.875rem',
        textTransform: 'uppercase',
        fontWeight: 'bold',
      },
      '& table th': {
        fontWeight: 600,
      },

      '& table th, & table td': {
        padding: '1rem 1.5rem',
        border: '1px solid #dfe2e5',
      },
      '& table tr': {
        backgroundColor: '#fff',
        borderTop: '1px solid #c6cbd1',
      },
      '& table tr:nth-child(2n)': {
        backgroundColor: color.offWhiteLightest,
      },
      '& strong': {
        fontWeight: bold,
      },
      '& p': {
        lineHeight: '1.5',
        fontWeight: 400,
        fontSize: '1.2rem',
        marginBottom: '1.875rem',
      },
      '& .gatsby-highlight  pre > code': {
        fontSize: 13,
        lineHeight: 1.4,
        [media.large]: {
          marginLeft: '-1.75rem',
          marginRight: '-1.75rem',
        },
      },
      '& pre.editor.editor-colors': {
        [media.large]: {
          marginLeft: '-1.5rem',
          marginRight: '-1.5rem',
        },
      },
      '& .comment.js': {
        color: color.grayLighter,
      },
      '& .keyword.js': {
        color: color.grayDarker,
        fontWeight: 'bold',
      },
      // export default
      '& .variable.default.js': {
        color: color.grayDarker,
        fontWeight: 'bold',
      },
      // class
      '& .storage.type.js': {
        color: color.grayDarker,
        fontWeight: 'bold',
      },
      // extends
      '& .storage.modifier.js': {
        color: color.grayDarker,
        fontWeight: 'bold',
      },
      '& .entity.other.attribute-name.js': {
        color: color.grayDarker,
        fontStyle: 'italic',
      },
      '& .entity.name.function.js': {
        color: color.gray,
      },
      '& .punctuation.definition.brace.curly.js': {
        color: color.gray,
      },
      '& .punctuation.definition.string.js': {
        color: color.gray,
      },
      '& .meta.brace.curly.js': {
        color: color.gray,
      },
      '& .string.quoted.double.js': {
        color: color.gray,
      },

      '& .punctuation.definition.tag.js': {
        color: color.gray,
      },
      '& .keyword.operator.spread.js': {
        color: color.gray,
      },
      '& img': {
        width: '100%',
      },
      '& blockquote': {
        padding: '0 1em',
        color: '#6a737d',
        borderLeft: `0.25em solid ${color.grayLightest}`,
      },
      '& blockquote>:first-child': {
        marginTop: 0,
      },

      '& blockquote>:last-child': {
        marginBottom: 0,
      },
    },
  },
}
