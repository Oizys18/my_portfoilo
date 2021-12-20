import styled from 'styled-components'
// 시간 입력, 00~59 입력 가능
const TimeInput = ({ name, value, onChange }) => {
  return (
    <CustomInput
      placeholder="00"
      maxLength={2}
      type="number"
      pattern="[0-9]"
      min="00"
      max="59"
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}
export default TimeInput

const CustomInput = styled.input`
  width: 60px;
  height: 100%;
  border: 1px solid black;
  border-radius: 0;
  border-bottom: 1px solid #ccc;
  text-align: center;
  padding: 0;
  font-size: 1.5rem;
  color: #333;
  background-color: #fff;
  outline: none;
  &:focus {
    border-bottom: 1px solid #000;
  }
`
