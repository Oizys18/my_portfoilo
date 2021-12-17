import styled from 'styled-components'
import { Button, Image } from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'

const ffmpeg = createFFmpeg({
  log: true,
  corePath: '/ffmpeg-core/dist/ffmpeg-core.js'
  // corePath: "./node_modules/@ffmpeg/core/ffmpeg-core.js",
})

const Video = ({}) => {
  const load = async () => {
    await ffmpeg.load()
  }

  useEffect(() => {
    load().catch(er => console.log(er))
  }, [])

  const [video, setVideo] = useState(null)
  const [url, setUrl] = useState(null)
  const inputRef = useRef(null)
  const videoRef = useRef(null)

  const onInputClick = () => {
    inputRef.current.click()
    inputRef.current.value = ''
  }
  const onChangeHandler = file => {
    if (!(file.type == 'video/mp4' || file.type == 'video/quicktime')) {
      alert('mov, mp4 확장자만 업로드 가능합니다.')
    } else {
      const url = URL.createObjectURL(file)
      setVideo(file)
      setUrl(url)
      const videoBlob = URL.createObjectURL(file)
    }
  }

  const onPlayClick = () => {
    if (videoRef.current === null) return

    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }

  return (
    <Wrapper className="video">
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        name="file"
        accept=".mp4,.quicktime"
        required
        onChange={({
          target: {
            validity,
            files: [file]
          }
        }) => {
          validity.valid && onChangeHandler(file)
        }}
      />
      {url ? (
        <VideoContainer>
          <VideoScreen preload="auto" controls={false} ref={videoRef}>
            <source src={url} />
          </VideoScreen>
          <Button onClick={onPlayClick}>play</Button>
        </VideoContainer>
      ) : (
        <Button color="lightblue" onClick={onInputClick}>
          Upload
        </Button>
      )}
    </Wrapper>
  )
}
export default Video

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
`
const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const VideoScreen = styled.video`
  width: 100%;
  height: 100%;
  min-width: 600px;
  min-height: 300px;
  max-height: 500px;
`
