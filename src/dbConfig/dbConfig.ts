//making database conection config file
import mongoose from "mongoose";

//writing async function for databse conect
export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        //this conection will have all the info of error or any problems in our database while connecting or any other error.
        const connection = mongoose.connection;
        //if connection is successfully then below blok of code works
        connection.on('connected', () => {
            console.log('MongoDB connected!');
        });
        //if connection is failed then this block will run
        connection.on('error', (error) => {
            console.log('MongoDB connection Failed, Please make sure DB is up and running', error);
            process.exit(1);//exiting the process or shuting down the app.
        });
    } catch (error) {
        console.log('Error while conecting to database:', error);
    }
}