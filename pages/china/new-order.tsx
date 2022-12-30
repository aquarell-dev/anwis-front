import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/China/Layout'
import NewOrder from '../../src/components/screens/China/Order/NewOrder'

const NewOrderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Новый Заказ</title>
      </Head>
      <Layout>
        <NewOrder />
      </Layout>
    </>
  )
}

export default NewOrderPage
