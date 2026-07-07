'use client'

import React, { useState, Fragment } from 'react'
import LinkBtn from '../ui/LinkBtn'
import Image from 'next/image'
import logoApp from '@/assets/images/logos/logo.png'
import Setting from '../setting/Setting'
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'

const navLinks = [
  { href: '/dasboard/feed', iconClass: 'bx bx-home-alt-3', label: 'Home' },
  { href: '/dasboard/collaborations', iconClass: 'bx bx-group', label: 'Collaborations' },
  { href: '/dasboard/inbox', iconClass: 'bx bx-inbox', label: 'Inbox' },
]

const SidebarContent = ({ onNavigate }) => (
  <>
    <div className="flex w-full flex-col items-center justify-center gap-10">
      <Image src={logoApp} alt="Astel logo" />
      <div className="flex w-full flex-col gap-2">
        {navLinks.map((link) => (
          <div key={link.href} onClick={onNavigate}>
            <LinkBtn href={link.href} iconClass={link.iconClass} label={link.label} />
          </div>
        ))}
      </div>
    </div>
    <Setting />
  </>
)

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Tombol hamburger, cuma muncul < md */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-gray-900 md:hidden"
      >
        <i className="bx bx-menu text-2xl text-gray-700 dark:text-gray-200"></i>
      </button>

      {/* Sidebar statis, cuma muncul >= md */}
      <section className="fixed left-0 top-0 z-50 hidden h-screen flex-col justify-between bg-white px-6 py-6 shadow-sm dark:bg-gray-900 md:flex">
        <SidebarContent />
      </section>

      {/* Drawer mobile, cuma jalan < md */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={setIsOpen} className="relative z-50 md:hidden">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="ease-in duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <DialogPanel className="fixed left-0 top-0 flex h-screen w-72 max-w-[80vw] flex-col justify-between bg-white px-6 py-6 shadow-lg dark:bg-gray-900">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close sidebar"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
              <SidebarContent onNavigate={() => setIsOpen(false)} />
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  )
}

export default Sidebar