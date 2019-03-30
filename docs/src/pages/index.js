import { Global } from '@emotion/core'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import { Button } from '../components/Button/Button'
import { Features } from '../components/Features'
import { FocusStyles } from '../components/FocusStyles'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import { globalStyles } from '../styles/global'

const IndexPage = ({
  data: {
    site: {
      siteMetadata: {
        exampleSiteUrls: [
          reduxChangeCastUrl,
          vueChangeCastUrl,
          reactDndChangeCastUrl,
        ],
      },
    },
  },
}) => (
  <>
    <FocusStyles />
    <Global styles={globalStyles} />

    {(process.env.NODE_ENV === 'development' ||
      typeof window === 'undefined') && (
      <Helmet>
        <script
          src={`${reduxChangeCastUrl}/widget.js`}
          data-selectors="[data-redux-changecast]"
          defer
        />
        <script
          src={`${vueChangeCastUrl}/widget.js`}
          data-selectors="[data-vue-changecast]"
          defer
        />
        <script
          src={`${reactDndChangeCastUrl}/widget.js`}
          data-selectors="[data-react-beautiful-dnd-changecast]"
          defer
        />
      </Helmet>
    )}

    <Header />
    <Section
      subtitle="What we do"
      title="How does it work?"
      content="ChangeCast generates a static site and widget from your Github releases. 
          Adding these to your project homepage will keep users informed of any updates 
          you make. Try the examples below to see ChangeCast in action!"
    >
      <Button
        color="#4fc08d"
        data-vue-changecast
        css={{
          marginRight: 30,
          '@media (max-width: 600px)': {
            marginRight: 0,
            marginBottom: 15,
          },
        }}
      >
        Vue
      </Button>
      <Button
        color="#764abc"
        data-redux-changecast
        css={{
          marginRight: 30,
          '@media (max-width: 600px)': {
            marginRight: 0,
            marginBottom: 15,
          },
        }}
      >
        Redux
      </Button>
      <Button color="#0052CC" data-react-beautiful-dnd-changecast>
        React Beautiful DnD
      </Button>
    </Section>
    <Features />
    <Section
      subtitle="How to start"
      title="Deploy With One Click"
      content="ChangeCast can be built and deployed on Netlify, Now, or any other 
          static hosting service. And, using a Github webhook or action, you can 
          configure ChangeCast to redeploy whenver you cut a new release."
    >
      <a href="https://app.netlify.com/start/deploy?repository=https://github.com/palmerhq/changecast">
        <img
          src="https://www.netlify.com/img/deploy/button.svg"
          alt="Deploy to Netlify"
          css={{ marginBottom: 0 }}
        />
      </a>
    </Section>
    <Footer />
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
