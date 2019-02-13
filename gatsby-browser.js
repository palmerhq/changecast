import React from 'react'
import { Global } from '@emotion/core'
import { globalStyles } from './src/styles/global'

import 'normalize.css'

export const wrapRootElement = ({ element }) => {
  return (
    <>
      <Global styles={globalStyles} />
      {element}
    </>
  )
}
