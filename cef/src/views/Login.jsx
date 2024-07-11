import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import { AuthContext } from '../contexts/AuthContext';
import NavBarSoloLogo from '../components/NavBarSoloLogo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [visibleAlertError, setVisibleAlertError] = useState(false);
  const [tituloAlerta, setTituloAlerta] = useState('');
  const [descripcionAlerta, setDescripcionAlerta] = useState('');

  const handleLogin = async () => {
    setVisibleAlertError(false);
    const formData = { email, password };

    setIsLoadingButton(true);
    try {
      const response = await loginUser(formData);
      if (response.data && response.data.user && response.data.user.role) {
        const role = response.data.user.role;
        if (role === 'admin') {
          navigate('/admin');
        } else if (role === 'project-owner') {
          navigate('/project-owner');
        } else if (role === 'team-member') {
          navigate('/team-member');
        } else {
          throw new Error('Rol de usuario no reconocido');
        }
      } else {
        throw new Error('Invalid response structure');
      }
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
          <div className="mb-12 text-center">
            <p className="text-blue-800 font-semibold uppercase mb-8">Inicio de sesión</p>
            <h2 className="sora-font text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
              Bienvenido a Speed Project
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-8">Ingresa tus datos para acceder</p>
          </div>

          {visibleAlertError && (
            <Alert
              message={tituloAlerta}
              description={descripcionAlerta}
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleLogin}
            className="space-y-6 mt-4"
          >
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[
                { required: true, message: 'Ingresa tu correo electrónico' },
                { type: 'email', message: 'Correo electrónico inválido' },
              ]}
              hasFeedback
            >
              <Input
                type="email"
                placeholder="Ingresar correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Contraseña"
              rules={[{ required: true, message: 'Ingresa tu contraseña' }]}
              hasFeedback
            >
              <Input.Password
                placeholder="Ingresar contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoadingButton}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-800 text-white px-6 py-3 rounded-md hover:opacity-90 transition duration-300"
              >
                Iniciar sesión
              </Button>
            </Form.Item>
          </Form>

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
