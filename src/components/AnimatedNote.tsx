import React from 'react'
import styled from 'styled-components'

const width = 190
const height = 190

const AnimatedNoteStyled = styled.div`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
  background: #f3ec95;
  bottom: 10px;
  left: calc(50% - 95px);
  box-shadow: -1px 16px 10px -10px rgba(0,0,0,0.47);
  animation-name: spin;
  animation-duration: 400ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  &::before {
    position: absolute;
    content: '';
    width: 100%;
    height: 20%;
    background: #f2e966;
  }

  @keyframes spin {
    from {
        transform:rotate(0deg) scale(1);
    }
    to {
        transform:rotate(360deg) scale(0.4);
    }
  }
`

const AnimatedNote = () => {
  return (
    <AnimatedNoteStyled />
  )
}

export default AnimatedNote