import { BlocksProvider } from 'mdx-blocks'
import { funk } from 'mdx-blocks/themes'
import React from 'react'
import Header from '../blocks/Header'
import { Link } from '../components/Link'

const components = {
  a: Link,
  button: Link,
}

export default props => (
  <BlocksProvider {...funk}>
    <Header />
    {/* <Intro /> */}
  </BlocksProvider>
)
