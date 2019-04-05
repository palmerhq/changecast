import React from 'react'
import { glowingButtonStyles } from './GlowingButton'

export const GlowingAnchorButton = ({ color = 'royalblue', ...props }) => (
  <a css={glowingButtonStyles(color)} {...props} />
)
