import styled from 'styled-components'

const Video = ({ videoSrc, videoRef }) => {
  return (
    <Wrapper>
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
  min-width: 600px;
  min-height: 300px;
  max-height: 500px;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
