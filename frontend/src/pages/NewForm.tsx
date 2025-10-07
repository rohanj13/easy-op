import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft } from "lucide-react";
import { api, DEMO_HOSPITAL_ID } from "@/lib/api-client";
import { Patient, PatientCreate } from "@/lib/api-types";
import { toast } from "sonner";

type Step = 'select' | 'new-patient' | 'existing-patient-form' | 'new-patient-form';

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

  // Medical history form state
  const [medicalHistory, setMedicalHistory] = useState({
    allergies: '',
    medications: '',
    conditions: '',
    surgicalHistory: '',
    familyHistory: '',
    anesthesiaHistory: '',
  });

  useEffect(() => {
    loadPatients();
  }, []);

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
        // Store the patient ID and move to form creation
        const createdPatient = response.data as any;
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
        navigate(`/details/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error creating form:', error);
      toast.error('Failed to create form');
    } finally {
      setLoading(false);
    }
  };

  const renderMedicalHistoryForm = (patientId: string) => (
    <Card className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Medical History Form</h2>
        <p className="text-muted-foreground">Complete the pre-operative assessment</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="allergies">Allergies</Label>
          <Textarea
            id="allergies"
            placeholder="List any known allergies..."
            value={medicalHistory.allergies}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, allergies: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="medications">Current Medications</Label>
          <Textarea
            id="medications"
            placeholder="List current medications and dosages..."
            value={medicalHistory.medications}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, medications: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="conditions">Medical Conditions</Label>
          <Textarea
            id="conditions"
            placeholder="List any chronic conditions or diagnoses..."
            value={medicalHistory.conditions}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, conditions: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="surgicalHistory">Surgical History</Label>
          <Textarea
            id="surgicalHistory"
            placeholder="Previous surgeries and dates..."
            value={medicalHistory.surgicalHistory}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, surgicalHistory: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="familyHistory">Family Medical History</Label>
          <Textarea
            id="familyHistory"
            placeholder="Relevant family medical history..."
            value={medicalHistory.familyHistory}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, familyHistory: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="anesthesiaHistory">Anesthesia History</Label>
          <Textarea
            id="anesthesiaHistory"
            placeholder="Previous experiences with anesthesia..."
            value={medicalHistory.anesthesiaHistory}
            onChange={(e) => setMedicalHistory({ ...medicalHistory, anesthesiaHistory: e.target.value })}
            rows={3}
          />
        </div>
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
