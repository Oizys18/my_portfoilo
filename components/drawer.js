import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'

const CustomDrawer = ({ placement, isOpen, onClose, children }) => {
  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  )
}

export default CustomDrawer
