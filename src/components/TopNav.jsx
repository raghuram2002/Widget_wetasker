import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Rnd } from 'react-rnd';

const TopNav = ({ navData, isCollapsed }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Calculate the width properly
  const computedWidth = isCollapsed ? 1650 : window.innerWidth - 240;

  const [rnd, setRnd] = useState({
    width: computedWidth,
    height: parseInt(navData?.height || 65, 10),
    x: parseInt(navData?.xAxis || 240, 10),
    y: parseInt(navData?.yAxis || 0, 10),
  });

  useEffect(() => {
    // Update width when collapsed changes
    setRnd(prev => ({
      ...prev,
      width: isCollapsed ? 1650 : window.innerWidth - 200,
      x: isCollapsed ? 70 : 200
    }));
  }, [isCollapsed]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  const handleResizeStop = (e, direction, ref, delta, position) => {
    setRnd({
      width: parseInt(ref.style.width, 10),
      height: parseInt(ref.style.height, 10),
      x: position.x,
      y: position.y,
    });
  };

  const handleDragStop = (e, d) => {
    setRnd(prev => ({
      ...prev,
      x: d.x,
      y: d.y,
    }));
  };

  return (
    <Rnd
      size={{ width: rnd.width, height: rnd.height }}
      position={{ x: rnd.x, y: rnd.y }}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minWidth={600}
      minHeight={65}
      bounds="window"
      enableResizing={{ right: true }}
    >
      <div className="w-full h-full bg-blue-500 text-white shadow-lg overflow-hidden transition-all duration-300">
        <div className="flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold">{navData.brand}</h1>

          <ul className="hidden md:flex gap-6 text-lg font-medium">
            <li className="cursor-pointer hover:text-blue-200">{navData.opt1}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt2}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt3}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt4}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt5}</li>
          </ul>

          <div className="md:hidden">
            <button onClick={toggleMenu}>
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <ul className="md:hidden flex flex-col items-center gap-4 pb-4 text-lg font-medium">
            <li className="cursor-pointer hover:text-blue-200">{navData.opt1}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt2}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt3}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt4}</li>
            <li className="cursor-pointer hover:text-blue-200">{navData.opt5}</li>
          </ul>
        )}
      </div>
    </Rnd>
  );
};

export default TopNav;
