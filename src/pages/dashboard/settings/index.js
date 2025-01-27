'use client';
import Head from "next/head";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Save } from 'lucide-react';


export default function Settings() {

	const router = useRouter();
	const [saved, setSaved] = useState(false);
  
	useEffect(() => {
	  const token = localStorage.getItem('token');
	  if (!token) {
		router.push('/login');
	  }
	}, [router]);
  
	const handleSave = () => {
	  setSaved(true);
	  setTimeout(() => setSaved(false), 2000);
	};

	return (
		<>
			<Head>
				<title>Settings | Voxby</title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<DashboardLayout>
				<div className="p-8">
					<div className="flex justify-between items-center mb-6">
						<h1 className="text-2xl font-bold text-gray-900">Settings</h1>
						{saved && (
							<span className="text-green-600 text-sm">Settings saved successfully!</span>
						)}
					</div>

					<div className="bg-white rounded-xl shadow-sm p-6">
						<div className="space-y-6">
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
									<input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your name"/>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
									<input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your email"/>
								</div>
								</div>
							</div>

							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
								<div className="space-y-4">
								<div className="flex items-center gap-3">
									<input type="checkbox" id="emailNotif" className="rounded text-indigo-600" />
									<label htmlFor="emailNotif" className="text-gray-700">Email notifications</label>
								</div>
								<div className="flex items-center gap-3">
									<input type="checkbox" id="projectUpdates" className="rounded text-indigo-600" />
									<label htmlFor="projectUpdates" className="text-gray-700">Project updates</label>
								</div>
								</div>
							</div>

							<div className="pt-4 border-t border-gray-200">
								<button onClick={handleSave} className="bg-indigo-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
									<Save size={20} /> Save Changes
								</button>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	)
}