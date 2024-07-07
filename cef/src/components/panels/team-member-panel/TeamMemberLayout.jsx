import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const TeamMemberLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/team-member">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/team-member/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<LogoutOutlined />}>
            <Link to="/logout">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-content" style={{ marginLeft: '16px' }}>Team Member Panel</div>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Outlet /> {/* Esto renderiza los componentes secundarios */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeamMemberLayout;
