import React from 'react'

export const Tag = ({ children, ...rest }) => (
  <span
    css={{
      backgroundColor: '#ff3e43',
      color: 'white',
      borderRadius: 4,
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: 'normal',
      paddingLeft: '0.5rem',
      paddingRight: '0.5rem',
      textAlign: 'center',
      textTransform: 'uppercase',
    }}
    {...rest}
  >
    {children}
  </span>
)
