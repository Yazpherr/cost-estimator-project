import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import AdminHome from "./components/panels/admin-panel/AdminHome";
import ProjectOwnerHome from "./components/panels/project-owner-panel/ProjectOwnerHome";
import TeamMemberHome from "./components/panels/team-member-panel/TeamMemberHome";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/secure/ProtectedRoute";
import LandingPage from "./views/LandingPage";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project-owner"
            element={
              <ProtectedRoute>
                <ProjectOwnerHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team-member"
            element={
              <ProtectedRoute>
                <TeamMemberHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
