import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function PromptArea() {
  return (
    <div className='w-full h-fit flex flex-col gap-3 p-3'>
      <div className='w-full max-w-[800px] mx-auto h-[120px] rounded-[25px] shadow-lg ring-1 ring-stone-200'>
        <TextArea />
      </div>
      <h1 className='text-xs font-normal text-dark-text-weak w-fit mx-auto'>Otto can make mistakes. still in beta.</h1>
    </div>
  )
}

export default PromptArea