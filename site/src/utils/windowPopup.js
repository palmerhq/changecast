export function windowPopup(url, width, height) {
  // Calculate the position of the popup so
  // it’s centered on the screen.
  var left = window.screen.width / 2 - width / 2,
    top = window.screen.height / 2 - height / 2
  window.open(
    url,
    '',
    'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=' +
      width +
      ',height=' +
      height +
      ',top=' +
      top +
      ',left=' +
      left
  )
}
