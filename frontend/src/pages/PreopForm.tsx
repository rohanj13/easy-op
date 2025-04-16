import React, { useState } from 'react';
import {
  Layout,
  Form,
  Button,
  Card,
  Space,
  Typography,
  ConfigProvider,
  notification,
  Steps,
} from 'antd';
import {
  FormOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api/api';
import { Assessment } from '../types/assessment';

import PageHeader from '../components/PreopForm/PageHeader';
import PatientDetails from '../components/PreopForm/PatientDetails';
import VitalSigns from '../components/PreopForm/VitalSigns';
import Allergies from '../components/PreopForm/Allergies';
import Airway from '../components/PreopForm/Airway';
import MedicalHistory from '../components/PreopForm/MedicalHistory';
import SurgicalHistory from '../components/PreopForm/SurgicalHistory';
import AnaesthesiaHistory from '../components/PreopForm/AnaesthesiaHistory';
import SocialHistory from '../components/PreopForm/SocialHistory';

// import OperationDetailsSection from '../components/PreopForm/OperationDetailsSection';
// import PatientMedicalDetailsSection from '../components/PreopForm/PatientMedicalDetailsSection';
// import MedicalConditionsSection from '../components/PreopForm/MedicalConditionsSection';
// import OtherHealthInfoSection from '../components/PreopForm/OtherHealthInfoSection';

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;

const PreopForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Patient Details',
      content: <PatientDetails />,
    },
    {
      title: 'Vital Signs',
      content: <VitalSigns />,
    },
    {
      title: 'Allergies',
      content: <Allergies />,
    },
    {
      title: 'Airway',
      content: <Airway />,
    },
    {
      title: 'Medical History',
      content: <MedicalHistory />,
    },
    {
      title: 'Surgical History',
      content: <SurgicalHistory />,
    },
    {
      title: 'Anaesthesia History',
      content: <AnaesthesiaHistory />,
    },
    {
      title: 'Social History',
      content: <SocialHistory />,
    },
  ];

  const onNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const onPrev = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onFinish = async (values: Assessment) => {
    try {
      await api.post('/preop-assessments/', values);
      notification.success({
        message: 'Assessment Submitted',
        description: 'Your pre-operative assessment has been successfully recorded.',
        placement: 'topRight',
      });
      form.resetFields();
      setCurrentStep(0);
    } catch (error) {
      console.error('API error:', error);
      notification.error({
        message: 'Submission Failed',
        description: 'Unable to submit assessment. Please try again.',
        placement: 'topRight',
      });
    }
  };

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <PageHeader navigate={navigate} />

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Title level={2}>
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
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Steps current={currentStep} style={{ marginBottom: 32 }}>
              {steps.map((step, index) => (
                <Step key={index} title={step.title} />
              ))}
            </Steps>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              size="large"
              scrollToFirstError
            >
              {steps[currentStep].content}

              <Form.Item style={{ marginTop: '32px' }}>
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                  {currentStep > 0 && (
                    <Button onClick={onPrev} size="large" icon={<ArrowLeftOutlined />}>
                      Previous
                    </Button>
                  )}

                  {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={onNext} size="large" icon={<ArrowRightOutlined />}>
                      Next
                    </Button>
                  )}

                  {currentStep === steps.length - 1 && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      icon={<CheckOutlined />}
                      style={{ paddingLeft: '32px', paddingRight: '32px' }}
                    >
                      Submit Assessment
                    </Button>
                  )}
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