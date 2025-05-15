import ProductCard from "./ProductCard";

// components/Products.tsx
type Product = {
    id: number;
    name: string;
    image: string;
    price: string;
    rating: number;
    description: string;
  };
  
  const products: Product[] = [
    {
      id: 1,
      name: "Apple MacBook Pro 14”",
      description: "M2 Pro Chip, 16GB RAM, 512GB SSD - Space Gray",
      image: "https://media.istockphoto.com/id/1154428137/photo/open-laptop-top-view-with-colorful-screen-isolated-on-black-3d-render.jpg?s=1024x1024&w=is&k=20&c=l_-2_Eczt2AlFa1-Qa-zGwkeir572I2ycuSB3yfaSnU=",
      price: "$1,999.00",
      rating: 5,
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      description: "6.8” AMOLED, 256GB Storage, 200MP Camera - Titanium Black",
      image: "https://images.unsplash.com/photo-1705585175110-d25f92c183aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8U2Ftc3VuZyUyMEdhbGF4eSUyMFMyNCUyMFVsdHJhfGVufDB8fDB8fHww",
      price: "$1,199.00",
      rating: 4,
    },
    {
      id: 3,
      name: "Sony WH-1000XM5 Headphones",
      description: "Wireless Noise Cancelling Overhead Headphones - Black",
      image: "https://images.unsplash.com/photo-1563626451-b5b36e6e52fb?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$349.99",
      rating: 5,
    },
    {
      id: 4,
      name: "Apple iPad Pro 11”",
      description: "M2 Chip, 128GB Storage, Wi-Fi - Silver",
      image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
      price: "$799.00",
      rating: 4,
    },
    {
      id: 5,
      name: "Logitech MX Master 3S",
      description: "Wireless Performance Mouse for Mac and Windows",
      image: "https://images.unsplash.com/photo-1739742473235-34a7bd9b8f87?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$99.99",
      rating: 5,
    },
    {
      id: 6,
      name: "ASUS ROG Strix G15",
      description: "Gaming Laptop, Ryzen 9, RTX 4070, 1TB SSD, 16GB RAM",
      image: "https://images.unsplash.com/photo-1698512475067-74ed7c956c8d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      price: "$1,599.00",
      rating: 4,
    },
  ];
  
  export default function ProductList() {
    return (
      <section className="py-12 px-4 bg-white">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </section>
    );
  }
  