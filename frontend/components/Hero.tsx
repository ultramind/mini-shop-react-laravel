// components/Hero.tsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gray-900 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Elevate Your Tech Game
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Discover cutting-edge gadgets, high-performance gear, and smart solutions for work & play.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="#products"
              className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md font-medium transition"
            >
              Shop Now
            </a>
            <a
              href="#contact"
              className="border border-gray-300 hover:border-white px-6 py-3 rounded-md font-medium transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <Image
            src="https://media.istockphoto.com/id/1221032597/photo/office-flat-lay.jpg?s=1024x1024&w=is&k=20&c=dKFkc7sh_eDqP4PNk_TcPYJZylynnxI3kCUtX_xJnS0="
            alt="Tech Gadgets"
            width={500}
            height={500}
            className="rounded-lg shadow-lg object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
