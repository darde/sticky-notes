import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import styled from 'styled-components'

const Board = styled.div<{ bg: string | undefined }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${({ bg }) => bg ? `url(${ bg }) 0 0 repeat` : '#3d2b14'};
`

type Props = {
  children?: React.ReactNode
  bg?: string;
}

export function Droppable({ children, bg }: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };
  
  
  return (
    <Board ref={setNodeRef} style={style} bg={bg}>
      {children}
    </Board>
  );
}