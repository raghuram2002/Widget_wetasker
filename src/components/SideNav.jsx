import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
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

// ✅ SortableItem should be a separate component
const SortableItem = ({ id, icon, label, isCollapsed }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='flex items-center gap-4 border-b border-gray-300 pb-2 px-1 hover:text-blue-600 cursor-pointer'
    >
      {icon}
      {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </li>
  );
};

const SideNav = ({
  sideData,
  isCollapsed,
  setIsCollapsed,
  topNavVisible,
  setTopNavVisible,
  showMeetings,
  setShowMeetings,
  showPersonal,
  setShowPersonal,
  showTeamTasker,
  setShowTeamTasker
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

const defaultItems = [
  { id: 'report', icon: <HiOutlineDocumentReport className='text-[25px]' />, label: sideData.report },
  { id: 'userActiveLog', icon: <FaUser className='text-[25px]' />, label: sideData.userActiveLog },
  { id: 'team', icon: <RiTeamFill className='text-[25px]' />, label: sideData.team },
  { id: 'accounts', icon: <BiSolidUserAccount className='text-[25px]' />, label: sideData.accounts },
  { id: 'timeSheet', icon: <TbCalendarTime className='text-[25px]' />, label: sideData.timeSheet },
  { id: 'group', icon: <IoLogoWechat className='text-[25px]' />, label: sideData.group },
  { id: 'faqs', icon: <BsFillQuestionOctagonFill className='text-[25px]' />, label: sideData.faqs },
  { id: 'archive', icon: <MdArchive className='text-[25px]' />, label: sideData.archive },
  { id: 'rankings', icon: <PiRankingLight className='text-[25px]' />, label: sideData.rankings }
];

const getInitialItems = () => {
  const storedIds = JSON.parse(localStorage.getItem('sidebar-order'));
  if (storedIds && Array.isArray(storedIds)) {
    return storedIds.map(id => defaultItems.find(item => item.id === id)).filter(Boolean);
  }
  return defaultItems;
};

const [items, setItems] = useState(getInitialItems);

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

const handleDragEnd = (event) => {
  const { active, over } = event;
  if (active.id !== over?.id) {
    const oldIndex = items.findIndex(item => item.id === active.id);
    const newIndex = items.findIndex(item => item.id === over?.id);
    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    localStorage.setItem('sidebar-order', JSON.stringify(newItems.map(item => item.id)));
  }
};

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
      dragHandleClassName="drag-handle"
    >
      <div className="h-full bg-gray-200 shadow-2xl transition-all duration-300 overflow-hidden z-50 relative">
        <div className="flex items-center justify-between px-2 py-[18px] border-b border-gray-300 drag-handle">
          <div className="flex items-center gap-3">
            <GiHamburgerMenu
              className="text-xl cursor-pointer"
              onClick={toggleSidebar}
            />
            {!isCollapsed && (
              <span className="text-lg font-bold text-gray-800">Logo</span>
            )}
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
            <ul className='flex flex-col text-gray-700 gap-4 text-[13px] font-bold px-2 py-[18px]'>
              {items.map(item => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  icon={item.icon}
                  label={item.label}
                  isCollapsed={isCollapsed}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

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
                    checked={showTeamTasker}
                    onChange={() => setShowTeamTasker(prev => !prev)}
                    className="cursor-pointer"
                  />
                  Show Team Tasker
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
