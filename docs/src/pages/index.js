import React from 'react'
import { graphql } from 'gatsby'

const IndexPage = ({
  data: {
    site: {
      siteMetadata: {
        exampleSiteUrls: [
          reduxChangelogUrl,
          vueChangelogUrl,
          reactDndChangelogUrl,
        ],
      },
    },
  },
}) => (
  <>
    <script
      src={`${reduxChangelogUrl}/widget.js`}
      data-selectors="[data-redux-changelog]"
      defer
    />
    <script
      src={`${vueChangelogUrl}/widget.js`}
      data-selectors="[data-vue-changelog]"
      defer
    />
    <script
      src={`${reactDndChangelogUrl}/widget.js`}
      data-selectors="[data-react-beautiful-dnd-changelog]"
      defer
    />
    <button data-redux-changelog>Redux changelog</button>
    <button data-vue-changelog>Vue changelog</button>
    <button data-react-beautiful-dnd-changelog>
      react-beautiful-dnd changelog
    </button>
  </>
)

export const query = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        exampleSiteUrls
      }
    }
  }
`

export default IndexPage
