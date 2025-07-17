import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
  format,
  isSameDay,
  startOfWeek,
  addDays,
  isWeekend,
  parse,
  isAfter,
  isBefore
} from 'date-fns';

const mockTasks = [
  {
    id: 1,
    name: 'Excavation Work',
    date: '2025-07-14',
    startTime: '08:00 AM',
    endTime: '10:30 AM',
    machineId: 'CAT320D',
    duration: '2.5 hours',
    status: 'pending'
  },
  {
    id: 2,
    name: 'Load Materials',
    date: '2025-07-15',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    machineId: 'CAT745',
    duration: '1.5 hours',
    status: 'pending'
  },
  {
    id: 3,
    name: 'Site Cleanup',
    date: '2025-07-17',
    startTime: '02:00 PM',
    endTime: '04:00 PM',
    machineId: 'CAT140H',
    duration: '2 hours',
    status: 'pending'
  },
  {
    id: 4,
    name: 'Site Cleanup',
    date: '2025-07-17',
    startTime: '04:00 PM',
    endTime: '0:00 PM',
    machineId: 'CAT140H',
    duration: '2 hours',
    status: 'pending'
  }
];

const Dashboard = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [tasks, setTasks] = useState(mockTasks);

  useEffect(() => {
    const formatted = format(selectedDate, 'yyyy-MM-dd');
    const dailyTasks = tasks
      .filter(task => task.date === formatted)
      .sort((a, b) => {
        if (a.status === 'completed' && b.status !== 'completed') return 1;
        if (a.status !== 'completed' && b.status === 'completed') return -1;

        const aStart = parse(`${a.date} ${a.startTime}`, 'yyyy-MM-dd hh:mm a', new Date());
        const bStart = parse(`${b.date} ${b.startTime}`, 'yyyy-MM-dd hh:mm a', new Date());
        return aStart - bStart;
      });
    setFilteredTasks(dailyTasks);
  }, [selectedDate, tasks]);

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id === taskId) {
          if (newStatus === 'completed') {
            return { ...task, status: 'completed' };
          } else if (task.status === 'pending') {
            return { ...task, status: 'inprogress' };
          }
        }
        return task;
      })
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100';
      case 'inprogress': return 'bg-yellow-100';
      default: return 'bg-white';
    }
  };

  const isWeekday = (date) => !isWeekend(date);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">📋 Daily Task Dashboard</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              filterDate={isWeekday}
              dateFormat="yyyy-MM-dd"
              className="border rounded px-3 py-2"
            />
          </div>

          {filteredTasks.length > 0 ? (
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const taskStart = parse(`${task.date} ${task.startTime}`, 'yyyy-MM-dd hh:mm a', new Date());
                const taskEnd = parse(`${task.date} ${task.endTime}`, 'yyyy-MM-dd hh:mm a', new Date());
                const now = new Date();
                const withinTime = isAfter(now, taskStart) && isBefore(now, taskEnd);
                const isCompleted = task.status === 'completed';

                return (
                  <div key={task.id} className={`${getStatusColor(task.status)} p-4 rounded-lg shadow transition text-lg`}> {/* Increased text size */}
                    <div className="flex justify-between items-center flex-wrap gap-4"> {/* Horizontal layout */}
                      <div className="flex flex-col">
                        <span className="font-semibold">📝 {task.name}</span>
                        <span className="text-gray-600">🕒 {task.startTime} - {task.endTime}</span>
                        <span className="text-gray-600">📅 {task.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-600">🆔 {task.machineId}</span>
                        <span className="text-gray-600">⏳ {task.duration}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(task.id, 'completed')}
                          disabled={!withinTime || isCompleted}
                          className={`px-4 py-2 text-white text-sm rounded ${
                            withinTime && !isCompleted
                              ? 'bg-green-600 hover:bg-green-700'
                              : 'bg-green-300 cursor-not-allowed'
                          }`}
                        >
                          ✔ Completed
                        </button>
                        <button
                          onClick={() => handleStatusChange(task.id, 'inprogress')}
                          disabled={!withinTime || isCompleted}
                          className={`px-4 py-2 text-white text-sm rounded ${
                            withinTime && !isCompleted
                              ? 'bg-yellow-500 hover:bg-yellow-600'
                              : 'bg-yellow-300 cursor-not-allowed'
                          }`}
                        >
                          ⏳ In Progress
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-600 mt-4">No tasks scheduled for this date.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
