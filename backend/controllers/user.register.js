import registerValidator from "../validators/RegisterValidator.js";
import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const RegisterAPI = async (req, res) => {

    try {

        // VALIDATE DATA
        const validatedData = registerValidator.safeParse(req.body);

        // CHECK VALIDATION
        if (!validatedData.success) {

            return res.status(400).json({
                success: false,
                errors: validatedData.error.issues
            });
        }

        const { userName, email, password } = validatedData.data;

        // CHECK EXISTING USER
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE USER
        const user = await User.create({
            userName,
            email,
            password: hashedPassword
        });

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

        res.status(201).json({
            success: true,
            message: "User registered successfully",
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