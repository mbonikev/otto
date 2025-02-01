import React from 'react'

function Tooltip({children}) {
  return (
    <div className='h-fit w-fit relative'>{children}</div>
  )
}

export default Tooltip