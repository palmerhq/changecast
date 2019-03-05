import React from 'react'
import Helmet from 'react-helmet'
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
    <Helmet>
      <script
        src={`${reduxChangelogUrl}/widget.js`}
        data-selectors="[data-redux-changelog]"
      />
      <script
        src={`${vueChangelogUrl}/widget.js`}
        data-selectors="[data-vue-changelog]"
      />
      <script
        src={`${reactDndChangelogUrl}/widget.js`}
        data-selectors="[data-react-beautiful-dnd-changelog]"
      />
    </Helmet>
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
