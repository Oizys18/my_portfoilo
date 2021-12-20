import styled from 'styled-components'
import { Button } from '@chakra-ui/react'
import Video from './video'

const VideoContainer = ({ videoRef, videoSrc, setDuration }) => {
  const onPlayClick = () => {
    // 영상 재생 및 일시정지
    if (videoRef.current === null) return
    if (videoRef.current.paused) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }
  return (
    <Wrapper className="video">
      {videoSrc && videoRef ? (
        <VideoView>
          <Video
            videoRef={videoRef}
            videoSrc={videoSrc}
            setDuration={setDuration}
          />
          <VideoController>
            <Button onClick={onPlayClick}>play</Button>
          </VideoController>
        </VideoView>
      ) : (
        <></>
      )}
    </Wrapper>
  )
}
export default VideoContainer

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem;
`
const VideoView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const VideoController = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-top: 1rem;
`
