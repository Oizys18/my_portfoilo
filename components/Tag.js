import { Tag, TagLabel } from '@chakra-ui/react'

const CustomTag = ({ size, variant, colorScheme, text, textColor }) => {
  return (
    <Tag size={size} variant={variant} colorScheme={colorScheme}>
      <TagLabel color={textColor}>{text}</TagLabel>
    </Tag>
  )
}

export default CustomTag
