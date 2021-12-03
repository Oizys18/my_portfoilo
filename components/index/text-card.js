import { Box, Container } from '@chakra-ui/react'

const TextCard = ({ title, duration, description }) => {
  return (
    <Container
      maxW="container.md"
      mt={3}
      display="flex"
      flexDir={{ base: 'column', md: 'row' }}
    >
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        fontSize="lg"
        fontWeight="bold"
        w={{ base: '100%', md: '50%' }}
        p={3}
        mr={10}
        bgColor="#00000020"
      >
        <Box aria-label="title">{title}</Box>
        {duration ? (
          <Box aria-label="duration" fontSize="sm" as="p">
            {duration}
          </Box>
        ) : (
          <></>
        )}
      </Box>
      {description ? (
        <Box
          width={{ base: 'auto', md: '50%' }}
          aria-label="description"
          pt={{ base: 3, md: 0 }}
          flexWrap="wrap"
          display="flex"
        >
          {description.map((value, index) => {
            return (
              <Box fontSize="sm" key={index}>
                {value}
              </Box>
            )
          })}
        </Box>
      ) : (
        <></>
      )}
    </Container>
  )
}
export default TextCard
