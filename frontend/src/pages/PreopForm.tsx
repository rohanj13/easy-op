// ========================
// File: src/pages/PreopForm.tsx
// ========================
import React, { useEffect, useState } from "react";
import { Layout, Form, Button, Typography, Steps, Card, Space, notification } from "antd";
import { FormOutlined, ArrowRightOutlined, ArrowLeftOutlined, CheckOutlined } from "@ant-design/icons";
import { parseCSVText, CSVField } from "../utils/csvUtils";
import DynamicForm from "../components/PreopForm/DynamicForm";

const { Content } = Layout;
const { Title, Paragraph } = Typography;
const { Step } = Steps;

const PreopForm: React.FC = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [csvFields, setCsvFields] = useState<CSVField[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/questions.csv");
      const text = await res.text();
      const parsed = await parseCSVText(text);
      setCsvFields(parsed);
    };
    load();
  }, []);

  // Group CSV fields into steps by Tab name
  const steps = Array.from(new Set(csvFields.map(f => f.Tab))).map(tab => ({
    title: tab,
    content: <DynamicForm fields={csvFields.filter(f => f.Tab === tab)} />,
  }));

  const onNext = () => setCurrentStep((prev) => prev + 1);
  const onPrev = () => setCurrentStep((prev) => prev - 1);

  const onFinish = async (values: any) => {
    console.log("Submitted values:", values);
    notification.success({ message: "Submitted", description: "Assessment submitted successfully." });
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#fff" }}>
      <Content style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <Title level={2}><FormOutlined style={{ marginRight: 12, color: "#1890ff" }} />Pre-operative Assessment</Title>
          <Paragraph style={{ fontSize: 16, color: "rgba(0,0,0,0.65)" }}>Please complete the form below.</Paragraph>
        </div>

        <Card style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ overflowX: "auto", marginBottom: 32 }}>
            <Steps current={currentStep} size="small" style={{ display: "inline-flex", gap: 8 }}>
              {steps.map((s, i) => (
                <Step key={i} title={<div style={{ whiteSpace: "nowrap" }}>{s.title}</div>} />
              ))}
            </Steps>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            size="large"
            scrollToFirstError
          >
            {steps[currentStep]?.content}

            <Form.Item style={{ marginTop: 32 }}>
              <Space style={{ width: "100%", justifyContent: "space-between" }}>
                {currentStep > 0 && <Button onClick={onPrev} size="large" icon={<ArrowLeftOutlined />}>Previous</Button>}
                {currentStep < steps.length - 1 && <Button type="primary" onClick={onNext} size="large" icon={<ArrowRightOutlined />}>Next</Button>}
                {currentStep === steps.length - 1 && (
                  <Button type="primary" htmlType="submit" size="large" icon={<CheckOutlined />}>Submit</Button>
                )}
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default PreopForm;