import { useEffect } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
const Point = class {
  // 간격을 가진 좌표를 생성, 좌표의 Y값을 이동시키고
  // 각 좌표를 선으로 연결하는 것
  constructor(index, x, y) {
    this.x = x
    this.y = y
    this.fixedY = y
    this.speed = 0.07
    this.cur = index
    this.max = Math.random() * 100 + 150
  }
  update() {
    this.cur += this.speed
    this.y = this.fixedY + Math.sin(this.cur) * this.max
  }
}

const Tide = class {
  constructor(index, totalPoints, color) {
    this.index = index
    this.totalPoints = totalPoints
    this.color = color
    this.points = []
  }
  // animation 생성 시, 그리려는 애니메이션의 좌표값을 가져와야한다.
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth
    this.stageHeight = stageHeight

    this.centerX = stageWidth / 2
    this.centerY = stageHeight / 2
    // point의 간격, 스테이지 넓이를 총 포인트 -1 로 나눈 간격
    this.pointGap = this.stageWidth / (this.totalPoints - 1)
    this.init()
  }
  init() {
    this.points = []
    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(this.index + i, this.pointGap * i, this.centerY)
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
      // ctx.lineTo(cx, cy);

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
  constructor(themeColor) {
    this.totalWaves = 5
    this.totalPoints = 7
    // this.color = [
    //   'rgba(0,199,235,0.4)',
    //   'rgba(0,146,199,0.4)',
    //   'rgba(0,87,158,0.4)',
    //   'rgba(30,45,102,0.6)'
    // ]
    this.color = themeColor

    this.waves = []

    for (let i = 0; i < this.totalWaves; i++) {
      const wave = new Tide(i, this.totalPoints, this.color[i])
      this.waves[i] = wave
    }
  }
  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.totalWaves; i++) {
      const wave = this.waves[i]
      wave.resize(stageWidth, stageHeight)
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
  constructor(themeColor) {
    // canvas 생성
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    const waveCanvas = document.getElementById('wave-canvas')
    waveCanvas.innerHTML = ''
    waveCanvas.appendChild(this.canvas)

    this.waveGroup = new WaveGroup(themeColor)

    // resize event
    window.addEventListener('resize', this.resize.bind(this), false)
    this.resize()

    // animation 시작
    requestAnimationFrame(this.animate.bind(this))
  }
  resize() {
    this.stageWidth = document.body.clientWidth
    this.stageHeight = document.body.clientHeight

    // canvas double size, retina 선명도
    this.canvas.width = this.stageWidth
    this.canvas.height = this.stageHeight
    this.ctx.scale(1, 1)

    this.waveGroup.resize(this.stageWidth, this.stageHeight)
  }
  animate() {
    // canvas clear
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight)

    this.waveGroup.draw(this.ctx)

    requestAnimationFrame(this.animate.bind(this))
  }
}

const Wave = () => {
  const lightColor = [
    'rgba(0,199,235,0.4)',
    'rgba(0,146,199,0.4)',
    'rgba(0,87,158,0.4)',
    'rgba(30,45,102,0.6)',
    'rgba(30,45,102,0.6)'
  ]
  const darkColor = [
    '#003049CC',
    '#D62828CC',
    '#F77F00CC',
    '#FCBF49CC',
    '#EAE2B766'
  ]
  const themeColor = useColorModeValue(lightColor, darkColor)
  useEffect(() => {
    new App(themeColor)
  }, [themeColor])
  return (
    <Box
      id="wave-canvas"
      width="100vw"
      height="100vh"
      pos="absolute"
      top={0}
      left={0}
    />
  )
}
export default Wave
