import React from 'react'
import { css, Global } from '@emotion/core'

const zeroFocusOutline = css`
  *:focus {
    outline: 0;
  }
`

export const FocusStyles = () => {
  const [usingKeyboard, setUsingKeyboard] = React.useState(false)

  const checkUsingKeyboard = React.useCallback(({ keyCode }) => {
    if (keyCode === 9) {
      setUsingKeyboard(true)
    }
  }, [])
  const notUsingKeyboard = React.useCallback(() => setUsingKeyboard(false), [])

  React.useEffect(() => {
    window.addEventListener('keyup', checkUsingKeyboard)
    window.addEventListener('click', notUsingKeyboard)

    return () => {
      window.removeEventListener(checkUsingKeyboard)
      window.removeEventListener(notUsingKeyboard)
    }
  }, [])

  return <Global styles={usingKeyboard ? {} : zeroFocusOutline} />
}
