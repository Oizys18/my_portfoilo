import Head from 'next/head'
import Navbar from '../navbar/navbar'
import Drawer from '../drawer'
import { Box, useDisclosure } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
const DynamicTerminal = dynamic(() => import('../../lib/terminal'), {
  ssr: false
})
const Main = ({ children, router }) => {
  const {
    isOpen: isTerminalOpen,
    onOpen: onTerminalOpen,
    onClose: onTerminalClose
  } = useDisclosure()
  const {
    isOpen: isAchievementOpen,
    onOpen: onAchievementOpen,
    onClose: onAchievementClose
  } = useDisclosure()

  return (
    <Box as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <title>양찬우 :: Oizys18 Portfolio</title>
      </Head>
      <Navbar
        path={router.asPath}
        onTerminalOpen={onTerminalOpen}
        isTerminalOpen={isTerminalOpen}
        onAchievementOpen={onAchievementOpen}
        isAchievementOpen={isAchievementOpen}
      />
      <Drawer placement="top" isOpen={isTerminalOpen} onClose={onTerminalClose}>
        <DynamicTerminal closeTerminal={onTerminalClose} />
      </Drawer>
      <Drawer
        isOpen={isAchievementOpen}
        onClose={onAchievementClose}
        placement="left"
      >
        <div>도전과제기능 업데이트 예정!</div>
      </Drawer>
      <Box pt={16}>{children}</Box>
    </Box>
  )
}

export default Main
