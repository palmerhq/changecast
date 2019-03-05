"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("./constants"),
    imageClass = _require.imageClass,
    imageBackgroundClass = _require.imageBackgroundClass,
    imageWrapperClass = _require.imageWrapperClass;

var visitWithParents = require("unist-util-visit-parents");

var getDefinitions = require("mdast-util-definitions");

var path = require("path");

var isRelativeUrl = require("is-relative-url");

var _ = require("lodash");

var _require2 = require("gatsby-plugin-sharp"),
    fluid = _require2.fluid;

var Promise = require("bluebird");

var cheerio = require("cheerio");

var slash = require("slash");

var _require3 = require("gatsby-source-filesystem"),
    createRemoteFileNode = _require3.createRemoteFileNode; // If the image is relative (not hosted elsewhere)
// 1. Find the image file
// 2. Find the image's size
// 3. Filter out any responsive image fluid sizes that are greater than the image's width
// 4. Create the responsive images.
// 5. Set the html w/ aspect ratio helper.


module.exports = function (_ref, pluginOptions) {
  var files = _ref.files,
      markdownNode = _ref.markdownNode,
      markdownAST = _ref.markdownAST,
      pathPrefix = _ref.pathPrefix,
      getNode = _ref.getNode,
      reporter = _ref.reporter,
      cache = _ref.cache,
      store = _ref.store,
      createNodeId = _ref.createNodeId,
      createNode = _ref.actions.createNode;
  var defaults = {
    maxWidth: 650,
    wrapperStyle: "",
    backgroundColor: "white",
    linkImagesToOriginal: true,
    showCaptions: false,
    pathPrefix: pathPrefix,
    withWebp: false
  };

  var options = _.defaults(pluginOptions, defaults);

  var findParentLinks = function findParentLinks(_ref2) {
    var children = _ref2.children;
    return children.some(function (node) {
      return node.type === "html" && !!node.value.match(/<a /) || node.type === "link";
    });
  }; // Get all the available definitions in the markdown tree


  var definitions = getDefinitions(markdownAST); // This will allow the use of html image tags
  // const rawHtmlNodes = select(markdownAST, `html`)

  var rawHtmlNodes = [];
  visitWithParents(markdownAST, "html", function (node, ancestors) {
    var inLink = ancestors.some(findParentLinks);
    rawHtmlNodes.push({
      node: node,
      inLink: inLink
    });
  }); // This will only work for markdown syntax image tags

  var markdownImageNodes = [];
  visitWithParents(markdownAST, ["image", "imageReference"], function (node, ancestors) {
    var inLink = ancestors.some(findParentLinks);
    markdownImageNodes.push({
      node: node,
      inLink: inLink
    });
  }); // Takes a node and generates the needed images and then returns
  // the needed HTML replacement for the image

  var generateImagesAndUpdateNode =
  /*#__PURE__*/
  function () {
    var _ref3 = (0, _asyncToGenerator2.default)(
    /*#__PURE__*/
    _regenerator.default.mark(function _callee(node, resolve, inLink, overWrites, remoteFileNode) {
      var imageNode, parentNode, imagePath, fluidResult, originalImg, fallbackSrc, srcSet, presentationWidth, srcSplit, fileName, fileNameNoExt, defaultAlt, alt, title, imageStyle, imageTag, webpFluidResult, ratio, showCaptions, rawHTML;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (overWrites === void 0) {
                overWrites = {};
              }

              imageNode = remoteFileNode;

              if (remoteFileNode) {
                _context.next = 10;
                break;
              }

              // Check if this markdownNode has a File parent. This plugin
              // won't work if the image isn't hosted locally.
              parentNode = getNode(markdownNode.parent);

              if (!(parentNode && parentNode.dir)) {
                _context.next = 8;
                break;
              }

              imagePath = slash(path.join(parentNode.dir, node.url));
              _context.next = 9;
              break;

            case 8:
              return _context.abrupt("return", null);

            case 9:
              imageNode = _.find(files, function (file) {
                if (file && file.absolutePath) {
                  return file.absolutePath === imagePath;
                }

                return null;
              });

            case 10:
              if (!(!imageNode || !imageNode.absolutePath)) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", resolve());

            case 12:
              _context.next = 14;
              return fluid({
                file: imageNode,
                args: options,
                reporter: reporter,
                cache: cache
              });

            case 14:
              fluidResult = _context.sent;

              if (fluidResult) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", resolve());

            case 17:
              originalImg = fluidResult.originalImg;
              fallbackSrc = fluidResult.src;
              srcSet = fluidResult.srcSet;
              presentationWidth = fluidResult.presentationWidth; // Generate default alt tag

              srcSplit = node.url.split("/");
              fileName = srcSplit[srcSplit.length - 1];
              fileNameNoExt = fileName.replace(/\.[^/.]+$/, "");
              defaultAlt = fileNameNoExt.replace(/[^A-Z0-9]/gi, " ");
              alt = overWrites.alt ? overWrites.alt : node.alt ? node.alt : defaultAlt;
              title = node.title ? node.title : "";
              imageStyle = ("\n      width: 100%;\n      height: 100%;\n      margin: 0;\n      vertical-align: middle;\n      position: absolute;\n      top: 0;\n      left: 0;\n      box-shadow: inset 0px 0px 0px 400px " + options.backgroundColor + ";").replace(/\s*(\S+:)\s*/g, "$1"); // Create our base image tag

              imageTag = ("\n      <img\n        class=\"" + imageClass + "\"\n        style=\"" + imageStyle + "\"\n        alt=\"" + alt + "\"\n        title=\"" + title + "\"\n        src=\"" + fallbackSrc + "\"\n        srcset=\"" + srcSet + "\"\n        sizes=\"" + fluidResult.sizes + "\"\n      />\n    ").trim(); // if options.withWebp is enabled, generate a webp version and change the image tag to a picture tag

              if (!options.withWebp) {
                _context.next = 36;
                break;
              }

              _context.next = 32;
              return fluid({
                file: imageNode,
                args: _.defaults({
                  toFormat: "WEBP"
                }, // override options if it's an object, otherwise just pass through defaults
                options.withWebp === true ? {} : options.withWebp, pluginOptions, defaults),
                reporter: reporter
              });

            case 32:
              webpFluidResult = _context.sent;

              if (webpFluidResult) {
                _context.next = 35;
                break;
              }

              return _context.abrupt("return", resolve());

            case 35:
              imageTag = ("\n      <picture>\n        <source\n          srcset=\"" + webpFluidResult.srcSet + "\"\n          sizes=\"" + webpFluidResult.sizes + "\"\n          type=\"" + webpFluidResult.srcSetType + "\"\n        />\n        <source\n          srcset=\"" + srcSet + "\"\n          sizes=\"" + fluidResult.sizes + "\"\n          type=\"" + fluidResult.srcSetType + "\"\n        />\n        <img\n          class=\"" + imageClass + "\"\n          style=\"" + imageStyle + "\"\n          src=\"" + fallbackSrc + "\"\n          alt=\"" + alt + "\"\n          title=\"" + title + "\"\n        />\n      </picture>\n      ").trim();

            case 36:
              ratio = 1 / fluidResult.aspectRatio * 100 + "%"; // Construct new image node w/ aspect ratio placeholder

              showCaptions = options.showCaptions && node.title;
              rawHTML = ("\n  <span\n    class=\"" + imageWrapperClass + "\"\n    style=\"position: relative; display: block; " + (showCaptions ? "" : options.wrapperStyle) + " max-width: " + presentationWidth + "px; margin-left: auto; margin-right: auto;\"\n  >\n    <span\n      class=\"" + imageBackgroundClass + "\"\n      style=\"padding-bottom: " + ratio + "; position: relative; bottom: 0; left: 0; background-image: url('" + fluidResult.base64 + "'); background-size: cover; display: block;\"\n    ></span>\n    " + imageTag + "\n  </span>\n  ").trim(); // Make linking to original image optional.

              if (!inLink && options.linkImagesToOriginal) {
                rawHTML = ("\n  <a\n    class=\"gatsby-resp-image-link\"\n    href=\"" + originalImg + "\"\n    style=\"display: block\"\n    target=\"_blank\"\n    rel=\"noopener\"\n  >\n    " + rawHTML + "\n  </a>\n    ").trim();
              } // Wrap in figure and use title as caption


              if (showCaptions) {
                rawHTML = ("\n  <figure class=\"gatsby-resp-image-figure\" style=\"" + options.wrapperStyle + "\">\n    " + rawHTML + "\n    <figcaption class=\"gatsby-resp-image-figcaption\">" + node.title + "</figcaption>\n  </figure>\n      ").trim();
              }

              return _context.abrupt("return", rawHTML);

            case 42:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function generateImagesAndUpdateNode(_x, _x2, _x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();

  return Promise.all( // Simple because there is no nesting in markdown
  markdownImageNodes.map(function (_ref4) {
    var node = _ref4.node,
        inLink = _ref4.inLink;
    return new Promise(
    /*#__PURE__*/
    function () {
      var _ref5 = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee2(resolve, reject) {
        var overWrites, refNode, fileType, remoteFileNode, rawHTML;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                overWrites = {};

                if (!(!node.hasOwnProperty("url") && node.hasOwnProperty("identifier"))) {
                  _context2.next = 7;
                  break;
                }

                //consider as imageReference node
                refNode = node;
                node = definitions(refNode.identifier); // pass original alt from referencing node

                overWrites.alt = refNode.alt;

                if (node) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", resolve());

              case 7:
                fileType = node.url.slice(-3); // Ignore gifs as we can't process them,
                // svgs as they are already responsive by definition

                if (!(fileType !== "gif" && fileType !== "svg")) {
                  _context2.next = 20;
                  break;
                }

                if (isRelativeUrl(node.url)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 12;
                return createRemoteFileNode({
                  url: node.url,
                  store: store,
                  cache: cache,
                  createNode: createNode,
                  createNodeId: createNodeId
                });

              case 12:
                remoteFileNode = _context2.sent;

              case 13:
                _context2.next = 15;
                return generateImagesAndUpdateNode(node, resolve, inLink, overWrites, remoteFileNode);

              case 15:
                rawHTML = _context2.sent;

                if (rawHTML) {
                  // Replace the image or ref node with an inline HTML node.
                  if (refNode) {
                    node = refNode;
                  }

                  node.type = "html";
                  node.value = rawHTML;
                }

                return _context2.abrupt("return", resolve(node));

              case 20:
                return _context2.abrupt("return", resolve());

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }());
  })).then(function (markdownImageNodes) {
    return (// HTML image node stuff
      Promise.all( // Complex because HTML nodes can contain multiple images
      rawHtmlNodes.map(function (_ref6) {
        var node = _ref6.node,
            inLink = _ref6.inLink;
        return new Promise(
        /*#__PURE__*/
        function () {
          var _ref7 = (0, _asyncToGenerator2.default)(
          /*#__PURE__*/
          _regenerator.default.mark(function _callee3(resolve, reject) {
            var $, imageRefs, _i, thisImg, formattedImgTag, fileType, remoteFileNode, rawHTML;

            return _regenerator.default.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (node.value) {
                      _context3.next = 2;
                      break;
                    }

                    return _context3.abrupt("return", resolve());

                  case 2:
                    $ = cheerio.load(node.value);

                    if (!($("img").length === 0)) {
                      _context3.next = 5;
                      break;
                    }

                    return _context3.abrupt("return", resolve());

                  case 5:
                    imageRefs = [];
                    $("img").each(function () {
                      imageRefs.push($(this));
                    });
                    _i = 0;

                  case 8:
                    if (!(_i < imageRefs.length)) {
                      _context3.next = 34;
                      break;
                    }

                    thisImg = imageRefs[_i];
                    // Get the details we need.
                    formattedImgTag = {};
                    formattedImgTag.url = thisImg.attr("src");
                    formattedImgTag.title = thisImg.attr("title");
                    formattedImgTag.alt = thisImg.attr("alt");

                    if (formattedImgTag.url) {
                      _context3.next = 16;
                      break;
                    }

                    return _context3.abrupt("return", resolve());

                  case 16:
                    fileType = formattedImgTag.url.slice(-3); // Ignore gifs as we can't process them,
                    // svgs as they are already responsive by definition

                    if (!(fileType !== "gif" && fileType !== "svg")) {
                      _context3.next = 31;
                      break;
                    }

                    remoteFileNode = void 0;

                    if (isRelativeUrl(formattedImgTag.url)) {
                      _context3.next = 23;
                      break;
                    }

                    _context3.next = 22;
                    return createRemoteFileNode({
                      url: formattedImgTag.url,
                      store: store,
                      cache: cache,
                      createNode: createNode,
                      createNodeId: createNodeId
                    });

                  case 22:
                    remoteFileNode = _context3.sent;

                  case 23:
                    _context3.next = 25;
                    return generateImagesAndUpdateNode(formattedImgTag, resolve, inLink, undefined, remoteFileNode);

                  case 25:
                    rawHTML = _context3.sent;

                    if (!rawHTML) {
                      _context3.next = 30;
                      break;
                    }

                    // Replace the image string
                    thisImg.replaceWith(rawHTML);
                    _context3.next = 31;
                    break;

                  case 30:
                    return _context3.abrupt("return", resolve());

                  case 31:
                    _i++;
                    _context3.next = 8;
                    break;

                  case 34:
                    // Replace the image node with an inline HTML node.
                    node.type = "html";
                    node.value = $("body").html(); // fix for cheerio v1

                    return _context3.abrupt("return", resolve(node));

                  case 37:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          return function (_x8, _x9) {
            return _ref7.apply(this, arguments);
          };
        }());
      })).then(function (htmlImageNodes) {
        return markdownImageNodes.concat(htmlImageNodes).filter(function (node) {
          return !!node;
        });
      })
    );
  });
};