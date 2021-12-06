import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import '@fontsource/noto-sans-kr'
import '@fontsource/open-sans'

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
    },
    input: {
      all: 'unset'
    }
  })
}

const components = {}
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}
const fonts = {
  body: 'Noto Sans KR, Open Sans'
}
const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#fff'
}
const theme = extendTheme({ fonts, styles, components, config, colors })

export default theme
