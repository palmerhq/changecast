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
            }}
          >
            <li
              css={{
                display: 'inline-block',
                marginRight: '15px',
              }}
            >
              <AnchorButton>What's New?</AnchorButton>
            </li>
            <li
              css={{
                display: 'inline-block',
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
        <h2 css={{ color: 'black', fontSize: '3em' }}>ChangeCast</h2>
        <p css={{ color: 'black' }}>
          Create beautiful, performant, accessible changelogs from your Github
          releases.
        </p>
      </div>
    </div>
  </header>
)
