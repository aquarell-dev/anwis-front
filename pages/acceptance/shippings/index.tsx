import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../src/components/layouts/Acceptance/Layout'
import Shippings from '../../../src/components/screens/Acceptance/Shippings'

const ShippingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Отгрузки</title>
      </Head>
      <Layout>
        <Shippings />
      </Layout>
    </>
  )
}

export default ShippingsPage
