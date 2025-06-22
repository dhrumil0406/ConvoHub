import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    profPic: {
        type: String,
        default: "https://www.gravatar.com/avatar"
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;