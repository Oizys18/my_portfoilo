import { FaSteam } from 'react-icons/fa'
import { Icon, useColorModeValue, Link } from '@chakra-ui/react'

const SteamIconButton = () => {
  const hoverColor = useColorModeValue('black', 'white')
  return (
    <Link href="https://steamcommunity.com/id/shark2011/" target="_blank">
      <Icon
        display="block"
        w={6}
        h={6}
        as={FaSteam}
        transition="0.3s"
        color={useColorModeValue('#00000050', '#ffffff50')}
        _hover={{ color: hoverColor }}
      />
    </Link>
  )
}

export default SteamIconButton
