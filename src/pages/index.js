import React from 'react'
import { distanceInWordsToNow } from 'date-fns'

const IndexPage = ({
  data: {
    releases: { edges },
  },
}) => (
  <React.Fragment>
    <h1>react-beautiful-dnd</h1>
    <p>Beautiful and accessible drag and drop for lists with React</p>
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
