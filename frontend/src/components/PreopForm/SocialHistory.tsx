import React from "react";
import { Checkbox, Form, Input } from "antd";

const optionsTobacco = ["Yes", "Former Smoker", "Non Smoker"];
const optionsAlcohol = ["Yes", "Heavy Drinker", "Doesn't Drink"];
const optionsDrug = ["Marijuana", "Amphetamines", "Opioids", "IVDU", "No Illicit Drug Use", "Other"];
const optionsFamilyHistory = ["Negative Family History", "Family history of Anaesthesia complications"]

const SocialHistory: React.FC = () => {
  return (
    <>
      <Form.Item label="Tobacco" name={["socialHistory", "tobaccoHistory"]}>
        <Checkbox.Group options={optionsTobacco} />
      </Form.Item>

      <Form.Item label="Alcohol" name={["socialHistory", "alcoholHistory"]}>
        <Checkbox.Group options={optionsAlcohol} />
      </Form.Item>
      
      <Form.Item label="Drug Use" name={["socialHistory", "drugHistory"]}>
        <Checkbox.Group options={optionsDrug} />
      </Form.Item>

      <Form.Item label="Family History" name={["socialHistory", "familyHistory"]}>
        <Checkbox.Group options={optionsFamilyHistory} />
      </Form.Item>

      <Form.Item label="Other Notes" name="socialHistoryNotes">
        <Input />
      </Form.Item>
    </>
  );
};

export default SocialHistory;