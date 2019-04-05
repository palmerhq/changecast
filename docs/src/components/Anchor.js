import React from 'react'

export const Anchor = ({ children, ...props }) => (
  <a
    css={{ color: 'royalblue', ':visited': { color: 'royalblue' } }}
    {...props}
  >
    {children}
  </a>
)
