import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const LoginAPI = async (req, res) => {

    try {

        const { email, password } = req.body;

        // CHECK REQUIRED FIELDS
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // FIND USER
        const user = await User.findOne({ email });

        // CHECK USER
        if (!user) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // COMPARE PASSWORD
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        // CHECK PASSWORD
        if (!isPasswordCorrect) {

            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // GENERATE JWT TOKEN
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        // STORE TOKEN IN COOKIE
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        // SUCCESS RESPONSE
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};