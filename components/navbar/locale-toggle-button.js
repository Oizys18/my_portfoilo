import { IconButton, Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'

const LocaleToggleButton = () => {
  const router = useRouter()
  const { locale } = router
  const handleLocale = () => {
    if (locale === 'ko') return 'en'
    else return 'ko'
  }
  return (
    <NextLink href={router.pathname} locale={handleLocale()}>
      <IconButton>
        <Box>{locale.toUpperCase()}</Box>
      </IconButton>
    </NextLink>
  )
}
export default LocaleToggleButton
