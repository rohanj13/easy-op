import React, { useState } from "react";
import { Checkbox, Col, Form, Input, Row, Typography } from "antd";

const { Title } = Typography;

type Props = {
  label: string;
  name: string;
  options: string[];
  columns?: number;
  includeOther?: boolean;
  otherLabel?: string;
  required?: boolean;
};

const MultiColumnCheckboxGroup: React.FC<Props> = ({
  label,
  name,
  options,
  columns = 2,
  includeOther = false,
  otherLabel = "Please specify",
  required = false,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Determine actual column count based on options length
  const actualColumns = Math.min(options.length, columns);
  
  // Calculate column span based on actual columns
  const colSpan = actualColumns > 0 ? 30 / actualColumns : 30;

  // More efficient chunking function
  const chunkArray = (arr: string[], chunkCount: number) => {
    // Use 1 column if there are very few options
    if (arr.length <= 3) {
      return [arr];
    }
    
    // Calculate items per column (ceiling division to ensure all items are included)
    const itemsPerColumn = Math.ceil(arr.length / chunkCount);
    
    // Create columns with proper distribution
    const result: string[][] = [];
    for (let i = 0; i < chunkCount; i++) {
      const startIndex = i * itemsPerColumn;
      const endIndex = Math.min(startIndex + itemsPerColumn, arr.length);
      if (startIndex < arr.length) {
        result.push(arr.slice(startIndex, endIndex));
      }
    }
    
    return result;
  };

  const groupedOptions = chunkArray(options, actualColumns);

  return (
    <>
      {/* Custom question heading */}
      <div className="question-heading" style={{ marginBottom: 16 }}>
        <Title level={5} style={{ 
          marginBottom: 8, 
          fontWeight: 500, 
          fontSize: '16px', 
          lineHeight: 1.4 
        }}>
          {label}{required && <span style={{ color: '#ff4d4f', marginLeft: 4 }}>*</span>}
        </Title>
        
        <Form.Item 
          name={name}
          noStyle
          rules={required ? [{ required: true, message: `Please select at least one option for "${label}"` }] : []}
        >
          <Checkbox.Group
            value={selectedOptions}
            onChange={(values) => setSelectedOptions(values as string[])}
          >
            <Row gutter={16}>
              {groupedOptions.map((group, i) => (
                <Col span={colSpan} key={i}>
                  {group.map((opt) => (
                    <div 
                      key={opt} 
                      style={{ 
                        marginBottom: 12,
                        display: "flex",
                        alignItems: "flex-start"
                      }}
                    >
                      <Checkbox value={opt} style={{ marginTop: 2 }} />
                      <span style={{ 
                        marginLeft: 8, 
                        lineHeight: "1.5",
                        paddingTop: 1,
                        display: "inline-block"
                      }}>
                        {opt}
                      </span>
                    </div>
                  ))}
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
      </div>
      
      {includeOther && selectedOptions.includes("Other") && (
        <Form.Item
          label={otherLabel}
          name={`${name}Other`}
          rules={[{ required: true, message: `Please provide details for '${label}'` }]}
          style={{ marginTop: 8 }}
        >
          <Input />
        </Form.Item>
      )}
    </>
  );
};

export default MultiColumnCheckboxGroup;