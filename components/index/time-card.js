import { Container, Box } from '@chakra-ui/react'
const TimeCard = ({ data, year }) => {
  return (
    <Container
      maxW="container.md"
      mt={3}
      display="flex"
      flexDir={{ base: 'column', md: 'row' }}
      pb={5}
    >
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        w={{ base: '100%', md: '50%' }}
        p={3}
        mr={10}
        fontSize="xl"
        fontWeight="bold"
        bgColor="#00000020"
      >
        {year}
      </Box>
      {data ? (
        <Box
          fontSize="sm"
          pt={{ base: 3, md: 0 }}
          width={{ base: 'auto', md: '50%' }}
          display="flex"
          flexWrap="wrap"
        >
          {data.map((value, index) => {
            return <div key={index}>{value.content}</div>
          })}
        </Box>
      ) : (
        <></>
      )}
    </Container>
  )
}
export default TimeCard
