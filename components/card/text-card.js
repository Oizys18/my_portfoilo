import { Box, Container } from '@chakra-ui/react'
import CardSmText from './card-sm-text'
import CardTitle from './card-title'
const TextCard = ({ title, duration, description }) => {
  const Title = () => {
    return title.map(content, index => (
      <CardTitle key={index}>{content}</CardTitle>
    ))
  }
  const Description = () => {
    return description.map(content, index => (
      <CardSmText key={index}>{content}</CardSmText>
    ))
  }
  const Duration = () => {
    return <Duration>{duration}</Duration>
  }

  return (
    <Container maxW="container.md" mt={3}>
      <Box display="flex" flexDir={{ base: 'column', md: 'row' }}>
        <Box
          display="flex"
          flexDir="column"
          w={{ base: '100%', md: '40%' }}
          mr={10}
          bgColor="#00000020"
          p={3}
        >
          <Title />
          <Box aria-label="we-title">삼성청년SW아카데미 2기</Box>
          <Duration />
          <Box aria-label="we-duration">(2019.07~2020.06)</Box>
        </Box>
        <Description />
      </Box>
    </Container>
  )
}
export default TextCard
