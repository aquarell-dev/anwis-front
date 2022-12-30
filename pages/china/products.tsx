import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/China/Layout'
import Products from '../../src/components/screens/China/Products'

const ProductsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Китайские Товары</title>
      </Head>
      <Layout>
        <Products />
      </Layout>
    </>
  )
}

export default ProductsPage
