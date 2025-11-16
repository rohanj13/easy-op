import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Activity, Plus, ArrowLeft } from "lucide-react";
import { api } from "@/api/api-client";
import { Form, Patient, Surgery } from "@/api/api-types";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState<Form[]>([]);
  const [patients, setPatients] = useState<Record<string, Patient>>({});
  const [surgeries, setSurgeries] = useState<Record<string, Surgery>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Fetch all forms
      const formsResponse = await api.forms.formsList();
      const formsData = formsResponse.data || [];
      console.log('📋 Forms data:', formsData);
      setForms(formsData);

      // Fetch patient details for each form
      const patientIds = [...new Set(formsData.map(f => f.patient))] as string[];
      console.log('👤 Patient IDs to fetch:', patientIds);
      const patientPromises = patientIds.map(id => api.patients.patientsRead(id));
      const patientResponses = await Promise.all(patientPromises);
      
      const patientsMap: Record<string, Patient> = {};
      patientResponses.forEach(response => {
        if (response.data) {
          patientsMap[response.data.id] = response.data;
        }
      });
      console.log('👥 Patients map:', patientsMap);
      setPatients(patientsMap);

      // Fetch surgery details for each form
      const surgeryIds = [...new Set(formsData.map(f => f.surgery))] as string[];
      console.log('🏥 Surgery IDs to fetch:', surgeryIds);
      const surgeryPromises = surgeryIds.map(id => api.surgeries.surgeriesRead(id));
      const surgeryResponses = await Promise.all(surgeryPromises);
      
      const surgeriesMap: Record<string, Surgery> = {};
      surgeryResponses.forEach(response => {
        if (response.data) {
          surgeriesMap[response.data.id!] = response.data;
        }
      });
      console.log('🔪 Surgeries map:', surgeriesMap);
      setSurgeries(surgeriesMap);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-AU', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Hospital Dashboard</h1>
              </div>
            </div>
            <Link to="/new-form">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Form
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Pre-Operative Assessments</h2>
            <p className="text-muted-foreground mt-1">
              Review and manage patient pre-operative forms
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading...</div>
          ) : forms.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <p className="text-muted-foreground">No pre-operative forms found</p>
              <Link to="/new-form">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Form
                </Button>
              </Link>
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>First Name</TableHead>
                    <TableHead>Last Name</TableHead>
                    <TableHead>Date of Birth</TableHead>
                    <TableHead>Sex</TableHead>
                    <TableHead>Surgery Name</TableHead>
                    <TableHead>Surgery Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((form) => {
                    // Detailed debugging
                    console.log('📄 Full form object:', form);
                    console.log('📄 Form keys:', Object.keys(form));
                    console.log('📄 form.patient:', form.patient);
                    console.log('📄 form.surgery:', form.surgery);
                    console.log('📄 form["patient"]:', form["patient"]);
                    console.log('📄 form["surgery"]:', form["surgery"]);
                    
                    const patient = patients[form.patient];
                    const surgery = surgeries[form.surgery];
                    
                    console.log('🔍 Lookup - Patient:', patient, 'Surgery:', surgery);
                    
                    return (
                      <TableRow key={form.id}>
                        <TableCell className="font-medium">
                          {patient?.first_name || 'N/A'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {patient?.last_name || 'N/A'}
                        </TableCell>
                        <TableCell>{formatDate(patient?.dob)}</TableCell>
                        <TableCell>{patient?.sex || '-'}</TableCell>
                        <TableCell>{surgery?.name || 'N/A'}</TableCell>
                        <TableCell>{formatDate(surgery?.scheduled_date)}</TableCell>
                        <TableCell>
                          <StatusBadge status={form.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/details/${form.id}`)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;