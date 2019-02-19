import React from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from '../styles/global'
import { Link } from 'gatsby'
import { FocusStyles } from './FocusStyles'

export const SiteWrapper = ({
  children,
  name,
  description,
  homepageUrl,
  avatarUrl,
  primaryColor: [red, green, blue],
}) => (
  <>
    <Global styles={globalStyles} />
    <FocusStyles />
    <div
      css={{
        opacity: '0.90',
        color: `rgb(${red}, ${green}, ${blue})`,
        background: 'white',
        width: '100%',
        height: 54,
        zIndex: '1',
        position: 'fixed',
        borderBottom: `1px solid rgb(${red}, ${green}, ${blue})`,
      }}
    >
      <header
        css={{
          maxWidth: 800,
          margin: '0 auto',
          height: 54,
          display: 'flex',
          alignItems: 'center',
          padding: '0 0.5rem',
        }}
      >
        {avatarUrl && (
          <Link to="/">
            <img
              src={avatarUrl}
              alt=""
              css={{
                display: 'block',
                width: '35px',
                height: '35px',
                borderRadius: '3px',
                marginRight: '1rem',
              }}
            />
          </Link>
        )}
        <h1
          css={{
            fontSize: '1.2rem',
            margin: '0',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 'normal',
          }}
        >
          What's new with{' '}
          {homepageUrl ? (
            <a
              href={homepageUrl}
              css={{ color: `rgb(${red}, ${green}, ${blue})` }}
            >
              {name}
            </a>
          ) : (
            name
          )}
          ?
        </h1>
      </header>
    </div>
    <main
      css={{
        maxWidth: 800,
        margin: '0 auto',
        width: '100vw',
        padding: 'calc(0.5rem + 54px) 0.5rem 4rem 0.5rem',
      }}
    >
      {children}
    </main>
  </>
)
