import React from "react";
import { Modal, Tabs, Descriptions, Card, Row, Col, Typography } from "antd";
import { InfoCircleOutlined, HeartOutlined, FileTextOutlined, MedicineBoxFilled, UnorderedListOutlined, SyncOutlined } from "@ant-design/icons";
import RiskBadge from "./RiskBadge";
import moment from "moment";
import { Assessment } from "../../types/assessment";

const { TabPane } = Tabs;
const { Paragraph } = Typography;

interface AssessmentDetailsProps {
  visible: boolean;
  assessment: Assessment | null;
  onClose: () => void;
  onRunRiskAssessment: () => void;
  riskLoading: boolean;
}

const AssessmentDetails: React.FC<AssessmentDetailsProps> = ({ visible, assessment, onClose, onRunRiskAssessment, riskLoading }) => {
  if (!assessment) return null;

  const formatDate = (date: string) => moment(date).format("MMMM D, YYYY");

  return (
    <Modal
      title={
        <span>
          <InfoCircleOutlined /> Detailed Patient Assessment{" "}
          <RiskBadge riskScore={assessment.risk_score} />
        </span>
      }
      open={visible}
      onCancel={onClose}
      width={1000}
      footer={[
        <button key="run-assessment" onClick={onRunRiskAssessment} disabled={riskLoading}>
          <SyncOutlined /> Run Risk Assessment
        </button>,
        <button key="close" onClick={onClose}>Close</button>,
      ]}
    >
      <Tabs defaultActiveKey="1">
        {/* Patient Details */}
        <TabPane tab={<span><InfoCircleOutlined /> Patient Details</span>} key="1">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Gender">{assessment.gender || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Date of Birth">{formatDate(assessment.date_of_birth)}</Descriptions.Item>
            <Descriptions.Item label="Height">{assessment.height || "N/A"} cm</Descriptions.Item>
            <Descriptions.Item label="Weight">{assessment.weight || "N/A"} kg</Descriptions.Item>
          </Descriptions>
        </TabPane>

        {/* Operation Details */}
        <TabPane tab={<span><FileTextOutlined /> Operation Details</span>} key="2">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Operation">{assessment.operation || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Surgeon">{assessment.surgeon || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Hospital">{assessment.hospital || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Operation Date">{formatDate(assessment.date_of_operation)}</Descriptions.Item>
            <Descriptions.Item label="Reason" span={2}>{assessment.operation_reason || "Not specified"}</Descriptions.Item>
          </Descriptions>
        </TabPane>

        {/* Medical History */}
        <TabPane tab={<span><HeartOutlined /> Medical History</span>} key="3">
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Recently Unwell">{assessment.recently_unwell}</Descriptions.Item>
            <Descriptions.Item label="Previous Anaesthetic">{assessment.previous_anaesthetic}</Descriptions.Item>
            <Descriptions.Item label="Family Anaesthetic Reaction">{assessment.family_anaesthetic_reaction}</Descriptions.Item>
            <Descriptions.Item label="Allergies">{assessment.allergies}</Descriptions.Item>
            <Descriptions.Item label="Smoke/Vape">{assessment.smoke_or_vape || "Not specified"}</Descriptions.Item>
            <Descriptions.Item label="Alcohol Consumption">{assessment.alcohol_consumption}</Descriptions.Item>
            <Descriptions.Item label="COVID History">{assessment.covid_history}</Descriptions.Item>
          </Descriptions>
        </TabPane>

        {/* Medications */}
        <TabPane tab={<span><MedicineBoxFilled /> Medications</span>} key="4">
          <Row gutter={16}>
            <Col xs={24}>
              <Card title="Regular Medications" size="small">
                <Paragraph>{assessment.regular_medications || "None"}</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Effective Pain Relievers" size="small">
                <Paragraph>{assessment.effective_pain_relievers.join(", ") || "None"}</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="Pain Relievers to Avoid" size="small">
                <Paragraph>{assessment.pain_relievers_to_avoid.join(", ") || "None"}</Paragraph>
              </Card>
            </Col>
          </Row>
        </TabPane>

        {/* Dental */}
        <TabPane tab={<span><UnorderedListOutlined /> Dental</span>} key="5">
          <Card title="Dental Descriptions" size="small">
            <Paragraph>{assessment.dental_description.join(", ") || "None"}</Paragraph>
          </Card>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default AssessmentDetails;