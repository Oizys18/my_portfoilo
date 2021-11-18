import React from 'react'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
const DynamicTerminal = dynamic(() => import('../lib/Terminal'), {
  ssr: false
})

const About = () => {
  return (
    <Container maxW="container.lg" mt={50}>
      <DynamicTerminal />
    </Container>
  )
}
export default About
