import { Image, Container, Box } from '@chakra-ui/react'
import TextCard from '../components/index/text-card'
import TimeCard from '../components/index/time-card'
import SkillCard from '../components/index/skill-card'
import Toast from '../components/Toast'
import Tag from '../components/Tag'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import workExperienceKr from '../public/locales/ko/work-experience.json'
import timelineKr from '../public/locales/ko/timeline.json'
import skillsKr from '../public/locales/ko/skills.json'
import workExperienceEn from '../public/locales/en/work-experience.json'
import timelineEn from '../public/locales/en/timeline.json'
import skillsEn from '../public/locales/en/skills.json'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common']))
  }
})

const Page = () => {
  const { locales = [], defaultLocale, ...nextRouter } = useRouter()
  const locale = locales.includes(nextRouter.locale || '')
    ? nextRouter.locale
    : defaultLocale

  const workExperience = locale === 'ko' ? workExperienceKr : workExperienceEn
  const skills = locale === 'ko' ? skillsKr : skillsEn
  const timeline = locale === 'ko' ? timelineKr : timelineEn

  const { t } = useTranslation('common')

  Toast({
    title: t('index-toast-title'),
    description: t('index-toast-description'),
    status: 'success',
    duration: '5000',
    id: 'index-toast',
    position: 'top-right'
  })

  return (
    <Container maxW="container.md" mb={20}>
      <Box>
        <Box align="left" pl={5} pos="absolute" top={{ base: 24, md: 20 }}>
          <Image
            width={{ base: 100, md: 150 }}
            height={{ base: 100, md: 150 }}
            borderRadius={5}
            alt="profile-image"
            src="/images/profile.png"
          />
        </Box>
        <Box
          bgColor="#003049CC"
          pb={5}
          mt={{ base: 12, md: 20 }}
          borderRadius={3}
          align="right"
          color="white"
        >
          <Container maxW="container.md">
            <Box as="h2" fontSize="2xl" fontWeight="bold" pt={3}>
              {t('index-name')}
            </Box>
          </Container>
          <Container maxW="container.md" pt={4} fontSize="lg">
            <Box>{t('index-job')}</Box>
          </Container>
        </Box>
      </Box>

      <Box fontWeight="bold" fontSize="2xl" mt={10} mb={5}>
        {t('index-work')}
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
        {t('index-timeline')}
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
          {t('index-techstack')}
        </Box>
        <Box fontSize="sm" display="flex" gridGap={1.5} flexWrap="wrap">
          <Box>{t('index-techExp')}:</Box>
          <Tag
            colorScheme="green"
            size="sm"
            variant="solid"
            text={t('index-high')}
          />
          /
          <Tag
            colorScheme="orange"
            size="sm"
            variant="solid"
            text={t('index-mid')}
          />
          /
          <Tag
            colorScheme="red"
            size="sm"
            variant="solid"
            text={t('index-low')}
          />
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
