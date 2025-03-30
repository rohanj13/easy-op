// components/PageHeader.tsx
import React from 'react';
import { Layout, Button } from 'antd';
import { ArrowLeftOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { NavigateFunction } from 'react-router-dom';

const { Header } = Layout;

interface PageHeaderProps {
  navigate: NavigateFunction;
}

const PageHeader: React.FC<PageHeaderProps> = ({ navigate }) => {
  return (
    <Header style={{ 
      background: '#fff', 
      padding: '0', 
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 1,
      width: '100%'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 24px', 
        height: '100%', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div style={{ 
          fontSize: '24px', 
          fontWeight: 'bold', 
          color: '#1890ff', 
          display: 'flex', 
          alignItems: 'center' 
        }}>
          <MedicineBoxOutlined style={{ marginRight: '8px' }} />
          Easy-Op
        </div>
        <Button 
          type="link" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          style={{ fontSize: '16px' }}
        >
          Back to Home
        </Button>
      </div>
    </Header>
  );
};

export default PageHeader;