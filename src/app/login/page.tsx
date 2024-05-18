'use client'

//this is used in client as it it frontend
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Link from 'next/link';

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [user, setuser] = useState({
    email: '',
    password: ''
  });

  const onLogin = async() => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log(response.data);
      router.push("/profile");
      setLoading(false);
      
    } catch (error: any) {
      console.log("login failed");
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>{loading ? "Processing": "Login"}</h1>
        <hr />
        <div className='flex flex-col gap-y-1.5'>
          <label htmlFor='email'>Email</label>
          <input 
          id='email'
          type="email"
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          value={user.email}
          onChange={(e) => setuser({...user, email: e.target.value})} 
          placeholder='Enter your email'
          />
        </div>
        <div className='flex flex-col gap-y-1.5'>
          <label htmlFor='password'>Password</label>
          <input 
          id='password'
          type="password"
          className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
          value={user.password}
          onChange={(e) => setuser({...user, password: e.target.value})} 
          placeholder='Enter your password'
          />
        </div>

        <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' 
        onClick={onLogin}>
          {buttonDisable ? "please fill the login form": "Login"}
        </button>
        <Link href={"/signup"}>Visit Signup</Link>
      </div>
    </>
  )
}

