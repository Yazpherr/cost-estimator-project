import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/secure/ProtectedRoute";
import LandingPage from "./views/LandingPage";

// RUTAS PARA LOS ADMINISTRADORES
import AdminHome from "./components/panels/admin-panel/AdminHome";
// RUTA PARA LOS PROJECTS-OWNERS 
import ProjectOwnerLayout from "./components/panels/project-owner-panel/ProjectOwnerLayout";
import ProjectOwnerHome from "./components/panels/project-owner-panel/ProjectOwnerHome";
import CrearProyectoPO from "./components/panels/project-owner-panel/CrearProyectoPO";
import CrearRequerimiento from "./components/panels/project-owner-panel/CrearRequerimiento";
// RUTAS PARA LOS TEAMS MEMBERS 
import TeamMemberHome from "./components/panels/team-member-panel/TeamMemberHome";

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
            path="/product-owner"
            element={
              <ProtectedRoute>
                <ProjectOwnerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<ProjectOwnerHome />} />
            <Route path="register-project" element={<CrearProyectoPO />} />
            <Route path="register-requirement" element={<CrearRequerimiento />} />
          </Route>
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
