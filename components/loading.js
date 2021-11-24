import React, { useState } from 'react'
import { Box, keyframes } from '@chakra-ui/react'

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Loading = WrappedComponent => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(true)
    const spinAnimation = `${spin} infinite 1s linear`

    return (
      <>
        {isLoading && (
          <Box
            pos="absolute"
            width="100vw"
            height="100vh"
            top="0"
            left="0"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            bgColor="black"
            opacity="0.8"
            zIndex="10"
          >
            <Box
              as="div"
              width="50px"
              height="50px"
              borderRadius="full"
              animation={spinAnimation}
              display="inline-block"
              border="3px solid rgba(255, 255, 255, 0.5)"
              borderTopColor="#fff"
            />
          </Box>
        )}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    )
  }
  return HOC
}
export default Loading
