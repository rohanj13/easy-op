import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react"; // Removed Plus, Trash2
import { api, DEMO_HOSPITAL_ID } from "@/api/api-client";
import { Patient, PatientCreate, Surgery, SurgeryCreate } from "@/api/api-types";
import { toast } from "sonner";
import { preOpFormSchema } from "@/utils/medical-history-schema"; // Assuming this is the updated simplified schema

// --- Types remain the same for file structure, but the array logic is unused ---
type Step = 'select' | 'new-patient' | 'new-surgery' | 'existing-patient-surgery' | 'existing-patient-form' | 'new-patient-form';

type MedicalHistoryValue = string | number; // Simplified: No longer includes array or Record types
type MedicalHistoryState = Record<string, MedicalHistoryValue>;

interface SchemaField {
  key: string;
  label: string;
  type: string;
  options?: string[];
  // itemFields and itemType are now unused from the old schema logic
}
// -------------------------------------------------------------------------------


const NewForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('select');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [surgeries, setSurgeries] = useState<Surgery[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [selectedSurgeryId, setSelectedSurgeryId] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // New patient form state
  const [newPatient, setNewPatient] = useState<PatientCreate>({
    first_name: '',
    last_name: '',
    dob: '',
    sex: 'M',
    ethnicity: '',
    phone: '',
    email: '',
  });

  // New surgery form state
  const [newSurgery, setNewSurgery] = useState<Omit<SurgeryCreate, 'hospital_id' | 'patient_id'>>({
    name: '',
    side: '',
    indication: '',
    scheduled_date: '',
  });

  // Dynamic medical history form state
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryState>({});

  useEffect(() => {
    loadPatients();
    initializeMedicalHistory();
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      loadSurgeriesForPatient(selectedPatientId);
    }
  }, [selectedPatientId]);

  // 🐛 MODIFICATION: Updated to initialize all fields as empty strings, 
  // since 'array' type fields were replaced by 'textarea' in the new schema.
  const initializeMedicalHistory = () => {
    const initialState: MedicalHistoryState = {};
    preOpFormSchema.sections.forEach((section) => {
      section.fields.forEach((field) => {
        // All fields are now text, number, or select, which initialize to '' or 0
        initialState[field.key] = field.type === 'number' ? 0 : '';
      });
    });
    setMedicalHistory(initialState);
  };
  // -----------------------------------------------------------------

  const loadPatients = async () => {
    try {
      const response = await api.patients.patientsList();
      setPatients(response.data || []);
    } catch (error) {
      console.error('Error loading patients:', error);
      toast.error('Failed to load patients');
    }
  };

  const loadSurgeriesForPatient = async (patientId: string) => {
    try {
      const response = await api.surgeries.surgeriesList();
      const patientSurgeries = (response.data || []).filter(s => s.patient === patientId);
      setSurgeries(patientSurgeries);
    } catch (error) {
      console.error('Error loading surgeries:', error);
      toast.error('Failed to load surgeries');
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
        setStep('new-surgery');
      }
    } catch (error) {
      console.error('Error creating patient:', error);
      toast.error('Failed to create patient');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSurgery = async () => {
    if (!selectedPatientId) {
      toast.error('No patient selected');
      return;
    }

    try {
      setLoading(true);
      const surgeryData: SurgeryCreate = {
        hospital_id: DEMO_HOSPITAL_ID,
        patient_id: selectedPatientId,
        name: newSurgery.name,
        side: newSurgery.side || null,
        indication: newSurgery.indication,
        scheduled_date: newSurgery.scheduled_date || null,
      };

      const response = await api.surgeries.surgeriesCreateCreate(surgeryData);
      
      if (response.data) {
        toast.success('Surgery created successfully');
        const createdSurgery = response.data as Surgery;
        setSelectedSurgeryId(createdSurgery.id || '');
        setStep(step === 'new-surgery' ? 'new-patient-form' : 'existing-patient-form');
      }
    } catch (error) {
      console.error('Error creating surgery:', error);
      toast.error('Failed to create surgery');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = async () => {
    if (!selectedPatientId || !selectedSurgeryId) {
      toast.error('Patient and surgery are required');
      return;
    }

    try {
      setLoading(true);
      const response = await api.forms.formsCreateCreate({
        hospital: DEMO_HOSPITAL_ID,
        patient: selectedPatientId,
        surgery: selectedSurgeryId,
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
      
      case 'textarea': // Added support for 'textarea'
        return (
          <div key={field.key}>
            <Label htmlFor={field.key}>{field.label}</Label>
            <Textarea
              id={field.key}
              value={(value as string) || ''}
              onChange={(e) => updateFieldValue(field.key, e.target.value)}
              rows={4} // Default rows for a medical history block
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
      
      default:
        return null;
    }
  };

  const renderMedicalHistoryForm = () => (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Medical History Form</h2>
        <p className="text-muted-foreground">Complete the pre-operative assessment</p>
      </div>

      <div className="space-y-8">
        {preOpFormSchema.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground border-b pb-2">
              {section.title}
            </h3>
            <div className="space-y-4">
              {/* Vitals fields in one row, history fields below */}
              <div className={section.title === "Vitals & Measurements" ? "grid md:grid-cols-3 gap-4" : "space-y-4"}>
                  {section.fields.map((field) => renderField(field))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button onClick={() => setStep('select')} variant="outline">
          Back
        </Button>
        <Button onClick={handleCreateForm} disabled={loading}>
          {loading ? 'Creating...' : 'Create Form'}
        </Button>
      </div>
    </Card>
  );

  const renderSurgeryForm = (isNewPatient: boolean) => (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Surgery Information</h2>
        <p className="text-muted-foreground">Enter details about the planned surgery</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="surgeryName">Surgery Name *</Label>
          <Input
            id="surgeryName"
            value={newSurgery.name}
            onChange={(e) => setNewSurgery({ ...newSurgery, name: e.target.value })}
            placeholder="e.g., Total Knee Replacement"
          />
        </div>

        <div>
          <Label htmlFor="side">Side</Label>
          <Select 
            value={newSurgery.side || ''} 
            onValueChange={(value) => setNewSurgery({ ...newSurgery, side: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select side (if applicable)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Left">Left</SelectItem>
              <SelectItem value="Right">Right</SelectItem>
              <SelectItem value="Bilateral">Bilateral</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="scheduledDate">Scheduled Date</Label>
          <Input
            id="scheduledDate"
            type="date"
            value={newSurgery.scheduled_date || ''}
            onChange={(e) => setNewSurgery({ ...newSurgery, scheduled_date: e.target.value })}
          />
        </div>

        <div>
          <Label htmlFor="indication">Indication *</Label>
          <Textarea
            id="indication"
            value={newSurgery.indication}
            onChange={(e) => setNewSurgery({ ...newSurgery, indication: e.target.value })}
            placeholder="Reason for surgery"
            rows={4}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button 
          onClick={() => setStep(isNewPatient ? 'new-patient' : 'existing-patient-surgery')} 
          variant="outline"
        >
          Back
        </Button>
        <Button 
          onClick={handleCreateSurgery} 
          disabled={loading || !newSurgery.name || !newSurgery.indication}
        >
          {loading ? 'Creating...' : 'Create Surgery & Continue'}
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
                <RadioGroupItem value="existing-patient-surgery" id="existing" />
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

        {step === 'existing-patient-surgery' && (
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

            {selectedPatientId && (
              <>
                <div className="space-y-4">
                  <div>
                    <Label>Surgery Selection</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Select an existing surgery or create a new one
                    </p>
                  </div>

                  {surgeries.length > 0 && (
                    <div>
                      <Label htmlFor="surgery">Existing Surgeries</Label>
                      <Select value={selectedSurgeryId} onValueChange={setSelectedSurgeryId}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an existing surgery" />
                        </SelectTrigger>
                        <SelectContent>
                          {surgeries.map((surgery) => (
                            <SelectItem key={surgery.id} value={surgery.id!}>
                              {surgery.name} - {surgery.scheduled_date || 'No date'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button onClick={() => setStep('select')} variant="outline">
                      Back
                    </Button>
                    {selectedSurgeryId ? (
                      <Button onClick={() => setStep('existing-patient-form')}>
                        Continue to Form
                      </Button>
                    ) : (
                      <Button onClick={() => setStep('new-surgery')} variant="outline">
                        Create New Surgery
                      </Button>
                    )}
                  </div>
                </div>
              </>
            )}

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
                <Label htmlFor="ethnicity">Ethnicity</Label>
                <Input
                  id="ethnicity"
                  value={newPatient.ethnicity}
                  onChange={(e) => setNewPatient({ ...newPatient, ethnicity: e.target.value })}
                />
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

        {step === 'new-surgery' && (
          <>
            {newPatient.first_name && (
              <Card className="p-4 bg-accent/10 border-accent mb-4">
                <p className="text-sm">
                  Patient: <strong>{newPatient.first_name} {newPatient.last_name}</strong>
                </p>
              </Card>
            )}
            {renderSurgeryForm(!!newPatient.first_name)}
          </>
        )}

        {step === 'new-patient-form' && (
          <div className="space-y-4">
            <Card className="p-4 bg-accent/10 border-accent">
              <p className="text-sm">
                <strong>{newPatient.first_name} {newPatient.last_name}</strong> - Surgery: <strong>{newSurgery.name}</strong>
              </p>
            </Card>
            {renderMedicalHistoryForm()}
          </div>
        )}

        {step === 'existing-patient-form' && selectedPatientId && selectedSurgeryId && (
          <div className="space-y-4">
            <Card className="p-4 bg-accent/10 border-accent">
              <p className="text-sm">
                Patient and surgery selected. Complete the medical history form below.
              </p>
            </Card>
            {renderMedicalHistoryForm()}
          </div>
        )}
      </main>
    </div>
  );
};

export default NewForm;