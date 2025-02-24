// App.tsx
import React from 'react';
import { Layout, Typography, Card, Row, Col, Button, ConfigProvider } from 'antd';
import { 
  MedicineBoxOutlined, 
  SafetyOutlined, 
  TeamOutlined,
  LoginOutlined,
  UserAddOutlined,
  ArrowRightOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';  // Make sure this is imported

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Header style={{ 
          background: '#fff', 
          padding: '0', 
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff', display: 'flex', alignItems: 'center' }}>
              <MedicineBoxOutlined style={{ marginRight: '8px' }} />
              Easy-Op
            </div>
            <div>
              <Button 
                type="link"
                icon={<LoginOutlined />}
                onClick={() => navigate('/login')}
                style={{ marginRight: '16px' }}
              >
                Login
              </Button>
              <Button 
                type="primary"
                icon={<UserAddOutlined />}
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </Header>

        <Content style={{ background: '#fff', padding: '0 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 0' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', marginBottom: '64px' }}>
              <Title style={{ fontSize: '48px', marginBottom: '24px' }}>
                Streamline Your Pre-operative Care
              </Title>
              <Paragraph style={{ fontSize: '18px', color: 'rgba(0,0,0,0.65)', marginBottom: '32px' }}>
                Enhance patient safety and operational efficiency with our comprehensive 
                digital pre-operative assessment platform.
              </Paragraph>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<ArrowRightOutlined />}
                  onClick={() => navigate('/newform')}
                  style={{ height: '48px', padding: '0 32px', fontSize: '16px' }}
                >
                  Get Started
                </Button>
                <Button
                  size="large"
                  onClick={() => navigate('/about')}
                  style={{ height: '48px', padding: '0 32px', fontSize: '16px' }}
                >
                  Learn More
                </Button>
              </div>
            </div>

            <Row gutter={[24, 24]}>
              <Col xs={24} md={8}>
                <Card 
                  hoverable
                  style={{ height: '100%' }}
                >
                  <MedicineBoxOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
                  <Title level={3}>Digital Assessment</Title>
                  <Paragraph>
                    Streamline patient pre-operative assessments with our intuitive 
                    digital platform.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card 
                  hoverable
                  style={{ height: '100%' }}
                >
                  <SafetyOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
                  <Title level={3}>Risk Management</Title>
                  <Paragraph>
                    Advanced analytics to identify and mitigate potential surgical risks.
                  </Paragraph>
                </Card>
              </Col>
              <Col xs={24} md={8}>
                <Card 
                  hoverable
                  style={{ height: '100%' }}
                >
                  <TeamOutlined style={{ fontSize: '32px', color: '#1890ff', marginBottom: '16px' }} />
                  <Title level={3}>Team Collaboration</Title>
                  <Paragraph>
                    Enable seamless communication between healthcare providers and patients.
                  </Paragraph>
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default LandingPage;