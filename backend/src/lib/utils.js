import jwt from 'jsonwebtoken';

export const generateToken = (user, res) => {
    const token = jwt.sign(
        { id: user._id }, process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    res.cookie('token', token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict', // Helps prevent CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return token;
}