// client components/ProductTableCard.tsx
"use client";


import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useAppHook } from "@/context/AppProvider";
import Loader from "./Loader";
import Image from "next/image";
import { useProductHook } from "@/context/ProductProvider";

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Product = {
  id: number;
  title: string;
  description: string;
  cost: number;
  banner_image: string | null;
};

interface ProductTableCardProps {
  products: Product[];
}

// const products:Product[] = [
//     { id: 1, name: "MacBook Pro", category: "Laptops", price: "$1999", stock: 12 },
//     { id: 2, name: "Galaxy S24", category: "Smartphones", price: "$1199", stock: 35 },
//     { id: 3, name: "Sony XM5", category: "Headphones", price: "$349", stock: 58 },
//     { id: 4, name: "iPad Pro", category: "Tablets", price: "$799", stock: 20 },
//   ];

const ProductListCard: FC = () => {
  // const [products, setProducts] = useState<Product[]>([])
  // const [isLoading, setIsLoading] = useState<boolean>(true)
  const {authToken} = useAppHook();
  const {products, isLoading} = useProductHook()


  // useEffect(() => {
  //   fetchAllProduct();
  // }, [])

  // fetching all products
  // const fetchAllProduct = async ()=>{
  //   try {
  //     const response = await axios.get(`${API_URL}/products`, {
  //       headers: {
  //         Authorization: `Bearer ${authToken}`
  //       }
  //     })
  //     if (response.status) {
  //       setProducts(response.data.products)
  //       // console.log(response);
  //     }
  //   } catch (err) {
  //     console.log("fetch product err", err)
  //   }
  //   setIsLoading(false)
  // }

  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto w-full md:w-[65%]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Product List</h2>
      {
        isLoading ? <Loader/> : (
          <div className="w-full min-w-[700px] overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Title</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Image</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Cost</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 text-sm text-gray-700">{product.id}</td>
                    <td className="px-4 py-2 text-sm text-gray-800 font-medium">{product.title}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {product.banner_image ? (<img src={product.banner_image} alt="product_image" width={70} height={100}  />) : "No Image"}
                    </td>
                    <td className="px-4 py-2 text-sm text-green-600 font-semibold">{product.cost}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">
                      <button className="px-3 py-2 bg-amber-400 font-bold rounded cursor-pointer mr-3">Edit</button>
                      <button className="px-3 py-2 bg-red-500 font-bold rounded cursor-pointer text-white">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default ProductListCard;
