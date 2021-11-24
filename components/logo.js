import { Box, useColorModeValue } from '@chakra-ui/react'
const Logo = () => {
  const hoverColor = useColorModeValue('black', 'white')
  return (
    <Box
      pl={5}
      pr={5}
      fontSize="2.5rem"
      textShadow={useColorModeValue('8px 8px #00000030', '8px 8px #ffffff30')}
      transition="0.2s"
      color={useColorModeValue('#00000090', '#ffffff90')}
      _hover={{
        color: hoverColor,
        textShadow: 'none'
      }}
    >
      YCW
    </Box>
  )
}
export default Logo
