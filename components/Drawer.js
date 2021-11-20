import {
  Drawer,
  Button,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react'

const CustomDrawer = ({ placement = 'bottom', isOpen, onClose, children }) => {
  return (
    <>
      <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerHeader borderBottomWidth="1px">Terminal</DrawerHeader> */}
          {children}
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CustomDrawer
