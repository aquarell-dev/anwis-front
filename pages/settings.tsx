import { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Settings from '../src/components/screens/Settings'

const SettingsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Настройки</title>
      </Head>
      <Settings />
    </>
  )
}

export default SettingsPage
