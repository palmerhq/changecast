import React from 'react'
import { AnchorButton } from '../components/Button/AnchorButton'
import { AbstractIcon1 } from '../components/Icon/AbstractIcon1'
import { AbstractIcon2 } from '../components/Icon/AbstractIcon2'
import { AbstractIcon3 } from '../components/Icon/AbstractIcon3'
import { AbstractIcon4 } from '../components/Icon/AbstractIcon4'
import { AbstractIcon5 } from '../components/Icon/AbstractIcon5'
import { AbstractIcon6 } from '../components/Icon/AbstractIcon6'
import { AbstractIcon7 } from '../components/Icon/AbstractIcon7'

const Feature = ({ title, icon: Icon, children }) => (
  <li
    css={{
      width: '30%',
      maxWidth: '350px',
      marginBottom: '60px',
      padding: '0 15px',
      ['@media (max-width: 990px)']: {
        width: '50%',
      },
      ['@media (max-width: 600px)']: {
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
            Expore the benefits
          </div>
          <h2
            css={{
              fontSize: '3em',
            }}
          >
            We Have Features
          </h2>
          <p>
            Quinoa can be enameled with sour oysters, also try jumbleing the
            kebab with condensed milk.
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
          <Feature title="Custom Design" icon={AbstractIcon1}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
          <Feature title="Built-in Widget" icon={AbstractIcon2}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
          <Feature title="Shareable Links" icon={AbstractIcon3}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
          <Feature title="Automatic Deploys" icon={AbstractIcon4}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
          <Feature title="Search" icon={AbstractIcon5}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
          <Feature title="Accessible" icon={AbstractIcon6}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
          <Feature title="Blazing Fast" icon={AbstractIcon7}>
            With chocolates drink oyster sauce. Pork shoulder can be flavored
            with grey nachos, also try whisking the cake with vinegar.
          </Feature>
        </ul>
      </div>
    </div>
  </>
)
