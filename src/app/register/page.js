"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";


export default function Register() {
  const router = useRouter();
  async function handl(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};

    // console.log(e)

    formData.forEach((value, key) => {
      user[key] = value;
    });

    
    // if (user.password !== user.confirmpassword) {
    //   toast.error('cpass didn\'t matched')
    //   router.push('/register')
    //console.log("Password doesn't matched")
    // }
    // console.log(user)


    const res = await axios.post("/api/signup", user);

    console.log(res)
    if (res.data.success === true) {
      console.log("notified")
      toast.success("Registration completed")

    }else{
      toast.error(res.data.message)
    }

    console.log(res.data.message);


  }
  return (
    <>

      <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">

        <h2 className="text-xl font-semibold mb-4 text-center">Register</h2>
        <form onSubmit={handl}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-bold text-gray-700 text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              required
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="cpassword"
              name="confirmpassword"
              type="password"
              required
              placeholder="Enter your password"
            />
          </div>

          <input
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            value="Sign up"
          ></input>
          <Link href='/login' className="text-blue-700 hover:text-blue-500 underline pl-7">Already exists? Login</Link>

        </form>
      </div>


    </>
  );
}
