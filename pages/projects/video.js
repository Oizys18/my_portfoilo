import VideoContainer from '../../components/video-edit/video-container'
import { Button } from '@chakra-ui/react'
import styled from 'styled-components'
import Upload from '../../components/video-edit/upload'
import TimeInput from '../../components/video-edit/time-input'
import { useRef, useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Loading from '../../components/loading'

const ffmpeg = createFFmpeg({
  log: true,
  corePath: '/ffmpeg-core/dist/ffmpeg-core.js'
  // corePath: "./node_modules/@ffmpeg/core/ffmpeg-core.js",
})

const Page = ({ setLoading }) => {
  const videoRef = useRef(null)
  const inputRef = useRef(null)
  const [video, setVideo] = useState(null)
  const [duration, setDuration] = useState(null)
  const [videoSrc, setVideoSrc] = useState(null)
  const [inputs, setInputs] = useState({
    sMinute: '00',
    sSecond: '00',
    eMinute: '00',
    eSecond: '00'
  })
  const { sMinute, sSecond, eMinute, eSecond } = inputs
  console.log(sMinute, sSecond, eMinute, eSecond)
  // 영상 업로드 및 길이 확인
  console.log(duration)
  useEffect(() => {
    if (video === null) {
      setVideoSrc(null)
      return
    }
    const fetchVideo = async () => {
      const url = await URL.createObjectURL(video)
      setVideoSrc(url)
      return url
    }
    const url = fetchVideo()
    // 영상 onseeked, 변경 시 이미지 생성
    function getVideoImage(path, secs, callback) {
      var me = this
      var target_video = document.createElement('video')
      target_video.onloadedmetadata = function () {
        // 영상 총길이 1시간 이상 일 경우 예외처리
        if (target_video.duration > 3600) {
          alert(
            '영상의 총 길이가 1시간을 넘습니다.' +
              '\n { ' +
              intTimeToStr(target_video.duration) +
              ' }'
          )
          setVideo(null)
          return
        }
        console.log(target_video.duration)
        setDuration(target_video.duration)
        if ('function' === typeof secs) {
          secs = secs(this.duration)
        }
        this.currentTime = Math.min(
          Math.max(0, (secs < 0 ? this.duration : 0) + secs),
          this.duration
        )
      }
      target_video.onseeked = function (e) {
        var canvas = document.createElement('canvas')
        canvas.height = target_video.videoHeight
        canvas.width = target_video.videoWidth
        var ctx = canvas.getContext('2d')
        ctx.drawImage(target_video, 0, 0, canvas.width, canvas.height)
        var img = new Image()
        img.src = canvas.toDataURL()
        callback.call(me, img, this.currentTime, e)
      }
      target_video.onerror = function (e) {
        callback.call(me, undefined, undefined, e)
      }
      target_video.src = path
    }

    // secs 초단위 영상 이미지 확인 및 저장
    async function showImageAt(secs) {
      var duration
      getVideoImage(
        await url,
        function (totalTime) {
          duration = totalTime
          return secs
        },
        function (img, secs, event) {
          if (event.type == 'seeked') {
            // set img style and append
            img.style = 'height:200px; object-fit:cover;'
            document.getElementById('image-preview').appendChild(img)
            if (duration >= ++secs) {
              showImageAt(secs)
            }
          }
        }
      )
    }
    showImageAt(0)
  }, [video])

  // 값 추출 및 설정
  const onChange = e => {
    const { value, name } = e.target
    if (videoRef.current === null) return
    const [dMinute, dSecond] = intTimeToStr(duration)

    switch (name) {
      case 'sMinute':
        if (Number(value) > dMinute) return
        if (Number(value) > eMinute) {
          setEndMinute(Number(value))
        }
        break
      case 'sSecond':
        if (Number(value) > eSecond) return
        break
      case 'eMinute':
        if (Number(value) > dMinute) return
        break
      case 'eSecond':
        if (eMinute == dMinute && Number(value) > dSecond) return
        break
    }
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  // ffmpeg 로드
  const load = async () => {
    await ffmpeg.load()
  }
  useEffect(() => {
    load().catch(er => console.log(er))
    setLoading(false)
  }, [])

  // 영상 크롭 및 다운로드
  const onExtractClick = async () => {
    if (!video) {
      alert('No video selected')
      return
    }
    if (sMinute > eMinute || (sMinute == eMinute && sSecond > eSecond)) {
      alert('시작 시간이 종료 시간보다 클 수 없습니다.')
      return
    }
    // 영상 편집 시작 (로딩 스피너 시작 시점)
    setLoading(true)
    try {
      const timestamp = String(Date.now())
      ffmpeg.FS(
        'writeFile',
        `${timestamp}.mp4`,
        await fetchFile(URL.createObjectURL(video))
      )

      const start = `00:${sMinute.padStart(2, '0')}:${sSecond.padStart(2, '0')}`

      const end = `00:${eMinute.padStart(2, '0')}:${eSecond.padStart(2, '0')}`
      await ffmpeg.run(
        '-ss',
        `${start}`,
        '-i',
        `${timestamp}.mp4`,
        '-to',
        `${end}`,
        '-acodec',
        'libmp3lame',
        '-vcodec',
        'libx264',
        'output.mp4'
      )
      // 편집 결과물 파일로 변환 및 다운로드
      const data = ffmpeg.FS('readFile', 'output.mp4')
      const url = URL.createObjectURL(
        new Blob([data.buffer], { type: 'video/mp4' })
      )
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.style.display = 'none'
      downloadLink.download = video['name']
      document.body.appendChild(downloadLink)
      downloadLink.click()
      // 파이어폭스
      setTimeout(() => {
        URL.revokeObjectURL(downloadLink.href)
        downloadLink.parentNode.removeChild(downloadLink)
      }, 0)
    } catch (err) {
      alert(err)
    }
    setLoading(false)
  }

  // 초 단위 시간 값 변환
  const intTimeToStr = time => {
    const padStr = (string, pad, length) => {
      return (new Array(length + 1).join(pad) + string).slice(-length)
    }
    const hour = Math.floor(time / 3600)
    const minute = Math.floor(time / 60)
    const second = Math.floor(time - minute * 60)
    const result_time = [padStr(minute, '0', 2), padStr(second, '0', 2)]
    if (hour > 0) return [padStr(hour, '0', 2), ...result_time]
    return result_time
  }

  // 최초 영상 길이 저장
  useEffect(() => {
    const [minute, second] = intTimeToStr(duration)
    setInputs({ ...inputs, eMinute: minute, eSecond: second })
  }, [duration])

  // 시작 시간 설정
  const handleSetStart = () => {
    if (videoRef.current === null) {
      alert('No video selected')
      return
    }
    const [minute, second] = intTimeToStr(videoRef.current.currentTime)
    if (minute > eMinute) setInputs({ ...inputs, eMinute: minute })
    setInputs({
      ...inputs,
      sMinute: minute,
      sSecond: second
    })
  }

  // 종료 시간 설정
  const handleSetEnd = () => {
    if (videoRef.current === null) {
      alert('No video selected')
      return
    }
    const [minute, second] = intTimeToStr(videoRef.current.currentTime)
    if (minute < sMinute) setInputs({ ...inputs, sMinute: minute })
    setInputs({
      ...inputs,
      eMinute: minute,
      eSecond: second
    })
  }

  // 영상 업로드 버튼 클릭
  const onInputClick = () => {
    inputRef.current.click()
    inputRef.current.value = ''
  }

  // 리셋, 재 업로드
  const onReset = () => {
    setVideo(null)
    setVideoSrc(null)
    document.getElementById('image-preview').innerHTML = ''
  }
  return (
    <Wrapper>
      <VideoWrapper>
        <VideoContainer video={video} videoRef={videoRef} videoSrc={videoSrc} />
        {!video && <Button onClick={onInputClick}>Upload</Button>}
        <Upload inputRef={inputRef} setVideo={setVideo} />
      </VideoWrapper>

      {video && (
        <ControllerWrapper>
          <StartController>
            <Button onClick={handleSetStart}>시작</Button>
            <TimeController>
              <TimeInput name="sMinute" value={sMinute} onChange={onChange} />
              <TimeInput name="sSecond" value={sSecond} onChange={onChange} />
            </TimeController>
          </StartController>
          <EndController>
            <Button onClick={handleSetEnd}>종료</Button>
            <TimeController>
              <TimeInput name="eMinute" value={eMinute} onChange={onChange} />
              <TimeInput name="eSecond" value={eSecond} onChange={onChange} />
            </TimeController>
          </EndController>
          <Button onClick={onExtractClick}>구간저장</Button>
          <Button onClick={onReset}>재업로드</Button>
        </ControllerWrapper>
      )}
      <PreviewWrapper id="image-preview" />
    </Wrapper>
  )
}
export default Loading(Page)

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const VideoWrapper = styled.div`
  width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 0 100px 0;
`
const ControllerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 1em;
`

const TimeController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StartController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`

const EndController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1em;
`

const PreviewWrapper = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: row;
  background: #222222;
  overflow-x: scroll;
  width: 100vw;
  bottom: 0;
`
