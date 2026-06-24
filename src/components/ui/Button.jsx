import React from 'react'

const Button = ({ children, className = "", type = "button", ...rest }) => {
  return (
    <button
      type={type}
      className={`w-full px-4 py-3 flex items-center justify-center rounded-full font-medium text-white bg-primary hover:bg-blue-700 active:scale-[0.98] transition-all focus:outline-none cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button