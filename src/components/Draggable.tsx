import React, { ChangeEvent } from 'react';
import {useDraggable} from '@dnd-kit/core';
import styled from 'styled-components'
import Sticky from './Sticky';
import { NoteType } from '../types';

interface CardProps {
  left: number;
  top: number;
}

const Card = styled.div<CardProps>`
  position: absolute;
  left: ${({ left }) => `${left}px` };
  top: ${({ top }) => `${top}px` };
  width: 190px;
  height: 190px;
  box-shadow: -1px 16px 10px -10px rgba(0,0,0,0.47);
`

type DraggableProps = NoteType & {
  handleOnChange: (id: string, value: string) => void
}

export function Draggable({ pos, id, content, handleOnChange }: DraggableProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id,
  });
  
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

  return (
    <Card ref={setNodeRef} style={style} left={pos.x} top={pos.y} {...listeners} {...attributes}>
      <Sticky content={content} handleOnChange={(ev) => handleOnChange(id, ev.target.value)} />
    </Card>
  );
}
