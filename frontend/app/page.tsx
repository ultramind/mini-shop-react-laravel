import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/NavBar";
import ProductList from "@/components/ProductLists";
import Image from "next/image";

export default function Home() {
  return (
    
    <>
    <Navbar/>
    <Hero/>
    <ProductList/>
    <Footer/>
    </>
  );
}
