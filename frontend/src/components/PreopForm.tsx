import React, { useState } from 'react';
import { 
  Layout, 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Card, 
  Space, 
  Typography, 
  ConfigProvider, 
  notification,
  Radio,
  Select,
  DatePicker,
  Checkbox,
  Divider,
  Collapse
} from 'antd';
import { 
  ArrowLeftOutlined, 
  MedicineBoxOutlined,
  SafetyOutlined,
  FormOutlined,
  UserOutlined,
  MedicineBoxTwoTone,
  HeartOutlined,
  WarningOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api/api";

const { Header, Content } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;

interface AssessmentData {
  // Patient Details
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  
  // Operation Details
  surgeon: string;
  hospital: string;
  operation: string;
  dateOfOperation: string;
  operationReason: string;
  
  // Patient Medical Details
  height: number;
  weight: number;
  recentlyUnwell: string;
  previousAnaesthetic: string;
  familyAnaestheticReaction: string;
  allergies: string;
  regularMedications: string;
  smokeOrVape: string;
  alcoholConsumption: string;
  
  // Medical Conditions
  heartIssues: string;
  shortnessOfBreath: string;
  lungIssues: string;
  diabetes: string;
  gastrointestinalIssues: string;
  thyroidDisease: string;
  neurologicalCondition: string;
  rheumatoidArthritis: string;
  kidneyCondition: string;
  bloodClotting: string;
  cancer: string;
  
  // Other Health Information
  covidHistory: string;
  dentalDescription: string[];
  effectivePainRelievers: string[];
  painRelieversToAvoid: string[];
  otherMedicalConditions: string;
}

const PreopForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [hasAllergies, setHasAllergies] = useState<string>('No');
  const [hasMedications, setHasMedications] = useState<string>('No');
  const [hasOtherMedicalConditions, setHasOtherMedicalConditions] = useState<string>('No');

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
              {/* PATIENT DETAILS SECTION */}
              <Card 
                type="inner" 
                title={
                  <div>
                    <UserOutlined style={{ fontSize: '18px', color: '#1890ff', marginRight: '8px' }} />
                    <span style={{ fontSize: '18px', fontWeight: 500 }}>Patient Details</span>
                  </div>
                }
                style={{ marginBottom: '24px' }}
              >
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '16px',
                }}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: "Please enter first name" }]}
                  >
                    <Input placeholder="Enter first name" />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: "Please enter last name" }]}
                  >
                    <Input placeholder="Enter last name" />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Gender"
                  name="gender"
                  rules={[{ required: true, message: "Please select gender" }]}
                >
                  <Radio.Group>
                    <Radio value="F">Female</Radio>
                    <Radio value="M">Male</Radio>
                    <Radio value="Other">Other</Radio>
                  </Radio.Group>
                </Form.Item>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '16px',
                }}>
                  <Form.Item
                    label="Date of Birth"
                    name="dateOfBirth"
                    rules={[{ required: true, message: "Please enter date of birth" }]}
                  >
                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[{ required: true, message: "Please enter phone number" }]}
                  >
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please enter email" },
                    { type: 'email', message: "Please enter a valid email" }
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
              </Card>

              {/* OPERATION DETAILS SECTION */}
              <Card 
                type="inner" 
                title={
                  <div>
                    <MedicineBoxTwoTone style={{ fontSize: '18px', marginRight: '8px' }} />
                    <span style={{ fontSize: '18px', fontWeight: 500 }}>Operation Details</span>
                  </div>
                }
                style={{ marginBottom: '24px' }}
              >
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '16px',
                }}>
                  <Form.Item
                    label="Surgeon"
                    name="surgeon"
                    rules={[{ required: true, message: "Please enter surgeon name" }]}
                  >
                    <Input placeholder="Enter surgeon name" />
                  </Form.Item>

                  <Form.Item
                    label="Hospital"
                    name="hospital"
                    rules={[{ required: true, message: "Please enter hospital" }]}
                  >
                    <Input placeholder="Enter hospital name" />
                  </Form.Item>
                </div>

                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '16px',
                }}>
                  <Form.Item
                    label="Operation"
                    name="operation"
                    rules={[{ required: true, message: "Please enter operation" }]}
                  >
                    <Input placeholder="Enter operation type" />
                  </Form.Item>

                  <Form.Item
                    label="Date of Operation"
                    name="dateOfOperation"
                    rules={[{ required: true, message: "Please enter operation date" }]}
                  >
                    <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Why are you having this operation (what symptoms or diagnosis made you decide to undergo this procedure)?"
                  name="operationReason"
                  rules={[{ required: true, message: "Please provide reason for operation" }]}
                >
                  <TextArea rows={3} placeholder="Describe symptoms or diagnosis" />
                </Form.Item>
              </Card>

              {/* PATIENT MEDICAL DETAILS */}
              <Card 
                type="inner" 
                title={
                  <div>
                    <SafetyOutlined style={{ fontSize: '18px', color: '#1890ff', marginRight: '8px' }} />
                    <span style={{ fontSize: '18px', fontWeight: 500 }}>Patient Medical Details</span>
                  </div>
                }
                style={{ marginBottom: '24px' }}
              >
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '16px',
                  marginBottom: '20px'
                }}>
                  <Form.Item
                    label="Height (cm)"
                    name="height"
                    rules={[{ required: true, message: "Please enter height" }]}
                  >
                    <InputNumber min={50} max={250} style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item
                    label="Weight (kg)"
                    name="weight"
                    rules={[{ required: true, message: "Please enter weight" }]}
                  >
                    <InputNumber min={0} max={300} style={{ width: '100%' }} />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Have you been unwell in the 4 weeks before your operation?"
                  name="recentlyUnwell"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="If your operation is within the next four weeks please advise if you have had a recent fever, cough, cold, flu, sore throat, respiratory symptoms, shortness of breath, runny nose, blocked nose, headache, body aches, muscle or joint pains, nausea, diarrhoea, vomiting, loss of smell/taste, loss of appetite, fatigue or any other illness recently"
                >
                  <Radio.Group>
                    <Radio value="No">No</Radio>
                    <Radio value="Yes">Yes - I have been well</Radio>
                    <Radio value="N/A">N/A - My operation is in more than 4 weeks</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Have you ever had an anaesthetic?"
                  name="previousAnaesthetic"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No - This will be my first anaesthetic</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Have any of your blood relatives experienced a severe reaction to an anaesthetic?"
                  name="familyAnaestheticReaction"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="e.g. your parents, your siblings, your parent's siblings, your grandparents, your children"
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No/Not that I'm aware of</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Do you have any allergies?"
                  name="allergies"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="especially to medications including antibiotics, latex products, foods or iodine"
                >
                  <Radio.Group onChange={(e) => setHasAllergies(e.target.value)}>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                {hasAllergies === 'Yes' && (
                  <Form.Item
                    label="Please specify your allergies"
                    name="allergiesDetails"
                  >
                    <TextArea rows={3} placeholder="Describe your allergies" />
                  </Form.Item>
                )}

                <Form.Item
                  label="Do you take regular medications, puffers or any injections?"
                  name="regularMedications"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="This includes all syrups, tablets, puffers, patches, sprays, eye drops, any type of injections etc. It is VERY important to mention if you take any weight loss injections, GLP-1 receptor agonists (eg. Saxenda, Ozempic) or any anticoagulants (eg. Aspirin, Xarelto, Eliquis, Warfarin, Clexane)"
                >
                  <Radio.Group onChange={(e) => setHasMedications(e.target.value)}>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                {hasMedications === 'Yes' && (
                  <Form.Item
                    label="Please specify your medications"
                    name="medicationsDetails"
                  >
                    <TextArea rows={3} placeholder="List all your medications" />
                  </Form.Item>
                )}

                <Form.Item
                  label="Do you smoke or vape?"
                  name="smokeOrVape"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="never">No – I have never smoked or vaped</Radio>
                    <Radio value="previously">No – I previously smoked / vaped, but now do not</Radio>
                    <Radio value="socially">Yes – I smoke / vape socially only</Radio>
                    <Radio value="regularly">Yes – I smoke / vape regularly</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Do you regularly drink alcohol?"
                  name="alcoholConsumption"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="No">No</Radio>
                    <Radio value="Socially">Yes – Socially / weekends only</Radio>
                    <Radio value="Often">Yes – Often / most days</Radio>
                  </Radio.Group>
                </Form.Item>
              </Card>

              {/* MEDICAL CONDITIONS */}
              <Card 
                type="inner" 
                title={
                  <div>
                    <HeartOutlined style={{ fontSize: '18px', color: '#ff4d4f', marginRight: '8px' }} />
                    <span style={{ fontSize: '18px', fontWeight: 500 }}>Medical Conditions</span>
                  </div>
                }
                style={{ marginBottom: '24px' }}
              >
                <Paragraph style={{ marginBottom: '16px' }}>
                  Do you have, or have you ever had, any of the following?
                </Paragraph>

                <Form.Item
                  label="Any trouble with your heart or cardiovascular system, or have you ever been to a Cardiologist?"
                  name="heartIssues"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="This could include hypertension / high blood pressure, chest pains, angina, heart attacks, coronary artery stents, coronary artery bypass surgery, heart rhythm problems, having a pacemaker, defibrillator, strokes or mini strokes"
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Shortness of breath climbing less than 2 flights of stairs or whilst walking for 30 minutes on flat ground?"
                  name="shortnessOfBreath"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                    <Radio value="Other">Other</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Any trouble with your lungs or respiratory system, or have you ever seen a Respiratory/Sleep Specialist?"
                  name="lungIssues"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="This could include asthma, obstructive sleep apnoea (OSA) with or without CPAP mask use, cystic fibrosis, pneumonia within the last 3 months, smoking-related problems or any other lung / breathing / respiratory conditions"
                >
                  <Radio.Group>
                    <Radio value="Yes - Asthma">Yes – Asthma</Radio>
                    <Radio value="Yes - Obstructive Sleep Apnoea">Yes – Obstructive Sleep Apnoea (OSA)</Radio>
                    <Radio value="Yes - Other lung problems">Yes – Other lung problems</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Diabetes?"
                  name="diabetes"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                    <Radio value="Other">Other</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Gastro-oesophageal reflux disease (GORD), gastritis, oesophagitis, stomach or duodenal ulcers, hiatus hernia, or have you had gastric surgery?"
                  name="gastrointestinalIssues"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="If you are unsure of which option to choose, please select 'Yes'. Gastric surgery is also commonly referred to as gastric band surgery, gastric bypass surgery, gastric sleeve surgery, Lap band surgery or weight loss surgery. It is VERY important to mention if you have undergone this surgery."
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Thyroid disease?"
                  name="thyroidDisease"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                    <Radio value="Other">Other</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Neurological Condition?"
                  name="neurologicalCondition"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="This could include a stroke, mini-stroke, TIA, multiple sclerosis, Parkinson's disease or epilepsy"
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Rheumatoid arthritis, connective tissue disease or any other musculoskeletal issues?"
                  name="rheumatoidArthritis"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Kidney condition?"
                  name="kidneyCondition"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Blood clots or excessive bleeding?"
                  name="bloodClotting"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="This could include deep vein thrombosis (DVT), pulmonary embolism (PE), haemophilia or another condition"
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Cancer?"
                  name="cancer"
                  rules={[{ required: true, message: "Please answer this question" }]}
                >
                  <Radio.Group>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>
              </Card>

              {/* OTHER HEALTH INFORMATION */}
              <Card 
                type="inner" 
                title={
                  <div>
                    <WarningOutlined style={{ fontSize: '18px', color: '#faad14', marginRight: '8px' }} />
                    <span style={{ fontSize: '18px', fontWeight: 500 }}>Other Health Information</span>
                  </div>
                }
                style={{ marginBottom: '24px' }}
              >
                <Form.Item
                  label="Have you had COVID-19?"
                  name="covidHistory"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="If you have had COVID-19 multiple times, or think you may have had it recently, please select based on the most recent date"
                >
                  <Radio.Group>
                    <Radio value="Recent">Yes – within the last 2 months</Radio>
                    <Radio value="Past">Yes – over 2 months ago</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                <Form.Item
                  label="Which of the following describes your mouth, teeth, and dentition?"
                  name="dentalDescription"
                  rules={[{ required: true, message: "Please select at least one option" }]}
                >
                  <Checkbox.Group>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
                      <Checkbox value="unableToOpenMouth">I am unable to open my mouth fully</Checkbox>
                      <Checkbox value="ownTeeth">I have my own teeth only (with or without fillings)</Checkbox>
                      <Checkbox value="looseTeeth">Loose tooth or teeth</Checkbox>
                      <Checkbox value="chippedTeeth">Chipped tooth or teeth</Checkbox>
                      <Checkbox value="braces">Braces</Checkbox>
                      <Checkbox value="wireRetainer">Wire retainer</Checkbox>
                      <Checkbox value="capsCrownsVeneers">Caps, crowns, or veneers</Checkbox>
                      <Checkbox value="implants">Implant(s)</Checkbox>
                      <Checkbox value="bridges">Bridge(s)</Checkbox>
                      <Checkbox value="partialUpperDentures">Partial upper dentures</Checkbox>
                      <Checkbox value="partialLowerDentures">Partial lower dentures</Checkbox>
                      <Checkbox value="fullUpperDentures">Full upper dentures</Checkbox>
                      <Checkbox value="fullLowerDentures">Full lower dentures</Checkbox>
                      <Checkbox value="otherDental">Other</Checkbox>
                    </div>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item
                  label="Please indicate the pain relievers or analgesics that have worked well for you previously"
                  name="effectivePainRelievers"
                  rules={[{ required: true, message: "Please select at least one option" }]}
                >
                  <Checkbox.Group>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
                      <Checkbox value="paracetamol">Paracetamol, eg. Panadol, Dymadon</Checkbox>
                      <Checkbox value="paracetamolCodeine">Paracetamol-codeine combinations, eg. Panadeine Forte, Painstop</Checkbox>
                      <Checkbox value="antiInflammatories">Anti-inflammatories, eg. Nurofen, Voltaren, Celebrex, Mobic</Checkbox>
                      <Checkbox value="tramadol">Tramadol, eg. Tramal</Checkbox>
                      <Checkbox value="tapentadol">Tapentadol, eg. Palexia</Checkbox>
                      <Checkbox value="strongOpioids">Strong opioids, eg. OxyNorm, Endone, Targin, Sevredol</Checkbox>
                      <Checkbox value="unsure">Unsure / I don't take pain relievers</Checkbox>
                      <Checkbox value="otherPainRelievers">Other</Checkbox>
                    </div>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item
                  label="Please indicate the pain relievers or analgesics that you must avoid or should not use"
                  name="painRelieversToAvoid"
                  rules={[{ required: true, message: "Please select at least one option" }]}
                >
                  <Checkbox.Group>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
                      <Checkbox value="paracetamol">Paracetamol, eg. Panadol, Dymadon</Checkbox>
                      <Checkbox value="paracetamolCodeine">Paracetamol-codeine combinations, eg. Panadeine Forte, Painstop</Checkbox>
                      <Checkbox value="antiInflammatories">Anti-inflammatories, eg. Nurofen, Voltaren, Celebrex, Mobic</Checkbox>
                      <Checkbox value="tramadol">Tramadol, eg. Tramal</Checkbox>
                      <Checkbox value="tapentadol">Tapentadol, eg. Palexia</Checkbox>
                      <Checkbox value="strongOpioids">Strong opioids, eg. OxyNorm, Endone, Targin, Sevredol</Checkbox>
                      <Checkbox value="otherPainRelievers">Other</Checkbox>
                      <Checkbox value="noRestrictions">I am not aware of any pain relievers or analgesics that I must avoid or should not use</Checkbox>
                    </div>
                  </Checkbox.Group>
                </Form.Item>

                <Form.Item
                  label="Do you have any other medical conditions not already mentioned?"
                  name="otherMedicalConditions"
                  rules={[{ required: true, message: "Please answer this question" }]}
                  extra="These could include brain, nerve, muscle, vascular problems, autism spectrum disorder, psychiatric / cognitive / behavioural conditions, difficulty lying on your back, claustrophobia, or anything else that could affect your health, your legal ability to consent or the care you receive from your Anaesthetist"
                >
                  <Radio.Group onChange={(e) => setHasOtherMedicalConditions(e.target.value)}>
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </Radio.Group>
                </Form.Item>

                {hasOtherMedicalConditions === 'Yes' && (
                  <Form.Item
                    label="Please specify your other medical conditions"
                    name="otherMedicalConditionsDetails"
                  >
                    <TextArea rows={3} placeholder="Describe your other medical conditions" />
                  </Form.Item>
                )}
              </Card>

              <Form.Item style={{ marginTop: '32px' }}><Space style={{ width: '100%', justifyContent: 'flex-end' }}>
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