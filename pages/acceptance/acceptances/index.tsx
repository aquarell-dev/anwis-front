import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../../src/components/layouts/Acceptance/Layout'
import Acceptances from '../../../src/components/screens/Acceptance/Acceptances'

const AcceptancesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Приемки</title>
      </Head>
      <Layout>
        <Acceptances />
      </Layout>
    </>
  )
}

export default AcceptancesPage
