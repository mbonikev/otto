import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import PromptArea from '../components/PromptArea/PromptArea'

function Home() {
  return (
    <div className='w-full h-svh'>
      <Navbar />
      <div className=''></div>
      <PromptArea />
    </div>
  )
}

export default Home