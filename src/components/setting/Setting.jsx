import React from 'react'
import LinkBtn from '../ui/LinkBtn'
import LogoutBtn from '../ui/LogoutBtn'

const Setting = () => {
  return (
    <div className="flex flex-col gap-5 w-fit">
        <h1 className="text-sm font-medium text-secondary">Setting</h1>
        <div className="flex flex-col gap-4">
            <LinkBtn href="/profile/me" iconClass="bx bx-user-circle" label="Profile" />
            <LogoutBtn />
        </div>
    </div>
  )
}

export default Setting