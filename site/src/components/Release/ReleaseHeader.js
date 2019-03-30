import {
  differenceInDays,
  distanceInWordsToNow,
  format,
  isThisYear,
} from 'date-fns'
import { Link } from 'gatsby'
import React from 'react'
import { theme } from '../../styles/theme'

export const ReleaseHeader = ({
  title,
  tagName,
  publishedAt,
  isWidget,
  primaryColor: [red, green, blue],
  url,
  ...rest
}) => {
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
      <h2
        css={{
          margin: '0',
        }}
      >
        {isWidget ? (
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
      </h2>
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
  )
}
