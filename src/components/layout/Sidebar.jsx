import React from 'react'
import LinkBtn from '../ui/LinkBtn'
import Image from 'next/image'
import logoApp from '@/assets/images/logos/logo.png'
import Setting from '../setting/Setting'

const Sidebar = () => {
  return (
    <section className="fixed left-0 top-0 z-40 flex h-screen  flex-col justify-between bg-white px-6 py-6 shadow-sm">
      <div className="flex w-full flex-col items-center justify-center gap-10">
        <Image src={logoApp} alt="Astel logo" />
        <div className="flex w-full flex-col gap-2">
          <LinkBtn href="/dasboard/feed" iconClass="bx bx-home-alt-3" label="Home" />
          <LinkBtn href="/dasboard/collaborations" iconClass="bx bx-group" label="Collaborations" />
          <LinkBtn href="/dasboard/inbox" iconClass="bx bx-inbox" label="Inbox" />
        </div>
      </div>
      <Setting />
    </section>
  )
}

export default Sidebar