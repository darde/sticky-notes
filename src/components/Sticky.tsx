import React, { useState, ChangeEvent, MouseEvent } from 'react'
import styled from 'styled-components'

const StickyHeader = styled.div`
  width: 100%;
  height: 36px;
  background: #f2e966;
`

const StickyBody = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #f3ec95;
`

const StickyForm = styled.textarea`
  width: 100%;
  height: calc(100% - 36px);
  border: none;
  outline: none;
  background: none;
  padding: 7px;
  font-family: Open-Sans, Helvetica, Sans-Serif;
`

type StickyProps = {
  content: string;
  handleOnChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void
}

const Sticky = ({ content, handleOnChange }: StickyProps) => {
  return (
    <StickyBody data-no-dnd="true">
      <StickyHeader />
      <StickyForm value={content} onChange={handleOnChange} />
    </StickyBody>
  )
}

export default Sticky
