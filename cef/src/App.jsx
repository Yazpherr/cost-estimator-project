import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Protected from './pages/Protected';
import Logout from './pages/Logout';
import Patient from './pages/Patient';
import AdminPanel from './pages/AdminPanel';
import ProjectManagerDashboard from './pages/ProjectManagerDashboard';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterProjectManager from './pages/RegisterProjectManager';
import CreateProject from './components/ProjectManagerDashboard/CreateProject';
import CreateRequirement from './components/ProjectManagerDashboard/CreateRequirement';
import AssignTeamMember from './components/ProjectManagerDashboard/AssignTeamMember';
import RemoveTeamMember from './components/ProjectManagerDashboard/RemoveTeamMember';

const App = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/protected" element={<ProtectedRoute><Protected /></ProtectedRoute>} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/patient" element={<ProtectedRoute><Patient /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
                    <Route path="/project-manager-dashboard" element={<ProtectedRoute><ProjectManagerDashboard /></ProtectedRoute>}>
                        <Route index element={<CreateProject />} />
                        <Route path="create-project" element={<CreateProject />} />
                        <Route path="create-requirement" element={<CreateRequirement />} />
                        <Route path="assign-team-member" element={<AssignTeamMember />} />
                        <Route path="remove-team-member" element={<RemoveTeamMember />} />
                    </Route>
                    <Route path="*" element={<LandingPage />} /> {/* Ruta por defecto */}
                    <Route path="/admin-panel" element={<AdminPanel />} />
                    <Route path="/register-project-manager" element={<RegisterProjectManager />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default App;
