import React from "react";
import { Form, Input } from "antd";
import MultiColumnCheckboxGroup from "../common/MultiColumnCheckboxGroup";
const mallampatiOptions = ["Class I", "Class II", "Class III", "Class IV", "Unable to assess"];

const airwayDifficultyOptions = [
  "Not Anticipated",
  "Possible",
  "Anticipated",
  "Known Airway Difficulty",
  "Intubated",
  "Unable to assess"
];

const dentalOptions = [
  "Teeth Intact",
  "Edentulous",
  "Poor Dentition",
  "Complete Dentures",
  "Partial Dentures",
  "Full Upper Dentures",
  "Full Lower Dentures",
  "Partial Dentures Upper",
  "Partial Dentures Lower"
];

const neckOptions = [
  "Restricted Neck Mobility",
  "No Restriction of Neck Movement",
  "Short",
  "Thick"
];

const facialHairOptions = ["Beard", "Moustache"];

// --------------------
// Component
// --------------------
const Airway: React.FC = () => {
  return (
    <>
      <MultiColumnCheckboxGroup
        label="Mallampati"
        name="airway.airwayMallampati"
        options={mallampatiOptions}
        columns={4}
      />

      <MultiColumnCheckboxGroup
        label="Airway Difficulty"
        name="airway.airwayDifficulty"
        options={airwayDifficultyOptions}
        columns={4}
      />

      <MultiColumnCheckboxGroup
        label="Dental"
        name="airway.airwayDental"
        options={dentalOptions}
        columns={3}
      />

      <MultiColumnCheckboxGroup
        label="Neck"
        name="airway.airwayNeck"
        options={neckOptions}
        columns={4}
      />

      <MultiColumnCheckboxGroup
        label="Facial Hair"
        name="airway.airwayFacialHair"
        options={facialHairOptions}
        columns={2}
      />

      <Form.Item label="Airway Exam Notes" name={["airway", "airwayExamNotes"]}>
        <Input />
      </Form.Item>
    </>
  );
};

export default Airway;