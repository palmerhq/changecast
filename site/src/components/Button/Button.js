import React from 'react'

export const buttonStyles = {
  border: '2px solid transparent',
  borderRadius: '4px',
  margin: 0,
  padding: '0.35rem',
  width: 'auto',
  minWidth: 'auto',
  overflow: 'visible',
  background: 'transparent',
  color: 'inherit',
  font: 'inherit',
  lineHeight: 'normal',
  WebkitApppearance: 'none',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  transition: 'background 200ms ease, transform 200ms ease',
  ':hover': {
    textDecoration: 'none',
    background: 'rgba(0, 0, 0, 0.1)',
  },
}

export const Button = props => <button css={buttonStyles} {...props} />
