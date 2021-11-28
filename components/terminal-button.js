import { IconButton, keyframes, useColorModeValue } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const OpenTerminalButton = ({ onOpen }) => {
  const pulseBlack = keyframes`
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
  `
  const pulseWhite = keyframes` 
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
    }
    
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
    }
    
    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
    }
  `
  const pulse = useColorModeValue(pulseBlack, pulseWhite)
  return (
    <IconButton
      onClick={onOpen}
      aria-label="Toggle Terminal"
      colorScheme="blue"
      icon={<ChatIcon />}
      animation={`${pulse} infinite 1s `}
    />
  )
}
export default OpenTerminalButton
