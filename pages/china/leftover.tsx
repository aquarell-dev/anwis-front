import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/China/Layout'
import LeftOver from '../../src/components/screens/China/Leftover'

const LeftoversPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Остатки</title>
      </Head>
      <Layout>
        <LeftOver />
      </Layout>
    </>
  )
}

export default LeftoversPage
