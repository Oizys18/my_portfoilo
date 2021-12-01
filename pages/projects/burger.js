import { useEffect } from 'react'
import Image from 'next/image'
import { Container, Box } from '@chakra-ui/react'
import BurgerImage from '../../public/images/burger.png'

const myLoader = ({ src, width, quality }) => {
  return `/images/burger.png`
  return `https://example.com/${src}?w=${width}&q=${quality || 75}`
}

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
          src={BurgerImage}
          layout="responsive"
          width={400}
          height={400}
          alt="burgerImage"
        />
      </Box>
    </Container>
  )
}
export default Burger
