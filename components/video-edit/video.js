import styled from 'styled-components'
import { Box } from '@chakra-ui/react'
const Video = ({ videoSrc, videoRef }) => {
  return (
    <Wrapper maxW="container.xl">
      {videoSrc && (
        <VideoScreen className="video" preload="auto" controls ref={videoRef}>
          <source src={videoSrc} />
        </VideoScreen>
      )}
    </Wrapper>
  )
}
export default Video

const VideoScreen = styled.video`
  width: 100%;
  height: 100%;
  max-width: 50vw;
  max-height: 40vh;
`

const Wrapper = styled(Box)`
  width: 100%;
  height: 100%;
`
