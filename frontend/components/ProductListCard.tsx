// client components/ProductTableCard.tsx
"use client";


import { FC } from "react";
import Loader from "./Loader";
import { useProductHook } from "@/context/ProductProvider";

type Product = {
  id?: number;
  title: string;
  description: string;
  cost: number;
  banner_image: string | null;
};

interface ProductTableCardProps {
  products: Product[];
}


const ProductListCard: FC = () => {
  const {products, isLoading, setFormData, fileRef, handleDelete, setIsEdit} = useProductHook()

  const handleActiveProduct = (product:Product) =>{
    setFormData({
      id:product.id,
      title: product.title,
      description: product.description,
      cost: product.cost,
      file: product.banner_image,
      banner_image:product.banner_image,
    });

    setIsEdit(true);
    // fileRef.current.value = product.banner_image

  }

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
                      <button className="px-3 py-2 bg-amber-400 font-bold rounded cursor-pointer mr-3" onClick={()=> handleActiveProduct(product)}>Edit</button>
                      <button className="px-3 py-2 bg-red-500 font-bold rounded cursor-pointer text-white" onClick={()=> handleDelete(product.id)}>Delete</button>
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
