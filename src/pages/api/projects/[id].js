import connectDB from '../../../lib/mongodb';
import Project from '../../../models/Project';
import { verifyToken } from '../../../utils/auth';

export default async function handler(req, res) {
	const { method } = req;
	const projectId = req.query.id;

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

	switch (method) {
		case 'PUT':
		try {
			const project = await Project.findOneAndUpdate(
				{ _id: projectId, members: decoded.userId },
				{ ...req.body },
				{ new: true }
			);

			if (!project) {
				return res.status(404).json({ message: 'Project not found' });
			}

			res.status(200).json({ message: 'Project updated successfully', project });
		} catch (error) {
			res.status(500).json({ message: 'Error updating project' });
		}
		break;

		case 'DELETE':
		try {
			const project = await Project.findOneAndDelete({
				_id: projectId,
				members: decoded.userId
			});

			if (!project) {
				return res.status(404).json({ message: 'Project not found' });
			}

			res.status(200).json({ message: 'Project deleted successfully' });
		} catch (error) {
			res.status(500).json({ message: 'Error deleting project' });
		}
		break;

		default:
		res.setHeader('Allow', ['PUT', 'DELETE']);
		res.status(405).json({ message: `Method ${method} Not Allowed` });
	}
}