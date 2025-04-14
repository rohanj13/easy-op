import React from "react";
import { Form, Input, InputNumber, Select, Checkbox } from "antd";

const VitalSigns: React.FC = () => {
  return (
    <>
      <Form.Item label="Gender" name={["vitalSigns", "gender"]}>
        <Select>
          <Select.Option value="male">Male</Select.Option>
          <Select.Option value="female">Female</Select.Option>
          <Select.Option value="unknown">Unknown</Select.Option>
          <Select.Option value="indeterminate">Indeterminate</Select.Option>
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

      <Form.Item label="Cardiac Exam" name={["vitalSigns", "cardiacExam"]}>
        <Checkbox.Group>
          <Checkbox value="regularRateRhythm">Regular Rate and Rhythm</Checkbox>
          <Checkbox value="heartSoundsDual">Heart sounds dual</Checkbox>
          <Checkbox value="noMurmurs">No murmurs</Checkbox>
          <Checkbox value="cardiacExamAbnormality">Cardiac exam abnormality</Checkbox>
          <Checkbox value="noCarotidBruits">No carotid bruits</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Lung Exam" name={["vitalSigns", "lungExam"]}>
        <Checkbox.Group>
          <Checkbox value="auscultationBilaterally">Clear to auscultation bilaterally</Checkbox>
          <Checkbox value="lungAbnormality">Lung exam abnormality</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item label="Other Exam Findings" name={["vitalSigns", "otherFindings"]}>
        <Checkbox.Group>
          <Checkbox value="anxiousAnaesthesia">Anxious re anaesthesia</Checkbox>
          <Checkbox value="noLeftArmForIV">Do not use left arm for IV access</Checkbox>
          <Checkbox value="appearsFrail">Appears Frail</Checkbox>
          <Checkbox value="noRightArmForIV">Do not use right arm for IV access</Checkbox>
          <Checkbox value="poorIVAccess">Poor IV Access</Checkbox>
          <Checkbox value="sedated">Sedated</Checkbox>
          <Checkbox value="otherExamFindings">Other Exam Findings</Checkbox>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

export default VitalSigns;