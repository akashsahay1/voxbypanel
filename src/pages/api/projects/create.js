import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		// Verify token
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = verifyToken(token);
		if (!decoded) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		await connectDB();

		const { name, description, startDate, endDate, priority, status } = req.body;

		// Validate required fields
		if (!name || !description || !startDate || !endDate) {
			return res.status(400).json({ message: 'Please provide all required fields' });
		}

		// Create new project
		const project = await Project.create({
			name,
			description,
			startDate,
			endDate,
			priority,
			status,
			createdBy: decoded.userId,
			members: [decoded.userId]
		});

		res.status(201).json({
			message: 'Project created successfully',
			project
		});

	} catch (error) {
		console.error('Project creation error:', error);
		res.status(500).json({ message: 'Error creating project' });
	}
}