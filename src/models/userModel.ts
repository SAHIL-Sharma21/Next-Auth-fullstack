import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
});

//in nextjs exporting works difrent as nextjs runs on edge it has no idea that the model is already present in DB or not so we have to handle it other way.
//if model bnana  hua hai toh users wala dedo agr nhi banan hua toh mongose.model se new model create hoga.
const User = mongoose.models.users || mongoose.model("users", userSchema);// nextjs mei hm users and users same likh rahe hai code cosistency hia at then end it will changes to users only.

export default User;