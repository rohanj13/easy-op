// components/MedicalConditionsSection.tsx
import React from 'react';
import { Form, Radio, Card, Typography} from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

// type MedicalConditionsSectionProps = {
//   form: FormInstance;
// };

const MedicalConditionsSection: React.FC = () => {
  return (
    <Card 
      type="inner" 
      title={
        <div>
          <HeartOutlined style={{ fontSize: '18px', color: '#ff4d4f', marginRight: '8px' }} />
          <span style={{ fontSize: '18px', fontWeight: 500 }}>Medical Conditions</span>
        </div>
      }
      style={{ marginBottom: '24px' }}
    >
      <Paragraph style={{ marginBottom: '16px' }}>
        Do you have, or have you ever had, any of the following?
      </Paragraph>

      <Form.Item
        label="Any trouble with your heart or cardiovascular system, or have you ever been to a Cardiologist?"
        name="heartIssues"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="This could include hypertension / high blood pressure, chest pains, angina, heart attacks, coronary artery stents, coronary artery bypass surgery, heart rhythm problems, having a pacemaker, defibrillator, strokes or mini strokes"
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Shortness of breath climbing less than 2 flights of stairs or whilst walking for 30 minutes on flat ground?"
        name="shortnessOfBreath"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Any trouble with your lungs or respiratory system, or have you ever seen a Respiratory/Sleep Specialist?"
        name="lungIssues"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="This could include asthma, obstructive sleep apnoea (OSA) with or without CPAP mask use, cystic fibrosis, pneumonia within the last 3 months, smoking-related problems or any other lung / breathing / respiratory conditions"
      >
        <Radio.Group>
          <Radio value="Yes - Asthma">Yes – Asthma</Radio>
          <Radio value="Yes - Obstructive Sleep Apnoea">Yes – Obstructive Sleep Apnoea (OSA)</Radio>
          <Radio value="Yes - Other lung problems">Yes – Other lung problems</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Diabetes?"
        name="diabetes"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Gastro-oesophageal reflux disease (GORD), gastritis, oesophagitis, stomach or duodenal ulcers, hiatus hernia, or have you had gastric surgery?"
        name="gastrointestinalIssues"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="If you are unsure of which option to choose, please select 'Yes'. Gastric surgery is also commonly referred to as gastric band surgery, gastric bypass surgery, gastric sleeve surgery, Lap band surgery or weight loss surgery. It is VERY important to mention if you have undergone this surgery."
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Thyroid disease?"
        name="thyroidDisease"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
          <Radio value="Other">Other</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Neurological Condition?"
        name="neurologicalCondition"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="This could include a stroke, mini-stroke, TIA, multiple sclerosis, Parkinson's disease or epilepsy"
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Rheumatoid arthritis, connective tissue disease or any other musculoskeletal issues?"
        name="rheumatoidArthritis"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Kidney condition?"
        name="kidneyCondition"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Blood clots or excessive bleeding?"
        name="bloodClotting"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="This could include deep vein thrombosis (DVT), pulmonary embolism (PE), haemophilia or another condition"
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Cancer?"
        name="cancer"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>
    </Card>
  );
};

export default MedicalConditionsSection;