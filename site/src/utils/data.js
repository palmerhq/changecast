export function getPrimaryColor(data) {
  if (data.site.siteMetadata.primaryColor) {
    return data.site.siteMetadata.primaryColor
  }

  if (data.logo) {
    return data.logo.edges[0].node.fields.colorPalette[0]
  }

  return data.repository.edges[0].node.avatarImageFile.fields.colorPalette[0]
}

export function getOgImageSrc(data) {
  if (data.logo) {
    return data.logo.edges[0].node.childOgImage.ogImageWithText.src
  }

  return data.repository.edges[0].node.avatarImageFile.childOgImage
    .ogImageWithText.src
}

export function getLogoSrc(data) {
  if (data.logo) {
    return data.logo.edges[0].node.childImageSharp.original.src
  }

  return data.repository.edges[0].node.avatarImageFile.childImageSharp.original
    .src
}

export function getTitle(data) {
  if (data.site.siteMetadata.title) {
    return data.site.siteMetadata.title
  }

  return data.repository.edges[0].node.name
}

export function getFaviconElements(data) {
  if (data.logo) {
    return data.logo.edges[0].node.childFavicon.faviconElements
  }

  return data.repository.edges[0].node.avatarImageFile.childFavicon
    .faviconElements
}
