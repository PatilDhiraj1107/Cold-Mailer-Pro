import bcrypt from "bcrypt";
import User from "../model/auth.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, domain, skills } = req.body;

        // Check if user already exists
       
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields are Required !",
             });
        }
        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long",
             });
        }

        // Create new user
        const existuser = await User.findOne({ email });
        if (existuser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
             });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            domain,
            skills,
        })
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password",
            });
        }
        const token = jwt.sign({ userId : user._id }, process.env.JWT_SECRET);
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        });
    } catch (e) {
        console.log(e.message)
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};