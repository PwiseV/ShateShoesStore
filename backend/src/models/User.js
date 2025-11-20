import mongoose from "mongoose";

const userSChema = new  mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    hashedPassword: {
        type: String,
        required: true,       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer"
    },
    avatarUrl: {
        type: String,
    },
    avatarId: {
        type: String,
    },
    bio : {
        type: String,
        maxlength: 500,
    },
    phone: {
        type: String,
        sparse: true,
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSChema);

export default User;