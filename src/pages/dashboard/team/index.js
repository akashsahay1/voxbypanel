'use client';
import Head from "next/head";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { UserPlus, Mail, Phone } from 'lucide-react';

export default function Team() {
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
        <title>Team | Voxby</title>
        <meta name="description" content="Manage your Voxby team" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DashboardLayout>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700">
              <UserPlus size={20} />
              Add Member
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((member) => (
              <div key={member} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Team Member {member}</h3>
                    <p className="text-sm text-gray-500">Software Developer</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span className="text-sm">member{member}@voxby.com</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={16} />
                    <span className="text-sm">+1 234 567 890{member}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}