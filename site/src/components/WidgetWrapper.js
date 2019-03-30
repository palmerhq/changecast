import React from 'react'
import { theme } from '../styles/theme'

export function onClose() {
  window.parent.postMessage('close', '*')
}

function closeOnEscape(e) {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    e.preventDefault()
    onClose()
  }
}

export const WidgetWrapper = ({ children }) => {
  React.useEffect(() => {
    window.addEventListener('keydown', closeOnEscape, false)
    return () => window.removeEventListener('keydown', closeOnEscape)
  })

  return (
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
  )
}
