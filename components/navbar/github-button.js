import { DiGithubAlt } from 'react-icons/di'
import { Icon, useColorModeValue, Link } from '@chakra-ui/react'

const GithubIconButton = () => {
  const hoverColor = useColorModeValue('black', 'white')
  return (
    <Link href="https://github.com/Oizys18" target="_blank">
      <Icon
        display="block"
        w={8}
        h={8}
        as={DiGithubAlt}
        transition="0.3s"
        color={useColorModeValue('#00000050', '#ffffff50')}
        _hover={{ color: hoverColor }}
      />
    </Link>
  )
}

export default GithubIconButton
