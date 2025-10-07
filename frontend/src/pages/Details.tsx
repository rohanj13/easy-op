import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, Edit, FileDown, Loader2 } from "lucide-react";
import { api } from "@/lib/api-client";
import { Form, Patient, Response } from "@/lib/api-types";
import { toast } from "sonner";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [response, setResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [assessing, setAssessing] = useState(false);
  const [editing, setEditing] = useState<'patient' | 'form' | null>(null);

  // Edit states
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [editedMedicalHistory, setEditedMedicalHistory] = useState<any>(null);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    try {
      setLoading(true);

      // Load form
      const formResponse = await api.forms.formsRead(id);
      const formData = formResponse.data;
      setForm(formData);

      // Load patient
      if (formData?.patient) {
        const patientResponse = await api.patients.patientsRead(formData.patient);
        setPatient(patientResponse.data);
        setEditedPatient(patientResponse.data);
      }

      // Load response if exists
      if (formData?.response) {
        const responseResponse = await api.responses.responsesRead(formData.response);
        setResponse(responseResponse.data);
      }

      if (formData?.medical_history) {
        setEditedMedicalHistory(formData.medical_history);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load details');
    } finally {
      setLoading(false);
    }
  };

  const handleAssessPatient = async () => {
    if (!id) return;

    try {
      setAssessing(true);
      const aiResponse = await api.ai.aiGenerateCreate({ form_id: id });
      
      if (aiResponse.data) {
        setResponse(aiResponse.data);
        toast.success('AI assessment completed');
        await loadData(); // Reload to get updated form status
      }
    } catch (error) {
      console.error('Error assessing patient:', error);
      toast.error('Failed to complete AI assessment');
    } finally {
      setAssessing(false);
    }
  };

  const handleExportPDF = async () => {
    if (!id) return;

    try {
      await api.forms.formsFormExportList(id);
      toast.success('PDF export initiated');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      toast.error('Failed to export PDF');
    }
  };

  const handleUpdatePatient = async () => {
    if (!patient?.id || !editedPatient) return;

    try {
      await api.patients.patientsUpdateCreate(patient.id, {
        first_name: editedPatient.first_name,
        last_name: editedPatient.last_name,
        dob: editedPatient.dob,
        sex: editedPatient.sex,
        phone: editedPatient.phone || '',
        email: editedPatient.email || '',
      });
      
      toast.success('Patient updated successfully');
      setEditing(null);
      await loadData();
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient');
    }
  };

  const handleUpdateForm = async () => {
    if (!id || !editedMedicalHistory) return;

    try {
      await api.forms.formsUpdateCreate(id, {
        medical_history: editedMedicalHistory,
      });
      
      toast.success('Form updated successfully');
      setEditing(null);
      await loadData();
    } catch (error) {
      console.error('Error updating form:', error);
      toast.error('Failed to update form');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!form || !patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-6">
          <p className="text-muted-foreground">Form or patient not found</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  {patient.first_name} {patient.last_name}
                </h1>
                <p className="text-sm text-muted-foreground">Pre-Operative Assessment</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleExportPDF} variant="outline">
                <FileDown className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button onClick={handleAssessPatient} disabled={assessing}>
                {assessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Assessing...
                  </>
                ) : (
                  'Assess Patient'
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        {/* Patient Information */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Patient Information</h2>
              <p className="text-sm text-muted-foreground mt-1">Personal and contact details</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (editing === 'patient') {
                  handleUpdatePatient();
                } else {
                  setEditing('patient');
                }
              }}
            >
              {editing === 'patient' ? 'Save' : <><Edit className="h-4 w-4 mr-2" />Edit</>}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              {editing === 'patient' ? (
                <Input
                  value={editedPatient?.first_name || ''}
                  onChange={(e) => setEditedPatient(prev => prev ? { ...prev, first_name: e.target.value } : null)}
                />
              ) : (
                <p className="text-foreground mt-1">{patient.first_name}</p>
              )}
            </div>

            <div>
              <Label>Last Name</Label>
              {editing === 'patient' ? (
                <Input
                  value={editedPatient?.last_name || ''}
                  onChange={(e) => setEditedPatient(prev => prev ? { ...prev, last_name: e.target.value } : null)}
                />
              ) : (
                <p className="text-foreground mt-1">{patient.last_name}</p>
              )}
            </div>

            <div>
              <Label>Date of Birth</Label>
              {editing === 'patient' ? (
                <Input
                  type="date"
                  value={editedPatient?.dob || ''}
                  onChange={(e) => setEditedPatient(prev => prev ? { ...prev, dob: e.target.value } : null)}
                />
              ) : (
                <p className="text-foreground mt-1">{patient.dob}</p>
              )}
            </div>

            <div>
              <Label>Sex</Label>
              {editing === 'patient' ? (
                <Select
                  value={editedPatient?.sex || 'M'}
                  onValueChange={(value) => setEditedPatient(prev => prev ? { ...prev, sex: value as 'M' | 'F' | 'O' } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="M">Male</SelectItem>
                    <SelectItem value="F">Female</SelectItem>
                    <SelectItem value="O">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-foreground mt-1">{patient.sex === 'M' ? 'Male' : patient.sex === 'F' ? 'Female' : 'Other'}</p>
              )}
            </div>

            <div>
              <Label>Phone</Label>
              {editing === 'patient' ? (
                <Input
                  value={editedPatient?.phone || ''}
                  onChange={(e) => setEditedPatient(prev => prev ? { ...prev, phone: e.target.value } : null)}
                />
              ) : (
                <p className="text-foreground mt-1">{patient.phone || '-'}</p>
              )}
            </div>

            <div>
              <Label>Email</Label>
              {editing === 'patient' ? (
                <Input
                  type="email"
                  value={editedPatient?.email || ''}
                  onChange={(e) => setEditedPatient(prev => prev ? { ...prev, email: e.target.value } : null)}
                />
              ) : (
                <p className="text-foreground mt-1">{patient.email || '-'}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Medical History */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Medical History</h2>
              <p className="text-sm text-muted-foreground mt-1">Pre-operative assessment details</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (editing === 'form') {
                  handleUpdateForm();
                } else {
                  setEditing('form');
                }
              }}
            >
              {editing === 'form' ? 'Save' : <><Edit className="h-4 w-4 mr-2" />Edit</>}
            </Button>
          </div>

          <div className="space-y-4">
            {Object.entries(form.medical_history as Record<string, string>).map(([key, value]) => (
              <div key={key}>
                <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                {editing === 'form' ? (
                  <Textarea
                    value={editedMedicalHistory?.[key] || ''}
                    onChange={(e) => setEditedMedicalHistory((prev: any) => ({ ...prev, [key]: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <p className="text-foreground mt-1 whitespace-pre-wrap">{value || '-'}</p>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* AI Response */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">AI Assessment</h2>
              <p className="text-sm text-muted-foreground mt-1">Automated risk analysis and recommendations</p>
            </div>
            <StatusBadge status={form.status} />
          </div>

          {response ? (
            <div className="space-y-4">
              <div>
                <Label>AI Analysis</Label>
                <div className="mt-2 p-4 bg-muted rounded-lg">
                  <p className="text-foreground whitespace-pre-wrap">{response.ai_response_text}</p>
                </div>
              </div>

              {response.updated_response && (
                <div>
                  <Label>Updated Assessment</Label>
                  <div className="mt-2 p-4 bg-muted rounded-lg">
                    <p className="text-foreground whitespace-pre-wrap">{response.updated_response}</p>
                  </div>
                </div>
              )}

              {response.status && (
                <div>
                  <Label>Status</Label>
                  <p className="text-foreground mt-1">{response.status}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>No AI assessment available yet.</p>
              <p className="text-sm mt-2">Click "Assess Patient" to generate an AI analysis.</p>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Details;
