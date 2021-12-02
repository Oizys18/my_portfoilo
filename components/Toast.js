import { useToast } from '@chakra-ui/react'
function Toast({
  id,
  title,
  position = 'top-right',
  description,
  variant = 'solid',
  status = 'success',
  duration = 6000
}) {
  const toast = useToast()
  if (!toast.isActive(id)) {
    toast({
      id: id,
      title: title,
      description: description,
      variant: variant,
      position: position,
      status: status,
      duration: duration,
      isClosable: true
    })
  }
}

export default Toast
