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
} from '../utils/data'

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
                }
              }
            }
          }
          logo: allFile(filter: { name: { eq: "logo" } }) {
            edges {
              node {
                fields {
                  dominantColor
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

        const primaryColor = getPrimaryColor(data)
        const ogImageSrc = getOgImageSrc(data)
        const logoSrc = getLogoSrc(data)
        const title = getTitle(data)

        return (
          <>
            <Helmet
              title={title}
              meta={[
                { name: 'description', content: description },
                { property: 'og:title', content: title },
                {
                  property: 'og:url',
                  content: url,
                },
                {
                  property: 'og:image',
                  content: `${url}${ogImageSrc}`,
                },
                { name: 'twitter:card', content: 'summary_large_image' },
                {
                  name: 'twitter:url',
                  content: url,
                },
                { name: 'twitter:title', content: title },
                {
                  name: 'twitter:image',
                  content: `${url}${ogImageSrc}`,
                },
              ]}
            />
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
