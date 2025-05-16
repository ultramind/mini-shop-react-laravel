"use client";

import Loader from '@/components/Loader';
import { useAppHook } from '@/context/AppProvider';
import Link from 'next/link';
// pages/auth.tsx
import { useState, FormEvent } from 'react';

export default function AuthPage() {
  const {login, register, isLoading} = useAppHook();
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login/signup logic here
   if (isLogin) {
    console.log("Login user", formData)
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      console.error("Login error", error);
      
    }
   }else{
    try {
      await register(formData.name, formData.email, formData.password, formData.password_confirmation);
    } catch (error) {
      console.log("Register error", error);
      
    }
    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    //   password_confirmation: "",
    // })
    setIsLogin(true);
   }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-lg shadow-md">
        <center>
        <Link href="/" className="text-3xl font-bold text-rose-600">
        <span className="bg-white px-2">Mini</span> <span className="text-white">Market</span>
          </Link>
        </center>
        <h2 className="text-2xl font-bold text-center">
          
          {isLogin ? 'Login to Your Account' : 'Create an Account'}
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block mb-1 text-sm font-medium">
                Name
              </label>
              <input
                id="name"
                type="text"
                name='name'
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                required
                onChange={handleChange}
                value={formData.name}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name='email'
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              required
              onChange={handleChange}
              value={formData.email}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name='password'
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
              onChange={handleChange}
              value={formData.password} 
            />
          </div>
          {!isLogin && (
            <div>
            <label htmlFor="confirm_password" className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              name='password_confirmation'
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
              onChange={handleChange}
              value={formData.password_confirmation}
            />
          </div>
          )}
          <button
            type="submit"
            className="w-full py-2 flex gap-2 justify-center items-center text-white bg-rose-600 rounded-md cursor-pointer hover:bg-rose-700 transition"
          >
            <span>
            {isLogin ? 'Login' : 'Sign Up'}
            </span>
            {isLoading && <Loader/>}
          </button>
        </form>
        <p className="text-sm text-center text-white">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-rose-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
            
          </button>
        </p>
      </div>
    </div>
  );
}
