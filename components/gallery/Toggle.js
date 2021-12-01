import React from 'react'
import styled from 'styled-components'

export default function Toggle({
  size,
  noText,
  leftText,
  rightText,
  leftColor,
  rightColor,
  leftBgColor,
  rightBgColor,
  leftCircleColor,
  rightCircleColor,
  setChecked
}) {
  const Sizes = size => {
    let sizes = {
      size: 'lg',
      width: '5em',
      height: '2em',
      circle: '1.8em',
      fontSize: 'medium'
    }
    switch (size) {
      case 'md':
        sizes.size = 'md'
        sizes.width = '3.8em'
        sizes.height = '1.6em'
        sizes.circle = '1.4em'
        sizes.fontSize = 'small'
        return sizes
      case 'sm':
        sizes.size = 'sm'
        sizes.width = '2.3em'
        sizes.height = '1.1em'
        sizes.circle = '1em'
        sizes.fontSize = 'small'
        return sizes
    }
    return sizes
  }
  return (
    <Wrapper>
      <CheckBox
        sizes={Sizes(size)}
        noText={noText}
        leftText={size === 'sm' ? '' : leftText}
        rightText={size === 'sm' ? '' : rightText}
        leftColor={leftColor}
        rightColor={rightColor}
        leftBgColor={leftBgColor}
        rightBgColor={rightBgColor}
        leftCircleColor={leftCircleColor}
        rightCircleColor={rightCircleColor}
        onChange={() => setChecked()}
        type="checkbox"
      />
    </Wrapper>
  )
}
// checkbox wrapper
const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  z-index: 0;
`

const CheckBox = styled.input`
  z-index: 1;
  width: ${props => props.sizes.width};
  height: ${props => props.sizes.height};
  background: ${props => props.leftBgColor ?? '#00000050'};
  border-radius: ${props => props.sizes.height};
  /* 선택X 텍스트 */
  ::before {
    position: absolute;
    display: flex;
    content: '${props => (props.noText ? '' : props.leftText)}';
    width: ${props => props.sizes.width};
    height: ${props => props.sizes.height};
    padding: 0 0 0 calc(${props => props.sizes.circle} / 2);
    align-items: center;
    justify-content: flex-start;
    color: ${props => props.leftColor ?? '#ffffff'};
    font-weight: bold;
    font-size: ${props => props.sizes.fontSize};
    /* 텍스트 트랜지션 */
    transition: all 0.2s ease-in-out;
  }
  /* 선택X 원 */
  ::after {
    position: relative;
    content: '';
    display: block;
    width: ${props => props.sizes.circle};
    height: ${props => props.sizes.circle};
    top: calc(
      (${props => props.sizes.height} - ${props => props.sizes.circle}) / 2
    );
    left: calc(
      ${props => props.sizes.width} - ${props => props.sizes.circle} - 0.1em
    );
    border-radius: 50%;
    background: ${props => props.leftCircleColor ?? '#ffffff'};
    /* 원 이동 트랜지션 */
    transition: all 0.2s ease-in-out;
  }
  &:checked {
    background: ${props => props.rightBgColor ?? '#000000'};
    /* 배경색 변경 트랜지션 */
    transition: all 0.2s ease-in-out;
    /* 선택 O 텍스트 */
    ::before {
      position: absolute;
      width: ${props => props.sizes.width};
      height: ${props => props.sizes.height};
      padding: 0 0 0 2em;
      content: '${props => (props.noText ? '' : props.rightText)}';
      font-weight: bold;
      justify-content: center;
      font-size: ${props => props.sizes.fontSize};
      color: ${props => props.rightColor ?? '#ffffff'};
    }
    /* 선택 O 원 */
    ::after {
      content: '';
      z-index: 2;
      top: calc(
        (${props => props.sizes.height} - ${props => props.sizes.circle}) / 2
      );
      left: calc(
        (${props => props.sizes.height} - ${props => props.sizes.circle}) / 2
      );
      width: ${props => props.sizes.circle};
      height: ${props => props.sizes.circle};
      display: block;
      position: relative;
      border-radius: 50%;
      background: ${props => props.rightCircleColor ?? '#ffffff'};
    }
  }
`
