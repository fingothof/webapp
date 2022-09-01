import { Bars3Icon } from '@heroicons/react/24/outline'
import { type } from 'os'
import { Dispatch, SetStateAction } from 'react'

type AppProp = {
	isMenuOpen: boolean,
	setMenuOpen: Dispatch<SetStateAction<boolean>>
}

type MenuItemProp = {
    num: number
}

const MenuItem = ({num}: MenuItemProp) => {
    return (<div className='p-2'>
        Item {num}
    </div>)
}

const MenuItems : number[] = [1,2,3,4];

export const Menu = ({isMenuOpen, setMenuOpen} : AppProp) => {
    return (<div className={`${isMenuOpen ? 'flex' : 'hidden' } h-screen absolute bg-brand-500 z-20`}>
        <Bars3Icon onClick={() => { setMenuOpen(!isMenuOpen)}} className='h-14 w-12 p-2 text-brand-50'></Bars3Icon>
        <div className='flex flex-col p-2'>
            {
                MenuItems.map(x =>  <MenuItem num={x}></MenuItem>)
            }
        </div>
    </div>)
}