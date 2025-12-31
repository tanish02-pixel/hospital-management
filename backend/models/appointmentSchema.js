import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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

    appointment_date:{
        type: String,
        required: [true,"Appointment Date is required!"],
    },

    department:{
        type: String,
        required: true,
    },

    doctor:{
        firstName:{
        type: String,
        required: true,

        },
        lastName:{
        type: String,
        required: true,
        },
    },

    hasVisited:{
        type: Boolean,
        default: false,
    },

    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },

    address:{
        type: String,
        required: true,
    },

    status:{
        type: String,
        enum: ["Pending","Accepted","Rejected"],
        default: "Pending",
    },

    });

    export const Appointment = mongoose.model("Appointment", appointmentSchema);