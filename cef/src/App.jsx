import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./views/Register";
import Login from "./views/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/secure/ProtectedRoute";
import LandingPage from "./views/LandingPage";

// RUTAS PARA LOS ADMINISTRADORES
import AdminLayout from "./components/panels/admin-panel/AdminLayout";
import Profesion from "./components/panels/admin-panel/Profesion";
import PuntosDeFuncion from "./components/panels/admin-panel/PuntosDeFuncion";

// RUTA PARA LOS PROJECTS-OWNERS
import ProjectOwnerLayout from "./components/panels/project-owner-panel/ProjectOwnerLayout";
import ProjectOwnerHome from "./components/panels/project-owner-panel/ProjectOwnerHome";
import CrearProyectoPO from "./components/panels/project-owner-panel/CrearProyectoPO";
import CrearRequerimiento from "./components/panels/project-owner-panel/CrearRequerimiento";
import RegistrarTeamMembers from "./components/panels/project-owner-panel/RegistrarTeamMembers";
import AsignarTeamMemberProyecto from "./components/panels/project-owner-panel/AsignarTeamMemberProyecto";

// RUTAS PARA LOS TEAMS MEMBERS
import TeamMemberLayout from "./components/panels/team-member-panel/TeamMemberLayout";
import RequerimientosTM from "./components/panels/team-member-panel/RequerimientosTM";
import ProyectosTM from "./components/panels/team-member-panel/ProyectosTM";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Ruta para los administradores */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="profesion" element={<Profesion />} />
            <Route path="puntos-de-funcion" element={<PuntosDeFuncion />} />
          </Route>

          {/* Ruta para los administradores */}
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
            <Route
              path="register-requirement"
              element={<CrearRequerimiento />}
            />
            <Route
              path="register-team-member"
              element={<RegistrarTeamMembers />}
            />
            <Route
              path="asignar-team-member-proyecto"
              element={<AsignarTeamMemberProyecto />}
            />
          </Route>

          {/* Ruta para los team members */}
          <Route
            path="/team-member"
            element={
              <ProtectedRoute>
                <TeamMemberLayout />
              </ProtectedRoute>
            }
          >
            <Route path="proyectos-tm" element={<ProyectosTM />} />
            <Route path="requerimientos-tm" element={<RequerimientosTM />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
