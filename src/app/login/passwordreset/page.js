'use client'
import { handlReset } from "@/app/actions/reset";
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
function PasswordReset() {
  const router = useRouter();


  const invoke = async(event) =>{
    try{

      console.log('invoke')
      const email = event.get('email')
      // console.log(email)
      const temp = {
        em : email
      }
      console.log(temp)
      const res = await handlReset(temp);

      const nres = JSON.parse(res)
      console.log(nres,'true')

      if(nres.success !== true){
        // console.log(res)
        toast.error(nres.message)
      }else{
        // console.log(res)
        toast.success(nres.message)
        router.push('/login/passwordreset/done')
      }
    }catch(error){
      // console.log(error.message)
      toast.error(error.message)
    }

  }

  return (
    <>
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
        <hr className="mb-2" />
        <div className="border ml-12 rounded border-yellow-400 w-56 mb-2 p-2 bg-yellow-100 text-slate-600">
          <p>Forgotten your password? Enter your e-mail address below, and we will send you an e-mail allowing you to reset it.</p>
        </div>
        <form action={invoke} className="flex flex-col items-center">

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


          <div className="flex justify-between w-full mt-2">
            <Link href="/register" className="text-blue-700 hover:text-blue-500 underline mt-1">
              No account? Register
            </Link>
            <button className="border-2 p-1 bg-green-300 rounded border-green-400 hover:bg-green-400">Reset my password</button>

          </div>
        </form>
      </div>
    </>

  )
}

export default PasswordReset;