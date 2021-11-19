import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>양찬우 :: Oizys18</title>
      </Head>
      {/* <Navbar path={router.asPath} /> */}
      <Container maxW="container.lg" pt={14} height="100vh">
        {children}
      </Container>
    </Box>
  )
}

export default Main
