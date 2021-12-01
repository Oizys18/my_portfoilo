import styled from 'styled-components'

// checkType에 따라 체크모양 애니메이션
const CustomCheckBox = ({
  size,
  color,
  checkType,
  checkedColor,
  borderColor,
  animate
}) => {
  return (
    <Wrapper>
      <CheckBox
        checkType={checkType}
        size={size}
        color={color}
        checkedColor={checkedColor}
        borderColor={borderColor}
        animate={animate}
        type="checkbox"
      ></CheckBox>
    </Wrapper>
  )
}
export default CustomCheckBox

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 0;
`

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  border: 1px solid ${props => props.borderColor ?? 'transparent'};
  border-radius: 100%;
  background: ${props => props.color ?? 'red'};
  z-index: 1;
  transition: 0.2s ease-in-out;
  &:checked {
    border-radius: 100%;
    background: ${props => props.checkedColor ?? 'black'};
    width: 20px;
    height: 20px;
  }
`
