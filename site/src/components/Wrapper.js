import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Global } from '@emotion/core'
import Helmet from 'react-helmet'
import { globalStyles } from '../styles/global'
import { FocusStyles } from './FocusStyles'
import {
  getPrimaryColor,
  getOgImageSrc,
  getLogoSrc,
  getTitle,
  getFaviconElements,
} from '../utils/data'
import { Favicons } from './Favicons'

export const Wrapper = ({ children }) => (
  <>
    <Global styles={globalStyles} />
    <FocusStyles />
    <StaticQuery
      query={graphql`
        query WrapperQuery {
          site {
            siteMetadata {
              title
              primaryColor
              url
            }
          }
          repository: allGithubRepo {
            edges {
              node {
                name
                description
                homepage
                avatarImageFile: childFile {
                  fields {
                    colorPalette
                  }
                  childOgImage {
                    ogImageWithText(text: "Changelog") {
                      src
                    }
                  }
                  childImageSharp {
                    original {
                      src
                    }
                  }
                  childFavicon {
                    faviconElements {
                      props
                      type
                    }
                  }
                }
              }
            }
          }
          logo: allFile(filter: { name: { eq: "logo" } }) {
            edges {
              node {
                fields {
                  colorPalette
                }
                childOgImage {
                  ogImageWithText(text: "Changelog") {
                    src
                  }
                }
                childImageSharp {
                  original {
                    src
                  }
                }
                childFavicon {
                  faviconElements {
                    props
                    type
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const {
          site: {
            siteMetadata: { url },
          },
          repository: {
            edges: [
              {
                node: { description, homepage },
              },
            ],
          },
        } = data
        console.log({ data })
        const primaryColor = getPrimaryColor(data)
        const ogImageSrc = getOgImageSrc(data)
        const logoSrc = getLogoSrc(data)
        const title = getTitle(data)
        const faviconElements = getFaviconElements(data)

        const siteTitle = `${title} Changelog`
        const ogImage = `${url}${ogImageSrc}`

        return (
          <>
            <Helmet
              title={siteTitle}
              meta={[
                { name: 'description', content: description },
                { property: 'og:title', content: siteTitle },
                {
                  property: 'og:url',
                  content: url,
                },
                {
                  property: 'og:image',
                  content: ogImage,
                },
                { name: 'twitter:card', content: 'summary_large_image' },
                {
                  name: 'twitter:url',
                  content: url,
                },
                { name: 'twitter:title', content: siteTitle },
                {
                  name: 'twitter:image',
                  content: ogImage,
                },
              ]}
            />
            <Favicons favicons={faviconElements} />
            {children({
              primaryColor,
              ogImageSrc,
              logoSrc,
              title,
              description,
              homepage,
              url,
            })}
          </>
        )
      }}
    />
  </>
)
