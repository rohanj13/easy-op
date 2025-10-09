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
import { medicalHistorySchema } from "@/utils/medical-history-schema";
import { Form, Patient, Response } from "@/lib/api-types";
import { toast } from "sonner";
 
const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<Form | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  //const [AIresponse, setAIResponse] = useState<Response | null>(null);
  const [loading, setLoading] = useState(true);
  const [assessing, setAssessing] = useState(false);
  const [editing, setEditing] = useState<'patient' | 'form' | null>(null);

  // Edit states
  const [editedPatient, setEditedPatient] = useState<Patient | null>(null);
  const [editedMedicalHistory, setEditedMedicalHistory] = useState<object>(null);

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
      setResponse(formData?.response || null);
      // const responseData = formData?.id ? await api.responses.responsesRead(formData.id) : null;
      // if (responseData?.data) {
      //   setAIResponse(responseData.data);
      // }

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
        setResponse(aiResponse.updated_response);
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
      const response = await api.forms.formsFormExportList(id);

      // response.data is a Blob now
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);

      // Optional: extract filename from headers if you modify request() to return headers
      const fileName = `form_${id}.pdf`;

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Error exporting PDF:", error);
      toast.error("Failed to export PDF");
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

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column - Patient Info & Medical History */}
          <div className="space-y-6">
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

              {medicalHistorySchema.sections.map((section) => (
                <div key={section.title} className="mb-6 border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-3">{section.title}</h3>
                  {section.fields.map((field) => {
                    const value = (editedMedicalHistory as object)?.[field.key] ?? "";

                    if (field.type === "text" || field.type === "number") {
                      return (
                        <div key={field.key} className="mb-3">
                          <Label>{field.label}</Label>
                          {editing === "form" ? (
                            <Input
                              type={field.type}
                              value={value}
                              onChange={(e) =>
                                setEditedMedicalHistory((prev: object) => ({
                                  ...prev,
                                  [field.key]: e.target.value,
                                }))
                              }
                            />
                          ) : (
                            <p className="text-foreground mt-1">{value || "-"}</p>
                          )}
                        </div>
                      );
                    }

                    if (field.type === "select") {
                      return (
                        <div key={field.key} className="mb-3">
                          <Label>{field.label}</Label>
                          {editing === "form" ? (
                            <Select
                              value={value}
                              onValueChange={(val) =>
                                setEditedMedicalHistory((prev: object) => ({
                                  ...prev,
                                  [field.key]: val,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select..." />
                              </SelectTrigger>
                              <SelectContent>
                                {field.options.map((opt: string) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="text-foreground mt-1">{value || "-"}</p>
                          )}
                        </div>
                      );
                    }

                    if (field.type === "array") {
                      const items = value || [];

                      return (
                        <div key={field.key} className="mb-3">
                          <Label>{field.label}</Label>
                          {editing === "form" ? (
                            <>
                              {items.map((item: string, idx: number) => (
                                <div key={idx} className="mt-2 border p-2 rounded-lg bg-muted">
                                  {field.itemFields ? (
                                    field.itemFields.map((sub) => (
                                      <Input
                                        key={sub.key}
                                        type={sub.type}
                                        placeholder={sub.label}
                                        value={item[sub.key] || ""}
                                        onChange={(e) => {
                                          const updated = [...items];
                                          updated[idx] = {
                                            ...updated[idx],
                                            [sub.key]: e.target.value,
                                          };
                                          setEditedMedicalHistory((prev: object) => ({
                                            ...prev,
                                            [field.key]: updated,
                                          }));
                                        }}
                                        className="mb-2"
                                      />
                                    ))
                                  ) : (
                                    <Input
                                      type="text"
                                      value={item}
                                      onChange={(e) => {
                                        const updated = [...items];
                                        updated[idx] = e.target.value;
                                        setEditedMedicalHistory((prev: object) => ({
                                          ...prev,
                                          [field.key]: updated,
                                        }));
                                      }}
                                    />
                                  )}
                                </div>
                              ))}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditedMedicalHistory((prev: object) => ({
                                    ...prev,
                                    [field.key]: [
                                      ...(items || []),
                                      field.itemFields ? {} : "",
                                    ],
                                  }))
                                }
                                className="mt-2"
                              >
                                + Add {field.label.slice(0, -1)}
                              </Button>
                            </>
                          ) : (
                            <div className="mt-2 space-y-1">
                              {items.length > 0 ? (
                                items.map((item: object, i: number) => (
                                  <p key={i} className="text-foreground">
                                    {typeof item === "string"
                                      ? item
                                      : Object.entries(item)
                                          .map(([k, v]) => `${k}: ${v}`)
                                          .join(", ")}
                                  </p>
                                ))
                              ) : (
                                <p className="text-muted-foreground">-</p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              ))}
            </Card>
          </div>

          {/* Right Column - AI Assessment */}
          <div className="lg:sticky lg:top-4 h-fit">
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Patient Assessment</h2>
                  <p className="text-sm text-muted-foreground mt-1">Pre-operative risk assessment and recommendations</p>
                </div>
                <StatusBadge status={form.status} />
              </div>

              {response ? (
                <div className="space-y-4">
                  <div>
                    <Label>Pre-operative Analysis</Label>
                    <div className="mt-2 p-4 bg-muted rounded-lg">
                      <p className="text-foreground whitespace-pre-wrap">{response}</p>
                    </div>
                  </div>
                  {/* <div>
                    <Label>AI Response</Label>
                    <div className="mt-2 p-4 bg-muted rounded-lg">
                      <p className="text-foreground whitespace-pre-wrap">{AIresponse.ai_response_text}</p>
                    </div>
                  </div> */}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No AI assessment available yet.</p>
                  <p className="text-sm mt-2">Click "Assess Patient" to generate an AI analysis.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;