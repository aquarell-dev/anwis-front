import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import NotFound from '../src/components/screens/404'

const NotFoundPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Не найдено</title>
      </Head>
      <NotFound />
    </>
  )
}

export default NotFoundPage
