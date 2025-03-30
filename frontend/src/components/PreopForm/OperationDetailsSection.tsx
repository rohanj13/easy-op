// components/OperationDetailsSection.tsx
import React from 'react';
import { Form, Input, DatePicker, Card } from 'antd';
import { MedicineBoxTwoTone } from '@ant-design/icons';

const { TextArea } = Input;

const OperationDetailsSection: React.FC = () => {
  return (
    <Card 
      type="inner" 
      title={
        <div>
          <MedicineBoxTwoTone style={{ fontSize: '18px', marginRight: '8px' }} />
          <span style={{ fontSize: '18px', fontWeight: 500 }}>Operation Details</span>
        </div>
      }
      style={{ marginBottom: '24px' }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
      }}>
        <Form.Item
          label="Surgeon"
          name="surgeon"
          rules={[{ required: true, message: "Please enter surgeon name" }]}
        >
          <Input placeholder="Enter surgeon name" />
        </Form.Item>

        <Form.Item
          label="Hospital"
          name="hospital"
          rules={[{ required: true, message: "Please enter hospital" }]}
        >
          <Input placeholder="Enter hospital name" />
        </Form.Item>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
      }}>
        <Form.Item
          label="Operation"
          name="operation"
          rules={[{ required: true, message: "Please enter operation" }]}
        >
          <Input placeholder="Enter operation type" />
        </Form.Item>

        <Form.Item
          label="Date of Operation"
          name="dateOfOperation"
          rules={[{ required: true, message: "Please enter operation date" }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
      </div>

      <Form.Item
        label="Why are you having this operation (what symptoms or diagnosis made you decide to undergo this procedure)?"
        name="operationReason"
        rules={[{ required: true, message: "Please provide reason for operation" }]}
      >
        <TextArea rows={3} placeholder="Describe symptoms or diagnosis" />
      </Form.Item>
    </Card>
  );
};

export default OperationDetailsSection;