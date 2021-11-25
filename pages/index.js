import { Image, Container, Box } from '@chakra-ui/react'
const Page = () => {
  return (
    <Container maxW="container.md" mt={10}>
      <Box align="left" ml={5} pos="absolute" top={100}>
        <Image
          borderRadius={5}
          src="/images/profile.png"
          alt="profile-image"
          height={150}
          width={150}
        />
      </Box>
      <Box
        bgColor="#003049CC"
        pb={5}
        mt={110}
        borderRadius={3}
        align="right"
        color="white"
      >
        <Container maxW="container.md">
          <Box as="h2" fontSize="4xl" fontWeight="bold" pt={3}>
            양찬우
          </Box>
        </Container>
        <Container maxW="container.md" pt={5} fontSize="lg">
          <Box>프론트엔드 개발자 / 작가 / 크리에이터</Box>
        </Container>
      </Box>

      <Container fontWeight="bold" fontSize="2xl" mt={10}>
        교육 및 경험
      </Container>

      <Container maxW="container.md" mt={3}>
        <Box
          display="flex"
          flexDir={{ base: 'column', md: 'row' }}
          // justifyContent="space-between"
        >
          <Box
            display="flex"
            flexDir="column"
            w={{ base: '100%', md: '40%' }}
            mr={10}
            bgColor="#00000020"
            p={3}
          >
            <Box aria-label="we-title">삼성청년SW아카데미 2기</Box>
            <Box aria-label="we-duration">(2019.07~2020.06)</Box>
          </Box>
          <Box fontSize="sm" pt={{ base: 3, md: 0 }}>
            <p>컴퓨터 공학 및 웹 전반에 대한 학습</p>
            <p>약 1600시간의 알고리즘 및 팀프로젝트 개발경험</p>
            <p>리액트, 뷰 등의 js프레임워크를 이용한 웹개발 프로젝트 경험</p>
            <p>애자일 방법론, MVP 개발, JIRA 등을 활용한 팀프로젝트 경험</p>
            <p>삼성 청년 SW 아카데미 1학기 관통프로젝트 최우수상</p>
            <p>Blind date with a movie : CLUE</p>
            <p>삼성 청년 SW 아카데미 팀 프로젝트 우수상 분실둥실</p>
            <p>삼성 청년 SW 아카데미 최종프로젝트 우수상 아로새김</p>
          </Box>
        </Box>
      </Container>

      <Container maxW="container.md" mt={3}>
        <Box display="flex" flexDir={{ base: 'column', md: 'row' }}>
          <Box
            display="flex"
            flexDir="column"
            w={{ base: '100%', md: '40%' }}
            mr={10}
            bgColor="#00000020"
            p={3}
          >
            <Box aria-label="we-title">Django 공식문서 번역</Box>
            <Box aria-label="we-duration"></Box>
          </Box>
          <Box fontSize="sm" pt={{ base: 3, md: 0 }}>
            <p>https://docs.djangoproject.com/</p>
            <p>Django 프레임워크 공식문서 로컬라이징 참여</p>
          </Box>
        </Box>
      </Container>
    </Container>
  )
}
export default Page
