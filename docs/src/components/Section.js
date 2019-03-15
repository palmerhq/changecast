import React from 'react'

export const Section = ({ title, subtitle, content, children }) => (
  <div css={{ padding: '70px 0 70px', background: 'black' }}>
    <div
      css={{
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        marginBottom: '50px',
        maxWidth: '700px',
        padding: '0 15px',
      }}
    >
      <div
        css={{
          textTransform: 'uppercase',
          color: '#4D61FC',
          fontSize: '12px',
          fontWeight: '700',
          lineHeight: '1.4',
        }}
      >
        {subtitle}
      </div>
      <h2
        css={{
          fontSize: '2em',
          color: 'white',
        }}
      >
        {title}
      </h2>
      <p
        css={{
          marginLeft: 'auto',
          marginRight: 'auto',
          opacity: '0.9',
          maxWidth: '80%',
          color: 'white',
        }}
      >
        {content}
      </p>
    </div>
    <div
      css={{
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        maxWidth: '700px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  </div>
)
