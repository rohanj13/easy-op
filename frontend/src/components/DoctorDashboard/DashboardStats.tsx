import React from "react";
import { Card, Col, Row, Statistic } from "antd";
import { UserOutlined, CheckCircleOutlined, WarningOutlined, ScheduleOutlined } from "@ant-design/icons";

interface StatsProps {
  total: number;
  assessed: number;
  highRisk: number;
  upcoming: number;
}

const DashboardStats: React.FC<StatsProps> = ({ total, assessed, highRisk, upcoming }) => {
  return (
    <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
      <Col xs={24} sm={12} lg={6}>
        <Card><Statistic title="Total Patients" value={total} prefix={<UserOutlined />} /></Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card><Statistic title="Assessed Patients" value={assessed} prefix={<CheckCircleOutlined />} suffix={`/ ${total}`} /></Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card><Statistic title="High Risk Patients" value={highRisk} prefix={<WarningOutlined style={{ color: "#ff4d4f" }} />} valueStyle={{ color: "#ff4d4f" }} /></Card>
      </Col>
      <Col xs={24} sm={12} lg={6}>
        <Card><Statistic title="Upcoming Procedures" value={upcoming} prefix={<ScheduleOutlined style={{ color: "#52c41a" }} />} valueStyle={{ color: "#52c41a" }} /></Card>
      </Col>
    </Row>
  );
};

export default DashboardStats;