import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { api, DEMO_HOSPITAL_ID } from "@/lib/api-client";
import { Patient, PatientCreate } from "@/lib/api-types";
import { toast } from "sonner";
import { medicalHistorySchema } from "@/utils/medical-history-schema";

type Step = 'select' | 'new-patient' | 'existing-patient-form' | 'new-patient-form';

type MedicalHistoryValue = string | number | unknown[] | Record<string, unknown>;
type MedicalHistoryState = Record<string, MedicalHistoryValue>;

interface SchemaField {
  key: string;
  label: string;
  type: string;
  options?: string[];
  itemFields?: Array<{ key: string; label: string; type: string }>;
  itemType?: string;
}

const NewForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('select');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState<PatientCreate>({
    first_name: '',
    last_name: '',
    dob: '',
    sex: 'M',
    phone: '',
    email: '',
  });

  // Dynamic medical history form state
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryState>({});

  useEffect(() => {
    loadPatients();
    initializeMedicalHistory();
  }, []);

  const initializeMedicalHistory = () => {
    const initialState: MedicalHistoryState = {};
    medicalHistorySchema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        if (field.type === 'array') {
          initialState[field.key] = [];
        } else {
          initialState[field.key] = '';
        }
      });
    });
    setMedicalHistory(initialState);
  };

  const loadPatients = async () => {
    try {
      const response = await api.patients.patientsList();
      setPatients(response.data || []);
    } catch (error) {
      console.error('Error loading patients:', error);
      toast.error('Failed to load patients');
    }
  };

  const handleCreatePatient = async () => {
    try {
      setLoading(true);
      const response = await api.patients.patientsCreateCreate(newPatient);
      
      if (response.data) {
        toast.success('Patient created successfully');
        const createdPatient = response.data as Patient;
        setSelectedPatientId(createdPatient.id || '');
        setStep('new-patient-form');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      toast.error('Failed to create patient');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = async (patientId: string) => {
    try {
      setLoading(true);
      const response = await api.forms.formsCreateCreate({
        hospital_id: DEMO_HOSPITAL_ID,
        patient_id: patientId,
        medical_history: medicalHistory,
      });

      if (response.data) {
        toast.success('Pre-operative form created successfully');
        navigate(`/dashboard`);
      }
    } catch (error) {
      console.error('Error creating form:', error);
      toast.error('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const updateFieldValue = (key: string, value: MedicalHistoryValue) => {
    setMedicalHistory((prev) => ({ ...prev, [key]: value }));
  };

  const addArrayItem = (key: string, itemFields?: Array<{ key: string; label: string; type: string }>) => {
    const currentArray = (medicalHistory[key] as unknown[]) || [];
    if (itemFields) {
      const newItem: Record<string, string | number> = {};
      itemFields.forEach((field) => {
        newItem[field.key] = field.type === 'number' ? 0 : '';
      });
      updateFieldValue(key, [...currentArray, newItem]);
    } else {
      updateFieldValue(key, [...currentArray, '']);
    }
  };

  const removeArrayItem = (key: string, index: number) => {
    const currentArray = (medicalHistory[key] as unknown[]) || [];
    updateFieldValue(key, currentArray.filter((_: unknown, i: number) => i !== index));
  };

  const updateArrayItem = (key: string, index: number, value: string) => {
    const currentArray = [...((medicalHistory[key] as unknown[]) || [])];
    currentArray[index] = value;
    updateFieldValue(key, currentArray);
  };

  const updateArrayItemField = (key: string, index: number, fieldKey: string, value: string | number) => {
    const currentArray = [...((medicalHistory[key] as Record<string, unknown>[]) || [])];
    currentArray[index] = { ...currentArray[index], [fieldKey]: value };
    updateFieldValue(key, currentArray);
  };

  const renderField = (field: SchemaField) => {
    const value = medicalHistory[field.key];

    switch (field.type) {
      case 'text':
        return (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(field.key, e.target.value)}
            />
          </div>
        );

      case 'number':
        return (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Input
              id={field.key}
              type="number"
              value={(value as number | string) || ''}
              onChange={(e) => updateFieldValue(field.key, e.target.value ? Number(e.target.value) : '')}
            />
          </div>
        );

      case 'select':
        return (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Select value={(value as string) || ''} onValueChange={(val) => updateFieldValue(field.key, val)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option: string) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'array':
        { const arrayValue = (value as unknown[]) || [];
        return (
          <div key={field.key} className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>{field.label}</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => addArrayItem(field.key, field.itemFields)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add {field.label}
              </Button>
            </div>
            
            {arrayValue.length === 0 && (
              <p className="text-sm text-muted-foreground">No items added yet</p>
            )}

            {arrayValue.map((item: unknown, index: number) => (
              <Card key={index} className="p-4">
                <div className="flex gap-3 items-start">
                  <div className="flex-1">
                    {field.itemFields ? (
                      <div className="grid md:grid-cols-2 gap-3">
                        {field.itemFields.map((itemField) => {
                          const itemRecord = item as Record<string, string | number>;
                          return (
                            <div key={itemField.key}>
                              <Label htmlFor={`${field.key}-${index}-${itemField.key}`}>
                                {itemField.label}
                              </Label>
                              <Input
                                id={`${field.key}-${index}-${itemField.key}`}
                                type={itemField.type === 'number' ? 'number' : 'text'}
                                value={itemRecord[itemField.key] || ''}
                                onChange={(e) =>
                                  updateArrayItemField(
                                    field.key,
                                    index,
                                    itemField.key,
                                    itemField.type === 'number' ? Number(e.target.value) : e.target.value
                                  )
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <Input
                        value={item as string}
                        onChange={(e) => updateArrayItem(field.key, index, e.target.value)}
                        placeholder={`Enter ${field.label}`}
                      />
                    )}
                  </div>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="text-destructive"
                    onClick={() => removeArrayItem(field.key, index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ); }

      default:
        return null;
    }
  };

  const renderMedicalHistoryForm = (patientId: string) => (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Medical History Form</h2>
        <p className="text-muted-foreground">Complete the pre-operative assessment</p>
      </div>

      <div className="space-y-8">
        {medicalHistorySchema.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">
              {section.title}
            </h3>
            <div className="space-y-4">
              {section.fields.map((field) => renderField(field))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setStep('select')} variant="outline">
          Back
        </Button>
        <Button onClick={() => handleCreateForm(patientId)} disabled={loading}>
          {loading ? 'Creating...' : 'Create Form'}
        </Button>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-foreground">New Pre-Operative Form</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {step === 'select' && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Patient Selection</h2>
              <p className="text-muted-foreground">Does the patient already exist in the system?</p>
            </div>

            <RadioGroup value={step} onValueChange={(value) => setStep(value as Step)}>
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="existing-patient-form" id="existing" />
                <Label htmlFor="existing" className="flex-1 cursor-pointer">
                  <div className="font-medium">Existing Patient</div>
                  <div className="text-sm text-muted-foreground">Select from registered patients</div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="new-patient" id="new" />
                <Label htmlFor="new" className="flex-1 cursor-pointer">
                  <div className="font-medium">New Patient</div>
                  <div className="text-sm text-muted-foreground">Register a new patient</div>
                </Label>
              </div>
            </RadioGroup>
          </Card>
        )}

        {step === 'existing-patient-form' && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Patient</h2>
              <p className="text-muted-foreground">Choose the patient for this assessment</p>
            </div>

            <div>
              <Label htmlFor="patient">Patient</Label>
              <Select value={selectedPatientId} onValueChange={setSelectedPatientId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.first_name} {patient.last_name} - DOB: {patient.dob}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedPatientId && renderMedicalHistoryForm(selectedPatientId)}

            {!selectedPatientId && (
              <Button onClick={() => setStep('select')} variant="outline">
                Back
              </Button>
            )}
          </Card>
        )}

        {step === 'new-patient' && (
          <Card className="p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">New Patient Registration</h2>
              <p className="text-muted-foreground">Enter patient details</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={newPatient.first_name}
                  onChange={(e) => setNewPatient({ ...newPatient, first_name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={newPatient.last_name}
                  onChange={(e) => setNewPatient({ ...newPatient, last_name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={newPatient.dob}
                  onChange={(e) => setNewPatient({ ...newPatient, dob: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="sex">Sex *</Label>
                <Select value={newPatient.sex} onValueChange={(value) => setNewPatient({ ...newPatient, sex: value as 'M' | 'F' | 'O' })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setStep('select')} variant="outline">
                Back
              </Button>
              <Button onClick={handleCreatePatient} disabled={loading}>
                {loading ? 'Creating...' : 'Create Patient & Continue'}
              </Button>
            </div>
          </Card>
        )}

        {step === 'new-patient-form' && newPatient.first_name && (
          <div className="space-y-4">
            <Card className="p-4 bg-accent/10 border-accent">
              <p className="text-sm">
                Patient <strong>{newPatient.first_name} {newPatient.last_name}</strong> created successfully. 
                Now complete the pre-operative form.
              </p>
            </Card>
            {renderMedicalHistoryForm(selectedPatientId)}
          </div>
        )}
      </main>
    </div>
  );
};

export default NewForm;