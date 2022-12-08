import React, { useState } from 'react'
import {useDroppable} from '@dnd-kit/core';
import styled from 'styled-components'
import RecicleBin from './assets/recicle-bin.png'
import  RecicleBinFull from './assets/recicle-bin-full-yellow.png'

const GarbageStyle = styled.div<{ isFull: boolean }>`
  width: 84px;
  height: 98px;
  background: #ccc;
  position: fixed;
  bottom: 0;
  right: 10%;
  background: url(${ ({ isFull }) => isFull ? RecicleBinFull : RecicleBin }) 0 0 no-repeat;
  background-size: cover;
`

type GarbageProps = {
  children: React.ReactNode;
  isFull: boolean;
}

const Garbage = ({ children, isFull }: GarbageProps) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'garbage',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  
  return (
    <GarbageStyle ref={setNodeRef} style={style} isFull={isFull}>
      {children}
    </GarbageStyle>
  )
}

Garbage.propTypes = {}

export default Garbage
