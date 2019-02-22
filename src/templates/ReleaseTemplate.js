import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Release } from '../components/Release'
import { SiteWrapper } from '../components/SiteWrapper'

const ReleaseTemplate = ({
  data: {
    site: {
      siteMetadata: { overrideColor, url },
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
              childOgImage: {
                ogImageWithText: { src: ogSrc },
              },
            },
          },
        },
      ],
    },
    release: {
      name,
      tagName,
      publishedAt,
      childGithubReleaseBody: {
        childMarkdownRemark: { html },
      },
    },
  },
}) => {
  const primaryColor = overrideColor || dominantColor

  return (
    <>
      <Helmet
        title={tagName}
        meta={[
          { name: 'description', content: description },
          // Facebook OpenGraph Meta Tags
          { property: 'og:title', content: `${repoName} ${tagName}` },
          { property: 'og:url', content: `${url}/${tagName}` },
          {
            property: 'og:image',
            content: `${url}${ogSrc}`,
          },

          // Twitter Meta Tags
          { name: 'twitter:card', content: 'summary_large_image' },
          {
            name: 'twitter:url',
            content: `${url}/${tagName}`,
          },
          { name: 'twitter:title', content: `${repoName} ${tagName}` },
          {
            name: 'twitter:image',
            content: `${url}${ogSrc}`,
          },
        ]}
      />
      <SiteWrapper
        name={repoName}
        description={description}
        homepageUrl={homepage}
        avatarUrl={avatarSrc}
        primaryColor={primaryColor}
      >
        <Release
          name={name}
          tagName={tagName}
          publishedAt={publishedAt}
          html={html}
          embeddedInIframe={false}
          primaryColor={primaryColor}
        />
      </SiteWrapper>
    </>
  )
}

export const query = graphql`
  query ReleaseTemplateQuery($tagName: String!) {
    site {
      siteMetadata {
        overrideColor
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
              dominantColor
            }
            childImageSharp {
              original {
                src
              }
            }
            childOgImage {
              ogImageWithText(text: $tagName) {
                src
              }
            }
          }
        }
      }
    }
    release: githubRelease(tagName: { eq: $tagName }) {
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
`

export default ReleaseTemplate
