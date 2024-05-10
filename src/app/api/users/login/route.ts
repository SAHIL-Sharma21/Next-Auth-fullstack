//logging user

import {connectDB} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


connectDB();

export async function POST(request:NextRequest) {
    try {
        
        //writing logic for logging the user we need his email and password

        const reqBody = await request.json();
        //email and paswword destructre kr rahe hai reqBody se.
        const {email, password} = reqBody;
        console.log(reqBody);
        
        //check if user exists or not finding based o email
        const user = await User.findOne({
            email
        });

        if(!user) {
            return NextResponse.json({error: "User does not exists, please signup."}, {status: 400});
        }
        console.log("user exists"); //if user exists

        //now check the user password if it is correct or not thern he can login
        //compare the password
        const validPassword = await bcryptjs.compare(password, user.password);
        
        if(!validPassword){
            return NextResponse.json( {error: "Check your credentials"}, {status: 400});
        }

        //user password match trhen we will create jwt token
        //token data/payload
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // writng as string solve up for me.
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, {expiresIn: '1d'}); //we can use process.env.TOKEN_SECRET! instead of as string

        //makingnew type of response
        const response = NextResponse.json({
            message: "Logged In Successfully!",
            success: true
        });
        //we want to send cookies as well so nextresponse give cookies access direct
        response.cookies.set("token", token, {
            httpOnly: true //yeh true option bs server manupulate kr skta hai frontend ya client ko sirf show hogi client usko manupulate.
        });

        //ab response return kr rahe hai
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}