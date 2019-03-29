import { keyframes } from '@emotion/core'
import {
  Menu,
  MenuButton as ReachMenuButton,
  MenuItem as ReachMenuItem,
  MenuLink as ReachMenuLink,
  MenuList as ReachMenuList,
} from '@reach/menu-button'
import React from 'react'
import { theme } from '../../styles/theme'

export const MenuButton = props => (
  <ReachMenuButton
    css={{
      display: 'block',
      border: 'none',
      margin: 0,
      padding: 0,
      cursor: 'pointer',
      background: 'transparent' /* inherit font & color from ancestor */,
      font:
        'inherit' /* Normalize `line-height`. Cannot be changed from `normal` in Firefox 4+. */,
      lineHeight:
        'normal' /* Corrects inability to style clickable `input` types in iOS */,
      WebkitApppearance: 'none',
      transition: 'color 100ms ease-in',
      color: theme.color.accent,
      ':hover': {
        color: theme.color.text,
      },
    }}
    {...props}
  />
)

const fadeInScaleUp = keyframes`
  0% {
    opacity: 0;
    transform: scale(.5) translateY(-25px)
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0px)
  }
`

export const MenuList = props => (
  <ReachMenuList
    css={{
      position: 'relative',
      border: `1px solid lightgray`,
      animation: `${fadeInScaleUp} 150ms cubic-bezier(.2,0,.13,1.5)`,
      padding: '5px 0',
      fontSize: '1rem',
      borderRadius: 3,
      background: 'white',
      boxShadow: '0 3px 12px rgba(27,31,35,.15)',
    }}
    {...props}
  />
)

export const menuItemStyles = {
  padding: '4px 15px 4px 10px',
  display: 'flex',
  alignItems: 'center',
}

export const MenuItem = props => (
  <ReachMenuItem css={menuItemStyles} {...props} />
)
export const MenuLink = props => (
  <ReachMenuLink css={menuItemStyles} {...props} />
)

export { Menu }
