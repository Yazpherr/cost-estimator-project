import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaSignOutAlt } from 'react-icons/fa';
import { Drawer, Button, Menu } from 'antd';

const SidebarResponsive = ({ menuItems }) => {
  const { logoutUser } = useContext(AuthContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showDrawer} style={{ position: 'fixed', top: 16, left: 16 }}>
        Menu
      </Button>
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
        >
          {menuItems.map((item, index) => (
            <Menu.Item key={item.path} icon={item.icon}>
              <Link to={item.path} onClick={onClose}>{item.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Button
          onClick={handleLogout}
          type="primary"
          danger
          icon={<FaSignOutAlt />}
          block
          style={{ marginTop: '20px' }}
        >
          Cerrar sesión
        </Button>
      </Drawer>
    </>
  );
};

SidebarResponsive.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired
    })
  ).isRequired
};

export default SidebarResponsive;
