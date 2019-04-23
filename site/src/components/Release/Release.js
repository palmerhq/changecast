import { Facebook } from 'icons/Facebook'
import { Link } from 'icons/Link'
import { Linkedin } from 'icons/Linkedin'
import { Twitter } from 'icons/Twitter'
import React from 'react'
import { markdownStyles } from '../../styles/markdown'
import { theme } from '../../styles/theme'
import { copyToClipboard } from '../../utils/copyToClipboard'
import { windowPopup } from '../../utils/windowPopup'
import { ReleaseHeader } from './ReleaseHeader'
import { SocialButton } from './SocialButton'

export const Release = React.memo(
  ({
    releaseName,
    tagName,
    publishedAt,
    plainText,
    html,
    isWidget,
    primaryColor,
    url,
  }) => {
    const [red, green, blue] = primaryColor
    const shareableUrl = `${url}/${tagName}`
    const title = releaseName || tagName

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
          title={title}
          tagName={tagName}
          publishedAt={publishedAt}
          isWidget={isWidget}
          primaryColor={primaryColor}
          url={url}
        />
        <div css={{ padding: '0 1rem', margin: '1rem 0' }}>
          {plainText ? (
            <div
              className="release"
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
        <div
          css={{
            display: 'flex',
            justifyContent: 'flex-end',
            borderTop: '1px solid lightgray',
            padding: '0.5rem',
          }}
        >
          <SocialButton
            label="Share on Facebook"
            icon={Facebook}
            onClick={() =>
              windowPopup(
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareableUrl
                )}`,
                500,
                300
              )
            }
          />
          <SocialButton
            label="Share on Twitter"
            icon={Twitter}
            onClick={() =>
              windowPopup(
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareableUrl
                )}`,
                500,
                300
              )
            }
          />
          <SocialButton
            label="Share on Linkedin"
            icon={Linkedin}
            onClick={() =>
              windowPopup(
                `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
                  shareableUrl
                )}&mini=true`,
                500,
                300
              )
            }
          />
          <SocialButton
            label="Copy link"
            icon={Link}
            onClick={() => copyToClipboard(shareableUrl)}
          />
        </div>
      </div>
    )
  }
)
