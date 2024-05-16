//writing helper function for getting user details from the token

import {NextRequest} from 'next/server'
import jwt from 'jsonwebtoken';


//making method
export const getDataFromToken = (request: NextRequest) =>{
    try {
        //1st we need to get the cookies 
        //ho skta hioa token exists hi nhi krta ho toh uski value extract kr rahe hai. agr token nhi hain to undefined na handle krna pade to hm empty string de rahe hai.
        const token = request.cookies.get("token")?.value || "";
            
        //decoding the token and getting user details by jwt method.
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        //decoded token mei jo information hmne token create krte waqt diye tha wohi decoded token mei milti hai.like user ki email, username or id
        //decoded token return kr rahe hai is functrion se
        return decodedToken.id
    } catch (error: any) {
        throw new Error(error.message);
    }
}