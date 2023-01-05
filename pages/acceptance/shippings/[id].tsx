import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../../../src/components/layouts/Acceptance/Layout'
import Shipping from '../../../src/components/screens/Acceptance/Shipping'

const ShippingPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Отгрузка</title>
      </Head>
      <Layout>
        <Shipping />
      </Layout>
    </>
  )
}

export default ShippingPage
