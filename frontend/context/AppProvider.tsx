"use client"

import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { Cookie } from "next/font/google"

interface AppContextType {
    isLoading: boolean,
    authToken: string | null,
    login: (email:string, password:string) => Promise <void>,
    register:(name:string, email:string, password:string, password_confirmation:string) => Promise <void>
    logout: ()=> void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({children} : Readonly<{children: React.ReactNode}>) => {
    // creating loading state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const router = useRouter();

    // checking if user is logged in
    useEffect(() => {
        const token = Cookies.get("authToken")
        
        if (token) {
            setAuthToken(token)
        }else{
            router.push("/auth");
        }
    }, [])

    

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
                Cookies.set("authToken", response.data.token), {expires: 7};
        
                // redirecting to the home page
                router.push("/dashboard");
                // setting the auth state
                setAuthToken(response.data.token);
            }else{
                toast.success("Invalid login details");
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
                toast.error("Email already exist");
                console.log("reg", response);
            }
        } catch (error:any) {
            console.error("Register error", error); 
            
        }finally {
            setIsLoading(false);
        }
    }

    // logout
    const logout = () => {
        setAuthToken(null)
        Cookies.remove('authToken');
        toast.success("logged out successful");
        router.push('/auth');
    }

    return (
        <AppContext.Provider value={{login, register, isLoading, authToken, logout}}>
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