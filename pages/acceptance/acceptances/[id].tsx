import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../../src/components/layouts/Acceptance/Layout'
import AcceptOrder from '../../../src/components/screens/Acceptance/AcceptOrder'

const AcceptanceByIdPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Приемка</title>
      </Head>
      <Layout>
        <AcceptOrder />
      </Layout>
    </>
  )
}

export default AcceptanceByIdPage
