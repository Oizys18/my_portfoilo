import { Image } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Container, Box } from '@chakra-ui/react'

const Burger = () => {
  useEffect(() => {
    window.addEventListener('mousemove', mouseIsMoving)
    return () => {
      window.removeEventListener('mousemove', mouseIsMoving)
    }
  }, [])

  const mouseIsMoving = e => {
    if (screen.width > 800 && document.getElementById('FlyingBurger')) {
      var hamX = document.getElementById('FlyingBurger').offsetLeft
      var hamY = document.getElementById('FlyingBurger').offsetTop
      var x = (hamX - e.pageX) * 0.1
      var y = (hamY - e.pageY) * 0.1
      document.getElementById('FlyingBurger').style.transform =
        'translate(' + x + 'px' + ',' + y + 'px)'
    }
  }

  return (
    <Container>
      <Box mt={50} display="block" id="FlyingBurger">
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
