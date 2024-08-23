'use client'
import Link from "next/link";
import React from "react";

function BadToken() {
  return (
    <div className="max-w-sm mx-auto mt-10 p-6  bg-white rounded-xl shadow-md ">
      <h2 className="text-xl font-semibold mb-4 text-center">Bad Token</h2>
      <hr className="mb-2" />
      <div className=" w-80 text-gray-500 text-center">
        <p>
          Verification failed this might be due to expiry of token to get new
          link click on this link
          <Link href='/login/passwordreset'>Click here</Link>
        </p>
      </div>
    </div>
  );
}

export default BadToken;
