import React from 'react'

function PromptArea() {
  return (
    <div className='w-full h-fit p-4 flex flex-col gap-3'>
      <div className='w-full max-w-[800px] mx-auto h-[120px] rounded-[30px] shadow-lg ring-1 ring-stone-300'></div>
      <h1 className='text-xs font-normal text-dark-text-weak w-fit mx-auto'>ChatGPT can make mistakes. Check important info.</h1>
    </div>
  )
}

export default PromptArea