'use client';
import Head from "next/head";
import { useEffect, useState } from 'react';  // Add useState
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Search, Filter } from 'lucide-react';

export default function Notifications() {
  const router = useRouter();
  // Add state variables
  const [deviceToken, setDeviceToken] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      router.push('/login');
    }
  }, [router]);

  // Add submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/notifications/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceToken,
          title,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send notification');
      }

      setStatus('Notification sent successfully!');
      setTitle('');
      setMessage('');
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Notifications | Voxby</title>
        <meta name="description" content="Manage your Voxby Notifications" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DashboardLayout>
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          </div>

          {/* Add notification form */}
          <div className="max-w-md bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Send Push Notification</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Device Token
                </label>
                <input
                  type="text"
                  value={deviceToken}
                  onChange={(e) => setDeviceToken(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notification Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Notification
              </button>

              {status && (
                <p className={`mt-4 text-center ${
                  status.includes('Error') ? 'text-red-500' : 'text-green-500'
                }`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}