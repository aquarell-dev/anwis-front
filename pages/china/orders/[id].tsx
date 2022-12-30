import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../../src/components/layouts/China/Layout'
import ExistingOrder from '../../../src/components/screens/China/Order/ExistingOrder'

const OrderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Китайский Заказ</title>
      </Head>
      <Layout>
        <ExistingOrder />
      </Layout>
    </>
  )
}

export default OrderPage
