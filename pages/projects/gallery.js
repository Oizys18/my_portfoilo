import { Container } from '@chakra-ui/react'
import Toggle from '../../components/gallery/Toggle'
import GalleryItem from '../../components/gallery/gallery-item'
import CheckBox from '../../components/gallery/checkbox'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['projects']))
  }
})

const Gallery = () => {
  return (
    <Container
      maxW="container.md"
      display="flex"
      justify="center"
      flexWrap="wrap"
      borderRadius={8}
      p={3}
    >
      <GalleryItem
        title="Toggle"
        description={[
          'Styled-component(SCSS), ::before와 ::after를 활용해 만들었다.',
          '텍스트,원,배경의 색과 크기, 텍스트 등을 설정할 수 있다.'
        ]}
      >
        <Toggle
          size="sm"
          setChecked={() => {}}
          noText={false}
          leftColor="#000000CC"
          rightColor="#000000CC"
          leftBgColor="#5F96FC"
          rightBgColor="#EA5454"
          leftCircleColor="#ffffff"
          rightCircleColor="#ffffff"
        />
        <Toggle
          size="md"
          setChecked={() => {}}
          leftText="Yes"
          rightText="No"
          leftBgColor="#098486"
          rightBgColor="#D62828"
          leftCircleColor="#ffffffCC"
          rightCircleColor="#ffffffCC"
        />
        <Toggle
          setChecked={() => {}}
          size="lg"
          leftText="공개"
          rightText="비밀"
          leftColor="#000000CC"
          rightColor="white"
          leftBgColor="#999999"
          rightBgColor="#55CC"
          leftCircleColor="#00000050"
          rightCircleColor="#99CC"
        />
        <Toggle
          size="md"
          setChecked={() => {}}
          noText={true}
          leftColor="white"
          rightColor="white"
          leftBgColor="#999999"
          rightBgColor="#000000"
          leftCircleColor="#ffffff"
          rightCircleColor="#ffffff"
        />
      </GalleryItem>

      <GalleryItem
        title="CheckBox"
        description={[
          'Styled-components(SCSS), svg를 사용해 클릭시 애니메이션을 추가했다.'
        ]}
      >
        <CheckBox color="#ff0000" />
        <CheckBox color="#CC0000" />
        <CheckBox color="#EE9B00" />
        <CheckBox color="#098486" />
        <CheckBox color="#002C3D" />
      </GalleryItem>
    </Container>
  )
}
export default Gallery
