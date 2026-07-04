import React from 'react'

const Input = ({type = "text", placeholder = "", ...rest}) => {
  return (
    <>
    <input
        type={type} placeholder={placeholder} {...rest}
        className="p-3 w-full rounded-full bg-transparent border border-gray-300 focus:outline-none dark:text-white dark:border-gray-700"
    />
    </>
  )
}

export default Input