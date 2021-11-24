import { Container, Box } from '@chakra-ui/react'
const Page = () => {
  return (
    <Container maxW="container.md">
      {/* <Box display={{ md: 'flex' }}>
        <Box
          flexGrow={1}
          bgColor={useColorModeValue('black', 'grey')}
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
      </Box> */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="3rem"
        p={3}
      >
        포트폴리오 임시대문
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="1.5rem"
        p={3}
        flexDir="column"
      >
        <p>환영합니다. </p>
        <p>우측 상단 Terminal 사용하세요</p>
      </Box>
    </Container>
  )
}
export default Page
