'use client';
import Head from "next/head";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import CreateProjectModal from '@/components/CreateProjectModal';
import EditProjectModal from '@/components/EditProjectModal';
import { Plus, Search, Filter, Clock, AlertCircle, ChevronLeft, ChevronRight, Edit2, Trash2 } from 'lucide-react';
const ITEMS_PER_PAGE = 6;
  
export default function Projects() {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [searchTerm, setSearchTerm] = useState('');
	const [pagination, setPagination] = useState({
		page: 1,
		total: 0,
		pages: 0
	});
	const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
	const fetchProjects = async (page = 1, search = '') => {
		setIsLoading(true);
		try {
			const response = await fetch(
				`/api/projects?page=${page}&limit=${ITEMS_PER_PAGE}&search=${search}`,
				{
					headers: {
					'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				}
			);
	
			const data = await response.json();
	
			if (response.ok) {
				setProjects(data.projects);
				setPagination(data.pagination);
			} else {
				setError(data.message || 'Failed to fetch projects');
			}
		} catch (err) {
			setError('Error fetching projects');
		} finally {
			setIsLoading(false);
		}
	};

	// Add delete handler function
	const handleDelete = async (projectId) => {
		if (window.confirm('Are you sure you want to delete this project?')) {
			try {
				const response = await fetch(`/api/projects/${projectId}`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					}
				});
		
				if (response.ok) {
				fetchProjects(pagination.page, debouncedSearchTerm);
				} else {
				setError('Failed to delete project');
				}
			} catch (err) {
				setError('Error deleting project');
			}
		}
	};
  
  
	// Handle search debounce
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearchTerm(searchTerm);
		}, 500);
  
	  	return () => clearTimeout(timer);
	}, [searchTerm]);
  
	// Initial fetch and auth check
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			router.push('/login');
		} else {
			fetchProjects(1, ''); 
		}
	}, [router]);
  
	
	useEffect(() => {
		if (!isLoading && pagination.page > 0) { 
			fetchProjects(pagination.page, debouncedSearchTerm);
		}
	}, [debouncedSearchTerm, pagination.page]);
  
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= pagination.pages) {
			setPagination(prev => ({ ...prev, page: newPage }));
		}
	};
  
	const getStatusColor = (status) => {
		const colors = {
			'planning': 'bg-yellow-100 text-yellow-800',
			'in-progress': 'bg-blue-100 text-blue-800',
			'review': 'bg-purple-100 text-purple-800',
			'completed': 'bg-green-100 text-green-800'
		};
		return colors[status] || 'bg-gray-100 text-gray-800';
	};
  
	const getPriorityColor = (priority) => {
		const colors = {
			'low': 'text-green-600',
			'medium': 'text-yellow-600',
			'high': 'text-red-600'
		};
		return colors[priority] || 'text-gray-600';
	};

	return (
		<>
			<Head>
				<title>Projects | Voxby</title>
				<meta name="description" content="Manage your Voxby projects" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<DashboardLayout>
				<div className="p-8">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold text-gray-900">Projects</h1>
						<button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
							<Plus size={20} /> New
						</button>
					</div>
					<div className="flex gap-4 mb-6">
						<div className="flex-1 relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
							<input 
								type="text" 
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Search projects..." 
								className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
							/>
						</div>
						<button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
							<Filter size={20} />
							Filter
						</button>
					</div>
					<div className="bg-white rounded-xl shadow-sm">
						{isLoading ? (
							<div className="text-center py-12">
								<div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4"></div>
								<p className="text-gray-600">Loading projects...</p>
							</div>
						) : error ? (
							<div className="text-center py-12">
								<AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
								<p className="text-red-500">{error}</p>
							</div>
						) : projects.length === 0 ? (
							<div className="text-center py-12 bg-white rounded-lg shadow-sm">
							<p className="text-gray-500 mb-4">No projects found</p>
							<button onClick={() => setIsModalOpen(true)} className="text-indigo-600 hover:text-indigo-700">
								Create your first project
							</button>
							</div>
						) : (
							<div className="grid gap-6">
								{projects.map((project) => (
									<div key={project._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
										<div className="flex justify-between items-start">
											<div>
												<h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
												<p className="text-gray-500 mt-1">{project.description}</p>
											</div>
											<span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(project.status)}`}>
												{project.status}
											</span>
										</div>
										<div className="mt-4 flex items-center gap-4 text-sm">
											<div className="flex items-center gap-1">
												<Clock size={16} />
												<span>Due {new Date(project.endDate).toLocaleDateString()}</span>
											</div>
											<span className={`font-medium ${getPriorityColor(project.priority)}`}>
												{project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
											</span>
										</div>
										<div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
											<div className="flex -space-x-2">
												{/* Placeholder for team members avatars */}
												<div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
												<div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
											</div>
											<div className="flex items-center gap-2">
												<button
													onClick={() => {
														setSelectedProject(project);
														setIsEditModalOpen(true);
													}}
													className="p-2 text-gray-600 hover:text-indigo-600 transition-colors"
													>
													<Edit2 size={16} />
												</button>
												<button
													onClick={() => handleDelete(project._id)}
													className="p-2 text-gray-600 hover:text-red-600 transition-colors"
													>
													<Trash2 size={16} />
												</button>
												<button onClick={() => router.push(`/dashboard/projects/${project._id}`)} className="text-sm text-indigo-600 hover:text-indigo-700">
													View Details →
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
					{/* Pagination */}
					{!isLoading && !error && projects.length > 0 && (
						<div className="mt-6 flex items-center justify-between">
							<p className="text-sm text-gray-700">
								Showing <span className="font-medium">{((pagination.page - 1) * ITEMS_PER_PAGE) + 1}</span>
								{' '}-{' '}
								<span className="font-medium">
									{Math.min(pagination.page * ITEMS_PER_PAGE, pagination.total)}
								</span>{' '}
								of{' '}
								<span className="font-medium">{pagination.total}</span> projects
							</p>
							<div className="flex gap-2">
								<button
									onClick={() => handlePageChange(pagination.page - 1)}
									disabled={pagination.page === 1}
									className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<ChevronLeft size={20} />
								</button>
								{[...Array(pagination.pages)].map((_, i) => (
									<button
									key={i + 1}
									onClick={() => handlePageChange(i + 1)}
									className={`px-4 py-2 rounded-lg ${
										pagination.page === i + 1
										? 'bg-indigo-600 text-white'
										: 'border hover:bg-gray-50'
									}`}
									>
									{i + 1}
									</button>
								))}
								<button
									onClick={() => handlePageChange(pagination.page + 1)}
									disabled={pagination.page === pagination.pages}
									className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<ChevronRight size={20} />
								</button>
							</div>
						</div>
					)}
				</div>
				<CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
				<EditProjectModal isOpen={isEditModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject}/>
			</DashboardLayout>
		</>
	);
}