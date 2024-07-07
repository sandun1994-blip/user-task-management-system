import { cn } from '@/lib/utils'
import { Poppins } from 'next/font/google'
import React from 'react'
import { FcPrivacy } from "react-icons/fc";


const font =Poppins({
    subsets:['latin'],
    weight:['600']
})

interface HeaderProps{
    label:string
}
const Header = ({label}:HeaderProps) => {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
        <h1 className={cn('text-3xl font-semibold flex items-center gap-2',font.className)}> <FcPrivacy />Auth</h1>
        <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  )
}

export default Header