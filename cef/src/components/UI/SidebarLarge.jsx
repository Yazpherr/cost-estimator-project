import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { Layout, Menu, Button } from 'antd';

const { Sider } = Layout;

const SidebarLarge = ({ menuItems }) => {
  const { logoutUser } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Sider
      width={200}
      className="site-layout-background"
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        style={{ height: '100%', borderRight: 0 }}
      >
        {menuItems.map((item, index) => (
          <Menu.Item key={item.path} icon={item.icon}>
            <Link to={item.path}>{item.name}</Link>
          </Menu.Item>
        ))}
      </Menu>
      <div style={{ padding: '200px 10px 10px 10px' }}>
        <Button
          onClick={handleLogout}
          type="primary"
          danger
          icon={<FaSignOutAlt />}
          block
        >
          Cerrar sesión
        </Button>
      </div>
    </Sider>
  );
};

SidebarLarge.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired
    })
  ).isRequired
};

export default SidebarLarge;
