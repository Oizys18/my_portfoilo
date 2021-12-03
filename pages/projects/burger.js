import { Image } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Container, Box, Text } from '@chakra-ui/react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const Burger = () => {
  const { t } = useTranslation('projects')
  const isMobile = () => {
    if (typeof window !== 'undefined') {
      return (
        <>
          {'ontouchstart' in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
            ? t('burger-mobile')
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
    // const cheese = new Cheese(0, 0, 10, 10)
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

      <Box display="block" id="FlyingBurger" justify="center" align="center">
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

// class Cheese {
//   constructor(x, y, speed, direction) {
//     this.x = x
//     this.y = y
//     this.speed = speed
//     this.direction = direction

//     console.log(this.x, this.y, this.speed, this.direction)
//   }
// }

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['projects']))
  }
})
