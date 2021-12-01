import { Image } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Container, Box, Text } from '@chakra-ui/react'

const Burger = () => {
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return (
        <>
          {'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
            ? '데스크탑에서만 작동합니다!'
            : ''}
        </>
      )
    }

    return null
  }
  useEffect(() => {
    window.addEventListener('mousemove', mouseIsMoving)
    return () => {
      window.removeEventListener('mousemove', mouseIsMoving)
    }
  }, [])

  const mouseIsMoving = e => {
    const isMobile =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    if (!isMobile && document.getElementById('FlyingBurger')) {
      var hamX = document.getElementById('FlyingBurger').offsetLeft
      var hamY = document.getElementById('FlyingBurger').offsetTop
      var x = (hamX - e.pageX) * 0.1
      var y = (hamY - e.pageY) * 0.1
      document.getElementById('FlyingBurger').style.transform =
        'translate(' + x + 'px' + ',' + y + 'px)'
    }
  }

  return (
    <Container
      mt={100}
      display="flex"
      alignItems="center"
      maxW="container.md"
      justifyContent="center"
      flexDir="column"
    >
      <Text fontSize={20} fontWeight="bold">
        {isMobile()}
      </Text>
      <Box display="block" id="FlyingBurger">
        <Image
          src="/images/burger.png"
          width={350}
          height={350}
          alt="burgerImage"
        />
      </Box>
    </Container>
  )
}
export default Burger
