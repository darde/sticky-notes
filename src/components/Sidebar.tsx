import React from 'react'
import styled from 'styled-components'
import ThumbNote from './utils/ThumbNote'

const SidebarStyled = styled.div`
  width: 110px;
  height: 80%;
  position: fixed;
  left: 0;
  top: 10%;
  padding: 25px 5px;
  display: flex:
  justify-content: center;
  align-items:  center;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1000;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  box-shadow: 3px 3px 7px 4px rgba(0,0,0,0.3);
`

type SidebarProps = {
  createNote: () => void
}

const Sidebar = ({ createNote }: SidebarProps) => {

  return (
    <SidebarStyled>
      <ThumbNote handleOnClick={createNote} />
    </SidebarStyled>
  )
}

export default Sidebar
