import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/Acceptance/Layout'
import Fbo from '../../src/components/screens/Acceptance/Fbo'

const FboPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Фбо</title>
      </Head>
      <Layout>
        <Fbo />
      </Layout>
    </>
  )
}

export default FboPage
