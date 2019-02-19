"use strict";

var _require = require("./constants"),
    imageClass = _require.imageClass,
    imageBackgroundClass = _require.imageBackgroundClass,
    imageWrapperClass = _require.imageWrapperClass;

exports.onRouteUpdate = function () {
  var imageWrappers = document.querySelectorAll("." + imageWrapperClass); // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
  // for cross-browser looping through NodeList without polyfills

  var _loop = function _loop(i) {
    var imageWrapper = imageWrappers[i];
    var backgroundElement = imageWrapper.querySelector("." + imageBackgroundClass);
    var imageElement = imageWrapper.querySelector("." + imageClass);

    var onImageLoad = function onImageLoad() {
      backgroundElement.style.transition = "opacity 0.5s 0.5s";
      backgroundElement.style.opacity = 0;
      imageElement.style.transition = "opacity 0.5s";
      imageElement.style.opacity = 1;
      imageElement.removeEventListener("load", onImageLoad);
    };

    if (imageElement.complete) {
      backgroundElement.style.opacity = 0;
    } else {
      imageElement.style.opacity = 0;
      imageElement.addEventListener("load", onImageLoad);
    }
  };

  for (var i = 0; i < imageWrappers.length; i++) {
    _loop(i);
  }
};