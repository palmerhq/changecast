import React from 'react'

export const CenteredText = ({ color, children }) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      marginBottom: 50,
      maxWidth: 700,
    }}
  >
    <p
      css={{
        marginLeft: 'auto',
        marginRight: 'auto',
        opacity: '0.9',
        maxWidth: '80%',
        color,
      }}
    >
      {children}
    </p>
  </div>
)
