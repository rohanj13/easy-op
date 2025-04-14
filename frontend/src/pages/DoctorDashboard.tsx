/* eslint-disable @typescript-eslint/no-unused-vars */
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
  CalendarOutlined,
  ArrowRightOutlined
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

  const runRiskAssessment = async (id: number, event: React.MouseEvent) => {
    // Prevent collapse panel from toggling when clicking the button
    event.stopPropagation();
    
    setRiskLoading((prev) => ({ ...prev, [id]: true }));
    try {
      const response = await api.get(`/risk-assessments/${id}/`);
      const newRiskScore = response.data.risk_score;
      setAssessments((prev) =>
        prev.map((assessment) =>
          assessment.id === id ? { ...assessment, risk_score: newRiskScore } : assessment
        )
      );
      
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

  // Navigate to detail view page
  const navigateToDetailView = (id: number, event: React.MouseEvent) => {
    // Prevent collapse panel from toggling when clicking the button
    event.stopPropagation();
    navigate(`/assessment/${id}`);
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
                      extra={
                        <Space style={{ marginRight: screens.xs ? 0 : 16 }}>
                          <Button
                            type="primary"
                            icon={<ArrowRightOutlined />}
                            onClick={(e) => navigateToDetailView(assessment.id, e)}
                          >
                            View Details
                          </Button>
                        </Space>
                      }
                    >
                      
                    </Panel>
                  );
                })}
              </Collapse>
            )}
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DoctorDashboard;