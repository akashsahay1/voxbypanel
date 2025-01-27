import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';

export default function CreateProjectModal({ isOpen, onClose }) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [formData, setFormData] = useState({
		name: '',
		description: '',
		startDate: '',
		endDate: '',
		priority: 'medium',
		status: 'planning'
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const response = await fetch('/api/projects/create', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`
				},
				body: JSON.stringify(formData)
			});

			const data = await response.json();

			if (response.ok) {
				onClose();
				window.location.reload();
			} else {
				setError(data.message || 'Failed to create project');
			}
		} catch (err) {
			setError('An error occurred while creating the project');
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-full max-w-md p-6">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-semibold text-gray-900">Create New Project</h2>
					<button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X size={20} /></button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
						<input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter project name" />
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
						<textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" rows={3} placeholder="Enter project description" />
					</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
						<input type="date" required value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
						<input type="date" required value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
						<select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
						<select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
							<option value="planning">Planning</option>
							<option value="in-progress">In Progress</option>
							<option value="review">Review</option>
							<option value="completed">Completed</option>
						</select>
					</div>
				</div>

				{error && <div className="text-red-500 text-sm">{error}</div>}

				<div className="flex justify-end space-x-3">
					<button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
					<button type="submit" disabled={isLoading} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50">
					{isLoading ? <div className="flex items-center"><Loader className="animate-spin -ml-1 mr-2 h-4 w-4" />Creating...</div> : 'Create Project'}
					</button>
				</div>
				</form>
			</div>
		</div>
	);
}