import type { NextPage } from 'next'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Menu } from '../components/Menu'

const Home: NextPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex flex-col h-screen bg-brand-100'>
      <div className='flex'>
        <Bars3Icon onClick={() => { setMenuOpen(!isMenuOpen) }} className='h-14 w-12 p-2 text-brand-500'></Bars3Icon>
        <Menu isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen}></Menu>
      
        <div className="flex justify-center w-screen p-2 text-brand-500 text-3xl font-bold">
          GroundUp Dev
        </div>
      </div>
    </div>
  )
}

export default Home
