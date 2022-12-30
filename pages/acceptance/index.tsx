import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/Acceptance/Layout'

const AcceptancePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Приеки</title>
      </Head>
      <Layout />
    </>
  )
}

export default AcceptancePage
