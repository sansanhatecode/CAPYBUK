import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const NavBar = () => {
  return (
    <nav className='w-full bg-[#C5A27C] fixed z-20 top-0 flex justify-between min-h-[55px] items-center px-4'>
      <div className='flex justify-start items-center gap-3 w-[20%]'>
        <Image src="/assets/img/capubuk-logo.png" alt="capybuk logo" width="55" height="55" priority></Image>
        <div className='bg-[#FFE7DA] w-[240px] h-[35px] flex justify-start items-center rounded-3xl px-3 gap-4'>
          <i className="fa-solid fa-magnifying-glass text-[20px] text-[#71604E]"></i>
          <input type="text" placeholder='Search' className='bg-transparent outline-none w-[180px]'/>
        </div>
      </div>
      <div className='flex justify-between gap-20'>
        <Link href={'/'} ><i className="fa-solid fa-house text-[24px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-circle-play text-[24px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-store text-[24px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-user-group text-[24px] text-[#71604E]"></i></Link>
        <Link href={'#'} ><i className="fa-solid fa-gamepad text-[24px] text-[#71604E]"></i></Link>
      </div>
      <div className='flex justify-end gap-12 w-[20%]'>
        <button><i className="fa-solid fa-square-poll-horizontal text-[24px] text-[#71604E]"></i></button>
        <button><i className="fa-brands fa-facebook-messenger text-[24px] text-[#71604E]"></i></button>
        <button><i className="fa-solid fa-bell text-[24px] text-[#71604E]"></i></button>
        <Image src="/assets/img/capubuk-logo.png" alt="capybuk logo" width="55" height="55" priority></Image>
      </div>
    </nav>
  )
}

export default NavBar