import { Container, Box, Badge } from '@chakra-ui/react'
const SkillCard = ({ category, data }) => {
  const color = skillLevel => {
    switch (skillLevel) {
      case 'high':
        return 'green'
      case 'middle':
        return 'orange'
      case 'low':
        return 'red'
    }
  }

  const SkillBadge = item => {
    return <Badge colorScheme={color(item.type)}>{item.title}</Badge>
  }

  return category ? (
    <>
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
          w={{ base: '100%', md: '45%' }}
          p={3}
          mr={10}
          fontWeight="bold"
          fontSize="lg"
          bgColor="#00000020"
        >
          {category}
        </Box>
        {data ? (
          <Box pt={{ base: 3, md: 0 }}>
            {data.map((value, index) => {
              return <Box key={index}>{SkillBadge(value)}</Box>
            })}
          </Box>
        ) : (
          <></>
        )}
      </Container>
    </>
  ) : (
    <>No data</>
  )
}
export default SkillCard
