import { Global } from '@emotion/core'
import { graphql } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import { ButtonContainer } from '../components/Button/ButtonContainer'
import { GlowingAnchorButton } from '../components/Button/GlowingAnchorButton'
import { GlowingButton } from '../components/Button/GlowingButton'
import { CenteredText } from '../components/CenteredText'
import { CenteredTitle } from '../components/CenteredTitle'
import { Feature } from '../components/Feature'
import { Features } from '../components/Features'
import { FocusStyles } from '../components/FocusStyles'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Section } from '../components/Section'
import { globalStyles } from '../styles/global'

const IndexTemplate = ({
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
    <Section background="black">
      <CenteredTitle color="white">How does it work?</CenteredTitle>
      <CenteredText color="white">
        ChangeCast generates a static site and widget from your Github releases.
        Adding these to your project homepage will keep users informed of any
        updates you make. Try the examples below to see ChangeCast in action!
      </CenteredText>
      <ButtonContainer>
        <GlowingButton
          data-vue-changecast
          css={{
            marginRight: 30,
          }}
        >
          Vue
        </GlowingButton>
        <GlowingButton
          data-redux-changecast
          css={{
            marginRight: 30,
          }}
        >
          Redux
        </GlowingButton>
        <GlowingButton data-react-beautiful-dnd-changecast>
          React Beautiful DnD
        </GlowingButton>
      </ButtonContainer>
    </Section>
    <Section background="white">
      <CenteredTitle color="black">What are the features?</CenteredTitle>
      <CenteredText color="black">
        ChangeCast comes with every feature needed to easily communicate project
        updates. If you think we're missing one,{' '}
        <a
          href="https://github.com/palmerhq/changecast/issues/new"
          css={{ color: 'royalblue', ':visited': { color: 'royalblue' } }}
        >
          open an issue
        </a>
        !
      </CenteredText>
      <Features>
        <Feature title="Built-in Widget">
          Our widget notifies users of new updates and allows them to view the
          updates without leaving your site.
        </Feature>
        <Feature title="Themeable">
          Our site and widget are built with your Github avatar's color scheme
          and can be overriden with any color you choose.
        </Feature>
        <Feature title="Shareable">
          Each release comes with it's own shareable link and open graph image
          that looks great when shared on any social media.
        </Feature>
        <Feature title="Searchable">
          From our widget and site, your users can search the text of each
          release to find the feature or update they are looking for.
        </Feature>
        <Feature title="Accessible">
          We take accessibility seriously and will make sure that your product
          updates can reach everyone.
        </Feature>
        <Feature title="Blazing Fast">
          Built on top of Gatsby, your site and widget are highly tuned for a
          fast experience over any connection.
        </Feature>
      </Features>
    </Section>
    <Section background="black">
      <CenteredTitle color="white">How do I get started?</CenteredTitle>
      <CenteredText color="white">
        ChangeCast can be built and deployed on Netlify, Now, or any other
        static hosting service. And, using a Github webhook or action, you can
        configure ChangeCast to redeploy whenver you cut a new release.
      </CenteredText>
      <div css={{ textAlign: 'center', color: 'white' }}>
        <GlowingAnchorButton
          href="https://github.com/marketplace/actions/changecast"
          css={{ color: 'white' }}
        >
          Add ChangeCast Action
        </GlowingAnchorButton>
      </div>
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

export default IndexTemplate
