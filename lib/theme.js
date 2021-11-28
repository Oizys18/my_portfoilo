import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    'html,body': {
      height: '100vh',
      width: '100%',
      bg: mode('#ffffff', '#202023')(props),
      '&::-webkit-scrollbar': {
        width: '2px'
      },
      '&::-webkit-scrollbar-track': {
        width: '2px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: mode('black', 'white')(props),
        borderRadius: '12px'
      }
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
