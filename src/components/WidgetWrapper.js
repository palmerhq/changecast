import React from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from '../styles/global'
import { FocusStyles } from './FocusStyles'

export const WidgetWrapper = ({
  children,
  name,
  description,
  homepageUrl,
  avatarUrl,
  primaryColor: [red, green, blue],
}) => (
  <>
    <Global styles={[globalStyles]} />
    <FocusStyles />
    <header
      css={{
        opacity: '0.90',
        position: 'fixed',
        background: `rgb(${red}, ${green}, ${blue})`,
        color: 'white',
        width: '100%',
        height: 54,
        zIndex: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        borderBottom: `1px solid rgb(${red}, ${green}, ${blue})`,
      }}
    >
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
        What's new?
      </h1>
      <button
        css={{
          border: 'none',
          margin: 0,
          padding: '0.5rem',
          width: 'auto',
          minWidth: 'auto',
          overflow: 'visible',
          background: 'transparent',
          color: 'inherit',
          font: 'inherit',
          lineHeight: 'normal',
          WebkitApppearance: 'none',
          cursor: 'pointer',
          marginRight: '-1rem',
        }}
        onClick={() => {
          window.parent.postMessage('close', '*')
        }}
      >
        <svg
          width={28}
          height={28}
          viewBox="0 -2 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </header>
    <main
      css={{
        width: '100vw',
        padding: 'calc(0.5rem + 54px) 0.5rem 0.5rem 0.5rem',
      }}
    >
      {children}
    </main>
  </>
)
