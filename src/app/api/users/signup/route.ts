//importing db connect method as in next js we have to conect to db in every routes its works different then core bwckend
import {connectDB} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'//importing user from model
import {NextRequest, NextResponse} from 'next/server' // for making request in next js we import two method nextResponse and nextRequest
import bcryptjs from 'bcryptjs';
import {sendEmail} from '@/helpers/mailHelper'

//sbse phele datavbase hi connect krne hai
connectDB();

//making Http method like POST GET to make request and thse function are async and does not hoave a name on it

//automaticaly this route will become http://localhost:8000/api/users/signup  --> this is same as we do it in express.
//like this we make GET, PATCh,DELETE and other routes
export async function POST(request:NextRequest) {
    try {
        
        //in nextjs we get the data by  request in next
        //as in nextjs request,json is promiose and can take time to comes the data so we are using await.
        const reqBody = await request.json();// this reqBody is same as in express and we can destructure the value from it
        const {username, email, password} = reqBody;
        //validation we will do in future using different libraries like yup, zod etc 
        console.log(reqBody);
        
        //checking if user is present or not
        const user = await User.findOne({email});

        //if user hai toh nextresponse rerturn kr rahe hia
        if(user) {
            return NextResponse.json({error: "user already exists"}, {status: 400});
        }

        //if user is not present then we will create the user and hash it password before saving to DB
        //generating salt and hasing the user paswword
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //we are just creating model not interacting with database.
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        //now saving to db
        const savedUser = await newUser.save();
        console.log(savedUser);
        
        //if user is saved then we will send verfication mail to user
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id});

        //if email is sent the we will return the response
        return NextResponse.json({
            message: "User Registerd successfully",
            success: true,
            savedUser
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}
