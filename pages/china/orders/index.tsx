import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../../src/components/layouts/China/Layout'
import Orders from '../../../src/components/screens/China/Orders'

const OrdersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Список Заказов</title>
      </Head>
      <Layout>
        <Orders />
      </Layout>
    </>
  )
}

export default OrdersPage
