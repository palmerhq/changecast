import React from 'react'
import {
  differenceInDays,
  distanceInWordsToNow,
  isThisYear,
  format,
} from 'date-fns'
import { Menu, MenuButton, MenuList, MenuItem } from '../MenuButton'
import { Cast } from '../Icon/Cast'
import VisuallyHidden from '@reach/visually-hidden'
import { windowPopup } from '../../utils/windowPopup'
import { Linkedin } from '../Icon/Linkedin'
import { Twitter } from '../Icon/Twitter'
import { Facebook } from '../Icon/Facebook'
import { copyToClipboard } from '../../utils/copyToClipboard'
import { Copy } from '../Icon/Copy'
import { Link } from 'gatsby'
import { theme } from '../../styles/theme'

export const ReleaseHeader = ({
  releaseName,
  tagName,
  publishedAt,
  embeddedInIframe,
  primaryColor: [red, green, blue],
  url,
  ...rest
}) => {
  const shareableUrl = `${url}/${tagName}`
  const title = releaseName || tagName

  return (
    <div
      css={{
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid lightgray',
        background: 'white',
      }}
      {...rest}
    >
      <div>
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
            {differenceInDays(Date.now(), publishedAt) < 30
              ? distanceInWordsToNow(publishedAt, {
                  addSuffix: true,
                })
              : isThisYear(publishedAt)
              ? format(publishedAt, 'MMM D')
              : format(publishedAt, 'MMMM Do, YYYY')}
          </p>
        )}
      </div>

      <Menu>
        <MenuButton>
          <Cast />
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
            <Twitter css={{ height: '1rem', width: '1rem', marginRight: 10 }} />
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
  )
}
