import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Radio } from 'icons/Radio'
import React from 'react'
import { AnchorButton } from './Button/AnchorButton'
import { Button } from './Button/Button'

export const Header = () => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "photo-1518784940690-cbe92616251d.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <>
      <header
        css={{
          position: 'relative',
          height: 700,
        }}
      >
        <Img
          fluid={fluid}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          imgStyle={{
            height: '100%',
          }}
        />
        <div
          css={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(rgba(0,0,0,0.1875),rgba(0,0,0,0.75))',
          }}
        />
        <nav
          css={{
            padding: '20px 0',
          }}
        >
          <div
            css={{
              marginRight: 'auto',
              marginLeft: 'auto',
              padding: '0 15px',
              '@media (max-width: 600px)': {
                padding: 0,
              },
              maxWidth: '1080px',
            }}
          >
            <div
              css={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                css={{
                  position: 'relative',
                  padding: '12px 20px 12px',
                }}
              >
                <Radio css={{ color: 'white' }} />
              </div>
              <ul
                css={{
                  padding: '0',
                  margin: '0',
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                }}
              >
                <li
                  css={{
                    marginRight: 15,
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Button>What's New?</Button>
                </li>
                <li
                  css={{
                    marginBottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <AnchorButton href="https://github.com/palmerhq/changecast">
                    Github
                  </AnchorButton>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          css={{
            position: 'absolute',
            width: '100%',
            marginRight: 'auto',
            marginLeft: 'auto',
            padding: '150px 15px 250px 15px',
            maxWidth: '1080px',
          }}
        >
          <div css={{ maxWidth: '500px', padding: '0 20px' }}>
            <h2 css={{ color: 'white', fontSize: '3em' }}>
              Change
              <wbr />
              Cast
            </h2>
            <p css={{ color: 'white' }}>
              Create beautiful, performant, accessible changelog sites and
              widgets.
            </p>
          </div>
        </div>
      </header>
    </>
  )
}
