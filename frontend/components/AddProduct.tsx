"use client"

// pages/add-product.tsx
import { useState, FormEvent, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import axios from "axios";
import { useAppHook } from "@/context/AppProvider";
import toast from "react-hot-toast";
import { useProductHook } from "@/context/ProductProvider";
import Loader from "./Loader";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface ProductType {
  title:string,
  description:string,
  cost: number,
  file: null | string,
  banner_image: string
}

export default function AddProductPage() {

  const {formData, handleChange, handleSubmit, fileRef, isLoading}  = useProductHook()
  
  return (
    <>
      <Head>
        <title>Add Product | Tech Shop</title>
      </Head>

      <main className="px-4 flex items-center justify-center w-full md:w-[35%]">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Add a New Product</h1>

          {/* {submitted && (
            <div className="mb-4 text-green-600 font-semibold">Product submitted successfully!</div>
          )} */}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                id="name"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter product name"
                required
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter product description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price (USD)
              </label>
              <input
                id="price"
                placeholder="Enter product price"
                name="cost"
                type="number"
                step="0.01"
                value={formData.cost}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                id="image"
                name="banner_image"
                type="file"
                ref={fileRef}
                onChange={handleChange}
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>
            {formData.file && (
              <div>
                <Image src={formData.file} width={100} height={100} alt="image preview" />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
            >
              {isLoading ? (<Loader/> ) : "Add Product"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
