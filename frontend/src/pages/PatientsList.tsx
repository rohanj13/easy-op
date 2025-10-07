/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Patient, Api } from "../types/types";
import { Table, Button, Input, Space, Typography, Card, Tag, Layout, Col, Row } from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import Sidebar from "../components/sidebar";

const { Title } = Typography;
const { Content } = Layout;

export default function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const api = new Api();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.patients.patientsList();
        if (Array.isArray(res.data)) {
          setPatients(res.data as Patient[]);
        } else if ("results" in res.data) {
          setPatients(res.data as Patient[]);
        }
      } catch (err) {
        console.error("Failed to fetch patients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const columns: ColumnsType<Patient> = [
    // {
    //   title: "Patient ID",
    //   //dataIndex: "id",
    //   key: "id",
    //   render: (_, record) => (
    //     <Space direction="vertical" size={0}>
    //       <span className="font-medium">{`${record.id}`}</span>
    //     </Space>
    //   ),
    // },
    {
      title: "Name",
      key: "name",
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <span className="font-medium">{`${record.first_name} ${record.last_name}`}</span>
        </Space>
      ),
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
    },
    {
      title: "Sex",
      key: "sex",
      render: (_, record) => (
        <Space>
          <Tag color={record.sex === 'M' ? 'blue' : record.sex === 'F' ? 'pink' : 'purple'}>
            {record.sex}
          </Tag>
        </Space>
      ),
    },
    {
      title: "Date of Birth",
      key: "dob",
      render: (_, record) => (
        <Space>
            <span>{record.dob}</span>
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/patients/${record.id}`}>
            <Button type="primary" size="small">
              View Details
            </Button>
          </Link>
          <Link to={`/patients/${record.id}`}>
            <Button type="primary" size="small">
              New Pre-Op Form
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.first_name.toLowerCase().includes(searchText.toLowerCase()) ||
      patient.last_name.toLowerCase().includes(searchText.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchText.toLowerCase())
  );

    return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar currentScreen="patients"/>
      <Layout>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
          <Card>
            <Row align="middle" justify="space-between" style={{ width: '100%' }}>
                <Col>
                    <Title level={2} style={{ margin: 0 }}>PreOp Evaluation Dashboard</Title>
                </Col>
                <Col>
                    <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    size="large"
                    onClick={() => (window.location.href = '/patients/new')}
                    >
                    Create New Patient
                    </Button>
                </Col>
            </Row>
            {/* Search input below full width */}
            <br></br>
            <Row style={{ width: '100%' }}>
                <Col span={12}> 
                <Input
                    placeholder="Search patients by name or ID..."
                    prefix={<SearchOutlined />}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                />
                </Col>
            </Row>
            <br></br>
            <Table
              columns={columns}
              dataSource={filteredPatients}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} patients`,
              }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}