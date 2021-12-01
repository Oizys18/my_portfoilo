import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()

  return (
    <IconButton
      aria-label="Toggle Theme"
      colorScheme={useColorModeValue('red', 'orange')}
      icon={useColorModeValue(<SunIcon />, <MoonIcon />)}
      onClick={toggleColorMode}
    />
  )
}

export default ThemeToggleButton
