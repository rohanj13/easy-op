// components/Section4.tsx
import React from "react";
import { Checkbox, Form, Input } from "antd";

const Airway: React.FC = () => {
  return (
    <>
      <Form.Item label="Mallampati" name={["airway", "airwayMallampati"]}>
        <Checkbox.Group>
          <Checkbox value="classI">Class I</Checkbox>
          <Checkbox value="classII">Class II</Checkbox>
          <Checkbox value="classIII">Class III</Checkbox>
          <Checkbox value="classIV">Class IV</Checkbox>
          <Checkbox value="unableToAssess">Unable to assess</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Airway Difficulty" name={["airway", "airwayDifficulty"]}>
        <Checkbox.Group>
          <Checkbox value="notAnticipated">Not Anticipated</Checkbox>
          <Checkbox value="possible">Possible</Checkbox>
          <Checkbox value="anticipated">Anticipated</Checkbox>
          <Checkbox value="knownAirwayDifficulty">Known Airway Difficulty</Checkbox>
          <Checkbox value="intubated">Intubated</Checkbox>
          <Checkbox value="unableToAssess">Unable to assess</Checkbox>
          <Checkbox value="knownAirwayDifficulty">Known Airway Difficulty</Checkbox>
          <Checkbox value="intubated">Intubated</Checkbox>
          <Checkbox value="unableToAssess">Unable to assess</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Dental" name={["airway", "airwayDental"]}>
        <Checkbox.Group>
          <Checkbox value="teethIntact">Teeth Intact</Checkbox>
          <Checkbox value="edentulous">Edentulous</Checkbox>
          <Checkbox value="poorDentition">Poor Dentition</Checkbox>
          <Checkbox value="completeDentures">Complete Dentures</Checkbox>
          <Checkbox value="partialDentures">Partial Dentures</Checkbox>
          <Checkbox value="fullUpperDentures">Full Upper Dentures</Checkbox>
          <Checkbox value="fullLowerDentures">Full Lower Dentures</Checkbox>
          <Checkbox value="partialDenturesUpper">Partial Dentures Upper</Checkbox>
          <Checkbox value="partialDenturesLower">Partial Dentures Lower</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Neck" name={["airway", "airwayNeck"]}>
        <Checkbox.Group>
          <Checkbox value="restrictedNeckMobility">Restricted Neck Mobility</Checkbox>
          <Checkbox value="noRestriction">No Restriction of Neck Movement</Checkbox>
          <Checkbox value="short">Short</Checkbox>
          <Checkbox value="thick">Thick</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Facial Hair" name={["airway", "airwayFacialHair"]}>
        <Checkbox.Group>
          <Checkbox value="beard">Beard</Checkbox>
          <Checkbox value="moustache">Moustache</Checkbox>
        </Checkbox.Group>
      </Form.Item>

      <Form.Item label="Airway Exam Notes" name="airwayExamNotes">
        <Input />
      </Form.Item>
    </>
  );
};

export default Airway;