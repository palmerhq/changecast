import React from 'react'
import { graphql } from 'gatsby'
import { Release } from '../components/Release'
import { SiteWrapper } from '../components/SiteWrapper'
import Waypoint from 'react-waypoint'
import { Wrapper } from '../components/Wrapper'

const IndexPage = ({
  data: {
    releases: { edges: releases },
  },
}) => {
  const [releasesShown, setReleasesShown] = React.useState(10)

  return (
    <Wrapper>
      {({ title, description, homepage, logoSrc, primaryColor, url }) => (
        <SiteWrapper
          title={title}
          description={description}
          homepage={homepage}
          logoSrc={logoSrc}
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
                  body,
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
                  body={body}
                  embeddedInIframe={false}
                  primaryColor={primaryColor}
                  url={url}
                />
              )
            )}
          {releasesShown < releases.length && (
            <Waypoint
              onEnter={() => setReleasesShown(count => count + 10)}
              bottomOffset="-100%"
            />
          )}
        </SiteWrapper>
      )}
    </Wrapper>
  )
}

export const query = graphql`
  query IndexQuery {
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

export default IndexPage
