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
        position: 'relative',
        color: 'white',
        width: '100%',
        height: 54,
        zIndex: '1',
        position: 'fixed',
      }}
    >
      <div
        css={{
          opacity: '0.9',
          background: `rgb(${red}, ${green}, ${blue})`,
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      />
      <div
        css={{
          position: 'absolute',
          width: '100%',
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
                  width: '35px',
                  height: '35px',
                  borderRadius: '3px',
                  marginRight: '1rem',
                  background: 'white',
                  boxShadow: '0 3px 12px rgba(27,31,35,.35)',
                }}
              />
            </Link>
          )}
          <h1
            css={{
              fontSize: '1.2rem',
              margin: '0',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              fontWeight: 'normal',
            }}
          >
            What's new with {title}?
          </h1>
        </div>
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
