import clsx from 'clsx'
import Link from 'next/link'
import React, { FC } from 'react'
interface MobileItemProps {
    href : string,
    icon : any,
    onClick? : () => void,
    active? : boolean,
    label : string
}
const MobileItem : FC<MobileItemProps> = ({
    href,
    icon : Icon,
    onClick,
    active,
    label
}) => {

  const handleClick = () => {
    if(onClick) return onClick()
  }
    return (
    <Link onClick={handleClick} className={clsx(`
    group
    flex
    gap-x-2
    text-sm 
    leading-6
    font-semibold
    w-full
    justify-center
    p-4
    text-gray-500
    hover:text-black
    hover:bg-gray-100
     ${active && `bg-gray-100 text-black`}

    `)} href={href}>
    <Icon className="h-6 w-6"/>
    <span className='sr-only'>{label}</span>
    </Link>
  )
}

export default MobileItem
