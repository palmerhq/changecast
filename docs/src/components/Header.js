import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import { Radio } from 'icons/Radio'
import React from 'react'
import { AnchorButton } from './Button/AnchorButton'
import { Button } from './Button/Button'
import { LinkButton } from './Button/LinkButton'

export const Header = () => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "oleg-laptev-546607-unsplash.png" }) {
        childImageSharp {
          fluid(maxWidth: 600) {
            ...GatsbyImageSharpFluid_tracedSVG
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
          // height: '90vh',
          background: '#f0f0f0',
        }}
      >
        <nav
          css={{
            padding: '20px 0',
            background: 'black',
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
              maxWidth: 1080,
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
              <LinkButton
                to="/"
                css={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Radio />
                <span
                  css={{
                    fontWeight: 'bold',
                    marginLeft: '1rem',
                    '@media (max-width: 600px)': {
                      display: 'none',
                    },
                  }}
                >
                  ChangeCast
                </span>
              </LinkButton>
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
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            '@media (max-width: 600px)': {
              flexDirection: 'column-reverse',
            },
            height: '80vh',
            minHeight: 530,
            maxWidth: 1080,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            css={{
              maxWidth: '500px',
              padding: '0 20px',
              width: '50%',
              '@media (max-width: 600px)': {
                width: '100%',
              },
            }}
          >
            <h2 css={{ color: 'black', fontSize: '3em' }}>
              Keep users informed.
            </h2>
            <p css={{ color: 'black' }}>
              Create{' '}
              <span css={{ color: 'royalblue', fontWeight: 'bold' }}>
                beautiful
              </span>
              ,{' '}
              <span css={{ color: 'royalblue', fontWeight: 'bold' }}>
                performant
              </span>
              ,{' '}
              <span css={{ color: 'royalblue', fontWeight: 'bold' }}>
                accessible
              </span>{' '}
              widgets and sites from your Github releases.
            </p>
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'center',
              width: '50%',
              padding: '0 50px',

              '@media (max-width: 600px)': {
                width: '100%',
                padding: '0 75px',
              },
            }}
          >
            <Img
              fluid={fluid}
              style={{
                width: '100%',
              }}
              imgStyle={{
                width: '100%',
              }}
            />
          </div>
        </div>
      </header>
    </>
  )
}
