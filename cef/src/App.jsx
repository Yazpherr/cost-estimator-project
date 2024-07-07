import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './views/Register';
import Login from './views/Login';
import AdminPanel from './views/AdminPanel';
import ProjectManagerDashboard from './views/ProjectManagerDashboard';
import TeamMemberPanel from './components/panels/team-member-panel/TeamMemberLayout';
// import TeamMemberProfile from './views/TeamMemberProfile';
import TeamMemberLayout from './components/panels/team-member-panel/TeamMemberLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './views/LandingPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />

          <Route path="/project-manager-dashboard" element={<ProtectedRoute><ProjectManagerDashboard /></ProtectedRoute>} />
          <Route path="/team-member" element={<ProtectedRoute><TeamMemberLayout /></ProtectedRoute>}>
            {/* <Route index element={<TeamMemberPanel />} /> */}
            {/* <Route path="profile" element={<TeamMemberProfile />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
