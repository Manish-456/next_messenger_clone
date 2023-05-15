import clsx from 'clsx'
import Link from 'next/link'
import React, { FC } from 'react'
interface DesktopItemProp {
    href : string,
    icon : any,
    onClick? : () => void,
    active? : boolean,
    label : string
}
const DesktopItem:FC<DesktopItemProp> = ({
    href,
    icon : Icon,
    onClick,
    active,
    label
}) => {
  const handleClick = () => {
    if(onClick) return onClick();
  }
  return (
    <li onClick={handleClick}>
         <Link href={href} className={
            clsx(`
            group
            flex
            gap-x-3 rounded-md
            p-3
            text-sm
            leading-6
            font-semibold
            text-gray-500
            hover:text-black
            hover:bg-gray-100
             ${active && `bg-gray-100 text-black`}
            `)
         } >
       <Icon className="h-6 w-6 shrink-0" />
            <span className='sr-only'>{label}</span>
            
            </Link>
    </li>
  )
}

export default DesktopItem
