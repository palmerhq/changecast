import React from 'react'

export const glowingButtonStyles = color => ({
  margin: '0',
  padding: '12px 20px 12px',
  borderRadius: '4px',
  backgroundColor: color,
  boxShadow: `0 3px 26px -2px ${color}`,
  color: 'white',
  display: 'inline-block',
  cursor: 'pointer',
  textDecoration: 'none',
  border: 'none',
  userSelect: 'none',
  transition: 'transform 200ms ease',
  ':hover': {
    transform: 'translateY(-2px)',
  },
})

export const GlowingButton = ({ color = 'royalblue', ...props }) => (
  <button css={glowingButtonStyles(color)} {...props} />
)
