//importing db connect method as in next js we have to conect to db in every routes its works different then core bwckend
import {connectDB} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'//importing user from model
import {NextRequest, NextResponse} from 'next/server' // for making request in next js we import two method nextResponse and nextRequest


//sbse phele datavbase hi connect krne hai
connectDB();

//making Http method like POST GET to make request and thse function are async and does not hoave a name on it

//automaticaly this route will become http://localhost:8000/api/users/signup  --> this is same as we do it in express.
//like this we make GET, PATCh,DELETE and other routes
export async function POST(request:NextRequest) {
    try {
        
        //in nextjs we get the data by  request in next
        const reqBody = request.json();// this reqBody is same as in express and we can destructure the value from it
        const {username, email, password} = reqBody;
        //validation we will do in future using different libraries like yup, zod etc 
        console.log(reqBody);
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
