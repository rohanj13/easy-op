// components/OtherHealthInfoSection.tsx
import React, { useState } from 'react';
import { Form, Radio, Checkbox, Card, Input } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const OtherHealthInfoSection: React.FC = () => {
  const [hasOtherMedicalConditions, setHasOtherMedicalConditions] = useState<string>('No');

  return (
    <Card 
      type="inner" 
      title={
        <div>
          <WarningOutlined style={{ fontSize: '18px', color: '#faad14', marginRight: '8px' }} />
          <span style={{ fontSize: '18px', fontWeight: 500 }}>Other Health Information</span>
        </div>
      }
      style={{ marginBottom: '24px' }}
    >
      <Form.Item
        label="Have you had COVID-19?"
        name="covidHistory"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="If you have had COVID-19 multiple times, or think you may have had it recently, please select based on the most recent date"
      >
        <Radio.Group>
          <Radio value="Recent">Yes – within the last 2 months</Radio>
          <Radio value="Past">Yes – over 2 months ago</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        label="Which of the following describes your mouth, teeth, and dentition?"
        name="dentalDescriptions"
        rules={[{ required: true, message: "Please select at least one option" }]}
      >
        <Checkbox.Group>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
            <Checkbox value="unableToOpenMouth">I am unable to open my mouth fully</Checkbox>
            <Checkbox value="ownTeeth">I have my own teeth only (with or without fillings)</Checkbox>
            <Checkbox value="looseTeeth">Loose tooth or teeth</Checkbox>
            <Checkbox value="chippedTeeth">Chipped tooth or teeth</Checkbox>
            <Checkbox value="braces">Braces</Checkbox>
            <Checkbox value="wireRetainer">Wire retainer</Checkbox>
            <Checkbox value="capsCrownsVeneers">Caps, crowns, or veneers</Checkbox>
            <Checkbox value="implants">Implant(s)</Checkbox>
            <Checkbox value="bridges">Bridge(s)</Checkbox>
            <Checkbox value="partialUpperDentures">Partial upper dentures</Checkbox>
            <Checkbox value="partialLowerDentures">Partial lower dentures</Checkbox>
            <Checkbox value="fullUpperDentures">Full upper dentures</Checkbox>
            <Checkbox value="fullLowerDentures">Full lower dentures</Checkbox>
            <Checkbox value="otherDental">Other</Checkbox>
          </div>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label="Please indicate the pain relievers or analgesics that have worked well for you previously"
        name="effectivePainRelievers"
        rules={[{ required: true, message: "Please select at least one option" }]}
      >
        <Checkbox.Group>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '8px' }}>
            <Checkbox value="paracetamol">Paracetamol, eg. Panadol, Dymadon</Checkbox>
            <Checkbox value="paracetamolCodeine">Paracetamol-codeine combinations, eg. Panadeine Forte, Painstop</Checkbox>
            <Checkbox value="antiInflammatories">Anti-inflammatories, eg. Nurofen, Voltaren, Celebrex, Mobic</Checkbox>
            <Checkbox value="tramadol">Tramadol, eg. Tramal</Checkbox>
            <Checkbox value="tapentadol">Tapentadol, eg. Palexia</Checkbox>
            <Checkbox value="strongOpioids">Strong opioids, eg. OxyNorm, Endone, Targin, Sevredol</Checkbox>
            <Checkbox value="unsure">Unsure / I don't take pain relievers</Checkbox>
            <Checkbox value="otherPainRelievers">Other</Checkbox>
          </div>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label="Please indicate the pain relievers or analgesics that you must avoid or should not use"
        name="painRelieversToAvoid"
        rules={[{ required: true, message: "Please select at least one option" }]}
      >
        <Checkbox.Group>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '8px' }}>
            <Checkbox value="paracetamol">Paracetamol, e.g. Panadol, Dymadon</Checkbox>
            <Checkbox value="paracetamolCodeine">Paracetamol-codeine combinations, e.g. Panadeine Forte, Painstop</Checkbox>
            <Checkbox value="antiInflammatories">Anti-inflammatories, e.g. Nurofen, Voltaren, Celebrex, Mobic</Checkbox>
            <Checkbox value="tramadol">Tramadol, e.g. Tramal</Checkbox>
            <Checkbox value="tapentadol">Tapentadol, e.g. Palexia</Checkbox>
            <Checkbox value="strongOpioids">Strong opioids, e.g. OxyNorm, Endone, Targin, Sevredol</Checkbox>
            <Checkbox value="otherPainRelievers">Other</Checkbox>
            <Checkbox value="noRestrictions">I am not aware of any pain relievers or analgesics that I must avoid or should not use</Checkbox>
          </div>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item
        label="Do you have any other medical conditions not already mentioned?"
        name="otherMedicalConditions"
        rules={[{ required: true, message: "Please answer this question" }]}
        extra="These could include brain, nerve, muscle, vascular problems, autism spectrum disorder, psychiatric / cognitive / behavioural conditions, difficulty lying on your back, claustrophobia, or anything else that could affect your health, your legal ability to consent or the care you receive from your Anaesthetist"
      >
        <Radio.Group onChange={(e) => setHasOtherMedicalConditions(e.target.value)}>
          <Radio value="Yes">Yes</Radio>
          <Radio value="No">No</Radio>
        </Radio.Group>
      </Form.Item>

      {hasOtherMedicalConditions === 'Yes' && (
        <Form.Item
          label="Please specify your other medical conditions"
          name="otherMedicalConditionsDetails"
        >
          <TextArea rows={3} placeholder="Describe your other medical conditions" />
        </Form.Item>
      )}
    </Card>
  );
  };
export default OtherHealthInfoSection;           
    