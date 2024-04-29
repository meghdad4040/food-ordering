"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginPage = () => {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [loginInProgress, setLoginInProgress] = useState(false);

 const handleSubmitForm = async (e) => {
  e.preventDefault();
  setLoginInProgress(true);
  await signIn("Credentials", { email, password, callbackUrl: "/" });
  setLoginInProgress(false);
  toast.success("login successfully")
 };

 return (
  <section className=' mt-8'>
   <h1 className=' text-center text-best text-4xl mb-4'>Login</h1>
   <form
    className=' max-w-xs mx-auto'
    onSubmit={handleSubmitForm}>
    <input
     id="email"
     name='email'
     value={email}
     disabled={loginInProgress}
     onChange={e => setEmail(e.target.value)}
     type='email'
     placeholder='email'
     autoFocus
    />
    <input
     id="password"
     name='password'
     value={password}
     disabled={loginInProgress}
     onChange={e => setPassword(e.target.value)}
     type='password'
     placeholder='password'
    />
    <button
     disabled={loginInProgress}
     type='submit'>
     Login
    </button>
    <div className=' my-4 text-center text-gray-500'>or login with provider</div>
    <button
     type='button'
     onClick={() => signIn("google", { callbackUrl: "/" })}
     className=' flex gap-4 justify-center items-center'>
     <Image
      unoptimized={true}
      src={"/google.png"}
      alt={"google icon"}
      width={28}
      height={28}
     />
     Login with google
    </button>
    <button
     type='button'
     onClick={() => signIn("github", { callbackUrl: "/" })}
     className=' flex gap-4 justify-center items-center mt-2'>
     <Image
      src={"/github.png"}
      alt={"google icon"}
      width={28}
      height={28}
     />
     Login with github
    </button>
    <div className=' text-center my-4 text-gray-500 border-t pt-4 border-gray-300'>
     Existing account?{" "}
     <Link
      className=' underline'
      href={"/register"}>
      Register here &raquo;
     </Link>
    </div>
   </form>
  </section>
 );
};

export default LoginPage;
