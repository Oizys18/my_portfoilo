import { Drawer, DrawerOverlay, DrawerContent } from '@chakra-ui/react'

const CustomDrawer = ({ placement = 'bottom', isOpen, onClose, children }) => {
  return (
    <>
      <Drawer
        placement={placement}
        onClose={onClose}
        isOpen={isOpen}
        closeOnEsc
      >
        <DrawerOverlay />
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  )
}

export default CustomDrawer
