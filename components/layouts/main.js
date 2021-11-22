import Head from 'next/head'
import Navbar from '../navbar'
import Drawer from '../drawer'
import { Box, Container, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const DynamicTerminal = dynamic(() => import('../../lib/terminal'), {
  ssr: false
})
const Main = ({ children, router }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>양찬우 :: Oizys18 Portfolio</title>
      </Head>
      <Navbar path={router.asPath} drawerController={onOpen} />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DynamicTerminal closeTerminal={onClose} />
      </Drawer>

      <Container maxW="container.lg" pt={14}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
