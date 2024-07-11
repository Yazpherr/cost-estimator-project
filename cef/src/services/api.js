import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

// Configurar una instancia de Axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token de autorización a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Método para registrar un nuevo usuario (team-member)
export const registerUser = (userData) => {
  return api.post("/register", userData);
};

// Método para iniciar sesión
export const loginUser = (loginData) => {
  return api.post("/login", loginData);
};

// Método para cerrar sesión
export const logoutUser = () => {
  return api.post("/logout");
};

// Método para obtener el usuario autenticado
export const getAuthenticatedUser = () => {
  return api.get("/user");
};

// ________________PROYECTS-OWNERS________________________________________________________
// Función para crear un proyecto
export const createProject = (projectData) =>
  api.post("/crear-proyecto", projectData);

// Función para obtener los proyectos de un product-owner
export const getProductOwnerProjects = () => api.get("/mis-proyectos-po");

// Función para actualizar un proyecto
export const updateProject = (id, projectData) => {
  return api.put(`/actualizar-proyecto/${id}`, projectData);
};

// Función para calcular los puntos de función
export const calculateTotalFunctionPoints = (projectId) => {
  return api.get(`/calcular-puntos-funcion/${projectId}`);
};

// Función para obtener todas las asignaciones de proyectos
export const getAllProjectAssignments = () => {
  return api.get("/asignaciones-proyectos");
};

// Función para crear un requerimiento
export const createRequirement = (requirementData) => {
  return api.post("/crear-requerimiento", requirementData);
};

// Función para obtener todos los requerimientos
export const getAllRequirements = () => {
  return api.get("/obtener-requerimientos");
};

// Función para crear un nuevo miembro del equipo
export const createTeamMember = (teamMemberData) => {
  return api.post("/crear-miembro-equipo", teamMemberData);
};

// Función para obtener todos los miembros del equipo
export const getAllTeamMembers = () => {
  return api.get("/obtener-miembros-equipo");
};

// Función para asignar un miembro del equipo a un proyecto
export const assignTeamMemberToProject = (assignmentData) => {
  return api.post("/asignar-miembro-proyecto", assignmentData);
};

// Función para obtener todas las profesiones para el product owner
export const getProfessionsForPO = () => {
  return api.get("/po/obtener-profesiones");
};

// Función para obtener los salarios de los miembros del equipo
export const getProjectTeamMembers = (projectId) => {
  return api.get(`/proyecto/${projectId}/miembros`);
};

// Función para calcular los costos asociados
export const calculateAssociatedCosts = (projectId) => {
  return api.get(`/calcular-costos-asociados/${projectId}`);
};

// Función para calcular el tiempo estimado
export const calculateEstimatedTime = (projectId) => {
  return api.get(`/calcular-tiempo-estimado/${projectId}`);
};

//
// Función para actualizar un miembro del equipo
export const updateTeamMember = (id, teamMemberData) => {
    return api.put(`/actualizar-miembro-equipo/${id}`, teamMemberData);
  };

  
// ________________ADMIN________________________________________________________

// Función para crear una nueva profesión
export const createProfession = (professionData) => {
  return api.post("/crear-profesion", professionData);
};

// Función para obtener todas las profesiones
export const getAllProfessions = () => {
  return api.get("/obtener-profesiones");
};

// Función para actualizar una profesión
export const updateProfession = (id, professionData) => {
  return api.put(`/actualizar-profesion/${id}`, professionData);
};

// ________________TEAM-MEMBERS________________________________________________________

// Función para obtener los proyectos de un team member
export const getTeamMemberProjects = () => {
  return api.get("/mis-proyectos-tm");
};

// Función para obtener los requerimientos de un proyecto
export const getProjectRequirements = (projectId) => {
  return api.get(`/proyecto/${projectId}/requerimientos`);
};

// Función para actualizar un requerimiento
export const updateRequirement = (id, requirementData) => {
  return api.put(`/actualizar-requerimiento/${id}`, requirementData);
};

export default api;
