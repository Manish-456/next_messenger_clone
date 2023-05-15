'use client';

import useConversation from '@/app/hooks/useConversation';
import useRoutes from '@/app/hooks/useRoutes'
import MobileItem from './MobileItem';


const MobileFooter = () => {
    const routes = useRoutes();
    const {isOpen} = useConversation();

    if(isOpen) return null;
  return (
    <div className='
    justify-between 
   w-full
   bottom-0
   flex
   z-40
   items-center
   bg-white
   border-t-[1px]
    fixed
    lg:hidden
    ' >
      {
        routes.map(item => <MobileItem icon={item.icon} active={item.active} href={item.href} onClick={item.onClick} key={item.label} label={item.label}  />)
      }
    </div>
  )
}

export default MobileFooter
