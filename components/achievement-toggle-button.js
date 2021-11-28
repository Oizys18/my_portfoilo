import { IconButton, useColorModeValue } from '@chakra-ui/react'
import { AiFillTrophy } from 'react-icons/ai'

const AchievementIconButton = ({ onOpen }) => {
  const hoverColor = useColorModeValue('black', 'white')
  return (
    <IconButton
      onClick={onOpen}
      colorScheme="yellow"
      icon={<AiFillTrophy fontSize={25} />}
      color={useColorModeValue('#00000050', '#ffffff50')}
      _hover={{ color: hoverColor }}
    />
  )
}

export default AchievementIconButton
