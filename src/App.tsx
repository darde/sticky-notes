import React, { useState } from 'react';
import { MouseSensor, useSensor, DndContext, DragEndEvent, DragOverlay, useSensors } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { Draggable } from './components/Draggable';
import { Droppable } from './components/Droppable';
import Garbage from './components/Garbage'
import BoardBackground from './assets/img/cork-bg.jpeg'
import AnimatedNote from './components/AnimatedNote';
import { NoteType } from './types';
import GlobalStyle from './globalStyles';


const notesData: NoteType[] = [
  {
    id: "1",
    content: "Study English",
    pos: { x: 0, y: 0, z: 1 },
  },
  {
    id: "2",
    content: "Find a job",
    pos: { x: 10, y: 10, z: 2 },
  },
  {
    id: "3",
    content: "Buy a car",
    pos: { x: 100, y: 100, z: 3 },
  }
];

function App() {
  const [notes, setNotes] = useState<NoteType[]>(notesData)
  const [resizing, setResizing] = useState<boolean>(false)
  const [garbageAnimation, setGarbageAnimation] = useState(false)
  const [garbageFull, setGarbageFull] = useState(false)
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    }
  })
  const sensors = useSensors(mouseSensor)
  
  function handleDragEnd(ev: DragEndEvent) {
    if (resizing) {
      return
    }

    const { active: { id }, delta, over } = ev
    const activeNote = notes.find((note) => note.id === id.toString())!;
    
    if (over?.id === 'garbage') {
      setNotes([
        ...notes.filter(note => note.id !== id),
      ])
      callGarbageAnimation()
      return
    }

    setNotes([
      ...notes.filter((note) => note.id !== id),
      {
        ...activeNote,
        pos: {
          ...activeNote.pos,
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

  function handleResizing() {
    setResizing(!resizing)
  }

  function handleStackOrder(id: string) {
    if (notes.length <=1) {
      return
    }

    const activeNote = notes.find(note => note.id === id)

    if (activeNote) {
      let topStackNote = activeNote

      notes.forEach(note => {
        if (note.pos.z > topStackNote.pos.z) {
          topStackNote = note
        }
      })

      if (topStackNote.id === activeNote.id) {
        return
      }

      const topZindex = topStackNote.pos.z

      setNotes([
        ...notes.filter(note => note.id !== activeNote.id && note.id !== topStackNote.id),
        {
          ...topStackNote,
          pos: {
            ...topStackNote.pos,
            z: activeNote.pos.z
          }
        },
        {
          ...activeNote,
          pos: {
            ...activeNote.pos,
            z: topZindex
          }
        },
      ])
    }
  }

  function callGarbageAnimation() {
    setGarbageAnimation(true)
    setTimeout(() => {
      setGarbageAnimation(false)
      setGarbageFull(true)
    }, 400)
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
                handleOnClick={() => handleStackOrder(note.id)}
                content={note.content}
                resizing={resizing}
                handleResizing={handleResizing}
                handleOnChange={handleOnChangeContent}
              />
            )
          }
        </Droppable>
        <Garbage  isFull={garbageFull}>
          {garbageAnimation && <AnimatedNote />}
        </Garbage>
      </DndContext>
    </>
  )
}

export default App