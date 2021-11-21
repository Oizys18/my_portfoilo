import { IconButton } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const OpenTerminalButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      aria-label="Open Terminal"
      icon={<ChatIcon />}
    />
  )
}
export default OpenTerminalButton
