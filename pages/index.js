import { Container, Box } from '@chakra-ui/react'
const Page = () => {
  return (
    <Container>
      <Box borderRadius="lg" bg="red" p={3} mb={6} align="center">
        Hello 찬우
      </Box>
      <Box display={{ md: 'flex' }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores error
        atque molestiae officia itaque distinctio deserunt debitis nisi, vero
        voluptatem. Ut maiores officia distinctio culpa consectetur, nam eos
        corrupti aut!
      </Box>
    </Container>
  )
}
export default Page
