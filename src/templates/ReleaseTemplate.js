import React from 'react'
import { Link, graphql } from 'gatsby'
import { format } from 'date-fns'
import { Header } from '../components/Header'
import '../styles/stylesheet.scss'

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
    <main>
      <div className="release">
        <h1>
          <Link to={`/${tagName}`}>{name || tagName}</Link>
        </h1>
        {typeof window !== 'undefined' && (
          <p className="date">{format(publishedAt, 'MMMM Do, YYYY')}</p>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
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
