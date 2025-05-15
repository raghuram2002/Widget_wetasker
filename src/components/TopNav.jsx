import React, { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Rnd } from 'react-rnd';


const TopNav = ({ navData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [rnd, setRnd] = useState({
    width: window.innerWidth,
    height: parseInt(navData?.height || 65, 10),
    x: 0,
    y: parseInt(navData?.yAxis || 0, 10),
  });

  useEffect(() => {
    // Update width on window resize to maintain full width
    const handleResize = () => {
      setRnd(prev => ({
        ...prev,
        width: window.innerWidth,
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      enableResizing={true}
      disableDragging={false}
    >
      <div className="w-full h-full bg-gray-200 text-gray-700 border-b-gray-500 overflow-hidden transition-all relative z-[999] duration-300">
        <div className="flex justify-end items-center py-4 px-6">
          <ul className="hidden md:flex gap-6 text-md font-medium">
            <li className="cursor-pointer hover:text-blue-600">{navData.opt3}</li>
            <li className="cursor-pointer hover:text-blue-600">{navData.opt1}</li>
            <li className="cursor-pointer hover:text-blue-600">{navData.opt2}</li>
            <li className="cursor-pointer hover:text-blue-600">{navData.opt4}</li>
            <li className="cursor-pointer hover:text-blue-600">{navData.opt5}</li>
          </ul>
        </div>
      </div>
    </Rnd>
  );
};

export default TopNav;
