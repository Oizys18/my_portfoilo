import { ChakraProvider } from '@chakra-ui/provider'
import Layout from '../components/layouts/main'
import theme from '../lib/theme'
// import Fonts from '../lib/font'
import '../styles/xterm.css'
import React from 'react'
import { appWithTranslation } from 'next-i18next'

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      {/* <Fonts /> */}
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  )
}

export default appWithTranslation(Website)
