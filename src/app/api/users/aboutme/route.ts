//route for getting user details

import {connectDB} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import {NextRequest, NextResponse} from 'next/server'
import {getDataFromToken} from '@/helpers/getDataFromToken'

connectDB();

export async function GET(request: NextRequest) {
    try {
        //extracting data from token- with help of utility function
        //poora request iss method mei bej do.
       const userId = await getDataFromToken(request);

       //if we got the user id then we will find the user form that id
       const user = await User.findOne({_id: userId}).select("-password ");//user ka password hme nhi chaiye.

        //if we got th user then senf the response
        return NextResponse.json({
            message: "user found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({error: error.message || "user did not found"}, {status: 500});
    }
}