
"use client"
import AddProductPage from '@/components/AddProduct'
import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar'
import ProductListCard from '@/components/ProductListCard'
import { useAppHook } from '@/context/AppProvider'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

  const {authToken}  = useAppHook()
  const router = useRouter();


    // checking if the user is logged in
    useEffect(() => {
      if (!authToken) {
        router.push('/auth')
      }
      return;
    }, [])


  return (
    <div className='bg-white min-h-screen text-black'>
        <Navbar/>
      <div className='flex flex-col min-h-screen bg-gray-200 w-full'>
        {/* breadCrumb */}
        <div className='flex justify-between items-center py-4 px-34 bg-gray-100'>
            <div className='flex items-center'>
                <h2 className='text-xl font-bold'>Dashboard</h2>
                <span className='text-gray-500 ml-2'>/</span>
                <p className='text-gray-500 ml-2'>Add Product</p>
            </div>
        </div>
        <div className='flex flex-col md:flex-row justify-between w-full p-4 md:px-30 md:py-8 gap-6'> 
            <AddProductPage/>
            <ProductListCard/>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default page
