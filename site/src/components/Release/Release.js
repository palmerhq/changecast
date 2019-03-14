import React from 'react'
import { markdownStyles } from '../../styles/markdown'
import { theme } from '../../styles/theme'
import { ReleaseHeader } from './ReleaseHeader'

export const Release = ({
  releaseName,
  tagName,
  publishedAt,
  body,
  html,
  embeddedInIframe,
  primaryColor,
  url,
}) => {
  const [red, green, blue] = primaryColor

  return (
    <div
      css={{
        position: 'relative',
        width: '100%',
        marginBottom: '0.5rem',
        background: 'white',
        borderRadius: 0,
        borderTop: '1px solid lightgray',
        borderBottom: '1px solid lightgray',
        [theme.media.small]: {
          borderRadius: 3,
          border: '1px solid lightgray',
        },
      }}
    >
      <ReleaseHeader
        releaseName={releaseName}
        tagName={tagName}
        publishedAt={publishedAt}
        embeddedInIframe={embeddedInIframe}
        primaryColor={primaryColor}
        url={url}
      />
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
