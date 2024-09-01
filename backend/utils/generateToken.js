import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    try {
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '15d',
        });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', // Secure in production
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            sameSite: "strict",
        });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Internal Server Error - Token generation failed" });
    }
};

export default generateTokenAndSetCookie;
