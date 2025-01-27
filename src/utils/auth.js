import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
	try {
		// Verify the token using your JWT secret from environment variables
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		return decoded;
	} catch (error) {
		// If token is invalid or expired, return null
		return null;
	}
};

// Add other auth utility functions if needed
export const generateToken = (userId) => {
	return jwt.sign(
		{ userId },
		process.env.JWT_SECRET,
		{ expiresIn: '7d' }
	);
};

// Function to extract token from request headers
export const getTokenFromHeaders = (req) => {
	const authHeader = req.headers.authorization;
	if (authHeader && authHeader.startsWith('Bearer ')) {
		return authHeader.split(' ')[1];
	}
	return null;
};