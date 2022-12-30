import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import { Layout } from '../../src/components/layouts/Acceptance/Layout'
import Staff from '../../src/components/screens/Acceptance/Staff'

const StaffPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Сотрудники</title>
      </Head>
      <Layout>
        <Staff />
      </Layout>
    </>
  )
}

export default StaffPage
