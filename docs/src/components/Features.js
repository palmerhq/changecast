import React from 'react'

export const Features = ({ children }) => (
  <div
    css={{
      marginRight: 'auto',
      marginLeft: 'auto',
      padding: '0 15px',
      maxWidth: '1080px',
    }}
  >
    <ul
      css={{
        padding: '0',
        margin: '0',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        marginTop: '60px',
        ['@media (max-width: 990px)']: {
          justifyContent: 'center',
        },
      }}
    >
      {children}
    </ul>
  </div>
)
