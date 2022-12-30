import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import Layout from '../src/components/layouts/Layout'
import { store } from '../src/store/store'
import '../styles/globals.css'
import '../src/components/ui/ImagePreview/preview.css'

import { Montserrat } from '@next/font/google'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <main className={montserrat.className}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </main>
      </Provider>
      <ToastContainer
        bodyClassName='popupException'
        className='popupException'
        toastClassName='popupException'
      />
    </>
  )
}
