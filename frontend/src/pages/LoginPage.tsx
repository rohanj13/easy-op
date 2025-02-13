// src/pages/Login.tsx
import React, { useState } from 'react';
import { Layout, Card, Tabs, Form, Input, Button, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: string) => {
    setLoading(true);
    console.log('Login values:', values);
    // Add your login logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px 0' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <MedicineBoxOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
            <Title level={2}>Welcome Back to MedPrep</Title>
          </div>
          
          <Card>
            <Tabs defaultActiveKey="patient" centered>
              <TabPane tab="Patient Login" key="patient">
                <Form
                  name="patient_login"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: 'Please input your email!' },
                      { type: 'email', message: 'Please enter a valid email!' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} placeholder="Email" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Practitioner Login" key="practitioner">
                <Form
                  name="practitioner_login"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item
                    name="licenseNumber"
                    rules={[{ required: true, message: 'Please input your license number!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="License Number" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                      Log in
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Text>Don't have an account? </Text>
              <Button type="link" onClick={() => navigate('/register')}>
                Register now
              </Button>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;