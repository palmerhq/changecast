import React from 'react'
import { markdownStyles } from '../styles/markdown'
import { Link } from 'gatsby'
import { distanceInWordsToNow, format } from 'date-fns'

export const Release = ({
  name,
  tagName,
  publishedAt,
  html,
  embeddedInIframe,
  primaryColor: [red, green, blue],
}) => {
  const title = name || tagName
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
        <h1
          css={{
            margin: 0,
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
              {name || tagName}
            </Link>
          )}
        </h1>
        {typeof window !== 'undefined' && (
          <p
            css={{
              color: 'gray',
              margin: 0,
            }}
            title={format(publishedAt, 'MMMM Do, YYYY, h:ma')}
          >
            {distanceInWordsToNow(publishedAt, {
              addSuffix: true,
            })}
          </p>
        )}
      </div>
      <div css={{ padding: '0 1rem', margin: '1rem 0' }}>
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
      </div>
    </div>
  )
}
