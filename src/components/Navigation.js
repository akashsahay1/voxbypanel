import React, { useEffect, useState } from 'react';
import { LayoutDashboard, FileText, Users, BellRing, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';


export default function Navigation() {

	const [currentPath, setCurrentPath] = useState('');

	useEffect(() => {
		setCurrentPath(window.location.pathname);
	}, []);

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.location.href = '/login';
	}

	const getLinkStyles = (path) => {
		const isActive = currentPath === path;
		return `flex items-center px-4 py-3 rounded-lg ${
			isActive 
				? 'text-gray-700 bg-indigo-50' 
				: 'text-gray-600 hover:bg-gray-50'
		}`;
	};
	
	const getTextStyles = (path) => {
		const isActive = currentPath === path;
		return `ml-3 ${isActive ? 'font-medium text-indigo-600' : ''}`;
	};
	
	const getIconStyles = (path) => {
		const isActive = currentPath === path;
		return `w-5 h-5 ${isActive ? 'text-indigo-600' : ''}`;
	};

	return (
		<>
			<div className="w-64 bg-white border-r border-gray-200">
				<div className="flex flex-col h-full">
					{/* Logo */}
					<div className="p-6">
						<h1 className="text-2xl font-bold text-indigo-600">Voxby</h1>
					</div>
					{/* Navigation */}
					<nav className="flex-1 overflow-y-auto">
						<div className="px-4 space-y-1">
							<Link href="/dashboard" className={getLinkStyles('/dashboard')}>
								<LayoutDashboard className={getIconStyles('/dashboard')} />
								<span className={getTextStyles('/dashboard')}>Dashboard</span>
							</Link>
							<Link href="/dashboard/projects" className={getLinkStyles('/dashboard/projects')}>
								<FileText className={getIconStyles('/dashboard/projects')} />
								<span className={getTextStyles('/dashboard/projects')}>Projects</span>
							</Link>
							<Link href="/dashboard/team" className={getLinkStyles('/dashboard/team')}>
								<Users className={getIconStyles('/dashboard/team')} />
								<span className={getTextStyles('/dashboard/team')}>Team</span>
							</Link>
							<Link href="/dashboard/notifications" className={getLinkStyles('/dashboard/notifications')}>
								<BellRing className={getIconStyles('/dashboard/notifications')} />
								<span className={getTextStyles('/dashboard/notifications')}>Notifications</span>
							</Link>
							<Link href="/dashboard/settings" className={getLinkStyles('/dashboard/settings')}>
								<Settings className={getIconStyles('/dashboard/settings')} />
								<span className={getTextStyles('/dashboard/settings')}>Settings</span>
							</Link>
						</div>
					</nav>
					{/* Logout Button */}
					<div className="p-4 border-t border-gray-200">
						<button onClick={logout} className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
							<LogOut className="w-5 h-5" />
							<span className="ml-3">Logout</span>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}