
import { Outlet } from 'react-router-dom';
import SidebarPM from '../components/SidebarPm';

const ProjectManagerDashboard = () => {
    return (
        <div className="flex">
            <SidebarPM />
            <div className="flex-1 p-10">
                <h1 className="text-2xl font-bold mb-4">Project Manager Dashboard</h1>
                <Outlet /> {/* Renderiza las rutas hijas */}
            </div>
        </div>
    );
};

export default ProjectManagerDashboard;
