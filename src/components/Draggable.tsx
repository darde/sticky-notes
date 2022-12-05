import React, { useState } from 'react';
import {useDraggable} from '@dnd-kit/core';
import { Resizable } from 're-resizable'
import styled from 'styled-components'
import Sticky from './Sticky';
import { NoteType } from '../types';


interface CardProps {
  left: number;
  top: number;
  zIndex: number;
  width: number;
  height: number;
  onClick: () => void;
}

const Card = styled.div<CardProps>`
  position: absolute;
  left: ${({ left }) => `${left}px` };
  top: ${({ top }) => `${top}px` };
  z-index: ${({ zIndex }) => zIndex };
  width: ${({ width }) => `${width}px` };
  height: ${({ height }) => `${height}px` };
`

type DraggableProps = NoteType & {
  handleOnChange: (id: string, value: string) => void;
  handleResizing: () => void;
  handleOnClick: () => void;
  resizing: boolean;
}

export function Draggable({
  pos,
  id,
  content,
  handleOnChange,
  resizing,
  handleResizing,
  handleOnClick,
}: DraggableProps) {
  const [size, setSize] = useState({ width: 190, height: 190 })
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });
  
  const style = transform && !resizing ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

  return (
    <Card
      ref={setNodeRef}
      style={style}
      left={pos.x}
      top={pos.y}
      zIndex={pos.z}
      width={size.width}
      height={size.height}
      onClick={handleOnClick}
      {...listeners}
      {...attributes}
    >
      <Resizable
        size={{ width: size.width, height: size.height }}
        style={{ boxShadow: '-1px 16px 10px -10px rgba(0,0,0,0.47)' }}
        onResizeStart={() => handleResizing()}
        onResizeStop={(e, direction, ref, d) => {
          setSize({
            width: size.width + d.width,
            height: size.height + d.height,
          })
          handleResizing()
        }}
      >
        <Sticky content={content} handleOnChange={(ev) => handleOnChange(id, ev.target.value)} />
      </Resizable>
    </Card>
  )
}
