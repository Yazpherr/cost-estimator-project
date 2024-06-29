import  { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import NavBarSoloLogo from '../components/NavBarSoloLogo';
import RoleSwitch from '../components/RoleSwitch';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const { registerAdmin, registerTeamMember } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Admin');

  const handleRegister = async () => {
    try {
      if (selectedRole === 'Admin') {
        await registerAdmin({ name, email, password, password_confirmation: passwordConfirmation });
      } else {
        await registerTeamMember({ name, email, password, password_confirmation: passwordConfirmation });
      }
      alert('Registration successful!');
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirmation('');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <>
      <NavBarSoloLogo />

      <section className="flex flex-col justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Título de la página */}
          <div className="mb-12 text-center">
            <p className="text-blue-800 font-semibold uppercase mb-8">Registro</p>
            <h2 className="sora-font text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Bienvenido a Speed Project
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-8">Ingresa tus datos para registrarte</p>
          </div>

          <RoleSwitch roles={['Admin', 'Team Member']} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

          {/* Formulario */}
          <form onSubmit={handleRegister} className="space-y-6 mt-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Nombre
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirmation">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirmar Contraseña"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Registrarse
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
