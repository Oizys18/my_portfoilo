import { Container, Box } from '@chakra-ui/react'
import Tag from '../components/Tag'

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
    return (
      <Box m={1}>
        <Tag
          colorScheme={color(item.type)}
          size="md"
          variant="solid"
          text={item.title}
        />
      </Box>
    )
  }

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
        bgColor="#00000020"
        fontSize="lg"
        fontWeight="bold"
        p={3}
        mr={10}
        w={{ base: '100%', md: '45%' }}
      >
        {category}
      </Box>
      {data ? (
        <Box
          flexDir="row"
          display="flex"
          flexWrap="wrap"
          pt={{ base: 3, md: 0 }}
          width={{ base: '100%', md: '45%' }}
        >
          {data.map((value, index) => {
            return <Box key={index}>{SkillBadge(value)}</Box>
          })}
        </Box>
      ) : (
        <></>
      )}
    </Container>
  )
}
export default SkillCard
