import React, { useEffect, useState } from "react";
import { 
  Layout, 
  Table, 
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
  Input
} from "antd";
import { 
  MedicineBoxOutlined, 
  UserOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  DashboardOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { api } from "../services/api/api";
import { Assessment } from "../types/assessment";
import { getRiskLevel } from "../utils/riskLevelUtils";

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;

const DoctorDashboard: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(false);
  const [riskLoading, setRiskLoading] = useState<{ [key: number]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

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

  const filteredAssessments = assessments.filter(assessment =>
    assessment.patient_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
      render: (text: string) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "Weight (kg)",
      dataIndex: "weight",
      key: "weight",
      width: 100,
    },
    {
      title: "Height (m)",
      dataIndex: "height",
      key: "height",
      width: 100,
    },
    {
      title: "Medical History",
      dataIndex: "medical_history",
      key: "medical_history",
      ellipsis: true,
    },
    {
      title: "Risk Score",
      dataIndex: "risk_score",
      key: "risk_score",
      width: 150,
      render: (risk_score: number | undefined) => {
        const { color, text } = getRiskLevel(risk_score);
        return (
          <Tag color={color} style={{ width: '100px', textAlign: 'center' }}>
            {risk_score !== undefined ? `${risk_score} - ${text}` : text}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 180,
      render: (_: unknown, record: Assessment) => (
        <Button
          type="primary"
          onClick={() => runRiskAssessment(record.id)}
          loading={riskLoading[record.id]}
          icon={<SyncOutlined />}
        >
          Run Assessment
        </Button>
      ),
    },
  ];

  const stats = {
    total: assessments.length,
    assessed: assessments.filter(a => a.risk_score !== undefined).length,
    highRisk: assessments.filter(a => a.risk_score !== undefined && a.risk_score >= 70).length,
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
                  <Title level={2} style={{ margin: 0 }}>Dashboard</Title>
                </Space>
              </Col>
              <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                <Space>
                  <Button 
                    icon={<ReloadOutlined />} 
                    onClick={fetchAssessments}
                    loading={loading}
                  >
                    Refresh
                  </Button>
                  <Search
                    placeholder="Search patients..."
                    allowClear
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 250 }}
                  />
                </Space>
              </Col>
            </Row>
          </div>

          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Total Patients"
                  value={stats.total}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="Assessed Patients"
                  value={stats.assessed}
                  prefix={<CheckCircleOutlined />}
                  suffix={`/ ${stats.total}`}
                />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic
                  title="High Risk Patients"
                  value={stats.highRisk}
                  prefix={<WarningOutlined style={{ color: '#ff4d4f' }} />}
                  valueStyle={{ color: '#ff4d4f' }}
                />
              </Card>
            </Col>
          </Row>

          <Card>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>
                <Spin size="large" />
              </div>
            ) : (
              <Table 
                dataSource={filteredAssessments} 
                columns={columns} 
                rowKey="id"
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: true,
                  showTotal: (total) => `Total ${total} patients`
                }}
              />
            )}
          </Card>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default DoctorDashboard;