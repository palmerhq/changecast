import createFocusTrap from 'focus-trap'
import { fetch } from 'whatwg-fetch'
import * as styles from './styles.css'

// configuration
const CHANGECAST_LOCALSTORAGE_KEY = `changecast-${process.env.REPO_HASH}`
const changeCastHost =
  process.env.URL ||
  document.currentScript.getAttribute('src').replace('/widget.js', '')

// find all toggles
const toggleSelectors =
  document.currentScript.getAttribute('data-selectors') ||
  '[data-toggle-changecast]'

const toggles = document.querySelectorAll(toggleSelectors)

function createWidget() {
  // bail early if the widget has already been created
  if (document.querySelector(styles.iframe)) {
    return
  }

  // add click handlers to toggles
  toggles.forEach(toggle => toggle.addEventListener('click', toggleChangeCast))

  // create overlay
  const overlay = document.createElement('div')

  // create iframe
  const iframe = document.createElement('iframe')
  iframe.src = `${changeCastHost}/widget`
  iframe.allowFullscreen = true
  iframe.scrolling = 'no'
  iframe.tabIndex = 0
  iframe.setAttribute('role', 'dialog')
  iframe.setAttribute('aria-label', 'ChangeCast Changelog')
  iframe.setAttribute('aria-hidden', true)

  // hide overlay and iframe to start
  overlay.className = `${styles.overlay} ${styles.overlayHidden}`
  iframe.className = `${styles.iframe} ${styles.iframeHidden}`

  document.body.appendChild(overlay)
  document.body.appendChild(iframe)

  let focusTrap = createFocusTrap(iframe, {
    initialFocus: iframe,
  })

  // shared state
  let open = false
  let mostRecentReleaseDate
  let toggleNotifications = new Map()

  function openChangeCast() {
    open = true

    overlay.className = `${styles.overlay} ${styles.overlayOpen}`
    iframe.className = `${styles.iframe} ${styles.iframeOpen}`
    iframe.setAttribute('aria-hidden', false)

    focusTrap.activate()
    window.addEventListener('click', toggleChangeCast, true)

    window.localStorage.setItem(
      CHANGECAST_LOCALSTORAGE_KEY,
      mostRecentReleaseDate
    )
    if (toggleNotifications.size) {
      toggles.forEach(toggle => {
        toggle.removeChild(toggleNotifications.get(toggle))
        toggleNotifications.delete(toggle)
      })
    }
  }

  function closeChangeCast() {
    open = false

    focusTrap.deactivate()
    window.removeEventListener('click', toggleChangeCast, true)

    overlay.className = styles.overlay
    iframe.className = styles.iframe
    iframe.setAttribute('aria-hidden', true)

    setTimeout(() => {
      overlay.className = `${styles.overlay} ${styles.overlayHidden}`
      iframe.className = `${styles.iframe} ${styles.iframeHidden}`
    }, 400)
  }

  function toggleChangeCast() {
    if (open) {
      closeChangeCast()
    } else {
      openChangeCast()
    }
  }

  // listen for close events from the iframe
  window.addEventListener(
    'message',
    event => {
      if (event.origin === changeCastHost) {
        closeChangeCast()
      }
    },
    true
  )

  // notifications
  const notification = document.createElement('span')
  notification.setAttribute('data-changecast-notification', true)
  notification.className = styles.notification

  const toggleStyle = document.createElement('style')
  document.head.appendChild(toggleStyle)
  toggleStyle.sheet.insertRule(`${toggleSelectors} { position: relative; }`)

  fetch(`${changeCastHost}/release-dates.json`)
    .then(
      res => res.json(),
      err => {
        // swallow error
      }
    )
    .then(dates => {
      mostRecentReleaseDate = dates[0]

      const lastReleaseViewed = window.localStorage.getItem(
        CHANGECAST_LOCALSTORAGE_KEY
      )

      if (lastReleaseViewed) {
        const lastViewedIndex = dates.indexOf(lastReleaseViewed)
        const count = lastViewedIndex === -1 ? dates.length : lastViewedIndex

        if (count > 0) {
          notification.innerHTML = count === dates.length ? `${count}+` : count
          toggles.forEach(toggle => {
            const notificationCopy = notification.cloneNode(true)
            toggleNotifications.set(toggle, notificationCopy)
            toggle.appendChild(notificationCopy)
          })
        }
      } else {
        window.localStorage.setItem(
          CHANGECAST_LOCALSTORAGE_KEY,
          mostRecentReleaseDate
        )
      }
    })
}

window.addEventListener('load', createWidget)
