import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Wrapper } from '../components/Wrapper'
import { SiteWrapper } from '../components/SiteWrapper'
import { Release } from '../components/Release/Release'
import { getOgImageSrc } from '../utils/data'

const ReleaseTemplate = ({
  data,
  data: {
    release: {
      name: releaseName,
      tagName,
      publishedAt,
      body,
      childGithubReleaseBody: {
        childMarkdownRemark: { html },
      },
    },
  },
}) => {
  const tagOgImageSrc = getOgImageSrc(data)

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
          <Helmet
            title={`${title} ${tagName}`}
            meta={[
              { property: 'og:title', content: `${title} ${tagName}` },
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
          <Release
            releaseName={releaseName}
            tagName={tagName}
            publishedAt={publishedAt}
            html={html}
            body={body}
            embeddedInIframe={false}
            primaryColor={primaryColor}
            url={url}
          />
        </SiteWrapper>
      )}
    </Wrapper>
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
      body
      childGithubReleaseBody {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export default ReleaseTemplate
