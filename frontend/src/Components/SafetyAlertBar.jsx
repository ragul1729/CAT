import { useEffect, useState } from 'react';

const SafetyAlertBar = () => {
  const [alerts, setAlerts] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mock input (replace with real API values later)
    const safetyData = {
      seatbeltDetected: true, // ❌
      lowFuel: false,           // ❌
      proximityHazard: 0       // ❌
    };

    const newAlerts = [];

    if (!safetyData.seatbeltDetected) {
      newAlerts.push("⚠️ Seatbelt not detected!");
    }

    if (safetyData.lowFuel) {
      newAlerts.push("⛽ Low fuel level!");
    }

    if (safetyData.proximityHazard > 0) {
      newAlerts.push(`🚨 Proximity hazard detected: ${safetyData.proximityHazard} nearby object(s)!`);
    }

    if (newAlerts.length > 0) {
      setAlerts(newAlerts);
      setVisible(true);

      const timeout = setTimeout(() => {
        setVisible(false);
        setAlerts([]);
      }, 10000); // 10 seconds

      return () => clearTimeout(timeout);
    }
  }, []);

  if (!visible || alerts.length === 0) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-xl bg-red-600 text-white p-6 rounded-xl shadow-2xl animate-bounce-slow text-center space-y-2">
      <b className="text-lg font-semibold">ALERT !! ⚠️</b>
      {alerts.map((alert, idx) => (
        <p key={idx} className="text-lg font-semibold">{alert}</p>
      ))}
    </div>
  );
};

export default SafetyAlertBar;
