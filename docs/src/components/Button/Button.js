import React from 'react'

export const buttonStyles = {
  color: 'white',
  display: 'inline-block',
  verticalAlign: 'bottom',
  position: 'relative',
  padding: '12px 20px 12px',
  border: '2px solid transparent',
  borderRadius: '4px',
  fontWeight: '700',
  userSelect: 'none',
  textAlign: 'center',
  textDecoration: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'background 200ms ease, transform 200ms ease',
  ':hover': {
    background: 'rgba(0, 0, 0, 0.1)',
  },
}

export const Button = props => <button css={buttonStyles} {...props} />
