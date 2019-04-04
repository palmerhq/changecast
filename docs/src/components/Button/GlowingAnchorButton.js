import React from 'react'
import { glowingButtonStyles } from './GlowingButton'

export const GlowingAnchorButton = ({ color = '#ff00cc', ...props }) => (
  <a css={glowingButtonStyles(color)} {...props} />
)
