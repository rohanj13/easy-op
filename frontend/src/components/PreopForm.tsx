import React from 'react';
import { Layout, Form, Input, InputNumber, Button, Card, Space, Typography, ConfigProvider, notification } from 'antd';
import { 
  ArrowLeftOutlined, 
  MedicineBoxOutlined,
  SafetyOutlined,
  FormOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api/api";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

interface AssessmentData {
  patient_name: string;
  age: number;
  weight: number;
  height: number;
  medical_history: string;
}

const PreopForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: AssessmentData) => {
    try {
      await api.post("/preop-assessments/", values);
      notification.success({
        message: "Assessment Submitted",
        description: "Your pre-operative assessment has been successfully recorded.",
        placement: "topRight",
      });
      form.resetFields();
    } catch (error) {
      console.error("API error:", error);
      notification.error({
        message: "Submission Failed",
        description: "Unable to submit assessment. Please try again.",
        placement: "topRight",
      });
    }
  };

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

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={2} style={{ marginBottom: '16px' }}>
              <FormOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
              Pre-operative Assessment Form
            </Title>
            <Paragraph style={{ fontSize: '16px', color: 'rgba(0,0,0,0.65)' }}>
              Please complete all required fields for accurate pre-operative evaluation
            </Paragraph>
          </div>

          <Card 
            style={{ 
              maxWidth: '800px', 
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ age: 30, weight: 70, height: 1.75 }}
              size="large"
            >
              <div style={{ marginBottom: '32px' }}>
                <SafetyOutlined style={{ fontSize: '24px', color: '#1890ff', marginRight: '8px' }} />
                <span style={{ fontSize: '18px', fontWeight: 500 }}>Patient Information</span>
              </div>

              <Form.Item
                label="Patient Name"
                name="patient_name"
                rules={[{ required: true, message: "Please enter patient name" }]}
              >
                <Input placeholder="Enter patient's full name" />
              </Form.Item>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px',
                marginBottom: '24px'
              }}>
                <Form.Item
                  label="Age"
                  name="age"
                  rules={[{ required: true, message: "Please enter age" }]}
                >
                  <InputNumber
                    min={1}
                    max={120}
                    placeholder="Age"
                    style={{ width: '100%' }}
                    addonAfter="years"
                  />
                </Form.Item>

                <Form.Item
                  label="Weight"
                  name="weight"
                  rules={[{ required: true, message: "Please enter weight" }]}
                >
                  <InputNumber
                    min={30}
                    max={200}
                    placeholder="Weight"
                    style={{ width: '100%' }}
                    addonAfter="kg"
                  />
                </Form.Item>

                <Form.Item
                  label="Height"
                  name="height"
                  rules={[{ required: true, message: "Please enter height" }]}
                >
                  <InputNumber
                    min={1}
                    max={2.5}
                    step={0.01}
                    placeholder="Height"
                    style={{ width: '100%' }}
                    addonAfter="m"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Medical History"
                name="medical_history"
                rules={[{ required: true, message: "Please enter medical history" }]}
              >
                <Input.TextArea 
                  rows={4}
                  placeholder="Include relevant medical conditions, current medications, and known allergies"
                  style={{ fontSize: '14px' }}
                />
              </Form.Item>

              <Form.Item style={{ marginTop: '32px' }}>
                <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                  <Button 
                    onClick={() => form.resetFields()}
                    size="large"
                  >
                    Reset
                  </Button>
                  <Button 
                    type="primary"
                    htmlType="submit"
                    size="large"
                    icon={<FormOutlined />}
                    style={{ paddingLeft: '32px', paddingRight: '32px' }}
                  >
                    Submit Assessment
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default PreopForm;