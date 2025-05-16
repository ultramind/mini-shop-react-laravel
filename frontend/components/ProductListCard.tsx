// components/ProductTableCard.tsx
import { FC } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
};

interface ProductTableCardProps {
  products: Product[];
}

const products:Product[] = [
    { id: 1, name: "MacBook Pro", category: "Laptops", price: "$1999", stock: 12 },
    { id: 2, name: "Galaxy S24", category: "Smartphones", price: "$1199", stock: 35 },
    { id: 3, name: "Sony XM5", category: "Headphones", price: "$349", stock: 58 },
    { id: 4, name: "iPad Pro", category: "Tablets", price: "$799", stock: 20 },
  ];

const ProductListCard: FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 overflow-x-auto w-full md:w-[65%]">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Product List</h2>
      <div className="w-full min-w-[700px] overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 overflow-x-scroll">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">ID</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Image</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Price</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 text-sm text-gray-700">{product.id}</td>
              <td className="px-4 py-2 text-sm text-gray-800 font-medium">{product.name}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{product.category}</td>
              <td className="px-4 py-2 text-sm text-green-600 font-semibold">{product.price}</td>
              <td className="px-4 py-2 text-sm text-gray-700">
                <button className="px-3 py-2 bg-amber-400 font-bold rounded cursor-pointer mr-3">Edit</button>
                <button className="px-3 py-2 bg-red-500 font-bold rounded cursor-pointer text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ProductListCard;
