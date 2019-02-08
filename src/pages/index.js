import React from 'react'
import { Link, graphql } from 'gatsby'
import { distanceInWordsToNow } from 'date-fns'
import { Header } from '../components/Header'
import '../styles/stylesheet.scss'

const IndexPage = ({
  data: {
    repository: {
      edges: [
        {
          node: {
            name: repoName,
            description,
            homepage,
            owner: { avatarUrl },
            childrenGithubRelease,
          },
        },
      ],
    },
  },
}) => {
  return (
    <React.Fragment>
      <Header
        name={repoName}
        description={description}
        homepageUrl={homepage}
        avatarUrl={avatarUrl}
      />
      <main>
        {childrenGithubRelease
          .filter(({ draft }) => !draft)
          .map(
            ({
              id,
              name,
              tagName,
              publishedAt,
              childGithubReleaseBody: {
                childMarkdownRemark: { html },
              },
            }) => (
              <div className="release" key={id}>
                <h1>
                  <Link to={`/${tagName}`}>{name || tagName}</Link>
                </h1>
                {typeof window !== 'undefined' && (
                  <p className="date">
                    {distanceInWordsToNow(publishedAt, {
                      addSuffix: true,
                    })}
                  </p>
                )}
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            )
          )}
      </main>
    </React.Fragment>
  )
}

export const query = graphql`
  query IndexQuery {
    repository: allGithubRepo {
      edges {
        node {
          name
          description
          homepage
          owner {
            avatarUrl
          }
          childrenGithubRelease {
            id
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
      }
    }
  }
`

export default IndexPage
