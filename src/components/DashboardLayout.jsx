import React, { useState, useEffect } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Headder from './Headder';

const DashboardLayout = () => {
  // ✅ Initialize from localStorage on first render
  const [topNavVisible, setTopNavVisible] = useState(() => {
    const saved = localStorage.getItem('pref_topNav');
    return saved === null ? true : saved === 'true';
  });

  const [showMeetings, setShowMeetings] = useState(() => {
    const saved = localStorage.getItem('pref_meetings');
    return saved === null ? true : saved === 'true';
  });

  const [showPersonal, setShowPersonal] = useState(() => {
    const saved = localStorage.getItem('pref_personal');
    return saved === null ? true : saved === 'true';
  });

  const [showTeamTasker, setShowTeamTasker] = useState(()=>{
    const saved = localStorage.getItem('pref_tasker');
    return saved === null ? true : saved === 'true';
  })

  const [isCollapsed, setIsCollapsed] = useState(false);

  // ✅ Persist changes to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('pref_topNav', topNavVisible);
  }, [topNavVisible]);

  useEffect(() => {
    localStorage.setItem('pref_meetings', showMeetings);
  }, [showMeetings]);

  useEffect(() => {
    localStorage.setItem('pref_personal', showPersonal);
  }, [showPersonal]);

  useEffect(()=>{
    localStorage.setItem('pref_tasker', showTeamTasker);
  }, [setShowTeamTasker])

  // Configs
  const topNavData = {
    height: '20',
    width: '1650',
    opt1: 'MyTasker',
    opt2: 'Chat',
    opt3: 'Calender',
    opt4: 'Ask help',
    opt5: "FAQ's",
    xAxis: 200,
    yAxis: 0
  };

  const sideNav = {
    report: 'Raghu',
    userActiveLog: 'User Activity Log',
    team: 'Team',
    accounts: 'Accounts',
    timeSheet: 'Timesheet',
    group: 'Group',
    faqs: 'FAQs',
    archive: 'Archive Project Names',
    rankings: 'Rankings',
    height: '100vh',
    width: '200px'
  };

  const headder = {
    width: '1500px',
  };

  return (
    <div className="flex">
      {topNavVisible && <TopNav navData={topNavData} isCollapsed={isCollapsed} />}
      
      <div>
        <SideNav
          sideData={sideNav}
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          topNavVisible={topNavVisible}
          setTopNavVisible={setTopNavVisible}
          showMeetings={showMeetings}
          setShowMeetings={setShowMeetings}
          showPersonal={showPersonal}
          setShowPersonal={setShowPersonal}
          showTeamTasker = {showTeamTasker}
          setShowTeamTasker = {setShowTeamTasker}
        />
      </div>

      <div className={`${topNavVisible ? 'mt-[65px]' : 'mt-0'} ml-[200px] w-full transition-all duration-300`}>
        <Headder
          topNavVisible={topNavVisible}
          showMeetings={showMeetings}
          showPersonal={showPersonal}
          headder={headder}
        />
      </div>
    </div>
  );
};

export default DashboardLayout;
