import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
	{
		name: { 
			type: String,
			required: [true, 'Please provide a project name'],
			trim: true,
		},
		description: {
			type: String,
			required: [true, 'Please provide a project description'],
		},
		startDate: {
			type: Date,
			required: [true, 'Please provide a start date'],
		},
		endDate: {
			type: Date,
			required: [true, 'Please provide an end date'],
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high'],
			default: 'medium',
		},
		status: {
			type: String,
			enum: ['planning', 'in-progress', 'review', 'completed'],
			default: 'planning',
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		members: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		}],
	}, 
	{
		timestamps: true,
	}
);

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);