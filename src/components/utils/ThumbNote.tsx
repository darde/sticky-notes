import React from 'react'
import styled from 'styled-components'

const ThumbNoteStyled = styled.div`
  position: relative;
  width: 90px;
  height: 90px;
  background: #f3ec95;
  box-shadow: -1px 16px 10px -10px rgba(0,0,0,0.47);
  transform: rotate(6deg);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    width: 90px;
    height: 18px;
    background: #f2e966;
  }
`

const Button =  styled.button`
  border: 0;
`

type ThumbNoteProps = {
  handleOnClick: () => void
}

const ThumbNote = ({ handleOnClick }: ThumbNoteProps) => {

  return (
    <Button  onClick={handleOnClick}>
      <ThumbNoteStyled />
    </Button>
  )
}

export default ThumbNote
