import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from '../components/theme-toggle-button'
import OpenTerminalButton from '../components/terminal-button'

const LinkItem = ({ href, path, children }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900')
  return (
    <NextLink href={href}>
      <Link
        p={2}
        bg={active ? 'glassTeal' : undefined}
        color={active ? '#202023' : inactiveColor}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = ({ path, drawerController }) => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      zIndex={1}
    >
      <Container
        display="flex"
        p={2}
        maxW="100%"
        wrap="wrap"
        align="center"
        justify="flex-end"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <LinkItem href="/" path={path}>
              YCW
            </LinkItem>
          </Heading>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, nmd: 0 }}
        >
          <Link p={2} href="https://github.com/Oizys18" target="_blank">
            Github
          </Link>
          <Link p={2} href="https://oizys.tistory.com/" target="_blank">
            DevBlog
          </Link>
        </Stack>
        <Stack
          align="right"
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          mt={{ base: 4, nmd: 0 }}
        >
          <ThemeToggleButton />
          <OpenTerminalButton onOpen={drawerController} />
        </Stack>
        <Menu>
          <Stack
            justifyContent="right"
            display={{ base: 'flex', md: 'none' }}
            direction={{ base: 'row', md: 'none' }}
            width={{ base: 'full', md: 'auto' }}
          >
            <ThemeToggleButton />
            <OpenTerminalButton onOpen={drawerController} />
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              right
              aria-label="Options"
            />
          </Stack>
          <MenuList>
            <MenuItem
              as={Link}
              target="_blank"
              href="https://github.com/Oizys18"
              path={path}
            >
              Github
            </MenuItem>
            <MenuItem
              as={Link}
              target="_blank"
              href="https://oizys.tistory.com/"
              path={path}
            >
              DevBlog
            </MenuItem>
          </MenuList>
        </Menu>
      </Container>
    </Box>
  )
}

export default Navbar
