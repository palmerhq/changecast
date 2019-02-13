import React from 'react'
import { theme } from '../styles/theme'

export const Header = ({ name, description, homepageUrl, avatarUrl }) => (
  <header
    css={{
      opacity: '0.8',
      position: 'fixed',
      background: 'white',
      borderBottom: `1px solid ${theme.accent}`,
      width: '100%',
      zIndex: '1',
      padding: '1rem 0',
    }}
  >
    <span
      css={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '0 1rem 0 8rem',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt=""
          css={{
            width: '50px',
            height: '50px',
            borderRadius: '3px',
            marginRight: '1rem',
          }}
        />
      )}
      <span>
        <h1
          css={{
            fontSize: '1rem',
            margin: '0',
          }}
        >
          {homepageUrl ? <a href={homepageUrl}>{name}</a> : name} changelog
        </h1>
        <p
          css={{
            margin: '0',
          }}
        >
          {description}
        </p>
      </span>
    </span>
  </header>
)
