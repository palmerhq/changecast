import VisuallyHidden from '@reach/visually-hidden'
import React from 'react'
import { theme } from '../../styles/theme'
import { Button } from '../Button/Button'

export const SocialButton = ({ label, icon: Icon, ...rest }) => (
  <Button css={{ padding: '0.5rem' }} {...rest}>
    <Icon
      css={{
        height: '1.2rem',
        width: '1.2rem',
        color: theme.color.accent,
      }}
    />
    <VisuallyHidden>{label}</VisuallyHidden>
  </Button>
)
