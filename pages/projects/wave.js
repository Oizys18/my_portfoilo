import { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Slider,
  SliderTrack,
  SliderThumb,
  SliderFilledTrack,
  useColorModeValue
} from '@chakra-ui/react'
// import Toast from '../../components/Toast'
// import useSessionStorage from '../../lib/useSessionStorage'

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['projects']))
  }
})

const WaveProject = () => {
  const lightColor = [
    '#002C3D99',
    '#005F7399',
    '#0A939699',
    '#09848699',
    '#94D2BD99',
    '#E9D8A699',
    '#E7D49D99',
    '#EE9B0099',
    '#CA670299',
    '#B65C0299',
    '#BB3E0399',
    '#AE201299',
    '#9B222699',
    '#A61E1199',
    '#97212599'
  ]
  const darkColor = [
    '#00304999',
    '#00304999',
    '#00304999',
    '#D6282899',
    '#D6282899',
    '#D6282899',
    '#F77F0099',
    '#F77F0099',
    '#F77F0099',
    '#FCBF4999',
    '#FCBF4999',
    '#FCBF4999',
    '#EAE2B799',
    '#EAE2B799',
    '#EAE2B799'
  ]
  const themeColor = useColorModeValue(lightColor, darkColor)
  const [waveCount, setWaveCount] = useState(7)
  const [pointCount, setPointCount] = useState(7)

  useEffect(() => {
    // useEffect to Clean-up when data change
    const isMobile =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0)

    new App(themeColor, waveCount, pointCount, isMobile)
  }, [themeColor, waveCount, pointCount])

  // Toast({
  //   id: 'wave-toast-achievement',
  //   title: 'Wave 프로젝트 확인!',
  //   description: '남은 도전과제 1/5'
  // })
  // Toast({
  //   id: 'wave-toast',
  //   title: ''
  // })
  // useSessionStorage('wave')

  return (
    <>
      <Box id="wave-canvas" pos="absolute" top={0} left={0} />
      <Container mt={50} bgColor="transparent" align="center">
        <Box>
          <Box fontSize="lg" fontWeight="bold" pos="inline-block">
            Wave
          </Box>
          <Slider
            defaultValue={waveCount}
            min={3}
            max={15}
            step={1}
            onChangeEnd={val => setWaveCount(val)}
          >
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={5} bg="tomato" />
          </Slider>
        </Box>
        <Box mt={5}>
          <Box fontSize="lg" fontWeight="bold" pos="inline-block">
            Point
          </Box>
          <Slider
            defaultValue={pointCount}
            min={3}
            max={15}
            step={1}
            onChangeEnd={val => setPointCount(val)}
          >
            <SliderTrack bg="red.100">
              <Box position="relative" right={10} />
              <SliderFilledTrack bg="tomato" />
            </SliderTrack>
            <SliderThumb boxSize={5} bg="tomato" />
          </Slider>
        </Box>
      </Container>
    </>
  )
}
export default WaveProject

const Point = class {
  // 간격을 가진 좌표를 생성, 좌표의 Y값을 이동시키고
  // 각 좌표를 선으로 연결하는 것
  constructor(index, x, y, isMobile) {
    this.x = x
    this.y = y
    if (isMobile) this.fixedY = y * 1.5
    else this.fixedY = y
    this.speed = 0.07
    this.cur = index
    this.max = Math.random() * 100 + 150
  }
  update() {
    this.cur += this.speed
    this.y = this.fixedY + Math.sin(this.cur) * this.max
  }
}

const Wave = class {
  constructor(index, totalPoints, color) {
    this.index = index
    this.totalPoints = totalPoints
    this.color = color
    this.points = []
  }
  // animation 생성 시, 그리려는 애니메이션의 좌표값을 가져와야한다.
  resize(stageWidth, stageHeight, isMobile) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight

    this.centerX = stageWidth / 2
    this.centerY = stageHeight / 2
    // point의 간격, 스테이지 넓이를 총 포인트 -1 로 나눈 간격
    this.pointGap = this.stageWidth / (this.totalPoints - 1)
    this.init(isMobile)
  }
  init(isMobile) {
    this.points = []
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(
        this.index + i,
        this.pointGap * i,
        this.centerY,
        isMobile
      )
      this.points[i] = point
    }
  }
  draw(ctx) {
    ctx.beginPath()
    ctx.fillStyle = this.color
    let prevX = this.points[0].x
    let prevY = this.points[0].y

    // 처음과 마지막 포인트는 움직이지 않음
    ctx.moveTo(prevX, prevY)
    // wave 만들기
    // i = 0은 시작 부분, 흔들리지 않도록
    for (let i = 0; i < this.totalPoints; i++) {
      // 마지막 인덱스면 update()안함
      if (i < this.totalPoints - 1) {
      }
      this.points[i].update()
      // 이전값과 현재값의 중간값을 곡선의 포인트로 잡아준다.
      const cx = (prevX + this.points[i].x) / 2
      const cy = (prevY + this.points[i].y) / 2

      // 직선
      // ctx.lineTo(cx, cy)

      // 곡선
      ctx.quadraticCurveTo(prevX, prevY, cx, cy)

      prevX = this.points[i].x
      prevY = this.points[i].y
    }

    ctx.lineTo(prevX, prevY)
    ctx.lineTo(this.stageWidth, this.stageHeight)
    ctx.lineTo(this.points[0].x, this.stageHeight)
    ctx.fill()
    ctx.closePath()
  }
}

const WaveGroup = class {
  constructor(themeColor, waveCount, pointCount) {
    this.totalWaves = waveCount
    this.totalPoints = pointCount
    this.color = themeColor
    this.waves = []

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Wave(i, this.totalPoints, this.color[i])
      this.waves[i] = wave
    }
  }
  resize(stageWidth, stageHeight, isMobile) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i]
      wave.resize(stageWidth, stageHeight, isMobile)
    }
  }
  draw(ctx) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i]
      wave.draw(ctx)
    }
  }
}

const App = class {
  constructor(themeColor, WaveCount, point, isMobile) {
    // canvas 생성 혹은 재활용
    const waveCanvas = document.getElementById('wave-canvas')
    if (!waveCanvas.hasChildNodes()) {
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      waveCanvas.appendChild(this.canvas)
    } else {
      this.canvas = waveCanvas.firstElementChild
      this.ctx = this.canvas.getContext('2d')
      this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    }

    this.waveGroup = new WaveGroup(themeColor, WaveCount, point)

    // resize event
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize(isMobile)

    // animation 시작
    requestAnimationFrame(this.animate.bind(this))
  }
  resize(isMobile) {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    // canvas double size, retina 선명도
    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight

    this.waveGroup.resize(this.stageWidth, this.stageHeight, isMobile)
  }
  animate() {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)
    this.waveGroup.draw(this.ctx)
    requestAnimationFrame(this.animate.bind(this))
  }
}
