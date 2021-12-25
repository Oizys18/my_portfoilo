import styled from 'styled-components'

import Video from './video'

const VideoContainer = ({ videoRef, videoSrc, setDuration }) => {
  return (
    <Wrapper className="video">
      {videoSrc && (
        <VideoView>
          <Video
            videoRef={videoRef}
            videoSrc={videoSrc}
            setDuration={setDuration}
          />
        </VideoView>
      )}
    </Wrapper>
  )
}
export default VideoContainer

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
`
const VideoView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
