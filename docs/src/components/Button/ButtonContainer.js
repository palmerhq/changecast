import React from 'react'

export const ButtonContainer = ({ children }) => (
  <div
    css={{
      padding: '0 15px',
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center',
      maxWidth: '700px',
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width: 600px)': {
        display: 'block',
        '> button': {
          display: 'block',
          margin: '0 auto 30px auto',
        },
      },
    }}
  >
    {children}
  </div>
)
