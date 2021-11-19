import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
const DynamicTerminal = dynamic(() => import('../lib/Terminal'), {
  ssr: false
})

const About = () => {
  return (
    <Box
      bgColor="black"
      position="absolute"
      bottom={0}
      width="100%"
      left={0}
      height="50%"
    >
      <Box position="relative" width="100%" mt={10} left={0}>
        <DynamicTerminal />
      </Box>
    </Box>
  )
}
export default About
