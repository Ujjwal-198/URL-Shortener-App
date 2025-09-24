import User from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleDeleteAllUrlsForUser } from "./urlController.js";

// --------------------------------------------------------- SIGNUP
export const handleSignup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid input'
            }
        })

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({
            success: false,
            error: {
                code: "CONFLICT",
                message: "User already exists",
            }
        })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, name, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        console.log("Generated Token:", token); // Debugging line

        // Set HttpOnly cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600 * 1000, // 1 hour
        });

        if (user) {
            return res.status(201).json({
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                message: "User created successfully",
            });
        }


    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
                details: error.message,
            },
        });
    }
}

// --------------------------------------------------------- LOGIN
export async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: 'Invalid input'
            }
        })

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "User not found",
                },
            });
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({
                success: false,
                error: {
                    code: "UNAUTHORIZED",
                    message: "Invalid email or password",
                },
            });
        }

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Set HttpOnly cookie
        res.cookie('authToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600 * 1000, // 1 hour
        });

        return res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            message: "Login successful",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: {
                code: "INTERNAL_SERVER_ERROR",
                message: "Internal Server Error",
                details: error.message,
            },
        });
    }
}

// --------------------------------------------------------- LOGOUT
export const handleLogout = async (req, res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        sameSite: 'none', 
        path: '/',
        secure: true, // optional
    });
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
};


// --------------------------------------------------------- profile
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// --------------------------------------------------------- DELETE USER
export const handleDeleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        handleDeleteAllUrlsForUser(userId);
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User Not Found'
            });
        }
        res.clearCookie('authToken', {
            httpOnly: true,
            sameSite: 'none',
        });
        return res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

