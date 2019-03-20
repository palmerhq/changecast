import React from 'react'
import { Close } from '../../../icons/Close'
import VisuallyHidden from '@reach/visually-hidden'
import { theme } from '../styles/theme'

function close() {
  window.parent.postMessage('close', '*')
}

function closeOnEscape(e) {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    e.preventDefault()
    close()
  }
}

export const WidgetWrapper = ({
  primaryColor: [red, green, blue],
  children,
}) => {
  React.useEffect(() => {
    window.addEventListener('keydown', closeOnEscape, false)
    return () => window.removeEventListener('keydown', closeOnEscape)
  })

  return (
    <>
      <header
        css={{
          position: 'fixed',
          background: `rgb(${red}, ${green}, ${blue})`,
          color: 'white',
          width: '100%',
          zIndex: 1,
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
            lineHeight: '1.3rem',
            margin: '0',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontWeight: 'normal',
          }}
        >
          Changelog
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
          onClick={close}
        >
          <Close />
          <VisuallyHidden>Close</VisuallyHidden>
        </button>
      </header>
      <main
        css={{
          width: '100vw',
          height: '100vh',
          paddingTop: 'calc(0.5rem + 54px)',
          [theme.media.small]: {
            padding: 'calc(0.5rem + 54px) 0.5rem 0.5rem 0.5rem',
          },
          overflow: 'scroll',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
    </>
  )
}
