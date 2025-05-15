import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';
import Headder from './Headder';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

    const topNavData = {
    height: '20',
    width: '1650',
    //brand: 'Brand',
    opt1: 'MyTasker',
    opt2: 'Chat',
    opt3: 'Calender',
    opt4: 'Ask help',
    opt5: "FAQ's",
    xAxis: 200,
    yAxis: 0
  }

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
  }

  return (
    <div className="flex">
      <TopNav navData={topNavData} isCollapsed={isCollapsed} />
      <div>
        <SideNav sideData = {sideNav} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <div className='mt-15 ml-[200px]'>
        <Headder/>
      </div>
    </div>
  );
};

export default DashboardLayout;
