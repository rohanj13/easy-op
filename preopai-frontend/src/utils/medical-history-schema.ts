// medicalHistorySchema.ts
export const medicalHistorySchema = {
  sections: [
    {
      title: "Medical Conditions",
      fields: [
        {
          key: "medical_conditions",
          type: "array",
          label: "Medical Conditions",
          itemFields: [
            { key: "name", label: "Condition", type: "text" },
            { key: "diagnosed_year", label: "Year Diagnosed", type: "number" },
          ],
        },
      ],
    },
    {
      title: "Allergies & Medications",
      fields: [
        {
          key: "allergies",
          type: "array",
          label: "Allergies",
          itemType: "text",
        },
        {
          key: "medications",
          type: "array",
          label: "Medications",
          itemFields: [
            { key: "name", label: "Medication", type: "text" },
            { key: "dose", label: "Dose", type: "text" },
            { key: "frequency", label: "Frequency", type: "text" },
          ],
        },
      ],
    },
    {
      title: "Lifestyle",
      fields: [
        {
          key: "smoking_status",
          label: "Smoking Status",
          type: "select",
          options: ["Never", "Former", "Current"],
        },
        {
          key: "alcohol_use",
          label: "Alcohol Use",
          type: "select",
          options: ["None", "Occasional", "Regular"],
        },
        {
          key: "height_cm",
          label: "Height (cm)",
          type: "number",
        },
        {
          key: "weight_kg",
          label: "Weight (kg)",
          type: "number",
        },
      ],
    },
  ],
};