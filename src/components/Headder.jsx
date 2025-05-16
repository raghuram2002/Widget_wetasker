import React, { useState, useEffect } from 'react';
import Assigned_To_Me from './Team_Tasker/Assigned_To_Me';
import NeedToFollowUp from './Team_Tasker/NeedToFollowUp';
import CompletedTask from './Team_Tasker/CompletedTask';
import PersonalTasker from './Personal_Tasker/PersonalTasker';
import Meetings from './Meetings/Meetings';
import { Rnd } from 'react-rnd';

const Headder = ({ showMeetings, showPersonal, showTeamTasker }) => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [title, setTitle] = useState('Assigned To Me');
  const [searchTerm, setSearchTerm] = useState('');

  // Draggable box positions
  const [teamTaskerRnd, setTeamTaskerRnd] = useState({ x: 0, y: 0, width: 160, height: 40 });
  const [personalRnd, setPersonalRnd] = useState({ x: 180, y: 0, width: 160, height: 40 });
  const [meetingsRnd, setMeetingsRnd] = useState({ x: 360, y: 0, width: 160, height: 40 });

  // Auto-switch tab if current tab is meetings but it’s hidden
useEffect(() => {
  const isTeamTaskerTab = ['assigned', 'followup', 'completed'].includes(activeTab);

  if (isTeamTaskerTab && !showTeamTasker) {
    if (showPersonal) {
      setActiveTab('personal');
      setTitle('Personal Tasker');
    } else if (showMeetings) {
      setActiveTab('meetings');
      setTitle('Meetings');
    } else {
      setActiveTab(null);
      setTitle('');
    }
  }

  if (activeTab === 'personal' && !showPersonal) {
    if (showTeamTasker) {
      setActiveTab('assigned');
      setTitle('Assigned To Me');
    } else if (showMeetings) {
      setActiveTab('meetings');
      setTitle('Meetings');
    } else {
      setActiveTab(null);
      setTitle('');
    }
  }

  if (activeTab === 'meetings' && !showMeetings) {
    if (showTeamTasker) {
      setActiveTab('assigned');
      setTitle('Assigned To Me');
    } else if (showPersonal) {
      setActiveTab('personal');
      setTitle('Personal Tasker');
    } else {
      setActiveTab(null);
      setTitle('');
    }
  }
}, [activeTab, showTeamTasker, showPersonal, showMeetings]);


  const tasks = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    taskName: 'Update UI',
    assign: 'Bob',
    action: 'Review',
    delegate: 'Raghu',
    Priority: 'Medium',
  }));

  const handleTabChange = (tab, titleText) => {
    if (tab === 'meetings' && !showMeetings) return;
    setActiveTab(tab);
    setTitle(titleText);
    setSearchTerm('');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'assigned':
        return <div className="p-4 mt-[30px]"><Assigned_To_Me tasks={tasks} searchTerm={searchTerm} /></div>;
      case 'followup':
        return <div className="p-4 mt-[30px]"><NeedToFollowUp tasks={tasks} searchTerm={searchTerm} /></div>;
      case 'completed':
        return <div className="p-4 mt-[30px]"><CompletedTask tasks={tasks} searchTerm={searchTerm} /></div>;
      case 'personal':
        return showPersonal ? <div className="p-4 mt-[30px]"><PersonalTasker /></div> : null;
      case 'meetings':
        return showMeetings ? <div className="p-4 mt-[30px]"><Meetings /></div> : null;
      case 'teamTasker':
        return showTeamTasker ? <div><Assigned_To_Me /></div> : null;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full bg-white shadow-md p-4 z-30">
      <div className="flex w-full items-center justify-between px-4 py-2">
        {/* Left Menu Tabs */}
        <ul className="flex gap-4 text-sm font-medium text-gray-700">
          {/* Team Tasker */}
          { showTeamTasker && (
            <Rnd
            default={teamTaskerRnd}
            bounds="window"
            minWidth={120}
            minHeight={40}
            enableResizing={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            onDragStop={(e, d) => setTeamTaskerRnd(prev => ({ ...prev, x: d.x, y: d.y }))}
            onResizeStop={(e, direction, ref, delta, position) =>
              setTeamTaskerRnd({
                width: parseInt(ref.style.width),
                height: parseInt(ref.style.height),
                x: position.x,
                y: position.y
              })
            }
            style={{ zIndex: 1000 }}
          >
            <li className="w-full h-full relative group cursor-pointer bg-blue-800 text-white flex items-center justify-center rounded transition-colors duration-200 hover:bg-blue-700">
              Team Tasker
              <ul className="absolute left-0 mt-1 w-40 bg-white border text-gray-600 border-gray-300 shadow-lg rounded-md z-50 hidden group-hover:block">
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                    activeTab === 'assigned' ? 'bg-blue-100 font-semibold text-blue-700' : ''
                  }`}
                  onClick={() => handleTabChange('assigned', 'Assigned To Me')}
                >
                  Assigned to me
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                    activeTab === 'followup' ? 'bg-blue-100 font-semibold text-blue-700' : ''
                  }`}
                  onClick={() => handleTabChange('followup', 'Need Follow Up')}
                >
                  Need Follow Up
                </li>
                <li
                  className={`px-4 py-2 cursor-pointer hover:bg-blue-50 ${
                    activeTab === 'completed' ? 'bg-blue-100 font-semibold text-blue-700' : ''
                  }`}
                  onClick={() => handleTabChange('completed', 'Completed Task')}
                >
                  Completed Task
                </li>
              </ul>
            </li>
          </Rnd>
          )}

          {/* Personal Tasker */}
          {showPersonal && (
            <Rnd
              default={personalRnd}
              bounds="window"
              minWidth={80}
              minHeight={40}
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              onDragStop={(e, d) =>
                setPersonalRnd(prev => ({ ...prev, x: d.x, y: d.y }))
              }
              onResizeStop={(e, direction, ref, delta, position) =>
                setPersonalRnd({
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  x: position.x,
                  y: position.y,
                })
              }
              style={{ zIndex: 1000 }} // keeps it on top
            >
              <li
                className="w-full h-full flex items-center justify-center cursor-pointer bg-blue-800 text-white rounded transition-colors duration-200 hover:bg-blue-700"
                onClick={() => handleTabChange('personal', 'Personal Tasker')}
              >
                Personal Tasker
              </li>
            </Rnd>
          )}

          {/* Meetings (conditional) */}
          {showMeetings && (
            <Rnd
              default={meetingsRnd}
              bounds="window"
              minWidth={80}
              minHeight={40}
              enableResizing={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                topRight: true,
                bottomRight: true,
                bottomLeft: true,
                topLeft: true,
              }}
              onDragStop={(e, d) =>
                setMeetingsRnd(prev => ({ ...prev, x: d.x, y: d.y }))
              }
              onResizeStop={(e, direction, ref, delta, position) =>
                setMeetingsRnd({
                  width: parseInt(ref.style.width),
                  height: parseInt(ref.style.height),
                  x: position.x,
                  y: position.y,
                })
              }
              style={{ zIndex: 1000 }} // optional: keeps RND above other elements
            >
              <li
                className="w-full h-full flex items-center justify-center cursor-pointer bg-blue-800 text-white rounded transition-colors duration-200 hover:bg-blue-700"
                onClick={() => handleTabChange('meetings', 'Meetings')}
              >
                Meetings
              </li>
            </Rnd>
          )}
        </ul>

        {/* Search Box */}
        <div className="flex flex-row items-center gap-2 py-2">
          <Rnd
            default={{ x: 0, y: 0, width: 300, height: 40 }}
            minWidth={150}
            bounds="window"
            enableResizing={{ right: true }}
            className="flex items-center space-x-2 bg-white px-2 py-1 rounded-md"
          >
            <label htmlFor="search" className="text-sm text-gray-600 whitespace-nowrap">
              Search:
            </label>
            <input
              id="search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 w-[78.5%] h-full px-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search..."
            />
          </Rnd>
        </div>

        {/* Add Task */}
        <div className='me-12'>
          <Rnd>
          <h5 className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">Add Task</h5>
          </Rnd>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-center mt-8 font-bold text-2xl">{title}</h1>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  );
};

export default Headder;
