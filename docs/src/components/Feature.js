import React from 'react'

export const Feature = ({ title, icon: Icon, children }) => (
  <li
    css={{
      width: '30%',
      maxWidth: 350,
      marginBottom: 60,
      padding: '0 15px',
      '@media (max-width: 990px)': {
        width: '50%',
      },
      '@media (max-width: 600px)': {
        width: '100%',
      },
    }}
  >
    <h3
      css={{
        marginTop: '0',
        marginBottom: 15,
      }}
    >
      <span
        css={{
          fontSize: '1rem',
        }}
      >
        {title}
      </span>
    </h3>
    <p
      css={{
        margin: 'auto',
      }}
    >
      {children}
    </p>
  </li>
)
