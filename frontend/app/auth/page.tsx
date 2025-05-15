"use client";

// pages/auth.tsx
import { useState, FormEvent } from 'react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login/signup logic here
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-700 rounded-lg shadow-md">
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
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="John Doe"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm_password" className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>
            <input
              id="confirm_password"
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-rose-600 rounded-md cursor-pointer hover:bg-rose-700 transition"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}
