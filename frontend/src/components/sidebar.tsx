import { Layout, Menu } from "antd";
import { DashboardOutlined, SettingOutlined, TeamOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

interface SidebarProps {
  currentScreen: string;
}

export default function Sidebar({ currentScreen }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'dashboard':
        navigate('/');
        break;
      case 'patients':
        navigate('/patients');
        break;
      case 'settings':
        navigate('/settings');
        break;
    }
  };

  return (
    <Sider 
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div 
        style={{ 
          height: 32, 
          margin: 16, 
          background: '#1890ff', 
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold'
        }}
      >
        {collapsed ? 'POA' : 'PreOpAI'}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[currentScreen]}
        onClick={({ key }) => handleMenuClick(key)}
        items={[
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
          },
          {
            key: 'patients',
            icon: <TeamOutlined />,
            label: 'Patients',
          },
          {
            type: 'divider',
          },
          {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Settings',
          },
        ]}
      />
    </Sider>
  );
}