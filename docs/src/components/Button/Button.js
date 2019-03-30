import React from 'react'

export const Button = ({ color = '#4D61FC', ...props }) => (
  <button
    css={{
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
    }}
    {...props}
  />
)
