import React from 'react'
import { Link } from 'react-router-dom'

const Button = () => {
  return (
    <button className='bg-sky-500 px-2 py-1 rounded text-white'>
        <Link to="/getstarted" className='bg-sky-500 px-2 py-1 rounded text-white'>
            Get started
        </Link>
    </button>
  )
}

export default Button
