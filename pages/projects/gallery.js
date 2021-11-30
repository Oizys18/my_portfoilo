import { Container } from '@chakra-ui/react'
import { useState } from 'react'
import Toggle from '../../components/Toggle'
import GalleryItem from '../../components/gallery-item'
import CheckBox from '../../components/checkbox'

const Gallery = () => {
  return (
    <Container
      maxW="container.md"
      display="flex"
      justify="center"
      flexWrap="wrap"
      p={3}
      borderRadius={8}
    >
      <GalleryItem
        title="Toggle"
        description={[
          'Styled-component(SCSS), ::before와 ::after를 활용해 만들었다.',
          `배경색과 내부 텍스트, 원의 색을 설정할 수 있다.`
        ]}
      >
        <Toggle
          setChecked={() => {}}
          left="공개"
          right="비밀"
          leftColor="#000000CC"
          rightColor="#000000CC"
          leftBgColor="#5F96FC"
          rightBgColor="#EA5454"
          leftCircleColor="#ffffff"
          rightCircleColor="#ffffff"
        />
        <Toggle
          setChecked={() => {}}
          left="Yes"
          right="No"
          leftBgColor="#098486"
          rightBgColor="#D62828"
          leftCircleColor="#ffffffCC"
          rightCircleColor="#ffffffCC"
        />
        <Toggle
          setChecked={() => {}}
          left="공개"
          right="비밀"
          leftColor="white"
          rightColor="white"
          leftBgColor="#005F73"
          rightBgColor="#002C3D"
          leftCircleColor="#000000"
          rightCircleColor="#ffffff"
        />
        <Toggle
          setChecked={() => {}}
          left="공개"
          right="비밀"
          leftColor="white"
          rightColor="white"
          leftBgColor="#005F73"
          rightBgColor="#002C3D"
          leftCircleColor="#000000"
          rightCircleColor="#ffffff"
        />
      </GalleryItem>

      <GalleryItem
        title="CheckBox"
        description={[
          'Styled-components(SCSS), svg를 사용해 클릭시 애니메이션을 추가했다.'
        ]}
      >
        <CheckBox color="orange"></CheckBox>
        <CheckBox></CheckBox>
        <CheckBox></CheckBox>
        <CheckBox></CheckBox>
        <CheckBox></CheckBox>
      </GalleryItem>
    </Container>
  )
}
export default Gallery
