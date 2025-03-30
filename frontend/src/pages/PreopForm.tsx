// PreopForm.tsx - Main container component
import React from 'react';
import { 
  Layout, 
  Form, 
  Button, 
  Card, 
  Space, 
  Typography, 
  ConfigProvider, 
  notification 
} from 'antd';
import { 
  FormOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api/api";
import { Assessment } from '../types/assessment';
// Import form section components
import PatientDetailsSection from '../components/PreopForm/PatientDetailsSection';
import MedicalConditionsSection from '../components/PreopForm/MedicalConditionsSection';
import OperationDetailsSection from '../components/PreopForm/OperationDetailsSection';
import OtherHealthInfoSection from '../components/PreopForm/OtherHealthInfoSection';
import PageHeader from '../components/PreopForm/PageHeader';
import PatientMedicalDetailsSection from '../components/PreopForm/PatientMedicalDetailsSection';
import { FormProvider } from 'antd/es/form/context';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PreopForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: Assessment) => {
    try {
      await api.post("/preop-assessments/", values);
      console.log("Form values:", values);
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
        <PageHeader navigate={navigate} />

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
              maxWidth: '900px', 
              margin: '0 auto',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              scrollToFirstError
            >
              {/* Form sections as components */}
              <FormProvider>
                <PatientDetailsSection />
                <OperationDetailsSection />
                <PatientMedicalDetailsSection />
                <MedicalConditionsSection />
                <OtherHealthInfoSection />
              </FormProvider>
              

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