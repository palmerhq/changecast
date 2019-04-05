import { Global } from '@emotion/core'
import { graphql } from 'gatsby'
import { ChevronLeft } from 'icons/ChevronLeft'
import React from 'react'
import Helmet from 'react-helmet'
import { LinkButton } from '../components/Button/LinkButton'
import { Favicons } from '../components/Favicons'
import { FocusStyles } from '../components/FocusStyles'
import { Header } from '../components/Header'
import { Release } from '../components/Release/Release'
import { SiteWrapper } from '../components/SiteWrapper'
import { useSiteSetup } from '../hooks/useSiteSetup'
import { globalStyles } from '../styles/global'
import { getOgImageSrc } from '../utils/data'

const ReleaseTemplate = ({
  data,
  data: {
    release: {
      name: releaseName,
      tagName,
      publishedAt,
      childGithubReleaseBody: {
        childMarkdownRemark: { html, plainText },
      },
    },
  },
  pageContext: { isWidget },
}) => {
  const tagOgImageSrc = getOgImageSrc(data)

  const {
    faviconElements,
    primaryColor,
    logoSrc,
    title,
    description,
    homepage,
    url,
    htmlUrl
  } = useSiteSetup()

  const siteTitle = `${title} ${tagName}`
  return (
    <>
      <Favicons favicons={faviconElements} />
      <Global styles={globalStyles} />
      <FocusStyles />
      <Helmet
        title={siteTitle}
        meta={[
          { property: 'og:title', content: siteTitle },
          { name: 'description', content: description },
          {
            property: 'og:url',
            content: `${url}/${tagName}`,
          },
          {
            property: 'og:image',
            content: `${url}${tagOgImageSrc}`,
          },
          {
            name: 'twitter:url',
            content: `${url}/${tagName}`,
          },
          { name: 'twitter:title', content: `${title} ${tagName}` },
          {
            name: 'twitter:image',
            content: `${url}${tagOgImageSrc}`,
          },
        ]}
      />
      <Header
        homepage={homepage || htmlUrl}
        logoSrc={logoSrc}
        primaryColor={primaryColor}
      />
      <SiteWrapper>
        <LinkButton to="/" css={{ marginBottom: '0.5rem' }}>
          <ChevronLeft css={{ marginLeft: '-0.25rem' }} /> All Releases
        </LinkButton>
        <Release
          releaseName={releaseName}
          tagName={tagName}
          publishedAt={publishedAt}
          html={html}
          plainText={plainText}
          embeddedInIframe={false}
          primaryColor={primaryColor}
          url={url}
        />
      </SiteWrapper>
    </>
  )
}

export const query = graphql`
  query ReleaseTemplateQuery($tagName: String!, $ogText: String!) {
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
    release: githubRelease(tagName: { eq: $tagName }) {
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
`

export default ReleaseTemplate
