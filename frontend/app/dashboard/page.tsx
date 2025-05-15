import AddProductPage from '@/components/AddProduct'
import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar'
import ProductListCard from '@/components/ProductListCard'
import React from 'react'

const page = () => {
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
        <div className='flex justify-between w-full px-30 py-8 gap-6'> 
            <AddProductPage/>
            <ProductListCard/>
        </div>

      </div>
      <Footer/>
    </div>
  )
}

export default page
