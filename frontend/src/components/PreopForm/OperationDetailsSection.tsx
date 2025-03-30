// components/OperationDetailsSection.tsx
import React from 'react';
import { Form, Input, DatePicker, Card, Select } from 'antd';
import { MedicineBoxTwoTone } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;

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
          rules={[{ required: true, message: "Please select operation type" }]}
        >
          <Select placeholder="Select operation type">
            <Option value="anorectal surgery">Anorectal Surgery</Option>
            <Option value="aortic">Aortic</Option>
            <Option value="bariatric">Bariatric</Option>
            <Option value="brain">Brain</Option>
            <Option value="breast">Breast</Option>
            <Option value="cardiac">Cardiac</Option>
            <Option value="ent">ENT</Option>
            <Option value="foregut/hepato-pancreatobiliary">Foregut/Hepato-Pancreatobiliary</Option>
            <Option value="gallbladder/appendix/adrenal/spleen">Gallbladder/Appendix/Adrenal/Spleen</Option>
            <Option value="intestinal">Intestinal</Option>
            <Option value="neck">Neck</Option>
            <Option value="obstetric/gynecologic">Obstetric/Gynecologic</Option>
            <Option value="orthopedic">Orthopedic</Option>
            <Option value="other abdomen">Other Abdomen</Option>
            <Option value="peripheral vascular">Peripheral Vascular</Option>
            <Option value="skin">Skin</Option>
            <Option value="spine">Spine</Option>
            <Option value="thoracic">Thoracic</Option>
            <Option value="urology">Urology</Option>
            <Option value="vein">Vein</Option>
          </Select>
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