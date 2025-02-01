import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import PromptArea from '../components/PromptArea/PromptArea'

function Home() {
  return (
    <div className='w-full h-svh flex flex-col'>
      <Navbar />
      <div className='w-full flex-1'></div>
      <PromptArea />
    </div>
  )
}

export default Home