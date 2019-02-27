import React from 'react'
import { Close } from './Icon/Close'
import VisuallyHidden from '@reach/visually-hidden'

export const WidgetWrapper = ({
  primaryColor: [red, green, blue],
  children,
}) => (
  <>
    <header
      css={{
        position: 'fixed',
        background: `rgb(${red}, ${green}, ${blue})`,
        color: 'white',
        width: '100%',
        zIndex: '1',
        height: 54,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1rem',
        boxShadow: '0 1px 6px 0 rgba(32,33,36,0.28)',
      }}
    >
      <h1
        css={{
          fontSize: '1.3rem',
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
        <Close />
        <VisuallyHidden>Close</VisuallyHidden>
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
