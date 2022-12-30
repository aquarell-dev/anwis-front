import { Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/favicon/apple-touch-icon.png'
        />
        <link
          rel='shortcut icon'
          href='/favicon/favicon.ico'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon/favicon-16x16.png'
        />
        <link
          rel='manifest'
          href='/favicon/site.webmanifest'
        />
        <meta
          name='msapplication-TileColor'
          content='#da532c'
        />
        <meta
          name='theme-color'
          content='#ffffff'
        />
        <meta
          name='description'
          content='Anwis Sklad Dashboard'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
