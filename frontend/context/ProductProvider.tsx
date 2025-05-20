"use client"
import { createContext, FormEvent, ReactNode, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAppHook } from "./AppProvider";
import toast from "react-hot-toast";
const API_URL = process.env.NEXT_PUBLIC_API_URL
import Cookies from 'js-cookie'

interface ProductContextType {
    formData: ProductType,
    handleSubmit: any,
    handleChange: any,
    fileRef: any,
    isLoading: boolean,
    products: Product[],
    handleDelete: any
}

interface ProductType {
    title:string,
    description:string,
    cost: number,
    file: null | string,
    banner_image: string
}

type Product = {
    id: number;
    title: string;
    description: string;
    cost: number;
    banner_image: string | null;
};


const ProductContext = createContext<ProductContextType | null >(null)

const ProductProvider = ({children} : Readonly<{children: ReactNode}>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const fileRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState<ProductType>({
        title: "",
        description: "",
        cost: 0,
        file: "",
        banner_image: "",
    });

  const { authToken } = useAppHook();
//   console.log("AuthToken", authToken)


  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, banner_image: e.target.files[0], file: URL.createObjectURL(e.target.files[0]) });
    }else{
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    // taking to endpoint
    try {
      const response = await axios.post(`${API_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.data.status) {
        fetchAllProduct();
        toast.success(response.data.message)
      }
    } catch (err:any) {
      console.log("Add Product", err)
    }


    
    setFormData({
      title: "",
      description: "",
      cost: 0,
      file: "",
      banner_image: "",
    });

    setIsLoading(false)

    // reset the file input using useRef
    if (fileRef.current) {
      fileRef.current.value = ""
    }
  };


  // fetching all products
  const fetchAllProduct = async ()=>{
    const authToken = Cookies.get('authToken');
    setIsLoading(true)
    try {
      const response = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      if (response.status) {
        setProducts(response.data.products)
        // console.log(response);
      }
    } catch (err) {
      console.log("fetch product err", err)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchAllProduct();
  }, [])


  const handleDelete = async(id:number) => {
    setIsLoading(true)
    const res = confirm("Are you sure u want to delete the product")
    if (res) {
      try {
        const response = await axios.delete(`${API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        })
        console.log(response)
        fetchAllProduct()
      } catch (error) {
        console.log("Delete pro error", error)
      }
      setIsLoading(false)
    }
  }
  



    return (
        <ProductContext.Provider value={{ formData, handleChange, handleSubmit, fileRef, isLoading, products, handleDelete  }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductProvider;


// creating a custom hook for product context

export const useProductHook = () => {
    const productContext = useContext(ProductContext)

    if (productContext == undefined) {
        throw new Error( "useProduct Hook should be use within the Product Provider")
    }
    return productContext;
}
