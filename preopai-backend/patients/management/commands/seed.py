import uuid
from django.core.management.base import BaseCommand
from hospitals.models import Hospital
from patients.models import Patient

class Command(BaseCommand):
    help = "Seed the database with sample data for testing"

    def handle(self, *args, **kwargs):
        self.stdout.write("Seeding the database...")

        # Create Hospitals
        hospitals = []
        for i in range(2):
            hospital = Hospital.objects.create(
                id=uuid.uuid4(),
                name=f"Hospital {i + 1}"
            )
            hospitals.append(hospital)

        self.stdout.write(f"Created {len(hospitals)} hospitals.")

        # Create Patients
        patients = []
        for i in range(10):
            patient = Patient.objects.create(
                id=uuid.uuid4(),
                hospital=hospitals[i % 2],  # Alternate between the two hospitals
                first_name=f"PatientFirst{i + 1}",
                last_name=f"PatientLast{i + 1}",
                dob=f"199{i}-01-01",
                sex=["M", "F", "O"][i % 3],  # Cycle through M, F, O
                phone=f"123456789{i}",
                email=f"patient{i}@example.com"
            )
            patients.append(patient)

        self.stdout.write(f"Created {len(patients)} patients.")

        self.stdout.write("Database seeding completed!")