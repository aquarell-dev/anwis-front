import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/China/Layout'
import Archive from '../../src/components/screens/China/Archive'

const ArchiveOrdersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Архивные Заказы</title>
      </Head>
      <Layout>
        <Archive />
      </Layout>
    </>
  )
}

export default ArchiveOrdersPage
