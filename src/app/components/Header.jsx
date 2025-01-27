'use client'
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
  const router = useRouter();
  const cookies = Cookies.get('token');

  function logout() {
    // Remove the token from cookies
    Cookies.remove('token');

    // Optionally redirect the user to a login page or home page
    router.push('/login'); // Change this to your preferred redirect page
  }
  return (
    <nav className="bg-sky-200 p-3 text-black flex justify-between items-center">
      <Link href="/" className="hover:text-sky-600 font-semibold ">
        Work Manager
      </Link>
      <div className="flex justify-center flex-grow">
        <Link href="/cis/book_appointment" className="ml-3 hover:text-sky-600 underline">
          Book Appointment
        </Link>
        <Link href="/cis/addtask" className="ml-3 hover:text-sky-600 underline">
          Add task
        </Link>
        <Link href="/cis/showtask" className="ml-3 hover:text-sky-600 underline">
          Show task
        </Link>

      </div>

      <button onClick={cookies ? logout : () => { router.push('login') }} className="hover:text-sky-600 border-2 underline">
        {cookies ? 'Logout' : 'Login/Signup'}
      </button>
      {/* <Link href='/register' className="hover:text-sky-600 pl-2 underline">Register</Link> */}

    </nav>
  );
}

export default Header;
