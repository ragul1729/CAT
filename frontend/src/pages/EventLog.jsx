// src/pages/EventLog.jsx
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import { useState, useEffect } from 'react';
import axios from "axios";

const eventColors = {
  'Seatbelt Compliance': '#ffe0e0',
  'Proximity Hazard': '#e0f7fa',
  'Excessive Idling': '#fff3e0',
  'Low Fuel': '#f3e5f5',
  'Sharp Turn at High Speed': '#e8f5e9'
};

const mockhardcodedEvents = [
  {
    type: 'Seatbelt Compliance',
    vehicleId: 'VEH001',
    details: { compliance: false, speedAtDetection: 60 }
  },
  {
    type: 'Proximity Hazard',
    vehicleId: 'VEH002',
    details: { distance: 0.5, hazardType: 'Pedestrian' }
  },
  {
    type: 'Excessive Idling',
    vehicleId: 'VEH003',
    details: { idleTime: 300, engineStatus: 'On' }
  },
  {
    type: 'Low Fuel',
    vehicleId: 'VEH004',
    details: { fuelLevel: 5, warningThreshold: 10 }
  },
  {
    type: 'Sharp Turn at High Speed',
    vehicleId: 'VEH005',
    details: { turnAngle: 45, speed: 80 }
  }
];

const EventLog = () => {
  const [filterType, setFilterType] = useState('All');
  const [hardcodedEvents, setHardcodedEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try{
          const receivedEvents = await axios.get("http://localhost:3000/events");
          console.log(receivedEvents["data"]);
          setHardcodedEvents(receivedEvents["data"]);
        }
        catch(error){
          console.log("error while fetching tasks", error);
        }
      }
      fetchEvents();
  }, []);


  const filteredEvents =
    filterType === 'All'
      ? hardcodedEvents
      : hardcodedEvents.filter(event => event.type === filterType);

  const renderDetails = (type, details) => {
    switch (type) {
      case 'Seatbelt Compliance':
        return (
          <>
            <p>Compliance: <span className="font-semibold">{details.compliance ? 'Yes' : 'No'}</span></p>
            <p>Speed at Detection: {details.speedAtDetection} km/h</p>
          </>
        );
      case 'Proximity Hazard':
        return (
          <>
            <p>Distance: {details.distance} m</p>
            <p>Hazard Type: {details.hazardType}</p>
          </>
        );
      case 'Excessive Idling':
        return (
          <>
            <p>Idle Time: {details.idleTime} sec</p>
            <p>Engine Status: {details.engineStatus}</p>
          </>
        );
      case 'Low Fuel':
        return (
          <>
            <p>Fuel Level: {details.fuelLevel}%</p>
            <p>Threshold: {details.warningThreshold}%</p>
          </>
        );
      case 'Sharp Turn at High Speed':
        return (
          <>
            <p>Turn Angle: {details.turnAngle}°</p>
            <p>Speed: {details.speed} km/h</p>
          </>
        );
      default:
        return <p>No additional details available.</p>;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 bg-gray-100 overflow-auto">
          <h1 className="text-3xl font-semibold mb-6">📋 Safety Event Log</h1>

          {/* Filter Dropdown */}
          <div className="mb-6">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter by Safety Feature:
            </label>
            <select
              id="filter"
              className="p-2 border border-gray-300 rounded-md"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All</option>
              {Object.keys(eventColors).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <ul className="space-y-4">
            {filteredEvents.map((event, index) => (
              <li
                key={index}
                className="p-4 rounded-lg shadow border-l-8"
                style={{
                  backgroundColor: eventColors[event.type] || '#f0f0f0',
                  borderColor: '#888'
                }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-lg">{event.type}</p>
                    <p className="text-sm text-gray-600">Vehicle ID: {event.vehicleId}</p>
                    <div className="mt-2 text-sm text-gray-700 space-y-1">
                      {renderDetails(event.type, event.details)}
                    </div>
                  </div>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded self-start">{event.type}</span>
                </div>
              </li>
            ))}
          </ul>

          {filteredEvents.length === 0 && (
            <p className="text-gray-600 mt-4">No events found for this safety feature.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default EventLog;
