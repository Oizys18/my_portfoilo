import { Image, Container, Box } from '@chakra-ui/react'
import TextCard from '../components/text-card'
import TimeCard from '../components/time-card'
import SkillCard from '../components/skill-card'
import Toast from '../components/Toast'
import workExperience from '../lib/json/work-experience.json'
import timeline from '../lib/json/timeline.json'
import skills from '../lib/json/skills.json'
import Tag from '../components/Tag'

const Page = () => {
  Toast({
    title: '방문해주셔서 감사합니다!',
    description: '우측 상단의 터미널 이용해보세요',
    status: 'success',
    duration: '5000',
    id: 'index-toast'
  })
  return (
    <Container maxW="container.md" mt={10} mb={20}>
      <Box>
        <Box align="left" pl={5} pos="absolute" top={100}>
          <Image
            width={150}
            height={150}
            borderRadius={5}
            alt="profile-image"
            src="/images/profile.png"
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
      </Box>

      <Box fontWeight="bold" fontSize="2xl" mt={10} mb={5}>
        교육 및 경험
      </Box>
      {workExperience ? (
        workExperience.map(data => {
          return (
            <TextCard
              key={data.title}
              title={data.title}
              duration={data.duration}
              description={data.description}
            />
          )
        })
      ) : (
        <>No Data</>
      )}

      <Box fontWeight="bold" fontSize="2xl" mt={10} mb={5}>
        타임라인
      </Box>
      {timeline ? (
        timeline.map((value, index) => {
          return <TimeCard key={index} year={value.year} data={value.data} />
        })
      ) : (
        <>No data</>
      )}

      <Box mt={10} mb={5}>
        <Box fontWeight="bold" fontSize="2xl">
          기술스택
        </Box>
        <Box fontSize="sm" display="flex" gridGap={1.5}>
          <Box>개발 경험 및 사용빈도:</Box>
          <Tag colorScheme="green" size="sm" variant="solid" text="상" />/
          <Tag colorScheme="orange" size="sm" variant="solid" text="중" />/
          <Tag colorScheme="red" size="sm" variant="solid" text="하" />
        </Box>
      </Box>
      {skills ? (
        skills.map((skill, index) => {
          return (
            <SkillCard
              key={index}
              category={skill.category}
              data={skill.data}
            />
          )
        })
      ) : (
        <>No data</>
      )}
    </Container>
  )
}
export default Page
