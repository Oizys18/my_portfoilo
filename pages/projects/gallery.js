import { Container, Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import Toggle from '../../components/Toggle'
import Tag from '../../components/Tag'

const Gallery = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <Container
      maxW="container.md"
      mt={10}
      display="flex"
      justify="center"
      flexWrap="wrap"
      bgColor="lightgrey"
      p={3}
      borderRadius={8}
    >
      <Box display="flex" gridGap={5}>
        <Box w="50%">
          <Box fontWeight="bold" fontSize={25}>
            Input
          </Box>
          <Box display="flex" gridGap={3}>
            <Tag size="lg" text="Toggle" />
          </Box>
          <Text>안녕하세요 한번 글 좀 써봅니다</Text>
        </Box>
        <Box display="flex" gridGap={5} w="50%">
          <Toggle
            setChecked={setToggle}
            left="공개"
            right="비밀"
            leftBgColor="#5F96FC"
            rightBgColor="#EA5454"
            circleColor="white"
          />
          <Toggle
            setChecked={setToggle}
            left="Yes"
            right="No"
            leftBgColor="#098486"
            rightBgColor="#D62828"
            circleColor="white"
          />
          <Toggle
            setChecked={setToggle}
            left="공개"
            right="비밀"
            leftBgColor="#005F73"
            rightBgColor="#002C3D"
            circleColor="white"
          />
        </Box>
      </Box>
    </Container>
  )
}
export default Gallery
