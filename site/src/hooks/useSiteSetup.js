import { graphql, useStaticQuery } from 'gatsby'
import {
  getFaviconElements,
  getLogoSrc,
  getPrimaryColor,
  getTitle,
} from '../utils/data'

export const useSiteSetup = () => {
  const data = useStaticQuery(graphql`
    query SiteSetupQuery {
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
  `)

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
  const logoSrc = getLogoSrc(data)
  const title = getTitle(data)
  const faviconElements = getFaviconElements(data)

  return {
    faviconElements,
    primaryColor,
    logoSrc,
    title,
    description,
    homepage,
    url,
  }
}
