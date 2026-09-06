import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
   <>
   <Navbar/>
  <div className='min-h-screen flex items-center justify-center bg-gray-100'>
  <Outlet/>
  </div>
   </>
  )
}
