import React, { useState } from "react";
import { Checkbox, Col, Form, Input, Row } from "antd";

const options = [
  "No Previous Anaesthesia", "No Anaesthesia Complications", "History of Post-op Nausea/Vomiting",
  "History of Motion Sickness", "Slow Emergence", "Difficult Intubation", "Awareness Under General Anaesthesia",
  "Corneal Abrasion", "Dental Trauma", "Pseudocholinesterase Deficiency", "Malignant Hyperthermia", "Other"
];

const chunkArray = (arr: string[], chunkCount: number) => {
  const result: string[][] = Array.from({ length: chunkCount }, () => []);
  arr.forEach((item, index) => {
    result[index % chunkCount].push(item);
  });
  return result;
};

const AnaesthesiaHistory: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const columns = chunkArray(options, 3);

  return (
    <>
      <Form.Item label="Anaesthesia History" name="anaesthesiaHistory">
        <Checkbox.Group
          value={selectedOptions}
          onChange={(checkedValues) => setSelectedOptions(checkedValues as string[])}
        >
          <Row>
            {columns.map((col, colIndex) => (
              <Col span={8} key={colIndex}>
                {col.map((option) => (
                  <div key={option} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <Checkbox value={option} />
                    <span style={{ marginLeft: 8 }}>{option}</span>
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      {selectedOptions.includes("Other") && (
        <Form.Item
          label="Please specify"
          name="anaesthesiaHistoryOther"
          rules={[{ required: true, message: "Please provide details for 'Other'" }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item label="Anaesthesia Notes" name="anaesthesiaNotes">
        <Input />
      </Form.Item>
    </>
  );
};

export default AnaesthesiaHistory;
