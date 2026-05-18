import jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {

    try {

        // GET TOKEN FROM COOKIE
        const token = req.cookies.token;

        // CHECK TOKEN
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "User not logged in"
            });
        }

        // VERIFY TOKEN
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // STORE USER DATA
        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};