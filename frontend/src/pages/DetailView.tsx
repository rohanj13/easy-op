import React, { useState, useEffect } from 'react';
import { 
  Layout, 
  Typography, 
  Card, 
  Row, 
  Col, 
  Descriptions, 
  Tabs, 
  Tag, 
  Spin, 
  Alert,
  Statistic
} from 'antd';
import { 
  UserOutlined, 
  HeartOutlined,
  CalculatorOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Assessment } from '../types/assessment';

// Risk calculator components (imported locally)
import ASACalculator from '../components/DoctorDashboard/ASACalculator';
// import LEAPCalculator from './calculators/LEAPCalculator';
// import PORICalculator from './calculators/PORICalculator';
// import PosumCalculator from './calculators/PosumCalculator';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

interface RiskLevelTag {
  color: string;
  text: string;
};

type RouteParams = {
  id: string;
};

const getRiskLevelTag = (riskScore: number): RiskLevelTag => {
  let color = 'green';
  let text = 'Low Risk';
  
  if (riskScore >= 8) {
    color = 'red';
    text = 'High Risk';
  } else if (riskScore >= 4) {
    color = 'orange';
    text = 'Medium Risk';
  }
  
  return { color, text };
};

const PatientDetailsView: React.FC = () => {
  const { id } = useParams<RouteParams>();
  const [patientData, setPatientData] = useState<Assessment| null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchPatientData = async (): Promise<void> => {
      try {
        setLoading(true);
        
        const response = await axios.get(`/preop-assessments/${id}/`);
        setPatientData(response.data);
      } catch (err) {
        setError('Failed to load patient data. Please try again.');
        console.error('Error fetching patient data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPatientData();
  }, [id]);
  
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading patient data..." />
      </div>
    );
  }
  
  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }
  
  if (!patientData) {
    return <Alert message="No data found" description="Patient assessment data not found" type="warning" showIcon />;
  }
  
  const riskLevel = getRiskLevelTag(patientData.risk_score);
  
  const calculateAge = (dateOfBirth: string): number => {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age;
  };
  
  // Calculate BMI
  const calculateBMI = (): string => {
    if (patientData.height && patientData.weight) {
      // Convert height from cm to meters
      const heightInMeters = patientData.height / 100;
      return (patientData.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return 'N/A';
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={3} style={{ margin: '16px 0' }}>
            <UserOutlined /> {patientData.first_name} {patientData.last_name}
          </Title>
          <Tag color={riskLevel.color} style={{ fontSize: '16px', padding: '5px 10px' }}>
            {riskLevel.text}
          </Tag>
        </div>
      </Header>
      <Content style={{ padding: '20px' }}>
        <div style={{ background: '#fff', padding: '24px', minHeight: '280px' }}>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card>
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic 
                      title="Age" 
                      value={calculateAge(patientData.date_of_birth)} 
                      suffix="years" 
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic 
                      title="BMI" 
                      value={calculateBMI()} 
                      precision={1} 
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic 
                      title="Risk Score" 
                      value={patientData.risk_score} 
                      valueStyle={{ color: riskLevel.color === 'red' ? '#cf1322' : 
                                           riskLevel.color === 'orange' ? '#fa8c16' : '#3f8600' }}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic 
                      title="Surgery Date" 
                      value={new Date(patientData.date_of_operation).toLocaleDateString()} 
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          
          <Tabs defaultActiveKey="overview" size="large" style={{ marginTop: '20px' }}>
            <TabPane 
              tab={<span><UserOutlined />Patient Information</span>} 
              key="overview"
            >
              <Row gutter={[24, 24]}>
                <Col span={12}>
                  <Card title="Personal Details">
                    <Descriptions bordered column={1}>
                      <Descriptions.Item label="Full Name">{patientData.first_name} {patientData.last_name}</Descriptions.Item>
                      <Descriptions.Item label="Gender">{patientData.gender}</Descriptions.Item>
                      <Descriptions.Item label="Date of Birth">{patientData.date_of_birth}</Descriptions.Item>
                      <Descriptions.Item label="Phone Number">{patientData.phone_number}</Descriptions.Item>
                      <Descriptions.Item label="Email">{patientData.email}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                
                <Col span={12}>
                  <Card title="Operation Details">
                    <Descriptions bordered column={1}>
                      <Descriptions.Item label="Operation">{patientData.operation}</Descriptions.Item>
                      <Descriptions.Item label="Date of Operation">{patientData.date_of_operation}</Descriptions.Item>
                      <Descriptions.Item label="Surgeon">{patientData.surgeon}</Descriptions.Item>
                      <Descriptions.Item label="Hospital">{patientData.hospital}</Descriptions.Item>
                      <Descriptions.Item label="Reason for Operation">{patientData.operation_reason}</Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                
                <Col span={24}>
                  <Card title="Patient Medical Details">
                    <Row gutter={[24, 24]}>
                      <Col span={12}>
                        <Descriptions bordered column={1}>
                          <Descriptions.Item label="Height">{patientData.height} cm</Descriptions.Item>
                          <Descriptions.Item label="Weight">{patientData.weight} kg</Descriptions.Item>
                          <Descriptions.Item label="Recently Unwell">{patientData.recently_unwell}</Descriptions.Item>
                          <Descriptions.Item label="Previous Anaesthetic">{patientData.previous_anaesthetic}</Descriptions.Item>
                          <Descriptions.Item label="Family Anaesthetic Reaction">{patientData.family_anaesthetic_reaction}</Descriptions.Item>
                        </Descriptions>
                      </Col>
                      <Col span={12}>
                        <Descriptions bordered column={1}>
                          <Descriptions.Item label="Allergies">{patientData.allergies || 'None'}</Descriptions.Item>
                          <Descriptions.Item label="Regular Medications">{patientData.regular_medications || 'None'}</Descriptions.Item>
                          <Descriptions.Item label="Smoke or Vape">{patientData.smoke_or_vape}</Descriptions.Item>
                          <Descriptions.Item label="Alcohol Consumption">{patientData.alcohol_consumption}</Descriptions.Item>
                          <Descriptions.Item label="COVID History">{patientData.covid_history}</Descriptions.Item>
                        </Descriptions>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            
            <TabPane 
              tab={<span><HeartOutlined />Medical Conditions</span>} 
              key="conditions"
            >
              <Card>
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Heart Issues" span={2}>
                    {patientData.heart_issues || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Shortness of Breath">
                    {patientData.shortness_of_breath || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lung Issues">
                    {patientData.lung_issues || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Diabetes">
                    {patientData.diabetes || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Gastrointestinal Issues">
                    {patientData.gastrointestinal_issues || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thyroid Disease">
                    {patientData.thyroid_disease || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Neurological Condition">
                    {patientData.neurological_condition || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Rheumatoid Arthritis">
                    {patientData.rheumatoid_arthritis || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Kidney Condition">
                    {patientData.kidney_condition || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Blood Clotting">
                    {patientData.blood_clotting || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Cancer" span={2}>
                    {patientData.cancer || 'None'}
                  </Descriptions.Item>
                  <Descriptions.Item label="Other Medical Conditions" span={2}>
                    {patientData.other_medical_conditions || 'None'}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
              
              <Card title="Additional Health Information" style={{ marginTop: '20px' }}>
                <Row gutter={[24, 24]}>
                  <Col span={8}>
                    <Card title="Dental Description" type="inner">
                      {patientData.dental_descriptions && patientData.dental_descriptions.length > 0 ? (
                        <ul>
                          {patientData.dental_descriptions.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <Text>No dental issues reported</Text>
                      )}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Effective Pain Relievers" type="inner">
                      {patientData.effective_pain_relievers && patientData.effective_pain_relievers.length > 0 ? (
                        <ul>
                          {patientData.effective_pain_relievers.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <Text>No effective pain relievers reported</Text>
                      )}
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title="Pain Relievers to Avoid" type="inner">
                      {patientData.pain_relievers_to_avoid && patientData.pain_relievers_to_avoid.length > 0 ? (
                        <ul>
                          {patientData.pain_relievers_to_avoid.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <Text>No pain relievers to avoid reported</Text>
                      )}
                    </Card>
                  </Col>
                </Row>
              </Card>
            </TabPane>
            
            <TabPane 
              tab={<span><CalculatorOutlined />Risk Calculators</span>} 
              key="calculators"
            >
              <Tabs defaultActiveKey="asa" tabPosition="left">
                <TabPane tab="ASA Physical Status" key="asa">
                  <ASACalculator patientData={patientData} />
                </TabPane>
                {/* <TabPane tab="LEAP Frailty Assessment" key="leap">
                  <LEAPCalculator patientData={patientData} />
                </TabPane>
                <TabPane tab="PORI Score" key="pori">
                  <PORICalculator patientData={patientData} />
                </TabPane>
                <TabPane tab="P-POSSUM Score" key="possum">
                  <PosumCalculator patientData={patientData} />
                </TabPane> */}
              </Tabs>
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
};

export default PatientDetailsView;