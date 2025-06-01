import React from 'react'

type MainButtonProps = {
  size: 'small' | 'medium' | 'large'
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

const sizeClasses = {
  small: 'px-3 py-1 text-sm rounded-[4px]',
  medium: 'px-4 py-[7px] text-base rounded-[7px]',
  large: 'px-6 py-3 text-lg rounded-[9px]',
}

const MainButton = ({ size, onClick, children, className }: MainButtonProps) => {
  return (
    <button onClick={onClick}
      className={`mainButton ${sizeClasses[size]} ${className ?? ''}`}
    >
      {children}
    </button>
  )
}

export default MainButton

// Example

//  <MainButton size='medium' onClick={() => setModalOpen(prev => !prev)}>
//     Yo click me
//  </MainButton> 