import React, { useState } from 'react';
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { BiSolidUserAccount } from "react-icons/bi";
import { TbCalendarTime } from "react-icons/tb";
import { IoLogoWechat } from "react-icons/io5";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import { MdArchive } from "react-icons/md";
import { PiRankingLight } from "react-icons/pi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Rnd } from 'react-rnd';

const SideNav = ({ 
  sideData,
  isCollapsed,
  setIsCollapsed,
  topNavVisible,
  setTopNavVisible,
  showMeetings,
  setShowMeetings,
  showPersonal,
  setShowPersonal
 }) => {
  const [rnd, setRnd] = useState({
    width: sideData?.width || 240,
    height: sideData?.height || '100vh',
    x: 0,
    y: 0
  });

  const toggleSidebar = () => setIsCollapsed(prev => !prev);

  const handleResizeStop = (e, direction, ref, delta, position) => {
    setRnd({
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y
    });
  };

  const handleDragStop = (e, d) => {
    setRnd(prev => ({
      ...prev,
      x: d.x,
      y: d.y
    }));
  };

  const menuItems = [
    { icon: <HiOutlineDocumentReport className='text-[25px]' />, label: sideData.report },
    { icon: <FaUser className='text-[25px]' />, label: sideData.userActiveLog },
    { icon: <RiTeamFill className='text-[25px]' />, label: sideData.team },
    { icon: <BiSolidUserAccount className='text-[25px]' />, label: sideData.accounts },
    { icon: <TbCalendarTime className='text-[25px]' />, label: sideData.timeSheet },
    { icon: <IoLogoWechat className='text-[25px]' />, label: sideData.group },
    { icon: <BsFillQuestionOctagonFill className='text-[25px]' />, label: sideData.faqs },
    { icon: <MdArchive className='text-[25px]' />, label: sideData.archive },
    { icon: <PiRankingLight className='text-[25px]' />, label: sideData.rankings }
  ];

  return (
    <Rnd
      size={{
        width: isCollapsed ? 70 : rnd.width,
        height: rnd.height
      }}
      position={{ x: rnd.x, y: rnd.y }}
      onResizeStop={handleResizeStop}
      onDragStop={handleDragStop}
      minWidth={73}
      minHeight={500}
      bounds="window"
      enableResizing={{ right: true, bottom: true }}
    >
      <div className="h-full bg-gray-200 shadow-2xl transition-all duration-300 overflow-hidden z-50 relative">
        <div className='flex text-gray-700 items-center justify-between px-3'>
          {!isCollapsed && <div className='font-bold py-4 hover:text-blue-600'>Logo</div>}
          <GiHamburgerMenu
            className='text-[25px] cursor-pointer hover:text-blue-600 my-4 ml-auto'
            onClick={toggleSidebar}
          />
        </div>

        <hr className='m-1.5 text-gray-300' />
        <ul className='flex flex-col text-gray-700 gap-4 text-[13px] font-bold px-2'>
          {menuItems.map((item, index) => (
            <li key={index} className='flex items-center gap-4 border-b border-gray-300 pb-2 px-1 hover:text-blue-600'>
              {item.icon}
              {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
            </li>
          ))}
        </ul>

        {/* Preferences Dropdown */}
        <div className="mx-4 mt-[50px] relative">
          {!isCollapsed && (
            <details className="text-sm text-gray-700 font-bold">
              <summary className="cursor-pointer select-none py-1 hover:text-blue-600">Preferences</summary>
              <div className="mt-2 pl-2 flex flex-col gap-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={topNavVisible}
                    onChange={() => setTopNavVisible(prev => !prev)}
                    className="cursor-pointer"
                  />
                  Show Top Nav
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPersonal}
                    onChange={() => setShowPersonal(prev => !prev)}
                    className="cursor-pointer"
                  />
                  Show Personal Tasks
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showMeetings}
                    onChange={() => setShowMeetings(prev => !prev)}
                    className="cursor-pointer"
                  />
                  Show Meetings
                </label>
              </div>
            </details>
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default SideNav;
