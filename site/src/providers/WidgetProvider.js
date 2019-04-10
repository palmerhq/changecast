import React from 'react'
import { CHANGECAST_LOCALSTORAGE_KEY } from '../utils/constants'

export function onClose() {
  window.parent.postMessage('close', '*')
}

function closeOnEscape(e) {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    e.preventDefault()
    onClose()
  }
}

export const WidgetContext = React.createContext(true)

export const WidgetProvider = ({ children }) => {
  const [isOpen, setOpen] = React.useState(false)
  const handleMessage = React.useCallback(event => {
    if (event.data === 'open') {
      setOpen(true)
      window.localStorage.setItem(
        CHANGECAST_LOCALSTORAGE_KEY,
        new Date().toISOString()
      )
    } else if (event.data === 'close') {
      setOpen(false)
    }
  })

  React.useEffect(() => {
    window.addEventListener('keydown', closeOnEscape, false)
    window.addEventListener('message', handleMessage, true)

    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('message', handleMessage)
    }
  })

  return (
    <WidgetContext.Provider value={isOpen}>{children}</WidgetContext.Provider>
  )
}
