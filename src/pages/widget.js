import React from 'react'
import { graphql } from 'gatsby'
import Waypoint from 'react-waypoint'
import { Release } from '../components/Release'
import { WidgetWrapper } from '../components/WidgetWrapper'
import { Wrapper } from '../components/Wrapper'

const WidgetPage = ({
  data: {
    releases: { edges: releases },
  },
}) => {
  const [releasesShown, setReleasesShown] = React.useState(10)

  return (
    <Wrapper>
      {({ primaryColor, url }) => (
        <WidgetWrapper primaryColor={primaryColor}>
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
                  releaseName={name}
                  tagName={tagName}
                  publishedAt={publishedAt}
                  html={html}
                  embeddedInIframe={true}
                  primaryColor={primaryColor}
                  url={url}
                />
              )
            )}
          {releasesShown < releases.length && (
            <Waypoint onEnter={() => setReleasesShown(count => count + 10)} />
          )}
        </WidgetWrapper>
      )}
    </Wrapper>
  )
}

export const query = graphql`
  query WidgetQuery {
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
