'use client'

import axios from "axios";
import { useEffect, useState } from "react"


export default function VerifyEmailPage() {

 const [token, setToken] = useState("");
 const [verified, setVerified] = useState(false); 
 const [error, setError] = useState(false);


 const verifyUserEmail = async() => {
  try {
    //hiting the endpoint
    await axios.post('/api/users/verifyEmail', {token});
    setVerified(true);
  } catch (error: any) {
    setError(true);
    console.log(error.response.data);
  }
 }


 //token nikalne ke liye jaise hi yeh component mount ho tb url se token nikal lenge
//  below is the core js utilization we are not using nextjs or react for taking the token
 useEffect(() => {
    //getting url token from below method
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
 }, []);

 //2nd useeffect with token as dependency
 //agr token ke nader kopi changes aaye tb yeh chalega --lekin component first time mount hoga tb run karega uske baad token change hone pr hoga
 useEffect(() => {
  if(token.length > 0){
    verifyUserEmail();
  }
 }, [token]);

  return (
    <div>verify-email route</div>
  )
}

