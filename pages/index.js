import {
  Image,
  Container,
  Box,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
const Page = () => {
  return (
    <Container maxW="container.md">
      <Box display={{ md: 'flex' }}>
        <Box
          flexGrow={1}
          bgColor={useColorModeValue('grey', 'black')}
          borderRadius={8}
          p={5}
          mt={10}
        >
          <Heading as="h2" variant="page-title">
            양찬우
          </Heading>
          <p>성실한 긍정주의자 ( 개발자 / 작가 / 크리에이터 )</p>
        </Box>
      </Box>
      <Box align="center" ml={{ md: 6 }} flexShrink={0}>
        <Image
          borderColor="whiteAlpha.800"
          borderStyle="solid"
          borderWidth={2}
          display="inline-block"
          maxWidth="150px"
          alt="profile-image"
          borderRadius="full"
          src="/images/profile.png"
        />
      </Box>
    </Container>
  )
}
export default Page
