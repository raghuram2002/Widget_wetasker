import React, { useState } from 'react';
import SideNav from './SideNav';
import TopNav from './TopNav';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

    const topNavData = {
    height: '20',
    width: '1650',
    brand: 'Brand',
    opt1: 'Home',
    opt2: 'Services',
    opt3: 'About Us',
    opt4: 'Portfolio',
    opt5: 'Contact Us',
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
      <SideNav sideData = {sideNav} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div>
        <TopNav navData={topNavData} isCollapsed={isCollapsed} />
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
