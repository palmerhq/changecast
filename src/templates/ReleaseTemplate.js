import React from 'react'
import { Link, graphql } from 'gatsby'
import { format } from 'date-fns'
import { Header } from '../components/Header'
import '../styles/stylesheet.scss'

const ReleaseTemplate = ({
  data: {
    repository: {
      name,
      description,
      homepageUrl,
      owner: { avatarUrl },
    },
    release: {
      frontmatter: { title, tagName, publishedAt },
      html,
      id,
    },
  },
}) => (
  <React.Fragment>
    <Header
      name={name}
      description={description}
      homepageUrl={homepageUrl}
      avatarUrl={avatarUrl}
    />
    <main>
      <div className="release">
        <h1>
          <Link to={`/${tagName}`}>{title || tagName}</Link>
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
    repository: dataJson {
      name
      description
      homepageUrl
      owner {
        avatarUrl
      }
    }
    release: markdownRemark(frontmatter: { tagName: { eq: $tagName } }) {
      id
      html
      frontmatter {
        title
        tagName
        publishedAt
      }
    }
  }
`

export default ReleaseTemplate
