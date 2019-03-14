import React from 'react'
import { graphql } from 'gatsby'
import Waypoint from 'react-waypoint'
import { Release } from '../components/Release/Release'
import { WidgetWrapper } from '../components/WidgetWrapper'
import { Wrapper } from '../components/Wrapper'
import { ReleaseHeader } from '../components/Release/ReleaseHeader'

const WidgetPage = ({
  data: {
    releases: { edges: releases },
  },
}) => {
  const [releasesShown, setReleasesShown] = React.useState(10)
  const [releaseIndex, setReleaseIndex] = React.useState(0)

  return (
    <Wrapper>
      {({ primaryColor, url }) => (
        <WidgetWrapper primaryColor={primaryColor}>
          {releases
            .slice(0, releasesShown)
            .map(
              (
                {
                  node: {
                    id,
                    name,
                    tagName,
                    publishedAt,
                    body,
                    childGithubReleaseBody: {
                      childMarkdownRemark: { html },
                    },
                  },
                },
                index
              ) => (
                <React.Fragment key={id}>
                  <Waypoint
                    onLeave={() => setReleaseIndex(index)}
                    topOffset="54px"
                    fireOnRapidScroll={true}
                  />
                  <Release
                    // key={id}
                    releaseName={name}
                    tagName={tagName}
                    publishedAt={publishedAt}
                    html={html}
                    body={body}
                    embeddedInIframe={true}
                    primaryColor={primaryColor}
                    url={url}
                  />
                </React.Fragment>
              )
            )}
          {releasesShown < releases.length && (
            <Waypoint
              onEnter={() => setReleasesShown(count => count + 10)}
              bottomOffset="-100%"
            />
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
          body
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
