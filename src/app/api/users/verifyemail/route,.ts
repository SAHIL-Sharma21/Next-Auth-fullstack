//route for verify user
//ek api route user ko verify karvaega wrna browsers automatically links pr click krte hai on frontend part

import {connectDB} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'



//sbse phele datavbase hi connect krne hai
connectDB();

export async function POST(request: NextRequest) {
    try {
        //user verificastion

        //taking data from request.json which is async task
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log(token);


        //asume token aa gya hai hamre pass
        //user find kr rahe hai uske verifytoken se and uske token expiry se bhi check krenge agr token ki date verify date/time se badi ahi tb then we will get the user.
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {
                $gt: Date.now(),
            }
        });
        
        //if user mila hi nahi toh iska mtlb token invalid hai
        if(!user){
            return NextResponse.json({error: "Invalid Token"}, {status: 400});
        }
        console.log(user);


        //cleanup process if user is get then isVerfied ko true kr denge and verfiy token and uski expiry ko remove kr denge.
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        
        //database mei save krra do
        await user.save();

        //sendingthe response
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        }, {status:200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500, });
    }
}