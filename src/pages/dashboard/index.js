'use client';
import Head from "next/head";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {FileText, ChevronRight, BarChart3, CircleDollarSign, Clock, ArrowUpRight} from 'lucide-react';
import styles from '@/styles/Dashboard.module.css';
import DashboardLayout from '@/components/DashboardLayout';
import Link from 'next/link';

// Sample data for the chart
const chartData = [
	{ name: 'Jan', value: 12 },
	{ name: 'Feb', value: 19 },
	{ name: 'Mar', value: 15 },
	{ name: 'Apr', value: 25 },
	{ name: 'May', value: 22 },
	{ name: 'Jun', value: 30 }
  ];
  

export default function Dashboard() {
	const router = useRouter();
	
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			router.push('/login');
		}
	}, [router]);

	return (
		<>
			<Head>
				<title>Dashboard | Voxby</title>
				<meta name="description" content="" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className={styles.dashboardContainer}>
				<DashboardLayout>
					<div className="p-8">
						<h2 className="text-2xl font-bold text-gray-900 mb-8">Welcome back</h2>
						{/* Stats Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							<div className="bg-white p-6 rounded-xl shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-gray-500 text-sm">Total Projects</h3>
									<span className="p-2 bg-indigo-50 rounded-lg">
										<FileText className="w-5 h-5 text-indigo-600" />
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<span className="text-2xl font-bold text-gray-900">45</span>
										<span className="text-green-500 text-sm ml-2">+12.5%</span>
									</div>
									<ChevronRight className="w-5 h-5 text-gray-400" />
								</div>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-gray-500 text-sm">Active Projects</h3>
									<span className="p-2 bg-green-50 rounded-lg">
										<BarChart3 className="w-5 h-5 text-green-600" />
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<span className="text-2xl font-bold text-gray-900">18</span>
										<span className="text-green-500 text-sm ml-2">+5.2%</span>
									</div>
									<ChevronRight className="w-5 h-5 text-gray-400" />
								</div>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-gray-500 text-sm">Total Revenue</h3>
									<span className="p-2 bg-blue-50 rounded-lg">
										<CircleDollarSign className="w-5 h-5 text-blue-600" />
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<span className="text-2xl font-bold text-gray-900">$24,500</span>
										<span className="text-green-500 text-sm ml-2">+8.1%</span>
									</div>
									<ChevronRight className="w-5 h-5 text-gray-400" />
								</div>
							</div>

							<div className="bg-white p-6 rounded-xl shadow-sm">
								<div className="flex items-center justify-between mb-4">
									<h3 className="text-gray-500 text-sm">Avg. Completion Time</h3>
									<span className="p-2 bg-purple-50 rounded-lg">
										<Clock className="w-5 h-5 text-purple-600" />
									</span>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<span className="text-2xl font-bold text-gray-900">12 Days</span>
										<span className="text-red-500 text-sm ml-2">+2.3%</span>
									</div>
									<ChevronRight className="w-5 h-5 text-gray-400" />
								</div>
							</div>
						</div>

						{/* Recent Projects */}
						<div className="bg-white rounded-xl shadow-sm mb-8 overflow-hidden">
							<div className="p-6 border-b border-gray-200">
								<h3 className="text-lg font-semibold text-gray-900">Recent Projects</h3>
							</div>
							<div className="divide-y divide-gray-200">
								{[1, 2, 3, 4].map((item) => (
									<div key={item} className="p-6 hover:bg-gray-50">
										<div className="flex items-center justify-between">
											<div>
												<h4 className="text-sm font-semibold text-gray-900">Project {item}</h4>
												<p className="text-sm text-gray-500 mt-1">Last updated 2h ago</p>
											</div>
											<Link href={`/dashboard/projects/${item}`} className="flex items-center text-sm text-indigo-600 hover:text-indigo-900">
												View Details
												<ArrowUpRight className="w-4 h-4 ml-1" />
											</Link>
										</div>
										<div className="mt-3">
											<div className="w-full bg-gray-200 rounded-full h-2">
												<div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${item * 20}%` }}></div>
											</div>
											<div className="flex items-center justify-between mt-2">
												<span className="text-sm text-gray-500">Progress</span>
												<span className="text-sm font-medium text-gray-900">{item * 20}%</span>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>

						{/* Chart Section */}
						<div className="bg-white p-6 rounded-xl shadow-sm">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-lg font-semibold text-gray-900">Projects Overview</h3>
								<select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 p-2.5">
									<option>Last 6 months</option>
									<option>Last year</option>
									<option>All time</option>
								</select>
							</div>
							<div className="h-72">
								{/* Chart will be rendered here */}
								<div className="w-full h-full flex items-end justify-between">
									{chartData.map((data, index) => (
										<div key={index} className="flex flex-col items-center">
											<div className="w-12 bg-indigo-600 rounded-t" style={{ height: `${data.value * 2}%` }}></div>
											<span className="text-sm text-gray-500 mt-2">{data.name}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</DashboardLayout>
			</div>
		</>
	);
}