import authMiddleware from '../../../middleware/auth';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
}

export default authMiddleware(handler);