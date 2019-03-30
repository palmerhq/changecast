import { AbstractIcon1 } from 'icons/AbstractIcon1'
import { AbstractIcon2 } from 'icons/AbstractIcon2'
import { AbstractIcon3 } from 'icons/AbstractIcon3'
import { AbstractIcon5 } from 'icons/AbstractIcon5'
import { AbstractIcon6 } from 'icons/AbstractIcon6'
import { AbstractIcon7 } from 'icons/AbstractIcon7'
import React from 'react'

const Feature = ({ title, icon: Icon, children }) => (
  <li
    css={{
      width: '30%',
      maxWidth: '350px',
      marginBottom: '60px',
      padding: '0 15px',
      '@media (max-width: 990px)': {
        width: '50%',
      },
      '@media (max-width: 600px)': {
        width: '100%',
      },
    }}
  >
    <h3
      css={{
        marginTop: '0',
        marginBottom: '15px',
      }}
    >
      <Icon
        css={{
          verticalAlign: 'middle',
          marginRight: '15px',
          maxHeight: '40px',
          maxWidth: '40px',
          width: '100%',
        }}
      />

      <span
        css={{
          textTransform: 'uppercase',
          fontSize: '12px',
        }}
      >
        {title}
      </span>
    </h3>
    <p
      css={{
        margin: 'auto',
      }}
    >
      {children}
    </p>
  </li>
)

export const Features = () => (
  <>
    <div
      css={{
        padding: '70px 0 40px',
      }}
    >
      <div
        css={{
          maxWidth: '550px',
          marginRight: 'auto',
          marginLeft: 'auto',
          padding: '0 15px',
        }}
      >
        <div
          css={{
            textAlign: 'center',
          }}
        >
          <div
            css={{
              textTransform: 'uppercase',
              color: '#4D61FC',
              fontSize: '12px',
              fontWeight: '700',
              lineHeight: '1.4',
            }}
          >
            What you get
          </div>
          <h2
            css={{
              fontSize: '3em',
            }}
          >
            What are the features?
          </h2>
          <p>
            ChangeCast comes with every feature needed to easily communicate
            project updates. If you think we're missing one,{' '}
            <a href="https://github.com/palmerhq/changecast/issues/new">
              open an issue
            </a>
            !
          </p>
        </div>
      </div>
      <div
        css={{
          marginRight: 'auto',
          marginLeft: 'auto',
          padding: '0 15px',
          maxWidth: '1080px',
        }}
      >
        <ul
          css={{
            padding: '0',
            margin: '0',
            listStyle: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            marginTop: '60px',
            ['@media (max-width: 990px)']: {
              justifyContent: 'center',
            },
          }}
        >
          <Feature title="Built-in Widget" icon={AbstractIcon2}>
            Our widget notifies users of new updates and allows them to view the
            updates without leaving your site.
          </Feature>
          <Feature title="Themeable" icon={AbstractIcon1}>
            Our site and widget are built with your Github avatar's color scheme
            and can be overriden with any color you choose.
          </Feature>
          <Feature title="Shareable" icon={AbstractIcon3}>
            Each release comes with it's own shareable link and open graph image
            that looks great when shared on any social media.
          </Feature>
          <Feature title="Searchable" icon={AbstractIcon5}>
            From our widget and site, your users can search the text of each
            release to find the feature or update they are looking for.
          </Feature>
          <Feature title="Accessible" icon={AbstractIcon6}>
            We take accessibility seriously and will make sure that your product
            updates can reach everyone.
          </Feature>
          <Feature title="Blazing Fast" icon={AbstractIcon7}>
            Built on top of Gatsby, your site and widget are highly tuned for a
            fast experience over any connection.
          </Feature>
        </ul>
      </div>
    </div>
  </>
)
