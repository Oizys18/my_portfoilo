import { useState } from 'react'
import styled from 'styled-components'

// 로딩 HOC
const Loading = Component => {
  const HOC = props => {
    const [isLoading, setLoading] = useState(true)
    return (
      <>
        {isLoading && (
          <LoadingContainer>
            <Spinner></Spinner>
          </LoadingContainer>
        )}
        <Component {...props} setLoading={setLoading} />
      </>
    )
  }
  return HOC
}

export default Loading

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;

  justify-content: center;
  align-items: center;
`

const Spinner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 5px solid #fff;
  border-top-color: #000;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`
