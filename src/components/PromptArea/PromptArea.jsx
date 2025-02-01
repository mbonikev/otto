import React from 'react'

function PromptArea() {
  return (
    <div className='w-full h-[120px] p-4'>
      <div className='w-full max-w-[800px] h-full rounded-3xl shadow-lg ring-1 ring-stone-300'></div>
      <h1 className='text-xs font-normal text-dark-text-weak'>ChatGPT can make mistakes. Check important info.</h1>
    </div>
  )
}

export default PromptArea