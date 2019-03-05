import React from 'react'
import Helmet from 'react-helmet'

export const Favicons = ({ favicons }) => (
  <Helmet
    meta={favicons
      .filter(({ type }) => type === 'meta')
      .map(({ props }) => props)}
    link={favicons
      .filter(({ type }) => type === 'link')
      .map(({ props }) => props)}
  />
)
