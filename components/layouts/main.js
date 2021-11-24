import Head from 'next/head'
import Navbar from '../navbar'
import Drawer from '../drawer'
import { Box, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const DynamicTerminal = dynamic(() => import('../../lib/terminal'), {
  ssr: false
})
const Main = ({ children, router }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isTerminalLoaded } = useDisclosure()

  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>양찬우 :: Oizys18 Portfolio</title>
      </Head>
      <Navbar
        path={router.asPath}
        drawerController={onOpen}
        isTerminalLoading={isTerminalLoaded}
        isTerminalOpen={isOpen}
      />
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DynamicTerminal
          closeTerminal={onClose}
          isTerminalLoaded={isTerminalLoaded}
        />
      </Drawer>
      <Box pt={16}>{children}</Box>
    </Box>
  )
}

export default Main
