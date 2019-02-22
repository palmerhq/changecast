import React from 'react'
import { graphql } from 'gatsby'
import { Release } from '../components/Release'
import { SiteWrapper } from '../components/SiteWrapper'
import Waypoint from 'react-waypoint'

const IndexPage = ({
  data: {
    site: {
      siteMetadata: { overrideColor },
    },
    repository: {
      edges: [
        {
          node: {
            name: repoName,
            description,
            homepage,
            avatarImageFile: {
              fields: { dominantColor },
              childImageSharp: {
                original: { src: avatarSrc },
              },
            },
          },
        },
      ],
    },
    releases: { edges: releases },
  },
}) => {
  const primaryColor = overrideColor || dominantColor
  const [releasesShown, setReleasesShown] = React.useState(10)

  return (
    <SiteWrapper
      name={repoName}
      description={description}
      homepageUrl={homepage}
      avatarUrl={avatarSrc}
      primaryColor={primaryColor}
    >
      {releases
        .slice(0, releasesShown)
        .map(
          ({
            node: {
              id,
              name,
              tagName,
              publishedAt,
              childGithubReleaseBody: {
                childMarkdownRemark: { html },
              },
            },
          }) => (
            <Release
              key={id}
              name={name}
              tagName={tagName}
              publishedAt={publishedAt}
              html={html}
              embeddedInIframe={false}
              primaryColor={primaryColor}
            />
          )
        )}
      {releasesShown < releases.length && (
        <Waypoint onEnter={() => setReleasesShown(count => count + 10)} />
      )}
    </SiteWrapper>
  )
}

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        overrideColor
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
              dominantColor
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
    releases: allGithubRelease(filter: { draft: { eq: false } }) {
      edges {
        node {
          id
          name
          tagName
          publishedAt
          draft
          childGithubReleaseBody {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`

export default IndexPage
