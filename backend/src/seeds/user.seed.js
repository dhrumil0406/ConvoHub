import { config } from "dotenv";
config();

const seedUsers = [
    {
        email: "a@gmail.com",
        fullName: "abc",
        password: "123456",
        profPic: "abc"
    },
    {
        email: "c@gmail.com",
        fullName: "cbc",
        password: "123456",
        profPic: "cbc"
    },
    {
        email: "e@gmail.com",
        fullName: "ebc",
        password: "123456",
        profPic: "ebc"
    },
];

import { connectToDB } from "../lib/db.js";
import User from "../models/user.model.js";

const seedDatabase = async () => {
    try {
        await connectToDB();
        await User.insertMany(seedUsers);
        console.log("user added...");
    } catch (error) {
        console.error("Error: ", error.message);
    }
}

seedDatabase();

