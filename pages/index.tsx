import { NextPage } from 'next'
import Head from 'next/head'
import Index from '../src/components/screens/Index'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Главная</title>
      </Head>
      <Index />
    </>
  )
}

export default Home
