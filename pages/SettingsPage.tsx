
import React from 'react';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Application Settings</h2>
        <p>This is a placeholder for application settings. You can add configuration options, profile settings, and more here.</p>
        
        <div className="mt-6 space-y-4">
            <div>
                <label className="block font-medium">Theme</label>
                <select className="w-full max-w-xs p-2 border rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600 mt-1">
                    <option>Light</option>
                    <option>Dark</option>
                    <option>System</option>
                </select>
            </div>
             <div>
                <label className="block font-medium">Notifications</label>
                <div className="flex items-center mt-2">
                    <input type="checkbox" id="email-notifs" className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                    <label htmlFor="email-notifs" className="ml-2">Enable Email Notifications</label>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
