import React from 'react'
import { Link, graphql } from 'gatsby'
import { format } from 'date-fns'
import { Header } from '../components/Header'
import { markdownStyles } from '../styles/markdown'
import { theme } from '../styles/theme'

const ReleaseTemplate = ({
  data: {
    repository: {
      edges: [
        {
          node: {
            name: repoName,
            description,
            homepage,
            owner: { avatarUrl },
          },
        },
      ],
    },
    release: {
      name,
      tagName,
      publishedAt,
      draft,
      childGithubReleaseBody: {
        childMarkdownRemark: { html },
      },
    },
  },
}) => (
  <React.Fragment>
    <Header
      name={repoName}
      description={description}
      homepageUrl={homepage}
      avatarUrl={avatarUrl}
    />
    <main css={{ paddingTop: '3rem' }}>
      <div
        css={{
          position: 'relative',
          maxWidth: 800,
          width: '100%',
          margin: '0 auto',
          padding: '0 1rem 0 8rem',
          ':not(:first-child) > h1': {
            borderTop: '1px solid #d6d6d6',
            marginTop: '2.5em',
            color: 'inherit',
          },
        }}
      >
        <h1
          css={{
            fontSize: '3rem',
            paddingBottom: '1.5em',
            paddingTop: '2em',
            '> a': {
              color: theme.heading,
              textDecoration: 'none',
              ':hover': {
                color: theme.Link,
              },
            },
          }}
        >
          <Link to={`/${tagName}`}>{name || tagName}</Link>
        </h1>
        {typeof window !== 'undefined' && (
          <p
            css={{
              position: 'absolute',
              top: '7rem',
              paddingRight: '2rem',
              transform: 'translateX(-100%)',
              color: theme.accent,
            }}
          >
            {format(publishedAt, 'MMMM Do, YYYY')}
          </p>
        )}
        <div css={markdownStyles} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </main>
  </React.Fragment>
)

export const query = graphql`
  query ReleaseTemplateQuery($tagName: String!) {
    repository: allGithubRepo {
      edges {
        node {
          name
          description
          homepage
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
