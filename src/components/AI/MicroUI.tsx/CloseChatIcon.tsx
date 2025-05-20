import React from 'react'

type CloseChatIconProps = {
   setChatIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const CloseChatIcon = ({setChatIsOpen} : CloseChatIconProps) => {
  return (
    <div className="text-white flex justify-end mb-[5px]">
      <i className="fa-solid fa-circle-xmark text-[20px] hover:rotate-180 hover:translate-y-[-1px] hover:scale-105 hover:text-[#277c78] transition1 cursor-pointer"
        onClick={() => setChatIsOpen(false)} />
    </div>
  )
}

export default CloseChatIcon