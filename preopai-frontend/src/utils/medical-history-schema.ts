// preOpFormSchema.ts

export const preOpFormSchema = {
  sections: [
    // 2. Vitals and Anthropometrics
    {
      title: "Vitals & Measurements",
      fields: [
        { key: "height_cm", label: "Height (cm)", type: "number" },
        { key: "weight_kg", label: "Weight (kg)", type: "number" },
        { key: "bmi", label: "BMI", type: "number", readOnly: true },
        { key: "bp", label: "Blood Pressure (mmHg)", type: "text" },
        { key: "hr", label: "Heart Rate (bpm)", type: "number" },
        { key: "spo2", label: "SpO₂ (%)", type: "number" },
      ],
    },
    
    // 4. Medical History
    {
      title: "Medical Conditions",
      fields: [
        {
          key: "medical_conditions_text",
          label: "Medical Conditions (List all conditions, severity, and notes)",
          type: "textarea", // Converted from array to free text
        },
      ],
    },

    // 5. Surgical History
    {
      title: "Surgical History",
      fields: [
        {
          key: "past_surgeries_text",
          label: "Past Surgeries (List procedures, years, and any complications)",
          type: "textarea", // Converted from array to free text
        },
      ],
    },

    // 6. Allergies & Medications
    {
      title: "Allergies & Medications",
      fields: [
        {
          key: "allergies_text",
          label: "Allergies (List allergen and reaction for each)",
          type: "textarea", // Converted from array to free text
        },
        {
          key: "medications_text",
          label: "Current Medications (List name, dose, and frequency for each)",
          type: "textarea", // Converted from array to free text
        },
      ],
    },

    // 7. Lifestyle & Social History
    {
      title: "Lifestyle & Social History",
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
          options: ["None", "Occasional", "Regular", "Heavy"],
        },
        {
          key: "other_substances",
          label: "Other Substance Use",
          type: "text", // Kept as simple text, but could also be a 'textarea' if needed
        },
      ],
    },

    // 8. Investigations
    {
      title: "Investigations",
      fields: [
        {
          key: "bloods_text",
          label: "Recent Bloods (List tests and results)",
          type: "textarea", // Converted from array to free text
        },
        {
          key: "ecg",
          label: "ECG Findings",
          type: "textarea", // Changed to textarea for more detail
        },
        {
          key: "cxr",
          label: "CXR Findings",
          type: "textarea", // Changed to textarea for more detail
        },
        {
          key: "other_investigations",
          label: "Other Investigations (e.g., Echo, Sleep Study)",
          type: "textarea", // Changed to textarea for more detail
        },
      ],
    },

    // 9. Anaesthetic History
    {
      title: "Anaesthetic History",
      fields: [
        {
          key: "previous_anaesthetic_issues",
          label: "Previous Anaesthetic Issues (e.g., PONV, Difficult Airway)",
          type: "textarea", // Changed to textarea for more detail
        },
        {
          key: "family_anaesthetic_history",
          label: "Family History of Anaesthetic Complications",
          type: "textarea", // Changed to textarea for more detail
        },
      ],
    },
  ],
};