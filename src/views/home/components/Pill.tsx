import React from 'react'

type PillProps = {
  status: string;
}

const Pill = ({status}: PillProps) => {
  
  return (
    <div className={`pill ${status === 'completed' ? 'pillCompleted' : 'pillActive'}`}>{status}</div>
  )
}

export default Pill