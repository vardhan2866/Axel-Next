'use client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

function Login() {
  const router = useRouter();

  async function handlLogin(e) {
    try {
      e.preventDefault(); 
      const data = new FormData(e.target); 
      const user = {};

      data.forEach((value, key) => {
        user[key] = value;
      });

      const res = await axios.post('/api/signin', user);
      console.log(res.data.token);

      if (res.data.success === true) {
        router.push('/');
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      router.push('/register');
    }
  }

  return (
    <>
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handlLogin} className="flex flex-col items-center">

          <div className="mb-4 w-full">
            <label htmlFor="email" className="font-bold text-gray-700 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4 w-full">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
          >
            Sign in
          </button>

          <div className="flex justify-between w-full">
            <Link href="/register" className="text-blue-700 hover:text-blue-500 underline">
              No account? Register
            </Link>
            <Link href="/login/passwordreset" className="text-blue-700 hover:text-blue-500 underline">
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
