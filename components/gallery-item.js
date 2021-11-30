import { Container, Box, Text } from '@chakra-ui/react'
const GalleryItem = ({ title, description, children }) => {
  return (
    <>
      <Box fontWeight="bold" fontSize={30} pb={2} mt={10}>
        {title}
      </Box>
      <Container
        maxW="container.md"
        display="flex"
        gridGap={5}
        flexDir="column"
        borderStyle="solid"
        border="2px"
        borderRadius={5}
        p={5}
      >
        <Box display="flex" gridGap={10} flexWrap="wrap">
          <Text fontWeight="bold">
            {description.map((value, index) => {
              return <Box key={index}>{value}</Box>
            })}
          </Text>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          flexDir="row"
          gridGap={5}
          gridColumnGap={{ base: 20 }}
          justifyContent={{ base: 'center', md: 'space-between' }}
        >
          {children}
        </Box>
      </Container>
    </>
  )
}
export default GalleryItem
