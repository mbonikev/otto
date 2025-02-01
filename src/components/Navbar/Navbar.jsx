import React from 'react'

function Navbar() {
  return (
    <div className='w-full h-[50px] bg-emerald-300 grid grid-cols-3'>
        {/* 1 */}
        <div className='flex items-center justify-start gap-1'></div>
        {/* 2 */}
        <div className='flex items-center justify-center gap-1'></div>
        {/* 3 */}
        <div className='flex items-center justify-end gap-1'></div>
    </div>
  )
}

export default Navbar