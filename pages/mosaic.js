import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box } from '@chakra-ui/layout'
import { useEffect } from 'react'
import Image from 'next/image'

const drawMosaic = () => {
  const canvas = document.getElementById('mosaic-canvas')
  // canvas.style=
}
const Mosaic = () => {
  const themeColor = useColorModeValue('#ffffff', '#000000')
  useEffect(() => {
    // drawMosaic(themeColor)
  }, [])
  return (
    <Box
      id="mosaic-canvas"
      width="100vw"
      height="100vh"
      pos="absolute"
      top={0}
      left={0}
    >
      <Image src="/images/profile.png" layout="fill" alt="Mosaic-Image"></Image>
    </Box>
  )
}

export default Mosaic
