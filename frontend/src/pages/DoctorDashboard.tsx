
import React, { useEffect, useState } from "react";
import { 
  Layout, 
  Button, 
  notification, 
  Spin, 
  Typography, 
  Card, 
  Space, 
  Tag, 
  ConfigProvider,
  Statistic,
  Row,
  Col,
  Input,
  Collapse,
  Descriptions,
  Empty,
  Badge,
  Tabs,
  Avatar,
  Modal,
  Grid,
  DatePicker
} from "antd";
import { 
  MedicineBoxOutlined, 
  UserOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  DashboardOutlined,
  ReloadOutlined,
  HeartOutlined,
  ScheduleOutlined,
  MedicineBoxFilled,
  FileTextOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api/api";
import moment from 'moment';

import { getRiskLevel } from "../utils/riskLevelUtils";
import { Assessment } from "../types/assessment";

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { useBreakpoint } = Grid;

const DoctorDashboard: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [riskLoading, setRiskLoading] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [detailView, setDetailView] = useState<Assessment | null>(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [filterDate, setFilterDate] = useState<moment.Moment | null>(null);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const fetchAssessments = async () => {
    setLoading(true);
    try {
      const response = await api.get("/preop-assessments/");
      setAssessments(response.data);
    } catch (error) {
      console.error("Error fetching assessments:", error);
      notification.error({
        message: "Error",
        description: "Failed to load assessments. Please try again.",
        placement: "topRight"
      });
    } finally {
      setLoading(false);
    }
  };

  const runRiskAssessment = async (id: number) => {
    setRiskLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await api.get(`/risk-assessments/${id}/`);
      const newRiskScore = response.data.risk_score;
      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === id ? { ...assessment, risk_score: newRiskScore } : assessment
        )
      );
      
      // If we're in detail view, update that as well
      if (detailView && detailView.id === id) {
        setDetailView({...detailView, risk_score: newRiskScore});
      }
      
      notification.success({
        message: "Risk Assessment Complete",
        description: `Risk score for patient updated: ${newRiskScore}`,
        placement: "topRight"
      });
    } catch (error) {
      console.error("Error running risk assessment:", error);
      notification.error({
        message: "Error",
        description: "Failed to run risk assessment. Please try again.",
        placement: "topRight"
      });
    } finally {
      setRiskLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  useEffect(() => {
    fetchAssessments();
  }, []);

  // Calculate age from date_of_birth
  const calculateAge = (dateOfBirth: string) => {
    return moment().diff(moment(dateOfBirth), 'years');
  };

  // Filter assessments by search term and date
  const filteredAssessments = assessments.filter(assessment => {
    const matchesSearch = (
      (assessment.operation?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      assessment.surgeon?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assessment.hospital?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const matchesDate = !filterDate || moment(assessment.date_of_operation).isSame(filterDate, 'day');
    
    return matchesSearch && matchesDate;
  });

  // Statistics
  const stats = {
    total: assessments.length,
    assessed: assessments.filter(a => a.risk_score !== undefined).length,
    highRisk: assessments.filter(a => a.risk_score !== undefined && a.risk_score >= 70).length,
    upcoming: assessments.filter(a => moment(a.date_of_operation).isAfter(moment())).length
  };

  // Show details modal
  const showDetails = (assessment: Assessment) => {
    setDetailView(assessment);
    setIsDetailModalVisible(true);
  };

  // Risk level badge
  const RiskBadge = ({ riskScore }: { riskScore?: number }) => {
    const { color, text } = getRiskLevel(riskScore);
    return (
      <Badge 
        count={<Tag color={color} style={{ fontWeight: 'bold' }}>
          {riskScore !== undefined ? `${riskScore} - ${text}` : text}
        </Tag>}
      />
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
    return moment(dateString).format('MMMM D, YYYY');
  };

  // Format array for display
  const formatArray = (arr: string[] | undefined) => {
    if (!arr || arr.length === 0) return "None";
    return arr.join(", ");
  };

  // FormatValue for description items
  const formatValue = (value: string | null | undefined) => {
    if (!value || value.trim() === "") return "None";
    return value;
  };

  return (
    <ConfigProvider>
      <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
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
              onClick={() => navigate('/')}
            >
              Exit Dashboard
            </Button>
          </div>
        </Header>

        <Content style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '24px' }}>
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={12}>
                <Space>
                  <DashboardOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <Title level={2} style={{ margin: 0 }}>Pre-Op Dashboard</Title>
                </Space>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                <Space wrap>
                  <DatePicker 
                    onChange={(date) => setFilterDate(date ? moment(date.toDate()) : null)}
                    placeholder="Filter by operation date"
                    allowClear
                    suffixIcon={<CalendarOutlined />}
                  />
                  <Search
                    placeholder="Search operations, surgeons..."
                    allowClear
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 250 }}
                  />
                  <Button 
                    icon={<ReloadOutlined />} 
                    onClick={fetchAssessments}
                    loading={loading}
                  >
                    Refresh
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Patients"
                  value={stats.total}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Assessed Patients"
                  value={stats.assessed}
                  prefix={<CheckCircleOutlined />}
                  suffix={`/ ${stats.total}`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="High Risk Patients"
                  value={stats.highRisk}
                  prefix={<WarningOutlined style={{ color: '#ff4d4f' }} />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Upcoming Procedures"
                  value={stats.upcoming}
                  prefix={<ScheduleOutlined style={{ color: '#52c41a' }} />}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Card>
            </Col>
          </Row>

          <Card>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
              </div>
            ) : filteredAssessments.length === 0 ? (
              <Empty description="No assessments found" />
            ) : (
              <Collapse accordion>
                {filteredAssessments.map((assessment) => {
                  const age = assessment.date_of_birth ? calculateAge(assessment.date_of_birth) : 'N/A';
                  const { color } = getRiskLevel(assessment.risk_score);
                  
                  return (
                    <Panel 
                      key={assessment.id} 
                      header={
                        <Row gutter={16} align="middle" wrap={screens.sm === false}>
                          <Col xs={24} sm={6} md={5}>
                            <Space>
                              <Avatar 
                                icon={<UserOutlined />} 
                                style={{ backgroundColor: color || '#1890ff' }} 
                              />
                              <Text strong>
                                {assessment.operation || 'Unnamed Operation'}
                              </Text>
                            </Space>
                          </Col>
                          <Col xs={24} sm={5} md={4}>
                            <Text type="secondary">
                              <ScheduleOutlined /> {formatDate(assessment.date_of_operation)}
                            </Text>
                          </Col>
                          <Col xs={12} sm={5} md={4}>
                            <Text type="secondary">
                              <MedicineBoxFilled /> {assessment.surgeon || 'No surgeon'}
                            </Text>
                          </Col>
                          <Col xs={12} sm={5} md={4}>
                            <Text type="secondary">
                              Height: {assessment.height || 'N/A'} cm
                            </Text>
                          </Col>
                          <Col xs={12} sm={3} md={3}>
                            <Text type="secondary">
                              Weight: {assessment.weight || 'N/A'} kg
                            </Text>
                          </Col>
                          <Col xs={12} sm={24} md={4} style={{ textAlign: screens.md ? 'right' : 'left' }}>
                            <RiskBadge riskScore={assessment.risk_score} />
                          </Col>
                        </Row>
                      }
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} lg={18}>
                          <Tabs defaultActiveKey="1">
                            <TabPane tab={<span><InfoCircleOutlined /> Overview</span>} key="1">
                              <Descriptions
                                bordered
                                size="small"
                                column={{ xxl: 4, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
                              >
                                <Descriptions.Item label="Gender">{assessment.gender || 'Not specified'}</Descriptions.Item>
                                <Descriptions.Item label="Age">{age}</Descriptions.Item>
                                <Descriptions.Item label="Hospital">{assessment.hospital || 'Not specified'}</Descriptions.Item>
                                <Descriptions.Item label="BMI">
                                  {assessment.height && assessment.weight 
                                    ? (assessment.weight / ((assessment.height / 100) ** 2)).toFixed(1)
                                    : 'N/A'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Operation Reason" span={2}>
                                  {formatValue(assessment.operation_reason)}
                                </Descriptions.Item>
                              </Descriptions>
                            </TabPane>
                            <TabPane tab={<span><HeartOutlined /> Medical History</span>} key="2">
                              <Descriptions
                                bordered
                                size="small"
                                column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
                              >
                                <Descriptions.Item label="Recently Unwell">{formatValue(assessment.recently_unwell)}</Descriptions.Item>
                                <Descriptions.Item label="Previous Anaesthetic">{formatValue(assessment.previous_anaesthetic)}</Descriptions.Item>
                                <Descriptions.Item label="Family Anaesthetic Reaction">{formatValue(assessment.family_anaesthetic_reaction)}</Descriptions.Item>
                                <Descriptions.Item label="Allergies">{formatValue(assessment.allergies)}</Descriptions.Item>
                                <Descriptions.Item label="Smoke/Vape">{assessment.smoke_or_vape || 'Not specified'}</Descriptions.Item>
                                <Descriptions.Item label="Alcohol Consumption">{formatValue(assessment.alcohol_consumption)}</Descriptions.Item>
                                <Descriptions.Item label="COVID History">{formatValue(assessment.covid_history)}</Descriptions.Item>
                              </Descriptions>
                            </TabPane>
                            <TabPane tab={<span><FileTextOutlined /> Medical Conditions</span>} key="3">
                              <Descriptions
                                bordered
                                size="small"
                                column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 2, xs: 1 }}
                              >
                                <Descriptions.Item label="Heart Issues">{formatValue(assessment.heart_issues)}</Descriptions.Item>
                                <Descriptions.Item label="Shortness of Breath">{formatValue(assessment.shortness_of_breath)}</Descriptions.Item>
                                <Descriptions.Item label="Lung Issues">{formatValue(assessment.lung_issues)}</Descriptions.Item>
                                <Descriptions.Item label="Diabetes">{formatValue(assessment.diabetes)}</Descriptions.Item>
                                <Descriptions.Item label="Gastrointestinal Issues">{formatValue(assessment.gastrointestinal_issues)}</Descriptions.Item>
                                <Descriptions.Item label="Thyroid Disease">{formatValue(assessment.thyroid_disease)}</Descriptions.Item>
                                <Descriptions.Item label="Neurological Condition">{formatValue(assessment.neurological_condition)}</Descriptions.Item>
                                <Descriptions.Item label="Rheumatoid Arthritis">{formatValue(assessment.rheumatoid_arthritis)}</Descriptions.Item>
                                <Descriptions.Item label="Kidney Condition">{formatValue(assessment.kidney_condition)}</Descriptions.Item>
                                <Descriptions.Item label="Blood Clotting">{formatValue(assessment.blood_clotting)}</Descriptions.Item>
                                <Descriptions.Item label="Cancer">{formatValue(assessment.cancer)}</Descriptions.Item>
                                <Descriptions.Item label="Other Conditions">{formatValue(assessment.other_medical_conditions)}</Descriptions.Item>
                              </Descriptions>
                            </TabPane>
                            <TabPane tab={<span><MedicineBoxFilled /> Medications</span>} key="4">
                              <Row gutter={[16, 16]}>
                                <Col xs={24}>
                                  <Card title="Regular Medications" size="small">
                                    <Paragraph>
                                      {formatValue(assessment.regular_medications)}
                                    </Paragraph>
                                  </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Card title="Effective Pain Relievers" size="small">
                                    <Paragraph>
                                      {formatArray(assessment.effective_pain_relievers)}
                                    </Paragraph>
                                  </Card>
                                </Col>
                                <Col xs={24} md={12}>
                                  <Card title="Pain Relievers to Avoid" size="small">
                                    <Paragraph>
                                      {formatArray(assessment.pain_relievers_to_avoid)}
                                    </Paragraph>
                                  </Card>
                                </Col>
                              </Row>
                            </TabPane>
                            <TabPane tab={<span><UnorderedListOutlined /> Dental</span>} key="5">
                              <Card title="Dental Descriptions" size="small">
                                <Paragraph>
                                  {formatArray(assessment.dental_descriptions)}
                                </Paragraph>
                              </Card>
                            </TabPane>
                          </Tabs>
                        </Col>
                        <Col xs={24} lg={6}>
                          <Space direction="vertical" style={{ width: '100%' }}>
                            <Card size="small" title="Actions">
                              <Space direction="vertical" style={{ width: '100%' }}>
                                <Button 
                                  type="primary" 
                                  block
                                  onClick={() => runRiskAssessment(assessment.id)}
                                  loading={riskLoading[assessment.id]}
                                  icon={<SyncOutlined />}
                                >
                                  Run Risk Assessment
                                </Button>
                                <Button 
                                  block
                                  onClick={() => showDetails(assessment)}
                                  icon={<InfoCircleOutlined />}
                                >
                                  View Full Details
                                </Button>
                              </Space>
                            </Card>
                            <Card 
                              size="small" 
                              title="Assessment Timeline"
                              style={{ marginTop: 16 }}
                            >
                              <Descriptions column={1} size="small">
                                <Descriptions.Item label="Created">
                                  {formatDate(assessment.date_of_operation)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Updated">
                                  {formatDate(assessment.date_of_operation)}
                                </Descriptions.Item>
                                <Descriptions.Item label="Operation">
                                  {formatDate(assessment.date_of_operation)}
                                </Descriptions.Item>
                              </Descriptions>
                            </Card>
                          </Space>
                        </Col>
                      </Row>
                    </Panel>
                  );
                })}
              </Collapse>
            )}
          </Card>
        </Content>

        {/* Detailed View Modal */}
        <Modal
          title={
            <Space>
              <UserOutlined />
              <span>Detailed Patient Assessment</span>
              {detailView && <RiskBadge riskScore={detailView.risk_score} />}
            </Space>
          }
          visible={isDetailModalVisible}
          onCancel={() => setIsDetailModalVisible(false)}
          width={1000}
          footer={[
            <Button 
              key="run-assessment" 
              type="primary"
              onClick={() => detailView && runRiskAssessment(detailView.id)}
              loading={detailView ? riskLoading[detailView.id] : false}
              icon={<SyncOutlined />}
            >
              Run Risk Assessment
            </Button>,
            <Button 
              key="close" 
              onClick={() => setIsDetailModalVisible(false)}
            >
              Close
            </Button>,
          ]}
        >
          {detailView && (
            <Tabs defaultActiveKey="1">
              <TabPane tab="Patient Details" key="1">
                <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Gender">{detailView.gender || 'Not specified'}</Descriptions.Item>
                  <Descriptions.Item label="Date of Birth">{formatDate(detailView.date_of_birth)}</Descriptions.Item>
                  <Descriptions.Item label="Age">{calculateAge(detailView.date_of_birth)}</Descriptions.Item>
                  <Descriptions.Item label="Height">{detailView.height || 'N/A'} cm</Descriptions.Item>
                  <Descriptions.Item label="Weight">{detailView.weight || 'N/A'} kg</Descriptions.Item>
                  <Descriptions.Item label="BMI">
                    {detailView.height && detailView.weight 
                      ? (detailView.weight / ((detailView.height / 100) ** 2)).toFixed(1)
                      : 'N/A'}
                  </Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              <TabPane tab="Operation Details" key="2">
                <Descriptions bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}>
                  <Descriptions.Item label="Operation">{detailView.operation || 'Not specified'}</Descriptions.Item>
                  <Descriptions.Item label="Surgeon">{detailView.surgeon || 'Not specified'}</Descriptions.Item>
                  <Descriptions.Item label="Hospital">{detailView.hospital || 'Not specified'}</Descriptions.Item>
                  <Descriptions.Item label="Operation Date">{formatDate(detailView.date_of_operation)}</Descriptions.Item>
                  <Descriptions.Item label="Reason" span={2}>{formatValue(detailView.operation_reason)}</Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              <TabPane tab="Medical History" key="3">
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                  <Descriptions.Item label="Recently Unwell">{formatValue(detailView.recently_unwell)}</Descriptions.Item>
                  <Descriptions.Item label="Previous Anaesthetic">{formatValue(detailView.previous_anaesthetic)}</Descriptions.Item>
                  <Descriptions.Item label="Family Anaesthetic Reaction">{formatValue(detailView.family_anaesthetic_reaction)}</Descriptions.Item>
                  <Descriptions.Item label="Allergies">{formatValue(detailView.allergies)}</Descriptions.Item>
                  <Descriptions.Item label="Smoke/Vape">{detailView.smoke_or_vape || 'Not specified'}</Descriptions.Item>
                  <Descriptions.Item label="Alcohol Consumption">{formatValue(detailView.alcohol_consumption)}</Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              <TabPane tab="Medical Conditions" key="4">
                <Descriptions bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
                  <Descriptions.Item label="Heart Issues">{formatValue(detailView.heart_issues)}</Descriptions.Item>
                  <Descriptions.Item label="Shortness of Breath">{formatValue(detailView.shortness_of_breath)}</Descriptions.Item>
                  <Descriptions.Item label="Lung Issues">{formatValue(detailView.lung_issues)}</Descriptions.Item>
                  <Descriptions.Item label="Diabetes">{formatValue(detailView.diabetes)}</Descriptions.Item>
                  <Descriptions.Item label="Gastrointestinal Issues">{formatValue(detailView.gastrointestinal_issues)}</Descriptions.Item>
                  <Descriptions.Item label="Thyroid Disease">{formatValue(detailView.thyroid_disease)}</Descriptions.Item>
                  <Descriptions.Item label="Neurological Condition">{formatValue(detailView.neurological_condition)}</Descriptions.Item>
                  <Descriptions.Item label="Rheumatoid Arthritis">{formatValue(detailView.rheumatoid_arthritis)}</Descriptions.Item>
                  <Descriptions.Item label="Kidney Condition">{formatValue(detailView.kidney_condition)}</Descriptions.Item>
                  <Descriptions.Item label="Blood Clotting">{formatValue(detailView.blood_clotting)}</Descriptions.Item>
                  <Descriptions.Item label="Cancer">{formatValue(detailView.cancer)}</Descriptions.Item>
                  <Descriptions.Item label="Other Conditions">{formatValue(detailView.other_medical_conditions)}</Descriptions.Item>
                  <Descriptions.Item label="COVID History">{formatValue(detailView.covid_history)}</Descriptions.Item>
                </Descriptions>
              </TabPane>
              
              <TabPane tab="Medications & Dental" key="5">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Card title="Regular Medications" size="small">
                    <Paragraph>
                      {formatValue(detailView.regular_medications)}
                    </Paragraph>
                  </Card>
                  
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Card title="Effective Pain Relievers" size="small">
                        <Paragraph>
                          {formatArray(detailView.effective_pain_relievers)}
                        </Paragraph>
                      </Card>
                    </Col>
                    <Col xs={24} md={12}>
                      <Card title="Pain Relievers to Avoid" size="small">
                        <Paragraph>
                          {formatArray(detailView.pain_relievers_to_avoid)}
                        </Paragraph>
                      </Card>
                    </Col>
                  </Row>
                  
                  <Card title="Dental Descriptions" size="small">
                    <Paragraph>
                      {formatArray(detailView.dental_descriptions)}
                    </Paragraph>
                  </Card>
                </Space>
              </TabPane>
            </Tabs>
          )}
        </Modal>
      </Layout>
    </ConfigProvider>
  );
};

export default DoctorDashboard;