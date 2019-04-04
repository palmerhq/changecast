import React from 'react'

export const CenteredTitle = ({ color, children }) => (
  <div
    css={{
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      marginBottom: 15,
      maxWidth: 700,
    }}
  >
    <h2
      css={{
        marginTop: 0,
        fontSize: '2em',
        color,
      }}
    >
      {children}
    </h2>
  </div>
)
