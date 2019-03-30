import React from 'react'
import { css, Global } from '@emotion/core'

const navigationKeyCodes = [9, 13, 27, 38, 40]

const zeroFocusOutline = css`
  *:focus {
    outline: 0;
  }
`

export const FocusStyles = () => {
  const [usingKeyboard, setUsingKeyboard] = React.useState(false)

  const checkUsingKeyboard = React.useCallback(({ keyCode }) => {
    if (navigationKeyCodes.includes(keyCode)) {
      setUsingKeyboard(true)
    }
  }, [])
  const notUsingKeyboard = React.useCallback(() => setUsingKeyboard(false), [])

  React.useEffect(() => {
    window.addEventListener('keyup', checkUsingKeyboard)
    window.addEventListener('click', notUsingKeyboard)

    return () => {
      window.removeEventListener('keyup', checkUsingKeyboard)
      window.removeEventListener('click', notUsingKeyboard)
    }
  }, [])

  return <Global styles={usingKeyboard ? {} : zeroFocusOutline} />
}
