import React from 'react'
import { Link } from 'gatsby'

export const SiteWrapper = ({
  title,
  description,
  homepage,
  logoSrc,
  primaryColor: [red, green, blue],
  children,
}) => (
  <>
    <header
      css={{
        background: `rgb(${red}, ${green}, ${blue})`,
        height: 54,
        color: 'white',
        width: '100%',
        zIndex: '1',
        position: 'fixed',
        boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
      }}
    >
      <div
        css={{
          maxWidth: 800,
          margin: '0 auto',
          height: 54,
          display: 'flex',
          alignItems: 'center',
          padding: '0 0.5rem',
        }}
      >
        {logoSrc && (
          <Link to="/">
            <img
              src={logoSrc}
              alt=""
              css={{
                display: 'block',
                borderRadius: 3,
                marginRight: '1rem',
                background: '#f7f7f7',
                height: 40,
                width: 40,
                border: '2px solid #f7f7f7',
              }}
            />
          </Link>
        )}
        <h1
          css={{
            fontSize: '1.3rem',
            lineHeight: '1.3rem',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 'normal',
          }}
        >
          {title} Changelog
        </h1>
      </div>
    </header>
    <main
      css={{
        maxWidth: 800,
        margin: '0 auto',
        width: '100vw',
        padding: 'calc(1rem + 54px) 0.5rem 4rem 0.5rem',
      }}
    >
      {children}
    </main>
  </>
)
