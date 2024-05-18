'use client'

import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react"


export default function VerifyEmailPage() {


  //utlilising next js and extracting data from url
  // const router = useRouter();//using hook for taking token from the url


 const [token, setToken] = useState("");
 const [verified, setVerified] = useState(false); 
 const [error, setError] = useState(false);


 const verifyUserEmail = async() => {
  try {
    //hiting the endpoint
    await axios.post('/api/users/verifyEmail', {token});
    setVerified(true);
    setError(false);
  } catch (error: any) {
    setError(true);
    console.log(error.response.data);
  }
 }


 //token nikalne ke liye jaise hi yeh component mount ho tb url se token nikal lenge
//  below is the core js utilization we are not using nextjs or react for taking the token
 useEffect(() => {
    //getting url token from below method
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //extracting query -- this approach is used mostly
    // const {query} = router;
    // //query se token bhi nikal lenge
    // const urlTokenTwo = query.token
 }, []);

 //2nd useeffect with token as dependency
 //agr token ke nader kopi changes aaye tb yeh chalega --lekin component first time mount hoga tb run karega uske baad token change hone pr hoga
 useEffect(() => {
  setError(false);
  if(token.length > 0){
    verifyUserEmail();
  }
 }, [token]);

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen py-2">
          <h1 className="text-4xl">Verify Email</h1>
          <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}`: 'no token'}</h2>

          {/* loading component if user verfied  */}
          {verified && (
            <div>
              <h2>verfied</h2>
              <Link href='/login'>Login</Link>
            </div>
          )}

          {error && (
            <div>
              <h2>User Not verified</h2>
            </div>
          )}
      </div>
    </>
  )
}

