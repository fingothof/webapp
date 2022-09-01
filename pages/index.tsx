import type { NextPage } from 'next'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Home: NextPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex flex-col items-center mx-auto h-screen bg-brand-100'>
      <div className='flex h-24 w-screen justify-start items-center'>
        <Bars3Icon className='w-12 p-2 text-brand-500'></Bars3Icon>
        <div className="flex justify-center w-screen text-brand-500 text-3xl font-bold">
          Upcoming Events!
        </div>
      </div>
    </div>
  )
}

export default Home
