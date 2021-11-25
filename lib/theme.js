import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
const styles = {
  global: props => ({
    html: {
      padding: 'none',
      margin: 'none'
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

const components = {}
const config = {
  initialColorMode: 'light',
  useSystemColorMode: false
}
const fonts = {
  body: 'Noto Sans KR'
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
const theme = extendTheme({ fonts, styles, components, config, colors })

export default theme
