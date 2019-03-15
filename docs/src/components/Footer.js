import React from 'react'
import { Cast } from './Icon/Cast'

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
        <div
          css={{
            marginBottom: '10px',
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
              marginBottom: '10px',
            }}
          >
            <a
              css={{
                color: '#303030',
              }}
              href="https://twitter.com/PalmerGroupHQ"
            >
              Twitter
            </a>
          </li>
          <li
            css={{
              marginBottom: '10px',
            }}
          >
            <a
              css={{
                color: '#303030',
              }}
              href="https://github.com/palmerhq"
            >
              Github
            </a>
          </li>
          <li>
            <a
              css={{
                color: '#303030',
              }}
              href="https://palmer.net"
            >
              The Palmer Group
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)
