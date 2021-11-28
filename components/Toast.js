import { useToast } from '@chakra-ui/react'
function Toast({
  id,
  title,
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
      position: 'top-right',
      status: status,
      duration: duration,
      isClosable: true
    })
  }
}

export default Toast
