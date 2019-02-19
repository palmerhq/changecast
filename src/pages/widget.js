import React from 'react'
import { graphql } from 'gatsby'
import { Release } from '../components/Release'
import { WidgetWrapper } from '../components/WidgetWrapper'
import Waypoint from 'react-waypoint'

const WidgetPage = ({
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
            dominantAvatarColor,
            owner: { avatarUrl },
          },
        },
      ],
    },
    releases: { edges: releases },
  },
}) => {
  const primaryColor = overrideColor || dominantAvatarColor
  const [releasesShown, setReleasesShown] = React.useState(10)

  return (
    <WidgetWrapper
      name={repoName}
      description={description}
      homepageUrl={homepage}
      avatarUrl={avatarUrl}
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
              embeddedInIframe={true}
              primaryColor={primaryColor}
            />
          )
        )}
      {releasesShown < releases.length && (
        <Waypoint onEnter={() => setReleasesShown(count => count + 10)} />
      )}
    </WidgetWrapper>
  )
}

export const query = graphql`
  query WidgetQuery {
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
          dominantAvatarColor
          owner {
            avatarUrl
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

export default WidgetPage
