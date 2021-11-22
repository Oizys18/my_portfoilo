import { IconButton } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const OpenTerminalButton = ({ onOpen }) => {
  return (
    <IconButton
      onClick={onOpen}
      aria-label="Toggle Terminal"
      colorScheme="blue"
      icon={<ChatIcon />}
    />
  )
}
export default OpenTerminalButton
