import React from 'react'
import { CHANGECAST_LOCALSTORAGE_KEY } from '../utils/constants'

export const SiteProvider = ({ children }) => {
  React.useEffect(() => {
    window.localStorage.setItem(
      CHANGECAST_LOCALSTORAGE_KEY,
      new Date().toISOString()
    )
  }, [])

  return children
}
