import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      // bg: mode('#f0e7db', '#202023')(props)
      bg: mode('#ffffff', '#20202080')(props)
    }
  })
}

const components = {
  Heading: {}
}
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ styles, components, config })

export default theme
