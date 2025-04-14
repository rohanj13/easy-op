// components/Section3.tsx
import React from "react";
import { Form, Select } from "antd";

const { Option } = Select;
// const { TextArea } = Input;

const Allergies: React.FC = () => {
  const [form] = Form.useForm();

  return (
    <Form form={form} layout="vertical">
      <Form.Item label="Allergies Present?" name={["allergies", "allergiesPresent"]}>
        <Select placeholder="Select">
          <Option value="Yes">Yes</Option>
          <Option value="NoAllergies">No Known Allergies</Option>
          <Option value="NKDA">NKDA</Option>
        </Select>
      </Form.Item>

      {/* Conditional Rendering Block */}
      <Form.Item shouldUpdate={(prev, curr) =>
        prev.allergies?.allergiesPresent !== curr.allergies?.allergiesPresent
      }>
        {({ getFieldValue }) => {
          const allergiesPresent = getFieldValue(["allergies", "allergiesPresent"]);
          return allergiesPresent === "Yes" ? (
            <>
              <Form.Item label="Allergen(s)" name={["allergies", "allergens"]}>
                <Select mode="multiple" placeholder="Select allergen(s)">
                    <Option value="Penicillin">Penicillin</Option>
                    <Option value="Sulfa drugs">Sulfa drugs</Option>
                    <Option value="Latex">Latex</Option>
                    <Option value="Peanuts">Peanuts</Option>
                    <Option value="Shellfish">Shellfish</Option>
                    <Option value="Bee venom">Bee venom</Option>
                    <Option value="NSAIDs">NSAIDs</Option>
                    <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Reaction" name={["allergies", "reaction"]}>
                <Select mode="multiple" placeholder="Select reaction(s)">
                  <Option value="Rash">Rash</Option>
                  <Option value="Anaphylaxis">Anaphylaxis</Option>
                  <Option value="GI upset">GI upset</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Severity"
                name={["allergies", "requiresAdmission"]}
              >
                <Select placeholder="Select">
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Allergen(s) - Intolerance/Adverse Reaction" name={["allergies", "allergens"]}>
                <Select mode="multiple" placeholder="Select allergen(s)">
                    <Option value="Penicillin">Penicillin</Option>
                    <Option value="Sulfa drugs">Sulfa drugs</Option>
                    <Option value="Latex">Latex</Option>
                    <Option value="Peanuts">Peanuts</Option>
                    <Option value="Shellfish">Shellfish</Option>
                    <Option value="Bee venom">Bee venom</Option>
                    <Option value="NSAIDs">NSAIDs</Option>
                    <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item label="Reaction" name={["allergies", "reaction"]}>
                <Select mode="multiple" placeholder="Select reaction(s)">
                  <Option value="Rash">Rash</Option>
                  <Option value="Anaphylaxis">Anaphylaxis</Option>
                  <Option value="GI upset">GI upset</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Severity"
                name={["allergies", "requiresAdmission"]}
              >
                <Select placeholder="Select">
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </Form.Item>
            </>
          ) : null;
        }}
      </Form.Item>
    </Form>
  );
};

export default Allergies;