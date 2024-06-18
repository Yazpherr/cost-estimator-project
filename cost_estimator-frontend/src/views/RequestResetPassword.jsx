// import React, { useEffect, useState } from 'react';
// //import { Alert, Button, Form, Input } from 'antd';
// import { Link } from 'react-router-dom';
// import axiosInstance from '../axios/axiosInstance'; // Importación por defecto
// //import NavbarSolologo from '../components/navigation/NavbarSolologo';
// import { LOGIN } from '../routes/Paths';
// import AlertError from '../components/ui/AlertError';
// import AlertGood from '../components/ui/AlertGood';
// import AOS from 'aos';
// import 'aos/dist/aos.css';

// export const RequestResetPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     AOS.init({ duration: 1000 });
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axiosInstance.post('/password/email', { email });
//       setMessage(response.data.message);
//       setError('');
//     } catch (error) {
//       setError(error.response.data.message || 'An error occurred');
//       setMessage('');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <NavbarSolologo />
//       <div className="container" data-aos="fade-in">
//         <Form onSubmit={handleSubmit}>
//           <Form.Item>
//             <Input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" loading={loading}>
//               Send Password Reset Email
//             </Button>
//           </Form.Item>
//         </Form>
//         {message && <AlertGood message={message} />}
//         {error && <AlertError message={error} />}
//         <Link to={LOGIN}>Back to Login</Link>
//       </div>
//     </div>
//   );
// };

// export default RequestResetPassword;
