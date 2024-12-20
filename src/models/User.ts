import mongoose, {Schema, Document, } from "mongoose";

export interface user extends Document{
    userName : string,
    email : string,
    password : string,
    mobileNumber : Number,
    courses : [Number]

}


const UserSchema : Schema<user> = new Schema({
    userName   : {
        type: String ,
        required: [true,"Username is required"],
        unique : true,
    },
    email   : {
        type: String ,
        required: [true,"email is required"],
        trim : true,
        unique : true,
        match: [/.+\@.+\..+/,"please use a valid email address"]
    },
    password : {
        type: String,
        required : [true,"please provide password"],
    },
    mobileNumber : {
        type : Number,
        required : [true,"please provide mobile number"],
    },
    courses : [{
        type : Number,
        required : [true,"please provide  number"],
    }],

    

})


export const User = (mongoose.models.User as mongoose.Model<user>) || mongoose.model<user>("User", UserSchema)