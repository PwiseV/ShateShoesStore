import mongoose from "mongoose";

const userSChema = new  mongoose.Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: false 
    },
    hashedPassword: {
        type: String,
        required: false,    // Cho phép tài khoản Google không có password
        default: "",      
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
    phone: {
        type: String,
        sparse: true,
    },
    authType: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSChema);

export default User;