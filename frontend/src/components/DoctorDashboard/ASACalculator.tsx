import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Form, 
  Radio, 
  Button, 
  Typography, 
  Divider, 
  Alert, 
  Space,
  Result 
} from 'antd';

const { Title, Paragraph } = Typography;

// Define interfaces for props and form values
interface PatientData {
  heart_issues: string | null;
  lung_issues: string | null;
  diabetes: string | null;
  neurological_condition: string | null;
  cancer: string | null;
  height: number;
  weight: number;
  date_of_birth: string;
}

interface ASACalculatorProps {
  patientData: PatientData;
}

interface ASAFormValues {
  asaClass: string;
}

const ASACalculator: React.FC<ASACalculatorProps> = ({ patientData }) => {
  const [form] = Form.useForm<ASAFormValues>();
  const [asaClass, setAsaClass] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string>('');
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  
  // This function automates some of the ASA calculation based on patient data
  const autoCalculate = (): void => {
    // Start with default values
    let initialValue = '1';
    let initialExplanation = '';
    
    // Check for medical conditions that would increase ASA class
    const hasHeartIssues = patientData.heart_issues && patientData.heart_issues !== 'None' && patientData.heart_issues !== 'No';
    const hasLungIssues = patientData.lung_issues && patientData.lung_issues !== 'None' && patientData.lung_issues !== 'No';
    const hasDiabetes = patientData.diabetes && patientData.diabetes !== 'None' && patientData.diabetes !== 'No';
    const hasNeurologicalCondition = patientData.neurological_condition && patientData.neurological_condition !== 'None' && patientData.neurological_condition !== 'No';
    const hasCancer = patientData.cancer && patientData.cancer !== 'None' && patientData.cancer !== 'No';
    
    // Calculate BMI
    const height = patientData.height / 100; // convert to meters
    const weight = patientData.weight;
    const bmi = weight / (height * height);
    const hasSevereBMI = bmi > 40;
    
    // Calculate age
    const age = new Date().getFullYear() - new Date(patientData.date_of_birth).getFullYear();
    const isElderly = age > 75;
    
    // Determine ASA class based on conditions
    if (hasSevereBMI || isElderly) {
      initialValue = '2';
      initialExplanation = 'Patient has ';
      if (hasSevereBMI) initialExplanation += `severe obesity (BMI: ${bmi.toFixed(1)}) `;
      if (isElderly) initialExplanation += `${initialExplanation ? 'and ' : ''}advanced age (${age} years) `;
    }
    
    if (hasHeartIssues || hasLungIssues || hasDiabetes || hasNeurologicalCondition) {
      initialValue = '3';
      initialExplanation = 'Patient has ';
      if (hasHeartIssues) initialExplanation += 'heart issues ';
      if (hasLungIssues) initialExplanation += `${initialExplanation !== 'Patient has ' ? 'and ' : ''}lung issues `;
      if (hasDiabetes) initialExplanation += `${initialExplanation !== 'Patient has ' ? 'and ' : ''}diabetes `;
      if (hasNeurologicalCondition) initialExplanation += `${initialExplanation !== 'Patient has ' ? 'and ' : ''}neurological condition `;
    }
    
    if (hasCancer && (hasHeartIssues || hasLungIssues)) {
      initialValue = '4';
      initialExplanation = 'Patient has cancer and significant systemic disease.';
    }
    
    form.setFieldsValue({ asaClass: initialValue });
    setExplanation(initialExplanation);
  };
  
  useEffect(() => {
    if (patientData) {
      autoCalculate();
    }
  }, [patientData]);
  
  const onFinish = (values: ASAFormValues): void => {
    setAsaClass(values.asaClass);
    setIsCalculated(true);
  };
  
  const getASADescription = (asaValue: string): string => {
    switch (asaValue) {
      case '1':
        return 'A normal healthy patient';
      case '2':
        return 'A patient with mild systemic disease';
      case '3':
        return 'A patient with severe systemic disease';
      case '4':
        return 'A patient with severe systemic disease that is a constant threat to life';
      case '5':
        return 'A moribund patient who is not expected to survive without the operation';
      case '6':
        return 'A declared brain-dead patient whose organs are being removed for donor purposes';
      default:
        return '';
    }
  };
  
  const getExampleConditions = (asaValue: string): string => {
    switch (asaValue) {
      case '1':
        return 'Healthy, non-smoking, no or minimal alcohol use';
      case '2':
        return 'Mild diseases only without substantive functional limitations (e.g., current smoker, social alcohol drinker, pregnancy, obesity (BMI 30-40), well-controlled DM/HTN, mild lung disease)';
      case '3':
        return 'Substantive functional limitations (e.g., poorly controlled DM or HTN, COPD, morbid obesity (BMI ≥40), active hepatitis, alcohol dependence, pacemaker, moderate reduction in ejection fraction, ESRD with regularly scheduled dialysis, history of MI/CVA/TIA or CAD/stents)';
      case '4':
        return 'Recent MI or CVA, ongoing cardiac ischemia or severe valve dysfunction, sepsis, DIC, ARD or ESRD not undergoing regularly scheduled dialysis';
      case '5':
        return 'Ruptured abdominal/thoracic aneurysm, massive trauma, intracranial bleed with mass effect, ischemic bowel in face of significant cardiac pathology or multiple organ/system dysfunction';
      case '6':
        return 'Declared brain-dead patient whose organs are being removed for donor purposes';
      default:
        return '';
    }
  };
  
  return (
    <Card title="ASA Physical Status Classification" bordered={false}>
      <Paragraph>
        The ASA Physical Status Classification System is a system used to assess and communicate a patient's pre-anesthesia medical comorbidities.
      </Paragraph>
      
      <Alert
        message="Automated Suggestion"
        description={
          explanation ? 
            `Based on the patient data, we suggest ASA Class ${form.getFieldValue('asaClass')}. ${explanation}` :
            "No automatic suggestion available. Please assess based on your clinical judgment."
        }
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />
      
      <Form
        form={form}
        name="asaForm"
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="asaClass"
          label="ASA Physical Status Classification"
          rules={[{ required: true, message: 'Please select ASA classification' }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="1">Class 1: {getASADescription('1')}</Radio>
              <Radio value="2">Class 2: {getASADescription('2')}</Radio>
              <Radio value="3">Class 3: {getASADescription('3')}</Radio>
              <Radio value="4">Class 4: {getASADescription('4')}</Radio>
              <Radio value="5">Class 5: {getASADescription('5')}</Radio>
              <Radio value="6">Class 6: {getASADescription('6')}</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Calculate
          </Button>
        </Form.Item>
      </Form>
      
      {isCalculated && (
        <>
          <Divider />
          <Result
            status={parseInt(asaClass as string) >= 3 ? "warning" : "success"}
            title={`ASA Class ${asaClass}`}
            subTitle={getASADescription(asaClass as string)}
            extra={
              <Card>
                <Title level={4}>Examples:</Title>
                <Paragraph>{getExampleConditions(asaClass as string)}</Paragraph>
                
                <Title level={4}>Clinical Implications:</Title>
                <Paragraph>
                  {parseInt(asaClass as string) >= 3 
                    ? "Patient may require additional preoperative optimization and has increased risk of perioperative complications."
                    : "Patient is at standard risk for anesthesia. Standard preoperative protocols are appropriate."}
                </Paragraph>
                
                <Title level={4}>Recommended Actions:</Title>
                <ul>
                  {parseInt(asaClass as string) >= 3 && (
                    <>
                      <li>Consider additional preoperative testing</li>
                      <li>Consider anesthesiology consultation</li>
                      <li>Potential need for postoperative higher level of care</li>
                    </>
                  )}
                  {parseInt(asaClass as string) >= 4 && (
                    <>
                      <li>Recommend preoperative optimization</li>
                      <li>Consider ICU availability postoperatively</li>
                    </>
                  )}
                  {parseInt(asaClass as string) < 3 && (
                    <>
                      <li>Standard preoperative preparation</li>
                      <li>Routine anesthesia planning</li>
                    </>
                  )}
                </ul>
              </Card>
            }
          />
        </>
      )}
    </Card>
  );
};

export default ASACalculator;