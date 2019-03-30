import { Cast } from 'icons/Cast'
import React from 'react'
import { AnchorButton } from './Button/AnchorButton'

export const Header = () => (
  <header>
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
          maxWidth: '1080px',
        }}
      >
        <div
          css={{
            display: 'flex',
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
            <Cast />
          </div>
          <ul
            css={{
              padding: '0',
              margin: '0',
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
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
              <AnchorButton>What's New?</AnchorButton>
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
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '75px 15px 150px 15px',
        maxWidth: '1080px',
        background: 'white',
      }}
    >
      <div css={{ maxWidth: '500px', padding: '0 20px' }}>
        <h2 css={{ color: 'black', fontSize: '3em' }}>
          Change
          <wbr />
          Cast
        </h2>
        <p css={{ color: 'black' }}>
          Create beautiful, performant, accessible changelog sites and widgets.
        </p>
      </div>
    </div>
  </header>
)
