export const LogoutAPI = async (req, res) => {

    try {

        // CLEAR COOKIE
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // true in production
            sameSite: "lax"
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful"
        });

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};