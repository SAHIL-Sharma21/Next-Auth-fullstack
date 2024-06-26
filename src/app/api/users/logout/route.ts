//logging out the user.

import { connectDB } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from 'next/server';


connectDB();

//making logging out a get request
export async function GET() {
    try {
        
        const response = NextResponse.json({
            message: "Logged out successfully!",
            success: true,
        });

        //unsetting the cookies
        response.cookies.set("token"," ", {
            httpOnly: true,
            expires: new Date(0),
        });


        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}