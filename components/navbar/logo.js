import { Box, useColorModeValue } from '@chakra-ui/react'
const Logo = () => {
  const hoverColor = useColorModeValue('black', 'white')
  return (
    <Box
      fontSize={25}
      fontWeight="bold"
      transition="0.2s"
      color={useColorModeValue('#00000090', '#ffffff90')}
      _hover={{
        color: hoverColor,
        textShadow: 'none'
      }}
      as="cite"
    >
      this.self
    </Box>
  )
}
export default Logo
