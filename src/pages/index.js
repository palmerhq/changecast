import React from 'react'
import { distanceInWordsToNow } from 'date-fns'

const IndexPage = ({
  data: {
    repository: { name, description },
    releases: { edges },
  },
}) => (
  <React.Fragment>
    <h1>{name}</h1>
    <p>{description}</p>
    {edges.map(
      ({
        node: {
          frontmatter: { tagName, publishedAt },
          html,
          id,
        },
      }) => (
        <React.Fragment key={id}>
          <h1 id={tagName}>
            <a href={`#${tagName}`}>{tagName}</a>
          </h1>
          {typeof window !== 'undefined' && (
            <p>
              {distanceInWordsToNow(publishedAt, {
                addSuffix: true,
              })}
            </p>
          )}
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </React.Fragment>
      )
    )}
  </React.Fragment>
)

export const query = graphql`
  query IndexQuery {
    repository: dataJson {
      name
      description
    }
    releases: allMarkdownRemark(
      sort: { fields: [frontmatter___publishedAt], order: DESC }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            tagName
            publishedAt
          }
        }
      }
    }
  }
`

export default IndexPage
