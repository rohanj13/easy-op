/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Form, Input, DatePicker, Select, Button, Card, Layout, Row, Col, Typography, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { PatientCreate} from '../types/types';
import Sidebar from '../components/sidebar';
import dayjs from 'dayjs';
import { useHospital } from '../contexts/HospitalContext';

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;


export default function CreatePatient() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { api } = useHospital();
  
  const onFinish = async (values: any, createForm: boolean = false) => {
    setLoading(true);
    try {
      const patientData: PatientCreate = {
        first_name: values.firstName,
        last_name: values.lastName,
        dob: dayjs(values.dob).format('YYYY-MM-DD'),
        sex: values.sex,
        phone: values.phone,
        email: values.email,
        // hospital_id: hospitalId
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.patients.patientsCreateCreate(patientData);
      message.success('Patient created successfully!');
      
      if (createForm) {
        // navigate(`/forms/create/${response.data.id}`);
      } else {
        navigate('/patients');
      }
    } catch (error) {
      message.error('Failed to create patient');
      console.error('Error creating patient:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar currentScreen="patients" />
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Card>
            <Title level={2}>Create New Patient</Title>
            <Form
              form={form}
              layout="vertical"
              onFinish={(values) => onFinish(values, false)}
              style={{ maxWidth: 600 }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true, message: 'Please enter first name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true, message: 'Please enter last name' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="dob"
                    label="Date of Birth"
                    rules={[{ required: true, message: 'Please select date of birth' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="sex"
                    label="Sex"
                    rules={[{ required: true, message: 'Please select sex' }]}
                  >
                    <Select>
                      <Option value="M">Male</Option>
                      <Option value="F">Female</Option>
                      <Option value="O">Other</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                  </Button>
                  <Button 
                    loading={loading}
                    onClick={() => {
                      form.validateFields()
                        .then(values => onFinish(values, true))
                        .catch(info => console.log('Validate Failed:', info));
                    }}
                  >
                    Submit & Create Form
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}