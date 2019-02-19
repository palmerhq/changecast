import { fetch } from 'whatwg-fetch'

import './style.css'

// @todo refactor all of this mess

let open = false
let iframe
let latestViewedDate

const trigger = document.getElementById('changelog-trigger')
trigger.addEventListener('click', toggleChangelog)
const initialTriggerHTML = trigger.innerHTML

const overlay = document.createElement('div')
overlay.className = 'changelog-overlay'
overlay.addEventListener('click', toggleChangelog)
document.body.appendChild(overlay)

function toggleChangelog() {
  if (open) {
    document.body.removeChild(iframe)
    overlay.className = 'changelog-overlay'

    open = false
  } else {
    iframe = document.createElement('iframe')
    iframe.src = `${process.env.DEPLOY_URL}/widget`
    iframe.allowFullscreen = true
    iframe.className = 'changelog-frame'

    document.body.appendChild(iframe)

    iframe.onload = () => {
      overlay.className += ' changelog-overlay__open'
      iframe.className += ' changelog-frame__open'

      window.localStorage.setItem('changelog', latestViewedDate)
      trigger.innerHTML = initialTriggerHTML
    }

    open = true
  }
}

window.addEventListener(
  'message',
  event => {
    if (event.origin !== process.env.DEPLOY_URL) {
      return
    }

    toggleChangelog()
  },
  false
)

fetch(`${process.env.DEPLOY_URL}/dates.json`)
  .then(res => res.json(), err => console.log(err))
  .then(dates => {
    latestViewedDate = dates[0]

    const lastDate = window.localStorage.getItem('changelog')
    const lastDateIndex = dates.indexOf(lastDate)
    const count = lastDateIndex === -1 ? dates.length : lastDateIndex

    if (count > 0) {
      trigger.innerHTML += ` (${count})`
    }
  })
