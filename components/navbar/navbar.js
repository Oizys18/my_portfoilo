import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
import OpenTerminalButton from './terminal-button'
import AchievementIconButton from './achievement-toggle-button'
import GithubIconButton from './github-button'
import BlogIconButton from './blog-button'
import Logo from './logo'

const Navbar = ({
  path,
  onTerminalOpen,
  isTerminalOpen,
  onAchievementOpen,
  isAchievementOpen
}) => {
  return (
    <Box pos="fixed" as="nav" w="100%" bg="transparent" zIndex={1}>
      <Container
        p={3}
        display="flex"
        maxW="container.xl"
        wrap="wrap"
        justify="center"
      >
        <Box
          display="flex"
          align="center"
          mr={5}
          width={{ base: 'full', md: 'auto' }}
        >
          <NextLink href="/">
            <Link _hover={{ textDecoration: 'none' }}>
              <Logo />
            </Link>
          </NextLink>
        </Box>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, nmd: 0 }}
        >
          <GithubIconButton />
          <BlogIconButton />
        </Stack>
        <Stack
          align="right"
          alignItems="center"
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          mt={{ base: 4, nmd: 0 }}
        >
          <AchievementIconButton
            isOpen={isAchievementOpen}
            onOpen={onAchievementOpen}
          />
          <ThemeToggleButton />
          <OpenTerminalButton isOpen={isTerminalOpen} onOpen={onTerminalOpen} />
        </Stack>
        <Menu>
          <Stack
            alignItems="center"
            justifyContent="right"
            display={{ base: 'flex', md: 'none' }}
            direction={{ base: 'row', md: 'none' }}
            width={{ base: 'full', md: 'auto' }}
          >
            <ThemeToggleButton />
            <OpenTerminalButton onOpen={onTerminalOpen} />
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
