//user profile
'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {

  //logout pr force krenege doosre page pr
  const router =  useRouter();
  const [data, setData] = useState("nothing");

  //funtion for getting user details
  const getUserData = async() =>{
    try {
      const response = await axios.get('/api/users/aboutme');
      console.log(response.data);
      setData(response.data.data._id);//data mei _id store krenge
      toast.success("user data fetched successfuly");

    } catch (error:any) {
        console.log("Error getting userData");
        toast.error(error.message);
    }
  }

  //logout funtion
  const logout = async() => {
    try {
      await axios.get('/api/users/logout');
      toast.success("logout sucessfully!");
      router.push("/login");
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
   <>
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>User Profile</h1>
        <hr />
        <h2>{data === 'nothing' ? "No user detail" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <hr />
        <button className='bg-red-500 mt-4 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        onClick={getUserData}>Get user details</button>
        <button className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={logout}>Logout</button>
    </div>
   </>
  )
}

