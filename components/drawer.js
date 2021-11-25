import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'
import { useEffect } from 'react'
import Loading from './loading'

const CustomDrawer = ({
  placement = 'top',
  isOpen,
  onClose,
  children,
  setLoading
}) => {
  useEffect(() => {
    setLoading(false)
  }, [])

  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  )
}

export default Loading(CustomDrawer)
