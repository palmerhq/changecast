import React from 'react'
import { WidgetContext } from '../providers/WidgetProvider'
import { theme } from '../styles/theme'

export const WidgetWrapper = ({ children }) => {
  const isOpen = React.useContext(WidgetContext)

  return (
    <main
      css={{
        width: '100vw',
        height: '100vh',
        paddingTop: 'calc(0.5rem + 54px)',
        [theme.media.small]: {
          padding: 'calc(0.5rem + 54px) 0.5rem 0.5rem 0.5rem',
        },
        overflow: isOpen ? 'scroll' : 'hidden',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {children}
    </main>
  )
}
