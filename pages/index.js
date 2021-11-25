import { Image, Container, Box } from '@chakra-ui/react'
const Page = () => {
  return (
    <Container maxW="container.md" mt={10}>
      <Box align="left" ml={3} pos="absolute" top={100}>
        <Image
          borderRadius={5}
          src="/images/profile.png"
          alt="profile-image"
          height={150}
          width={150}
        />
      </Box>
      <Box bgColor="#003049" pb={10} mt={110} borderRadius={3} color="white">
        <Box as="h2" fontSize="4xl" fontWeight="bold" pt={3} pl={170}>
          양찬우
        </Box>
        <Container maxW="container.lg" pt={5}>
          <Box>안녕하세요! 프론트엔드 개발자 양찬우입니다.</Box>
        </Container>
      </Box>
    </Container>
  )
}
export default Page
