// components/ProductCard.tsx
import { StarIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { FC } from "react";
// import { StarIcon } from "@heroicons/react/24/solid";

type Product = {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  description: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition bg-white">
      <div className="relative w-full h-48">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="w-full h-48 object-cover rounded-t-lg"
      />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        <p className="text-rose-600 font-semibold mt-1">{product.price}</p>

        {/* Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-4 w-4 ${
                index < product.rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        <button className="mt-4 w-full bg-rose-600 text-white py-2 px-4 rounded hover:bg-rose-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
