import React from 'react'
import { Link, graphql } from 'gatsby'
import { distanceInWordsToNow } from 'date-fns'
import { Header } from '../components/Header'
import '../styles/stylesheet.scss'

const IndexPage = ({
  data: {
    repository: {
      name,
      description,
      homepageUrl,
      owner: { avatarUrl },
    },
    releases: { edges },
  },
}) => {
  return (
    <React.Fragment>
      <Header
        name={name}
        description={description}
        homepageUrl={homepageUrl}
        avatarUrl={avatarUrl}
      />

      <main>
        {edges.map(
          ({
            node: {
              frontmatter: { title, publishedAt, tagName },
              html,
              id,
            },
          }) => (
            <div className="release" key={id}>
              <h1>
                <Link to={`/${tagName}`}>{title || tagName}</Link>
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
    repository: dataJson {
      name
      description
      homepageUrl
      owner {
        avatarUrl
      }
    }
    releases: allMarkdownRemark(
      sort: { fields: [frontmatter___publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            title
            tagName
            publishedAt
          }
        }
      }
    }
  }
`

export default IndexPage
