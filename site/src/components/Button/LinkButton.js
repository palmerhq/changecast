import { Link } from 'gatsby'
import React from 'react'
import { buttonStyles } from './Button'

export const LinkButton = props => <Link css={buttonStyles} {...props} />
