import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../../src/components/layouts/Acceptance/Layout'
import AcceptanceTSD from '../../../src/components/screens/Acceptance/Acceptances/tsd'

const TsdAcceptancesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Тсд Приемки</title>
      </Head>
      <Layout>
        <AcceptanceTSD />
      </Layout>
    </>
  )
}

export default TsdAcceptancesPage
