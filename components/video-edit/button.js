import styled from 'styled-components'
// 버튼
const Button = props => {
  return (
    <ButtonWrapper
      color={props.color}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </ButtonWrapper>
  )
}
export default Button

const ButtonWrapper = styled.button`
  width: 100px;
  height: 30px;
  border: 1px solid #000;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 12px;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: #000;
    color: #fff;
  }
`
