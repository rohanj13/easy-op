import React from "react";
import { Form, Input, InputNumber, Select} from "antd";
import MultiColumnCheckboxGroup from "../common/MultiColumnCheckboxGroup";

const genderOptions = ["Male", "Female", "Unknown", "Indeterminate"];
const cardiacExamOptions = ["Regular Rate and Rhythm", "Heart sounds dual", "No murmurs", "Cardiac exam abnormality", "No carotid bruits"];
const lungExamOptions = ["Clear to auscultation bilaterally", "Lung exam abnormality"];
const otherExamFindingsOptions = ["Anxious re anaesthesia", "Do not use left arm for IV access", "Appears Frail", "Do not use right arm for IV access", "Poor IV Access", "Sedated", "Other Exam Findings"];

const VitalSigns: React.FC = () => {
  return (
    <>
      <Form.Item label="Gender" name={["vitalSigns", "gender"]}>
        <Select>
          {genderOptions.map((option) => (
            <Select.Option key={option.toLowerCase()} value={option.toLowerCase()}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Weight (kg)" name={["vitalSigns", "weight"]}>
        <InputNumber min={0} precision={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Height (cm)" name={["vitalSigns", "height"]}>
        <InputNumber min={0} precision={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="BMI" name={["vitalSigns", "bmi"]}>
        <Input disabled /> {/* Usually auto-calculated */}
      </Form.Item>

      <Form.Item label="Blood Pressure" name={["vitalSigns", "bloodPressure"]}>
        <Input placeholder="e.g. 120/80" />
      </Form.Item>

      <Form.Item label="Heart Rate (bpm)" name={["vitalSigns", "heartRate"]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Respiratory Rate" name={["vitalSigns", "respiratoryRate"]}>
        <InputNumber min={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="O2 Saturation (%)" name={["vitalSigns", "oxygenSaturation"]}>
        <InputNumber min={0} max={100} precision={0} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Temperature (°C)" name={["vitalSigns", "temperature"]}>
        <InputNumber min={30} max={45} precision={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Position" name={["vitalSigns", "position"]}>
        <Select>
          {/* Populate with options like Sitting, Lying, etc. if defined */}
        </Select>
      </Form.Item>

      <MultiColumnCheckboxGroup
        label="Cardiac Exam"
        name="cardiacExam"
        options={cardiacExamOptions}
        columns={3}
        includeOther={true}
        otherLabel="Other Exam Findings"
        />

      <MultiColumnCheckboxGroup
        label="Lung Exam"
        name="lungExam"
        options={lungExamOptions}
        columns={2}
        includeOther={true}
        otherLabel="Other Exam Findings"
        />
      <MultiColumnCheckboxGroup
        label="Other Exam Findings"
        name="otherExamFindings"
        options={otherExamFindingsOptions}
        columns={3}
        includeOther={true}
        otherLabel="Other Exam Findings"
        />
    </>
  );
};

export default VitalSigns;