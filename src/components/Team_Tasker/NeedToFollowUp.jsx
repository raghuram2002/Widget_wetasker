import React, { useState } from 'react';
import { TbMobiledata } from "react-icons/tb";
import { BsChatText, BsFillChatLeftTextFill } from "react-icons/bs";
import { Rnd } from 'react-rnd';

const NddeFollowUp = ({ tasks, searchTerm  }) => {
  const [rnd, setRnd] = useState({
    width: 1410,
    height: 600,
    x: 0,
    y: 0
  });

  const dummyTasks = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  taskName: `Task ${i + 1} Title`,
  assign: `User ${i + 1}`,
  action: i % 2 === 0 ? 'Start' : 'Review',
  Priority: ['Low', 'Medium', 'High'][i % 3]
}));

  const dataToRender = tasks && tasks.length > 0 ? tasks : dummyTasks;

  const filteredTasks = dataToRender.filter(task =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assign.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.Priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="w-full h-[500px] bg-gray-50 relative overflow-auto">
      <Rnd
        size={{ width: rnd.width, height: rnd.height }}
        position={{ x: rnd.x, y: rnd.y }}
        onDragStop={handleDragStop}
        onResizeStop={handleResizeStop}
        minWidth={810}
        minHeight={300}
        bounds="window"
        className="shadow-2xl border border-gray-300 rounded-md bg-white"
      >
        <table className="w-full h-full bg-blue-100 font-sans text-sm table-fixed rounded-md">
          <thead className="bg-blue-200 text-gray-800 font-medium">
            <tr>
              <th className="w-[50%] px-4 py-2 text-left">
                Task Details <TbMobiledata className="inline" />
              </th>
              <th className="px-2 py-2">Chat</th>
              <th className="px-2 py-2">Activity Log</th>
              <th className="px-4 py-2 text-left">
                Assigned By <TbMobiledata className="inline" />
              </th>
              <th className="px-2 py-2">Action</th>
              <th className="px-4 py-2 text-left">
                Priority <TbMobiledata className="inline" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredTasks.map(tasks => (
              <tr key={tasks.id} className="h-[60px] text-center border-t border-gray-200">
                <td className="px-4 py-2 text-gray-700 text-left">{tasks.taskName}</td>
                <td>
                  <button><BsChatText className="text-blue-600 text-xl" /></button>
                </td>
                <td>
                  <button><BsFillChatLeftTextFill className="text-green-500 text-xl" /></button>
                </td>
                <td>
                  <span className="inline-block w-[80px] text-white bg-blue-500 rounded-md py-1">
                    {tasks.assign}
                  </span>
                </td>
                <td>
                  <span className="inline-block w-[80px] text-white bg-green-700 rounded-md py-1">
                    {tasks.action}
                  </span>
                </td>
                <td>
                  <span className="inline-block w-[60px] text-white bg-red-500 rounded-md py-1">
                    {tasks.Priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Rnd>
    </div>
  );
};

export default NddeFollowUp;
