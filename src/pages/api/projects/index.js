import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req, res) {
	if (req.method !== 'GET') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	try {
		const token = req.headers.authorization?.split(' ')[1];
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = verifyToken(token);
		if (!decoded) {
			return res.status(401).json({ message: 'Invalid token' });
		}

   		await connectDB();

		// Get pagination params from query
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 6;
		const search = req.query.search || '';

		// Build query
		const query = {
			members: decoded.userId,
			$or: [
				{ name: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } }
			]
		};

		// Get total count for pagination
		const total = await Project.countDocuments(query);

		// Fetch paginated projects
		const projects = await Project.find(query)
			.sort({ createdAt: -1 })
			.skip((page - 1) * limit)
			.limit(limit);

			res.status(200).json({
			projects,
			pagination: {
				total,
				pages: Math.ceil(total / limit),
				page,
				limit
			}
		});

	} catch (error) {
		console.error('Fetch projects error:', error);
		res.status(500).json({ message: 'Error fetching projects' });
	}
}