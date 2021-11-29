import { Tag, TagLabel } from '@chakra-ui/react'

const CustomTag = ({ size, variant, colorScheme, text }) => {
  return (
    <Tag size={size} variant={variant} colorScheme={colorScheme}>
      <TagLabel>{text}</TagLabel>
    </Tag>
  )
}

export default CustomTag
