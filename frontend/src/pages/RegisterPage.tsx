// src/pages/Register.tsx
import React, { useState } from 'react';
import { Layout, Card, Tabs, Form, Input, Button, Typography, Divider, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: string) => {
    setLoading(true);
    console.log('Registration values:', values);
    // Add your registration logic here
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content style={{ padding: '50px 0' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <MedicineBoxOutlined style={{ fontSize: '32px', color: '#1890ff' }} />
            <Title level={2}>Create Your MedPrep Account</Title>
          </div>

          <Card>
            <Tabs defaultActiveKey="patient" centered>
              <TabPane tab="Patient Registration" key="patient">
                <Form
                  name="patient_register"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Full Name" />
                  </Form.Item>

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
                    name="phone"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                  >
                    <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                      Register
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>

              <TabPane tab="Practitioner Registration" key="practitioner">
                <Form
                  name="practitioner_register"
                  onFinish={onFinish}
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Full Name" />
                  </Form.Item>

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
                    name="licenseNumber"
                    rules={[{ required: true, message: 'Please input your license number!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="License Number" />
                  </Form.Item>

                  <Form.Item
                    name="specialization"
                    rules={[{ required: true, message: 'Please select your specialization!' }]}
                  >
                    <Select placeholder="Select Specialization">
                      <Option value="anesthesiology">Anesthesiology</Option>
                      <Option value="surgery">Surgery</Option>
                      <Option value="nursing">Nursing</Option>
                      <Option value="other">Other</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: 'Please input your password!' },
                      { min: 8, message: 'Password must be at least 8 characters!' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm your password!' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                      Register
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>

            <Divider />

            <div style={{ textAlign: 'center' }}>
              <Text>Already have an account? </Text>
              <Button type="link" onClick={() => navigate('/login')}>
                Log in
              </Button>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  );
};

export default Register;