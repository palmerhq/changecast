import { Radio } from 'icons/Radio'
import React from 'react'
import { AnchorButton } from './Button/AnchorButton'
import { Button } from './Button/Button'
import { LinkButton } from './Button/LinkButton'

export const Footer = () => (
  <div
    css={{
      backgroundColor: '#F6F6F6',
    }}
  >
    <div
      css={{
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '0 15px',
        maxWidth: '1080px',
      }}
    >
      <div
        css={{
          padding: '40px 0',
          textAlign: 'center',
        }}
      >
        <ul
          css={{
            padding: '0',
            margin: '0',
            listStyle: 'none',
          }}
        >
          <li
            css={{
              marginBottom: '10px',
            }}
          >
            <AnchorButton
              href="https://github.com/palmerhq/changecast"
              css={{ color: 'black' }}
            >
              Github
            </AnchorButton>
          </li>
          <li
            css={{
              marginBottom: '10px',
            }}
          >
            <Button css={{ color: 'black' }} data-changecast-changecast={true}>
              What's New?
            </Button>
          </li>
          <li
            css={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <LinkButton
              to="/"
              css={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Radio css={{ color: 'black' }} />
              <span
                css={{
                  fontWeight: 'bold',
                  color: 'black',
                  marginLeft: '1rem',
                }}
              >
                ChangeCast
              </span>
            </LinkButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
)
