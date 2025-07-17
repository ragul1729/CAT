import { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { io } from 'socket.io-client';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const socket = io('http://localhost:3000');

const TOTAL_TARGET_VOLUME = 500;  // Example target in tons

export default function ExcavationProgressCenter() {
  const [totalExcavated, setTotalExcavated] = useState(0);
  const [lastData, setLastData] = useState(null);

  useEffect(() => {
    socket.on('sensorDataUpdate', (data) => {
      setLastData(data);
      setTotalExcavated((prev) => prev + (data.bucketLoad || 0));
    });

    return () => {
      socket.off('sensorDataUpdate');
    };
  }, []);

  const progressPercent = Math.min((totalExcavated / TOTAL_TARGET_VOLUME) * 100, 100).toFixed(2);

  return (
    <div className="flex h-screen">
        <Sidebar />
          <div className="flex-1 flex flex-col">
                <Header />
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Excavation Progress</h2>

      <div className="w-64 h-64">
        <CircularProgressbar
          value={progressPercent}
          text={`${progressPercent}%`}
          styles={buildStyles({
            textSize: '20px',
            pathColor: progressPercent >= 100 ? '#16a34a' : '#3b82f6',
            textColor: '#111827',
            trailColor: '#d1d5db'
          })}
        />
      </div>

      <div className="mt-6 text-center text-gray-700">
        <p><strong>Total Excavated:</strong> {totalExcavated.toFixed(2)} tons</p>
        <p><strong>Target:</strong> {TOTAL_TARGET_VOLUME} tons</p>
        {lastData && (
          <p><strong>Last Bucket:</strong> {lastData.bucketLoad} tons</p>
        )}
      </div>
    </div>
    </div>
    </div>
  );
}
