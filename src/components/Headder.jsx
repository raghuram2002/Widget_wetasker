import React, { useState } from 'react';
import Assigned_To_Me from './Team_Tasker/Assigned_To_Me';
import { Rnd } from 'react-rnd';

const Headder = () => {
  const [activeTab, setActiveTab] = useState('assigned');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'assigned':
        return <Assigned_To_Me/>;
      case 'followup':
        return <div className="p-4">🔁 Need Follow Up Content</div>;
      case 'completed':
        return <div className="p-4">✅ Completed Task Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="w-[1200px] bg-white shadow p-4">
      <div className="flex w-full items-center justify-between px-4 py-2">
        {/* Left Menu */}
        <ul className="flex gap-8 text-sm font-medium text-gray-700">
          <li className="relative group cursor-pointer hover:text-blue-600 bg-blue-800 text-white px-4 py-1">
            Team Tasker

            {/* Dropdown Menu */}
            <ul className="absolute left-0 mt-0 w-35 bg-white border border-gray-200 shadow-lg rounded-md z-50 group-hover:block hidden">
              <li
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => setActiveTab('assigned')}
              >
                Assigned to me
              </li>
              <li
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => setActiveTab('followup')}
              >
                Need Follow Up
              </li>
              <li
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                onClick={() => setActiveTab('completed')}
              >
                Completed Task
              </li>
            </ul>
          </li>

          <li className="cursor-pointer hover:text-blue-400 bg-blue-800 text-white px-4 py-1">Personal Tasker</li>
          <li className="cursor-pointer hover:text-blue-500 bg-blue-800 text-white px-4 py-1">Meetings</li>
        </ul>

        {/* Search */}
        <div className="flex items-center gap-2">
          <label htmlFor="search" className="text-sm text-gray-600">
            Search:
          </label>
          <input
            id="search"
            type="text"
            className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search..."
          />
        </div>

        {/* Add Task */}
        <div>
          <h5 className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
            Add Task
          </h5>
        </div>
      </div>

      {/* Render the selected tab content */}
      {renderTabContent()}
    </div>
  );
};

export default Headder;
