// ========================
// File: src/components/PreopForm/DynamicForm.tsx
// ========================
import React from "react";
import { Form, Input, InputNumber, Select, Radio, Collapse } from "antd";
import { CSVField } from "../../utils/csvUtils";
import { Rule } from "antd/es/form";

const { Panel } = Collapse;

// Define dictionaries to use in select/radio fields
const lookUpDictionaries: Record<string, string[]> = {
  genderDict: ["Male", "Female", "Other"],
  yesNoDict: ["Yes", "No"],
};

interface Props {
  fields: CSVField[];
}

const getValidationRules = (validationString?: string): Rule[] => {
  const rules: Rule[] = [];

  if (!validationString) return rules;

  for (const rule of validationString.split("|")) {
    if (rule === "required") {
      rules.push({ required: true, message: "This field is required." });
    } else if (rule.startsWith("min:")) {
      rules.push({ type: "number", min: parseFloat(rule.split(":")[1]) });
    } else if (rule.startsWith("max:")) {
      rules.push({ type: "number", max: parseFloat(rule.split(":")[1]) });
    }
  }

  return rules;
};

const renderField = (field: CSVField) => {
  const options = lookUpDictionaries[field["Look Up Dictionary"] ?? ""] || [];
  switch (field.Type.toLowerCase()) {
    case "text": return <Input />;
    case "number": return <InputNumber style={{ width: "100%" }} />;
    case "select":
      return <Select>{options.map(opt => <Select.Option key={opt} value={opt}>{opt}</Select.Option>)}</Select>;
    case "radio":
      return <Radio.Group>{options.map(opt => <Radio key={opt} value={opt}>{opt}</Radio>)}</Radio.Group>;
    default: return <Input />;
  }
};

const DynamicForm: React.FC<Props> = ({ fields }) => {
  const subTabs = Array.from(new Set(fields.map(f => f["Sub-Tab"])));

  return (
    <Collapse accordion>
      {subTabs.map(sub => {
        const subFields = fields.filter(f => f["Sub-Tab"] === sub);
        return (
          <Panel header={sub} key={sub}>
            {subFields.map(field => (
              <Form.Item
                key={field["Question ID"]}
                label={field.Question}
                name={field["Question ID"]}
                rules={getValidationRules(field.Validation)}
              >
                {renderField(field)}
              </Form.Item>
            ))}
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default DynamicForm;