import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        if (!email || !fullName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const solt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, solt);

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        });

        if (newUser) {
            generateToken(newUser, res); // Generate JWT token and set it in cookie
            await newUser.save(); // Save the new user to the database
            return res.status(201).json({ message: "User created successfully", user: { _id: newUser._id, fullName: newUser.fullName, email: newUser.email, profilePic: newUser.profPic } });
        } else {
            return res.status(500).json({ message: "Failed to create user" });
        }
    } catch (error) {
        console.error("Error during signup controller :", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        generateToken(user, res); // Generate JWT token and set it in cookie

        return res.status(200).json({ message: "Login successful", user: { _id: user._id, fullName: user.fullName, email: user.email, profilePic: user.profPic } });
    } catch (error) {
        console.error("Error during login controller :", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true, // Make cookie inaccessible to client-side scripts
            expires: new Date(0), // Set cookie to expire immediately
        });
        // res.cookie("token", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout controller :", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id; // req.user is set by the protectRoute middleware

        if (!profilePic) {
            return res.status(400).json({ message: "Profile picture is required" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic); // Upload the profile picture to Cloudinary
        
        const updatedUser = await User.findByIdAndUpdate(userId, { profPic: uploadResponse.secure_url }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "Profile updated successfully", user: { _id: updatedUser._id, fullName: updatedUser.fullName, email: updatedUser.email, profilePic: updatedUser.profPic } });

    } catch (error) {
        console.error("Error during updateProfile controller :", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        return res.status(200).json(req.user); // req.user is set by the protectRoute middleware
    } catch (error) {
        console.error("Error during checkAuth controller :", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
}