import React from 'react'
import "../assets/styles/components/card.scss"

const Card = ({children}) => {
  return (
    <div className='card'>
        {children}
        </div>
  )
}

export default Card;