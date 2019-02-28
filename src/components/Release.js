import React from 'react'
import { markdownStyles } from '../styles/markdown'
import { Link } from 'gatsby'
import {
  distanceInWordsToNow,
  differenceInDays,
  isThisYear,
  format,
} from 'date-fns'
import VisuallyHidden from '@reach/visually-hidden'
import { Menu, MenuButton, MenuList, MenuItem } from './MenuButton'
import { Share } from './Icon/Share'
import { Facebook } from './Icon/Facebook'
import { Twitter } from './Icon/Twitter'
import { Linkedin } from './Icon/Linkedin'
import { Copy } from './Icon/Copy'
import { theme } from '../styles/theme'
import { copyToClipboard } from '../utils/copyToClipboard'
import { windowPopup } from '../utils/windowPopup'

export const Release = ({
  releaseName,
  tagName,
  publishedAt,
  body,
  html,
  embeddedInIframe,
  primaryColor: [red, green, blue],
  url,
}) => {
  const title = releaseName || tagName
  const shareableUrl = `${url}/${tagName}`

  return (
    <div
      css={{
        position: 'relative',
        width: '100%',
        marginBottom: '0.5rem',
        border: '1px solid lightgray',
        background: 'white',
        borderRadius: '3px',
      }}
    >
      <div
        css={{
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid lightgray',
        }}
      >
        <div css={{}}>
          <h1
            css={{
              margin: '0 0 0.5rem 0',
              fontSize: '1.75rem',
            }}
          >
            {embeddedInIframe ? (
              <a
                href={`/${tagName}`}
                target="_blank"
                rel="noopener noreferrer"
                css={{ color: `rgb(${red}, ${green}, ${blue})` }}
              >
                {title}
              </a>
            ) : (
              <Link
                to={`/${tagName}`}
                css={{ color: `rgb(${red}, ${green}, ${blue})` }}
              >
                {title}
              </Link>
            )}
          </h1>
          {typeof window !== 'undefined' && (
            <p
              css={{
                color: theme.color.accent,
                margin: 0,
              }}
            >
              Released{' '}
              {differenceInDays(Date.now(), publishedAt) < 30
                ? distanceInWordsToNow(publishedAt, {
                    addSuffix: true,
                  })
                : `on ${
                    isThisYear(publishedAt)
                      ? format(publishedAt, 'MMM D')
                      : format(publishedAt, 'MMMM Do, YYYY')
                  }`}
            </p>
          )}
        </div>

        <Menu>
          <MenuButton>
            <Share />
            <VisuallyHidden>Share {title}</VisuallyHidden>
          </MenuButton>
          <MenuList
            css={{
              '[data-selected]': {
                background: `rgb(${red}, ${green}, ${blue})`,
              },
            }}
          >
            <MenuItem
              onSelect={() =>
                windowPopup(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareableUrl
                  )}`,
                  500,
                  300
                )
              }
            >
              <Facebook
                css={{ height: '1rem', width: '1rem', marginRight: 10 }}
              />
              Facebook
            </MenuItem>
            <MenuItem
              onSelect={() =>
                windowPopup(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareableUrl
                  )}`,
                  500,
                  300
                )
              }
            >
              <Twitter
                css={{ height: '1rem', width: '1rem', marginRight: 10 }}
              />
              Twitter
            </MenuItem>
            <MenuItem
              onSelect={() =>
                windowPopup(
                  `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                    shareableUrl
                  )}&mini=true`,
                  500,
                  300
                )
              }
            >
              <Linkedin
                css={{ height: '1rem', width: '1rem', marginRight: 10 }}
              />
              Linkedin
            </MenuItem>
            <MenuItem onSelect={() => copyToClipboard(shareableUrl)}>
              <Copy css={{ height: '1rem', width: '1rem', marginRight: 10 }} />
              Copy link
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <div css={{ padding: '0 1rem', margin: '1rem 0' }}>
        {body ? (
          <div
            css={[
              markdownStyles,
              {
                a: {
                  color: `rgb(${red}, ${green}, ${blue})`,
                },
                [`*:not(pre) > code[class*='language-'], pre[class*='language-']`]: {
                  background: `rgb(${red}, ${green}, ${blue}, 0.1)`,
                },
              },
            ]}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <em>No release notes.</em>
        )}
      </div>
    </div>
  )
}
