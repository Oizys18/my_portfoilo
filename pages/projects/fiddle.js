import { Container } from '@chakra-ui/layout'
import useSessionStorage from '../../lib/useSessionStorage'
const Fiddle = () => {
  useSessionStorage('fiddle')
  return <Container>Fiddle</Container>
}
export default Fiddle
