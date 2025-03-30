// components/PatientDetailsSection.tsx
import React from 'react';
import { Form, Input, Radio, DatePicker, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const PatientDetailsSection: React.FC = () => {
  return (
    <Card 
      type="inner" 
      title={
        <div>
          <UserOutlined style={{ fontSize: '18px', color: '#1890ff', marginRight: '8px' }} />
          <span style={{ fontSize: '18px', fontWeight: 500 }}>Patient Details</span>
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
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>
      </div>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[{ required: true, message: "Please select gender" }]}
      >
        <Radio.Group>
          <Radio value="F">Female</Radio>
          <Radio value="M">Male</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
      }}>
        <Form.Item
          label="Date of Birth"
          name="dateOfBirth"
          rules={[{ required: true, message: "Please enter date of birth" }]}
        >
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[{ required: true, message: "Please enter phone number" }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>
      </div>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: 'email', message: "Please enter a valid email" }
        ]}
      >
        <Input placeholder="Enter email address" />
      </Form.Item>
    </Card>
  );
};

export default PatientDetailsSection;