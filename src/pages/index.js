import React from 'react'
import { theme } from '../theme'

const IndexPage = ({
  data: {
    releases: { edges },
  },
}) =>
  edges.map(({ node: { frontmatter: { tagName }, html, id } }) => (
    <React.Fragment key={id}>
      <h1>{tagName}</h1>
      <div
        css={theme.sharedStyles.markdown}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </React.Fragment>
  ))

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
