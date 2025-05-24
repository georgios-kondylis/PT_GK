import React from 'react'
import { useState } from 'react'

type ChatIconProps = {
  setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const ChatIcon = ({setChatIsOpen} : ChatIconProps ) => {
  return (
     <div className='flex w-fit items-end gap-[10px] group transition1 cursor-pointer'
          onClick={() => setChatIsOpen(true)}>
      <img className='w-[70px]' src="/icons/chat.png" alt="Chat Icon" />
      
      <div className='relative left-[-60px] mb-[9px] opacity-0 p-[6px] transition1 text-nowrap 
        bg-white rounded-md group-hover:opacity-100 group-hover:left-[3px] z-10 overflow-visible'>
        <span className='absolute h-[20px] w-[20px] bg-white left-[-4px] top-[23%] rotate-45 z-0'></span>
        <p className='text-black relative z-10'>Chat Live</p>
      </div>
    </div>
  )
}

export default ChatIcon