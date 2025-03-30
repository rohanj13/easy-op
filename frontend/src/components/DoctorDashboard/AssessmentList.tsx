import React from "react";
import { Collapse, Row, Col, Space, Typography, Avatar } from "antd";
import { UserOutlined, ScheduleOutlined, MedicineBoxFilled } from "@ant-design/icons";
import moment from "moment";
import RiskBadge from "./RiskBadge";
import { Assessment } from "../../types/assessment";

interface AssessmentListProps {
  assessments: Assessment[];
  onSelect: (assessment: Assessment) => void;
}
const {Text} = Typography;

const AssessmentList: React.FC<AssessmentListProps> = ({ assessments, onSelect }) => {
  return (
    <Collapse accordion>
      {assessments.map((assessment) => (
        <Collapse.Panel 
          key={assessment.id} 
          header={
            <Row gutter={16} align="middle">
              <Col xs={24} sm={6}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <Text strong>{assessment.operation || "Unnamed Operation"}</Text>
                </Space>
              </Col>
              <Col xs={24} sm={5}><ScheduleOutlined /> {moment(assessment.date_of_operation).format("MMMM D, YYYY")}</Col>
              <Col xs={24} sm={5}><MedicineBoxFilled /> {assessment.surgeon || "No surgeon"}</Col>
              <Col xs={24} sm={4}>Height: {assessment.height || "N/A"} cm</Col>
              <Col xs={24} sm={4}><RiskBadge riskScore={assessment.risk_score} /></Col>
            </Row>
          }
        >
          <button onClick={() => onSelect(assessment)}>View Details</button>
        </Collapse.Panel>
      ))}
    </Collapse>
  );
};

export default AssessmentList;