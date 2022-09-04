import { Bars3Icon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'

type AppProp = {
	isMenuOpen: boolean,
	setMenuOpen: Dispatch<SetStateAction<boolean>>
}

type MenuItemProp = {
    pageName: string
}

const MenuItem = ({pageName}: MenuItemProp) => {
    return (
        <div className='p-2'>
            <Link href={ pageName }><a>{pageName}</a></Link>
        </div>
    )
}

const menuItems = ['calendar','misc']

export const Menu = ({isMenuOpen, setMenuOpen} : AppProp) => {
    return (<div className={`${isMenuOpen ? 'flex' : 'hidden' } h-screen absolute bg-brand-500 z-20`}>
        <Bars3Icon onClick={() => { setMenuOpen(!isMenuOpen)}} className='h-14 w-12 p-2 text-brand-50'></Bars3Icon>
        <div className='flex flex-col p-2'>
            {
                menuItems.map(x =>  <MenuItem pageName={x}></MenuItem>)
            }
        </div>
    </div>)
}
