import React from 'react'
import { graphql } from 'gatsby'
import { Release } from '../components/Release'
import { SiteWrapper } from '../components/SiteWrapper'

const ReleaseTemplate = ({
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
  const primaryColor = overrideColor || dominantAvatarColor

  return (
    <SiteWrapper
      name={repoName}
      description={description}
      homepageUrl={homepage}
      avatarUrl={avatarUrl}
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
  )
}

export const query = graphql`
  query ReleaseTemplateQuery($tagName: String!) {
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
