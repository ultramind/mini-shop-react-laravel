"use client"

// pages/add-product.tsx
import { useState, FormEvent } from "react";
import Head from "next/head";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Simulate saving product
    console.log("Product submitted:", formData);

    setSubmitted(true);
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
    });
  };

  return (
    <>
      <Head>
        <title>Add Product | Tech Shop</title>
      </Head>

      <main className="px-4 flex items-center justify-center w-full md:w-[35%]">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Add a New Product</h1>

          {submitted && (
            <div className="mb-4 text-rose-600 font-semibold">Product submitted successfully!</div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
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
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
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
                name="image"
                placeholder="Enter image URL"
                type="file"
                value={formData.image}
                onChange={handleChange}
                required
                className="mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-2 rounded hover:bg-rose-700 transition"
            >
              Add Product
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
