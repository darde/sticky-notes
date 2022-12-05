import React, { useState } from 'react'
import {useDroppable} from '@dnd-kit/core';
import styled from 'styled-components'
import RecicleBin from './assets/recicle-bin.png'

const GarbageStyle = styled.div`
  width: 120px;
  height: 140px;
  background: #ccc;
  position: fixed;
  bottom: 0;
  left: calc(50% - 30px);
  background: url(${RecicleBin}) 0 0 no-repeat;
  background-size: cover;
`

type GarbageProps = {
  children: React.ReactNode;
}

const Garbage = ({ children }: GarbageProps) => {
  const {isOver, setNodeRef} = useDroppable({
    id: 'garbage',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  
  return (
    <GarbageStyle ref={setNodeRef} style={style}>
      {children}
    </GarbageStyle>
  )
}

Garbage.propTypes = {}

export default Garbage
