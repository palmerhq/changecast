import { Link as GatsbyLink } from 'gatsby'
import isAbsoluteURL from 'is-absolute-url'
import React from 'react'

export const Link = ({ href, ...props }) =>
  isAbsoluteURL(href || '') ? (
    <a href={href} {...props} />
  ) : (
    <GatsbyLink to={href} {...props} activeClassName="active" />
  )
