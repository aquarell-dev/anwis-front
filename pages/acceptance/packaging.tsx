import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/Acceptance/Layout'
import Packaging from '../../src/components/screens/Acceptance/Packaging'

const PackagingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Упаковка</title>
      </Head>
      <Layout>
        <Packaging />
      </Layout>
    </>
  )
}

export default PackagingPage
