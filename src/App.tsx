import React, { useState } from 'react';
import { MouseSensor, useSensor, DndContext, DragEndEvent, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { Draggable } from './components/Draggable';
import { Droppable } from './components/Droppable';
import BoardBackground from './assets/img/cork-bg.jpeg'
import { NoteType } from './types';
import GlobalStyle from './globalStyles';


const notesData: NoteType[] = [
  {
    id: "1",
    content: "Study English",
    pos: { x: 0, y: 0 }
  },
  {
    id: "2",
    content: "Find a job",
    pos: { x: 10, y: 10 }
  }
];

function App() {
  const [notes, setNotes] = useState<NoteType[]>(notesData)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    }
  })

  const sensors = useSensors(mouseSensor)
  
  function handleDragEnd(ev: DragEndEvent) {
    const { active: { id }, delta } = ev
    const activeNote = notes.find((note) => note.id === id.toString())!;
    
    setNotes([
      ...notes.filter((note) => note.id !== id),
      {
        ...activeNote,
        pos: {
          x: activeNote.pos.x + delta.x,
          y: activeNote.pos.y + delta.y
        }
      }
    ])
  }

  function handleOnChangeContent(id: string, value: string) {
    console.log('id: ', id, ', value: ', value)
    const activeNote = notes.find((note) => note.id === id)!;

    setNotes([
      ...notes.filter((note) => note.id !== id),
      {
        ...activeNote,
        content: value,
      }
    ])
  }

  return (
    <>
      <GlobalStyle />
      <DndContext
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
        sensors={sensors}
      >
        <Droppable bg={BoardBackground}>
          {
            notes.map(note =>
              <Draggable
                pos={note.pos}
                key={note.id}
                id={note.id}
                content={note.content}
                handleOnChange={handleOnChangeContent}
              />
            )
          }
          
        </Droppable>
      </DndContext>
    </>
  )
}

export default App