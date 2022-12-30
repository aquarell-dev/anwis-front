import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/Acceptance/Layout'
import Products from '../../src/components/screens/Acceptance/Products'

const RussianProductsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Российские Товары</title>
      </Head>
      <Layout>
        <Products />
      </Layout>
    </>
  )
}

export default RussianProductsPage
