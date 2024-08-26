import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const NavBar = () => {
  return (
    <nav className='w-full bg-[#C5A27C] fixed top-0 flex justify-between min-h-[60px] items-center px-4'>
      <div className='flex justify-between items-center gap-3'>
        <Image src="/assets/img/capubuk-logo.png" alt="capybuk logo" width="55" height="55" priority></Image>
        <div className='bg-[#FFE7DA] w-[240px] h-[40px] flex justify-start items-center rounded-3xl px-3 gap-4'>
          <i className="fa-solid fa-magnifying-glass text-[20px] text-[#71604E]"></i>
          <input type="text" placeholder='Search' className='bg-transparent'/>
        </div>
      </div>
      <div className='flex justify-between gap-20'>
        <Link href={'/'} ><i className="fa-solid fa-house text-[28px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-circle-play text-[28px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-store text-[28px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-user-group text-[28px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-gamepad text-[28px] text-[#71604E]"></i></Link>
      </div>
      <div className='flex justify-between gap-12'>
        <button><i className="fa-solid fa-square-poll-horizontal text-[28px] text-[#71604E]"></i></button>
        <button><i className="fa-brands fa-facebook-messenger text-[28px] text-[#71604E]"></i></button>
        <button><i className="fa-solid fa-bell text-[28px] text-[#71604E]"></i></button>
      </div>
    </nav>
  )
}

export default NavBar