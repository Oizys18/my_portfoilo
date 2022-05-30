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
  all: unset;
  /* width: 40px; */
  border: 2px solid black;
  border-radius: 5px;
  text-align: center;
  padding: 2px 5px;
  font-size: 1.1rem;
  margin: 2px;
  color: #333;
  background-color: #fff;
  outline: none;
  &:focus {
    border: 2px solid green;
  }
`
