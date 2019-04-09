import React from 'react'
import { theme } from '../styles/theme'

export const SiteWrapper = React.forwardRef(({ children }, ref) => (
  <main
    ref={ref}
    css={{
      maxWidth: 800,
      margin: '0 auto',
      width: '100vw',
      paddingTop: '4rem',
      [theme.media.small]: {
        padding: 'calc(0.5rem + 54px) 0.5rem 0.5rem 0.5rem',
      },
    }}
  >
    {children}
  </main>
))
