import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const styles = {
  global: props => ({
    html: {
      padding: 'none',
      margin: 'none',
      height: '90vh',
      width: '100vw'
    },
    body: {
      padding: 'none',
      margin: 'none',
      height: '100vh',
      width: '100vw',
      bg: mode('#ffffff', '#202023')(props)
    }
  })
}

const components = {
  Heading: {}
}
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}
const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff',
  what: '#2fff',
  gray: {
    50: '#f7fafc',
    900: '#171923'
  }
}
const theme = extendTheme({ styles, components, config, colors })

export default theme
