import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import LoginPage from './pages/Login';
import DataSpecialistDashboard from './pages/DataSpecialistDashboard';
import ITSupportDashboard from './pages/ItSupporterDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      const user = JSON.parse(userData);
      setIsAuthenticated(true);
      setUserRole(user.role);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    }
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={
              !isAuthenticated ? (
                <LoginPage onLogin={handleLogin} />
              ) : (
                <Navigate to={`/${userRole}`} replace />
              )
            } 
          />
          
          {/* Admin Route */}
          <Route 
            path="/admin/*" 
            element={
              isAuthenticated && userRole === 'admin' ? (
                <AdminDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Student Route */}
          <Route 
            path="/student/*" 
            element={
              isAuthenticated && userRole === 'student' ? (
                <StudentDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Instructor Route */}
          <Route 
            path="/instructor/*" 
            element={
              isAuthenticated && userRole === 'instructor' ? (
                <InstructorDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Data Specialist Route */}
          <Route 
            path="/data/*" 
            element={
              isAuthenticated && userRole === 'data' ? (
                <DataSpecialistDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* It Supporter Route */}
          <Route 
            path="/support/*" 
            element={
              isAuthenticated && userRole === 'support' ? (
                <ITSupportDashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Default redirect */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to={`/${userRole}`} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;