import React from 'react';
import Navigation from '@/components/Navigation';

export default function DashboardLayout({ children }) {

	return (
		<>
			<div className="flex h-screen bg-gray-50"> 
				{/* Sidebar */}
				<Navigation />
				{/* Main Content */}
				<div className="flex-1 overflow-y-auto">
					{children}
				</div>
			</div> 
		</>
	);
}
