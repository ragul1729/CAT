import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn } from './utils/auth';

import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Training from './pages/Training';
import TasktimePrediction from './pages/TasktimePrediction';
import SafetyAlertBar from './Components/SafetyAlertBar'; 
import EventLog from './pages/EventLog';
import ExcavationTimer from './pages/ExcavationTimer';

// Redirects unauthenticated users to login
const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

// Dynamically redirect from root based on login state
const DefaultRedirect = () => {
  return isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <SafetyAlertBar /> {/* ✅ Global Alert Bar shown on all pages */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/excavationTimer" element={<ProtectedRoute><ExcavationTimer/></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/training" element={<ProtectedRoute><Training /></ProtectedRoute>} />
        <Route path="/predict" element={<ProtectedRoute><TasktimePrediction /></ProtectedRoute>} />
        <Route path='/logging' element={<ProtectedRoute><EventLog/></ProtectedRoute>}/>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="*" element={<DefaultRedirect />} />
      </Routes>
    </Router>
  );
}

export default App;
