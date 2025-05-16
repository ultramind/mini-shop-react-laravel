"use client"

import { createContext, useContext, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

interface AppContextType {
    isLoading: boolean,
    login: (email:string, password:string) => Promise <void>,
    register:(name:string, email:string, password:string, password_confirmation:string) => Promise <void>
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({children} : Readonly<{children: React.ReactNode}>) => {
    // creating loading state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [auth, setAuth] = useState<any>(null);
    const router = useRouter();

    

    const login = async (email:string, password:string) =>{
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/login`,{
                email,
                password
            })

            // checking if the response is ok
            if (response.data.status) {
                console.log("Login successful", response.data);
                toast.success(response.data.message);
                // setting the token in the cookie
                Cookies.set("token", response.data.token);
        
                // redirecting to the home page
                router.push("/dashboard");
                // setting the auth state
                setAuth(response.data.token);
            }else{
                toast.error(response.data.message);
            }
        } catch (err:any) {
            console.error("Login error", err);
            toast.error(err.data.message);
            
        }finally {
            setIsLoading(false);
        }
    }

    const register = async (name:string, email:string, password:string, password_confirmation:string) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
                password_confirmation
            })

            // checking if the response is ok
            if (response.data.status) {
                toast.success(response.data.message);
                router.push('/auth')
            }else{
                toast.error(response.data.message.email[0]);
                console.log("reg", response);
            }
        } catch (error:any) {
            console.error("Register error", error); 
            
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <AppContext.Provider value={{login, register, isLoading}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;


// creating my Apphook
export const useAppHook = () => {
    const context = useContext(AppContext);
    if (context == undefined) {
        throw new Error("useAppHook must be used within an AppProvider");
    }
    return context;
}