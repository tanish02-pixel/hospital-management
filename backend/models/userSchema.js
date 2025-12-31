import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: [3,"First name must be at least 3 characters long"]
    },

    lastName:{
        type: String,
        required: true,
        minLength: [3,"Last name must be at least 3 characters long"]
    },

    email:{
        type: String,
        required: true,
        validate: [validator.isEmail,"Please enter a valid email address"]
    },

    phone:{
        type: String,
        required: true,
        minLength: [10,"Phone Number must be at least 10 Digits"],
        maxLength: [10,"Phone Number must be at least 10 Digits"]
    },

    nic:{
        type: String,
        required: true,
        minLength: [12,"NIC Number must be at least 12 Digits"],
        maxLength: [12,"NIC Number must be at least 12 Digits"]
    },

    dob:{
        type: Date,
        required: [true,"DOB is required!"],
    },

    gender:{
        type: String,
        required: true,
        enum: ["Male","Female","Other"],
    },

    password:{
        type: String,
        required: true,
        minLength: [6,"Password must be at least 6 characters long"],
        required: [true,"Password is required!"],
        select:false,
    },

    role:{
        type: String,
        required: true,
        enum: ["Admin","Patient","Doctor"],
    },

    doctorDepartment:{
        type: String,
    },

    docAvatar:{
        public_id:String,
        url:String,
    }

    });





    userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       return next()
    }

    this.password = await bcrypt.hash(this.password,10);

})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

userSchema.methods.generateJsonWebToken = function(){
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRES,
})
}

export const User = mongoose.model("User", userSchema);