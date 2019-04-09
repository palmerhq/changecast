import { Global } from '@emotion/core'
import { graphql } from 'gatsby'
import { Search, UnorderedSearchIndex } from 'js-search'
import debounce from 'just-debounce-it'
import React from 'react'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'
import { Favicons } from '../components/Favicons'
import { FocusStyles } from '../components/FocusStyles'
import { Header } from '../components/Header'
import { Release } from '../components/Release/Release'
import { SiteWrapper } from '../components/SiteWrapper'
import { WidgetWrapper } from '../components/WidgetWrapper'
import { useSiteSetup } from '../hooks/useSiteSetup'
import { WidgetContext, WidgetProvider } from '../providers/WidgetProvider'
import { globalStyles } from '../styles/global'
import { getOgImageSrc } from '../utils/data'

const ReleasesTemplate = ({
  data,
  data: {
    releases: { edges },
  },
  pageContext: { isWidget },
}) => {
  const Provider = isWidget ? WidgetProvider : React.Fragment
  const Wrapper = isWidget ? WidgetWrapper : SiteWrapper

  const ogImageSrc = getOgImageSrc(data)

  const [releases, setReleases] = React.useState(edges)
  const [releasesShown, setReleasesShown] = React.useState(10)

  const [searchValue, setSearchValue] = React.useState('')
  const search = React.useRef(null)
  function getReleaseSearch() {
    if (search.current !== null) {
      return search.current
    }
    const releaseSearch = new Search(['node', 'id'])
    releaseSearch.searchIndex = new UnorderedSearchIndex()
    releaseSearch.addIndex(['node', 'name'])
    releaseSearch.addIndex(['node', 'tagName'])
    releaseSearch.addIndex([
      'node',
      'childGithubReleaseBody',
      'childMarkdownRemark',
      'plainText',
    ])
    releaseSearch.addDocuments(edges)

    const debouncedReleaseSearch = debounce(
      value => setReleases(!!value ? releaseSearch.search(value) : edges),
      100
      // true
    )

    search.current = event => {
      const value = event.target.value
      setSearchValue(value)
      debouncedReleaseSearch(value)
    }

    return search.current
  }

  const {
    faviconElements,
    primaryColor,
    logoSrc,
    title,
    description,
    homepage,
    url,
    htmlUrl,
  } = useSiteSetup()

  const siteTitle = `${title} changelog`
  const ogImage = `${url}${ogImageSrc}`

  return (
    <Provider>
      <Favicons favicons={faviconElements} />
      <Global styles={globalStyles} />
      <FocusStyles />
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
      <Header
        homepage={homepage}
        htmlUrl={htmlUrl}
        onSearchChange={getReleaseSearch()}
        searchValue={searchValue}
        logoSrc={logoSrc}
        primaryColor={primaryColor}
        isWidget={isWidget}
      />
      <Wrapper>
        {releases.length === 0 ? (
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '2rem',
            }}
          >
            We couldn't find any releases, try a different search query.
          </div>
        ) : (
          releases
            .slice(0, releasesShown)
            .map(
              ({
                node: {
                  id,
                  name,
                  tagName,
                  publishedAt,
                  childGithubReleaseBody: {
                    childMarkdownRemark: { html, plainText },
                  },
                },
              }) => (
                <Release
                  key={id}
                  releaseName={name}
                  tagName={tagName}
                  publishedAt={publishedAt}
                  html={html}
                  plainText={plainText}
                  isWidget={isWidget}
                  primaryColor={primaryColor}
                  url={url}
                />
              )
            )
        )}
        <WidgetContext.Consumer>
          {isOpen =>
            isOpen &&
            releasesShown < releases.length && (
              <Waypoint
                onEnter={() => setReleasesShown(count => count + 10)}
                bottomOffset="-100%"
              />
            )
          }
        </WidgetContext.Consumer>
      </Wrapper>
    </Provider>
  )
}

export const query = graphql`
  query ReleasesTemplateQuery($ogText: String!) {
    repository: allGithubRepo {
      edges {
        node {
          avatarImageFile: childFile {
            childOgImage {
              ogImageWithText(text: $ogText) {
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
          childOgImage {
            ogImageWithText(text: $ogText) {
              src
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

export default ReleasesTemplate
