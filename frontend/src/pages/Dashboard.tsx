import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Api } from "../types/types";
import { Table, Button, Input, Space, Typography, Card, Tag, Layout, Row, Col } from "antd";
import { SearchOutlined, FileAddOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Sidebar from "../components/sidebar";

const { Title } = Typography;
const { Content } = Layout;

interface FormWithPatient extends Form {
  patientDetails?: {
    name: string;
    sex: string;
    dob: string;
  };
}

export default function Dashboard() {
  const [forms, setForms] = useState<FormWithPatient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const api = new Api();

  useEffect(() => {
    const fetchFormsWithPatients = async () => {
      try {
        const res = await api.forms.formsList();
        if (Array.isArray(res.data)) {
          const formsWithPatients = await Promise.all(
            res.data.map(async (form) => {
              try {
                const patientRes = await api.patients.patientsRead(form.patient);
                return {
                  ...form,
                  patientDetails: {
                    name: `${patientRes.data.first_name} ${patientRes.data.last_name}`,
                    sex: patientRes.data.sex,
                    dob: patientRes.data.dob,
                  },
                };
              } catch (err) {
                console.error(`Failed to fetch patient ${form.patient}`, err);
                return form;
              }
            })
          );
          setForms(formsWithPatients);
        }
      } catch (err) {
        console.error("Failed to fetch forms", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFormsWithPatients();
  }, []);

  const columns: ColumnsType<FormWithPatient> = [
    {
      title: "Form ID",
      key: "id",
      render: (_, record) => (
        <span className="font-medium">{record.id?.slice(0, 8)}...</span>
      ),
    },
    {
      title: "Patient Name",
      key: "patientName",
      render: (_, record) => (
        <span>{record.patientDetails?.name || 'N/A'}</span>
      ),
      sorter: (a, b) => (a.patientDetails?.name || '').localeCompare(b.patientDetails?.name || ''),
    },
    {
      title: "Sex",
      key: "sex",
      render: (_, record) => (
        <Tag color={record.patientDetails?.sex === 'M' ? 'blue' : 'pink'}>
          {record.patientDetails?.sex || 'N/A'}
        </Tag>
      ),
    },
    {
      title: "Date of Birth",
      key: "dob",
      render: (_, record) => (
        <span>{record.patientDetails?.dob || 'N/A'}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Tag 
          color={
            record.status === 'green' 
              ? 'success' 
              : record.status === 'yellow' 
                ? 'warning' 
                : 'error'
          }
        >
          {record.status?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/forms/${record.id}`}>
            <Button type="primary" size="small">
              View Details
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const filteredForms = forms.filter(
    (form) =>
      form.id?.toLowerCase().includes(searchText.toLowerCase()) ||
      form.patientDetails?.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar currentScreen="dashboard"/>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Card>
            <Row align="middle" justify="space-between" style={{ width: '100%' }}>
              <Col>
                <Title level={2} style={{ margin: 0 }}>PreOpAI Dashboard</Title>
              </Col>
              <Col>
                <Button
                  type="primary"
                  icon={<FileAddOutlined />}
                  size="large"
                >
                  Create New Form
                </Button>
              </Col>
            </Row>
            <br />
            <Row style={{ width: '100%' }}>
              <Col span={12}> 
                <Input
                  placeholder="Search forms by ID or patient..."
                  prefix={<SearchOutlined />}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
            </Row>
            <br />
            <Table
              columns={columns}
              dataSource={filteredForms}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} forms`,
              }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}