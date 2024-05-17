'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast'
import {useRouter} from 'next/navigation'
import Link from 'next/link';

export default function SignupPage() {

  //using router from Navigation hook
  const router = useRouter();

  //state for the form
  const [user, setUser] = useState({
      email: "",
      password: "",
      username: ""
  });

  //state for button
  const [buttonDisable, setButtonDisable] = useState(false);

  //loding state
  const [loading, setLoading] = useState(false);


  //on user button click
  const onSignup = async () => {
    try {
      //using axios for fetching the data
      //loading to true krenge
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log(response.data);
      //navigating user to login route
      router.push('/login');
      setLoading(false);

    } catch (error: any) {
      console.log('Signup failed');
      //using toast if erroe occured
      toast.error(error.message)
    }
  }

//using useEffeect hok if the user has put all the values in the input filed then he can make the signup request.
  useEffect(() => {
    //checking if the username, email, password is present or not
    if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  }, [user]);


  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen py-2'>
          <h1>{loading ? "Processing" : "Signup"}</h1>
          <hr />
          <div className='flex flex-col gap-y-1.5'>
              <label htmlFor="username">username</label>
              <input 
              className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
              id='username'
              type='text'
              placeholder='Enter your username'
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              />
          </div>

          <div className='flex flex-col gap-y-1.5'>
              <label htmlFor='email'>Email</label>
              <input
              className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
              id='email'
              type='text'
              value={user.email}
              onChange={(e) => setUser({...user, email:e.target.value})}
              placeholder='user email'
              />
          </div>
          
          <div className='flex flex-col gap-y-1.5'>
              <label htmlFor="password">password</label>
              <input 
              className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
              id='password'
              type='password'
              placeholder='enter your password'
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              />
          </div>
          
          <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' 
          onClick={onSignup}>
            {buttonDisable ? "Please fill the form": "signup"}
          </button>
          <Link href={"/login"}>visit Login</Link>
      </div>
    </>
  )
}

