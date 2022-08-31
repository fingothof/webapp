import type { NextPage } from 'next'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { useState } from 'react'

const Home: NextPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className='flex flex-col items-center mx-auto h-screen'>
      <div className='flex h-24 justify-center items-center'>
        <Bars3Icon className='w-12 p-2'></Bars3Icon>
        <div className=" text-3xl font-bold">
          Upcoming Events!
        </div>
      </div>
    </div>
  )
}

export default Home
