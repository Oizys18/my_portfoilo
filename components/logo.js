import { Box, useColorModeValue } from '@chakra-ui/react'
const Logo = () => {
  return (
    <Box
      textShadow={useColorModeValue('3px 3px #00000050', '3px 3px #ffffff50')}
    >
      YCW
    </Box>
  )
}
export default Logo
