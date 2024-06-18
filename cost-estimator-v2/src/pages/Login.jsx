import  { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import NavBarSoloLogo from '../components/NavBarSoloLogo';
import RoleSwitch from '../components/RoleSwitch';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, loginProjectManager, loginTeamMember } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState('');
  const [descripcionAlerta, setDescripcionAlerta] = useState('');
  const [selectedRole, setSelectedRole] = useState('Admin');

  const handleLogin = async () => {
    setVisibleAlertError(false);
    const formData = { email, password };

    setIsLoadingButton(true);
    try {
      if (selectedRole === 'Admin') {
        await loginAdmin(formData);
      } else if (selectedRole === 'Project Manager') {
        await loginProjectManager(formData);
      } else {
        await loginTeamMember(formData);
      }
      navigate('/project-manager-dashboard'); // Cambiar esta ruta según el rol y lógica de navegación
    } catch (error) {
      console.error('Error logging in:', error);
      setVisibleAlertError(true);
      setTituloAlerta('Error');
      setDescripcionAlerta('Correo electrónico o contraseña incorrectos');
    }
    setIsLoadingButton(false);
  };

  return (
    <>
      <NavBarSoloLogo />

      <section className="flex flex-col justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md">
          {/* Título de la página */}
          <div className="mb-12 text-center">
            <p className="text-blue-800 font-semibold uppercase mb-8">Inicio de sesión</p>
            <h2 className="sora-font text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Bienvenido a Speed Project
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-8">Ingresa tus datos para acceder</p>
          </div>

          <RoleSwitch roles={['Admin', 'Project Manager', 'Team Member']} selectedRole={selectedRole} setSelectedRole={setSelectedRole} />

          {/* Formulario */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            className="space-y-6 mt-4"
          >
            <div className="mb-4">
              {visibleAlertError && (
                <div className="alert alert-danger">
                  <strong>{tituloAlerta}</strong> {descripcionAlerta}
                </div>
              )}
            </div>

            {/* Email */}
            <Form.Item
              name="email"
              hasFeedback
              label="Correo electrónico"
              rules={[
                { required: true, message: 'Ingresa tu correo electrónico' },
                {
                  pattern: /^\S+@\S+\.\S+$/,
                  message: 'Correo electrónico inválido',
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Ingresar correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            {/* Password */}
            <Form.Item
              hasFeedback
              name="password"
              label="Contraseña"
              rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
            >
              <Input.Password
                placeholder="Ingresar contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            {/* Botón de Login */}
            <Form.Item className="space-y-2">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300"
                loading={isLoadingButton}
                htmlType="submit"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>

          {/* Links */}
          <div className="mt-6 text-center">
            <Link to="/register" className="text-gray-600 text-sm">
              ¿Aún no tienes cuenta? <span className="text-blue-800">Regístrate aquí</span>
            </Link>
          </div>
          <div className="mt-2 text-center">
            <Link to="/reset-password" className="text-gray-600 text-sm">
              <span className="text-blue-800">¿Olvidaste tu contraseña?</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
