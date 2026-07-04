"use client";
import React, { useState } from "react";
import "@boxicons/core"

const PasswordInput = ({placeholder = "Password", ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword((prev) => !prev);
    };
  return (
    <div className="flex items-center justify-between border border-gray-300 rounded-full p-3 dark:border-gray-700">
        <input 
            type={showPassword ? "text" : "password"} 
            placeholder={placeholder} 
            className="rounded-full bg-transparent focus:outline-none dark:text-white dark:border-gray-700"
            {...rest}
        />

        <button
          type="button"
          onClick={toggleVisibility}
          className="dark:text-slate-400 focus:outline-none flex items-center justify-center cursor-pointer"
        >
          <i className={showPassword ? "bx bx-eye-alt text-2xl" : "bx bx-eye-slash text-2xl"}></i>
        </button>
    </div>
  )
}

export default PasswordInput