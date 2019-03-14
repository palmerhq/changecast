import { fetch } from 'whatwg-fetch'
import createFocusTrap from 'focus-trap'
import * as styles from './styles.css'

// configuration
const changelogHost = process.env.URL
const CHANGELOG_LOCALSTORAGE_KEY = `changelog-${process.env.REPO_HASH}`

// find all toggles
const toggleSelectors =
  document.currentScript.getAttribute('data-selectors') ||
  '[data-toggle-changelog]'
const toggles = document.querySelectorAll(toggleSelectors)

function createWidget() {
  // bail early if the widget has already been created
  if (document.querySelector(styles.iframe)) {
    return
  }

  // add click handlers to toggles
  toggles.forEach(toggle => toggle.addEventListener('click', toggleChangelog))

  // create overlay
  const overlay = document.createElement('div')

  // create iframe
  const iframe = document.createElement('iframe')
  iframe.src = `${changelogHost}/widget`
  iframe.allowFullscreen = true
  iframe.scrolling = 'no'
  iframe.tabIndex = 0
  iframe.setAttribute('role', 'dialog')
  iframe.setAttribute('aria-label', 'changelog')

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

  function openChangelog() {
    open = true

    overlay.className = `${styles.overlay} ${styles.overlayOpen}`
    iframe.className = `${styles.iframe} ${styles.iframeOpen}`

    focusTrap.activate()
    window.addEventListener('click', toggleChangelog, true)

    window.localStorage.setItem(
      CHANGELOG_LOCALSTORAGE_KEY,
      mostRecentReleaseDate
    )
    if (toggleNotifications.size) {
      toggles.forEach(toggle => {
        toggle.removeChild(toggleNotifications.get(toggle))
        toggleNotifications.delete(toggle)
      })
    }
  }

  function closeChangelog() {
    open = false

    focusTrap.deactivate()
    window.removeEventListener('click', toggleChangelog, true)

    overlay.className = styles.overlay
    iframe.className = styles.iframe

    setTimeout(() => {
      overlay.className = `${styles.overlay} ${styles.overlayHidden}`
      iframe.className = `${styles.iframe} ${styles.iframeHidden}`
    }, 500)
  }

  function toggleChangelog() {
    if (open) {
      closeChangelog()
    } else {
      openChangelog()
    }
  }

  // listen for close events from the iframe
  window.addEventListener(
    'message',
    event => {
      if (event.origin === changelogHost) {
        closeChangelog()
      }
    },
    true
  )

  // notifications
  const notification = document.createElement('span')
  notification.setAttribute('data-changelog-notification', true)
  notification.className = styles.notification

  const toggleStyle = document.createElement('style')
  document.head.appendChild(toggleStyle)
  toggleStyle.sheet.insertRule(`${toggleSelectors} { position: relative; }`)

  fetch(`${changelogHost}/release-dates.json`)
    .then(
      res => res.json(),
      err => {
        // swallow error
      }
    )
    .then(dates => {
      mostRecentReleaseDate = dates[0]

      const lastReleaseViewed = window.localStorage.getItem(
        CHANGELOG_LOCALSTORAGE_KEY
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
          CHANGELOG_LOCALSTORAGE_KEY,
          mostRecentReleaseDate
        )
      }
    })
}

window.addEventListener('load', createWidget)
