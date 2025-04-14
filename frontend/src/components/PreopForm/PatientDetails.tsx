/* eslint-disable @typescript-eslint/no-unused-vars */
// components/Section1.tsx
import React from "react";
import { Form, Input, DatePicker, TimePicker, Select } from "antd";

// const { Option } = Select;

const PatientDetails: React.FC = () => {
  return (
    <>
      <Form.Item label="Name" name="name">
        <Input />
      </Form.Item>

      <Form.Item label="Middle Name" name="middleName">
        <Input />
      </Form.Item>

      <Form.Item label="Surname" name="surname">
        <Input />
      </Form.Item>

      <Form.Item label="DOB" name="dob">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Date of Surgery" name="dateOfSurgery">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Surgery Time" name="surgeryTime">
        <TimePicker />
      </Form.Item>

      <Form.Item label="Home Phone" name="homePhone">
        <Input />
      </Form.Item>

      <Form.Item label="Cell Phone" name="cellPhone">
        <Input />
      </Form.Item>

      <Form.Item label="Work Phone" name="workPhone">
        <Input />
      </Form.Item>

      <Form.Item label="Email" name="email">
        <Input />
      </Form.Item>

      <Form.Item label="Assessment Date" name="assessmentDate">
        <DatePicker />
      </Form.Item>

      <Form.Item label="Assessment Time" name="assessmentTime">
        <TimePicker />
      </Form.Item>

      <Form.Item label="Planned Procedure" name="plannedProcedure">
        <Select>
          {/* Add options from your procedure dictionary */}
        </Select>
      </Form.Item>
    </>
  );
};

export default PatientDetails;