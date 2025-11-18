
import React from 'react';
import { CollectionIcon, ExpenditureIcon, BookingIcon, ContactIcon } from '../components/ui/icons/Icons';

const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode, color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
        <div className={`rounded-full p-3 mr-4 ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const DashboardPage: React.FC = () => {
  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Bookings" value="125" icon={<BookingIcon />} color="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" />
            <StatCard title="Total Collections" value="$15,200" icon={<CollectionIcon />} color="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300" />
            <StatCard title="Total Expenditures" value="$4,800" icon={<ExpenditureIcon />} color="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300" />
            <StatCard title="New Contacts" value="32" icon={<ContactIcon />} color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300" />
        </div>
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <p>This is a placeholder for recent activity, charts, or other summary information.</p>
        </div>
    </div>
  );
};

export default DashboardPage;
