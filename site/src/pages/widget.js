import React from 'react'
import { graphql } from 'gatsby'
import Waypoint from 'react-waypoint'
import Fuse from 'fuse.js'
import debounce from 'just-debounce-it'
import { Release } from '../components/Release/Release'
import { WidgetWrapper } from '../components/WidgetWrapper'
import { Wrapper } from '../components/Wrapper'

const WidgetPage = ({
  data: {
    releases: { edges },
  },
}) => {
  const fuse = React.useRef(null)

  function getFuse() {
    let currentFuse = fuse.current
    if (currentFuse !== null) {
      return currentFuse
    }
    let newFuse = new Fuse(releases, {
      threshold: 0.6,
      caseSensitive: false,
      minMatchCharLength: 2,
      shouldSort: false,
      keys: [
        'node.name',
        'node.tagName',
        'node.childGithubReleaseBody.childMarkdownRemark.plainText',
      ],
    })
    fuse.current = newFuse
    return newFuse
  }

  const search = React.useRef(null)

  function getSearch() {
    let currentSearch = search.current
    if (currentSearch !== null) {
      return currentSearch
    }
    let newSearch = debounce(
      ({ target: { value } }) => setReleases(getFuse().search(value)),
      200,
      true
    )
    search.current = newSearch
    return newSearch
  }

  const [releases, setReleases] = React.useState(edges)
  const [releasesShown, setReleasesShown] = React.useState(10)

  return (
    <Wrapper>
      {({ primaryColor, url }) => (
        <WidgetWrapper primaryColor={primaryColor}>
          <input
            onChange={event => {
              event.persist()
              getSearch()(event)
            }}
          />
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
                    childGithubReleaseBody: {
                      childMarkdownRemark: { html, plainText },
                    },
                  },
                },
                index
              ) => (
                <Release
                  key={id}
                  releaseName={name}
                  tagName={tagName}
                  publishedAt={publishedAt}
                  html={html}
                  plainText={plainText}
                  embeddedInIframe={true}
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
          childGithubReleaseBody {
            childMarkdownRemark {
              html
              plainText
            }
          }
        }
      }
    }
  }
`

export default WidgetPage
