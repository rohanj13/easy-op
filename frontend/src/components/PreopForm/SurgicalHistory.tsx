import React, { useState } from "react";
import { Checkbox, Col, Form, Input, Row } from "antd";

const options = [
  "Aneurysm Repair", "Appendectomy", "Back Surgery", "Bariatric Surgery", "Bilateral Tubal Ligation",
  "Bronchoscopy/EBUS", "CABG (Coronary Artery Bypass Grafting)", "Carotid Endarterectomy", "Carotid Stent",
  "Cataract/Lens Surgery", "Caesarean Section", "Cholecystectomy/Bile Duct", "Colonoscopy", "Craniotomy",
  "Cystoscopy", "Endoscopy", "Defibrillator", "Dilatation & Curettage", "Gastric Bypass", "Heart Valve Surgery",
  "Haemorrhoid Surgery", "Hip Arthroplasty", "Hip Replacement", "Hysterectomy", "Hysteroscopy", "Inguinal Hernia Repair",
  "Knee Arthroplasty", "Knee Arthroscopy", "Laminectomy", "LASIK", "Lumpectomy", "Lung Surgery", "Mastectomy", "Mastectomy with Lymph Node Dissection",
  "Nasal Surgery", "Neck Surgery", "Nephrectomy", "ORIF (Open Reduction Internal Fixation)", "Pacemaker", "Partial Hepatectomy",
  "Partial Nephrectomy", "Prostatectomy", "PTCA/PCI (Percutaneous Coronary Intervention)", "Rotator Cuff Surgery", "Sinus Surgery",
  "Skin Cancer Excision", "Spinal Fusion", "Splenectomy", "TAH-BSO (Total Abdominal Hysterectomy with Bilateral Salpingo-Oophorectomy)",
  "Thyroid Surgery", "Tonsillectomy", "TURP (Transurethral Resection of the Prostate)", "Umbilical Hernia Repair", "Vasectomy", "VATS Wedge/Lobe",
  "VATS (Video-Assisted Thoracic Surgery)", "Other"
];

const chunkArray = (arr: string[], chunkCount: number) => {
  const result: string[][] = Array.from({ length: chunkCount }, () => []);
  arr.forEach((item, index) => {
    result[index % chunkCount].push(item);
  });
  return result;
};

const SurgicalHistory: React.FC = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const columns = chunkArray(options, 3);

  return (
    <>
      <Form.Item label="Surgical History" name="surgicalHistory">
        <Checkbox.Group
          value={selectedOptions}
          onChange={(checkedValues) => setSelectedOptions(checkedValues as string[])}
        >
          <Row>
            {columns.map((col, colIndex) => (
              <Col span={8} key={colIndex}>
                {col.map((option) => (
                  <div key={option} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                    <Checkbox value={option} />
                    <span style={{ marginLeft: 8 }}>{option}</span>
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>

      {selectedOptions.includes("Other") && (
        <Form.Item
          label="Please specify"
          name="surgicalHistoryOther"
          rules={[{ required: true, message: "Please provide details for 'Other'" }]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item label="Past Surgical History Notes" name="pastSurgicalHistoryNotes">
        <Input />
      </Form.Item>
    </>
  );
};

export default SurgicalHistory;
