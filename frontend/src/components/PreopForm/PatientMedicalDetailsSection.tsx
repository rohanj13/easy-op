// components/PatientMedicalDetailsSection.tsx
import React, { useState } from 'react';
import { Form, InputNumber, Radio, Card } from 'antd';
import { SafetyOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

const PatientMedicalDetailsSection: React.FC = () => {
  const [hasAllergies, setHasAllergies] = useState<string>('No');
  const [hasMedications, setHasMedications] = useState<string>('No');

  return (
    <Card 
      type="inner" 
      title={
        <div>
          <SafetyOutlined style={{ fontSize: '18px', color: '#1890ff', marginRight: '8px' }} />
          <span style={{ fontSize: '18px', fontWeight: 500 }}>Patient Medical Details</span>
        </div>
      }
      style={{ marginBottom: '24px' }}
    >
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '20px'
      }}>
        <Form.Item
          label="Height (cm)"
          name="height"
          rules={[{ required: true, message: "Please enter height" }]}
        >
          <InputNumber min={50} max={250} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Weight (kg)"
          name="weight"
          rules={[{ required: true, message: "Please enter weight" }]}
        >
          <InputNumber min={0} max={300} style={{ width: '100%' }} />
        </Form.Item>
      </div>

      <Form.Item
        label="Have you been unwell in the 4 weeks before your operation?"
        name="recentlyUnwell"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="If your operation is within the next four weeks please advise if you have had a recent fever, cough, cold, flu, sore throat, respiratory symptoms, shortness of breath, runny nose, blocked nose, headache, body aches, muscle or joint pains, nausea, diarrhoea, vomiting, loss of smell/taste, loss of appetite, fatigue or any other illness recently"
      >
        <Radio.Group>
          <Radio value="Yes">Yes - I have been well</Radio>
          <Radio value="No">No</Radio>
          <Radio value="N/A">N/A - My operation is in more than 4 weeks</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Have you ever had an anaesthetic?"
        name="previousAnaesthetic"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No - This will be my first anaesthetic</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Have any of your blood relatives experienced a severe reaction to an anaesthetic?"
        name="familyAnaestheticReaction"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="E.g. your parents, your siblings, your parent's siblings, your grandparents, your children"
      >
        <Radio.Group>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No/Not that I'm aware of</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Do you have any allergies?"
        name="allergies"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="Especially to medications including antibiotics, latex products, foods or iodine"
      >
        <Radio.Group onChange={(e) => setHasAllergies(e.target.value)}>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      {hasAllergies === 'Yes' && (
        <Form.Item
          label="Please specify your allergies"
          name="allergiesDetails"
        >
          <TextArea rows={3} placeholder="Describe your allergies" />
        </Form.Item>
      )}

      <Form.Item
        label="Do you take regular medications, puffers or any injections?"
        name="regularMedications"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="This includes all syrups, tablets, puffers, patches, sprays, eye drops, any type of injections etc. It is VERY important to mention if you take any weight loss injections, GLP-1 receptor agonists (eg. Saxenda, Ozempic) or any anticoagulants (eg. Aspirin, Xarelto, Eliquis, Warfarin, Clexane)"
      >
        <Radio.Group onChange={(e) => setHasMedications(e.target.value)}>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      {hasMedications === 'Yes' && (
        <Form.Item
          label="Please specify your medications"
          name="medicationsDetails"
        >
          <TextArea rows={3} placeholder="List all your medications" />
        </Form.Item>
      )}

      <Form.Item
        label="Do you smoke or vape?"
        name="smokeOrVape"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="never">No – I have never smoked or vaped</Radio>
          <Radio value="previously">No – I previously smoked / vaped, but now do not</Radio>
          <Radio value="socially">Yes – I smoke / vape socially only</Radio>
          <Radio value="regularly">Yes – I smoke / vape regularly</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Do you regularly drink alcohol?"
        name="alcoholConsumption"
        rules={[{ required: true, message: "Please answer this question" }]}
      >
        <Radio.Group>
          <Radio value="No">No</Radio>
          <Radio value="Socially">Yes – Socially (weekends only)</Radio>
          <Radio value="Often">Yes – Often (most days)</Radio>
        </Radio.Group>
      </Form.Item>
    </Card>
  );
};

export default PatientMedicalDetailsSection;