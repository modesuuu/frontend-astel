"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const LinkBtn = ({ href, iconClass, label }) => {
  const pathname = usePathname();
  const normalizedHref = href.endsWith("/") ? href.slice(0, -1) : href;
  const isActive = pathname === normalizedHref || pathname.startsWith(`${normalizedHref}/`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-1.5 rounded-md px-2 py-2 transition-colors select-none ${
        isActive ? "text-primary" : "text-black hover:text-primary"
      }`}
    >
      <i className={`text-2xl ${iconClass}`}></i>
      <span className="text-base font-medium">{label}</span>
    </Link>
  )
}

export default LinkBtn