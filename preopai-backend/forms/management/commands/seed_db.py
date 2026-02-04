from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import datetime, timedelta
from hospitals.models import Hospital
from patients.models import Patient
from surgeries.models import Surgery
from forms.models import Form, Response


class Command(BaseCommand):
    help = 'Seeds the database with sample data'

    def add_arguments(self, parser):
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before seeding',
        )

    def handle(self, *args, **options):
        if options['clear']:
            self.stdout.write('Clearing existing data...')
            Response.objects.all().delete()
            Form.objects.all().delete()
            Surgery.objects.all().delete()
            Patient.objects.all().delete()
            Hospital.objects.all().delete()
            self.stdout.write(self.style.SUCCESS('✓ Existing data cleared'))

        self.stdout.write('Seeding database...')

        # Create Hospitals
        hospitals = [
            Hospital.objects.create(name='City General Hospital'),
            Hospital.objects.create(name='St. Mary\'s Medical Center'),
            Hospital.objects.create(name='Memorial Healthcare'),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(hospitals)} hospitals'))

        # Create Patients
        patients_data = [
            {
                'hospital': hospitals[0],
                'first_name': 'John',
                'last_name': 'Smith',
                'dob': datetime(1975, 5, 15).date(),
                'sex': 'M',
                'ethnicity': 'Caucasian',
                'phone': '555-0101',
                'email': 'john.smith@example.com',
            },
            {
                'hospital': hospitals[0],
                'first_name': 'Sarah',
                'last_name': 'Johnson',
                'dob': datetime(1988, 8, 22).date(),
                'sex': 'F',
                'ethnicity': 'African American',
                'phone': '555-0102',
                'email': 'sarah.johnson@example.com',
            },
            {
                'hospital': hospitals[1],
                'first_name': 'Michael',
                'last_name': 'Chen',
                'dob': datetime(1965, 3, 10).date(),
                'sex': 'M',
                'ethnicity': 'Asian',
                'phone': '555-0103',
                'email': 'michael.chen@example.com',
            },
            {
                'hospital': hospitals[1],
                'first_name': 'Emily',
                'last_name': 'Rodriguez',
                'dob': datetime(1992, 11, 5).date(),
                'sex': 'F',
                'ethnicity': 'Hispanic',
                'phone': '555-0104',
                'email': 'emily.rodriguez@example.com',
            },
            {
                'hospital': hospitals[2],
                'first_name': 'David',
                'last_name': 'Williams',
                'dob': datetime(1980, 7, 18).date(),
                'sex': 'M',
                'ethnicity': 'Caucasian',
                'phone': '555-0105',
                'email': 'david.williams@example.com',
            },
        ]

        patients = [Patient.objects.create(**data) for data in patients_data]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(patients)} patients'))

        # Create Surgeries
        surgeries_data = [
            {
                'hospital': hospitals[0],
                'patient': patients[0],
                'name': 'Total Knee Replacement',
                'side': 'Right',
                'indication': 'Severe osteoarthritis with pain and limited mobility',
                'scheduled_date': (timezone.now() + timedelta(days=14)).date(),
            },
            {
                'hospital': hospitals[0],
                'patient': patients[1],
                'name': 'Laparoscopic Cholecystectomy',
                'side': None,
                'indication': 'Symptomatic gallstones with recurrent cholecystitis',
                'scheduled_date': (timezone.now() + timedelta(days=7)).date(),
            },
            {
                'hospital': hospitals[1],
                'patient': patients[2],
                'name': 'Coronary Artery Bypass Graft',
                'side': None,
                'indication': 'Triple vessel coronary artery disease',
                'scheduled_date': (timezone.now() + timedelta(days=21)).date(),
            },
            {
                'hospital': hospitals[1],
                'patient': patients[3],
                'name': 'Anterior Cruciate Ligament Reconstruction',
                'side': 'Left',
                'indication': 'Complete ACL tear from sports injury',
                'scheduled_date': (timezone.now() + timedelta(days=10)).date(),
            },
            {
                'hospital': hospitals[2],
                'patient': patients[4],
                'name': 'Lumbar Discectomy',
                'side': None,
                'indication': 'Herniated disc L4-L5 with radiculopathy',
                'scheduled_date': (timezone.now() + timedelta(days=30)).date(),
            },
        ]

        surgeries = [Surgery.objects.create(**data) for data in surgeries_data]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(surgeries)} surgeries'))

        # Create Forms
        forms_data = [
            {
                'hospital': hospitals[0],
                'patient': patients[0],
                'surgery': surgeries[0],
                'medical_history': {
                    'allergies': ['Penicillin'],
                    'medications': ['Lisinopril 10mg daily', 'Metformin 500mg twice daily'],
                    'past_surgeries': ['Appendectomy (2005)'],
                    'chronic_conditions': ['Hypertension', 'Type 2 Diabetes'],
                    'smoking': False,
                    'alcohol': 'Occasional',
                },
                'response': 'Patient presents with controlled hypertension and diabetes. Pre-operative optimization recommended.',
                'status': 'yellow',
            },
            {
                'hospital': hospitals[0],
                'patient': patients[1],
                'surgery': surgeries[1],
                'medical_history': {
                    'allergies': ['None known'],
                    'medications': ['Oral contraceptive'],
                    'past_surgeries': [],
                    'chronic_conditions': [],
                    'smoking': False,
                    'alcohol': 'None',
                },
                'response': 'Healthy patient, low surgical risk. Cleared for surgery.',
                'status': 'green',
            },
            {
                'hospital': hospitals[1],
                'patient': patients[2],
                'surgery': surgeries[2],
                'medical_history': {
                    'allergies': ['Sulfa drugs'],
                    'medications': ['Aspirin 81mg daily', 'Atorvastatin 40mg daily', 'Metoprolol 50mg twice daily'],
                    'past_surgeries': [],
                    'chronic_conditions': ['Coronary Artery Disease', 'Hyperlipidemia'],
                    'smoking': 'Former smoker, quit 5 years ago',
                    'alcohol': 'None',
                },
                'response': 'High-risk cardiac surgery. Cardiology clearance obtained. Close perioperative monitoring required.',
                'status': 'red',
            },
            {
                'hospital': hospitals[1],
                'patient': patients[3],
                'surgery': surgeries[3],
                'medical_history': {
                    'allergies': [],
                    'medications': [],
                    'past_surgeries': [],
                    'chronic_conditions': [],
                    'smoking': False,
                    'alcohol': 'Social',
                },
                'response': 'Young, healthy patient. No significant medical issues. Cleared for surgery.',
                'status': 'green',
            },
            {
                'hospital': hospitals[2],
                'patient': patients[4],
                'surgery': surgeries[4],
                'medical_history': {
                    'allergies': ['Latex', 'Codeine'],
                    'medications': ['Ibuprofen as needed'],
                    'past_surgeries': ['Tonsillectomy (1990)'],
                    'chronic_conditions': ['Chronic lower back pain'],
                    'smoking': False,
                    'alcohol': 'Moderate',
                },
                'response': 'Latex allergy noted - latex-free environment required. Pain management plan discussed.',
                'status': 'yellow',
            },
        ]

        forms = [Form.objects.create(**data) for data in forms_data]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(forms)} forms'))

        # Create Responses (AI-generated responses)
        responses_data = [
            {
                'form': forms[0],
                'hospital': hospitals[0],
                'patient': patients[0],
                'ai_response_text': 'Based on medical history, patient has controlled comorbidities. Recommend HbA1c check and cardiology consultation before knee replacement.',
                'updated_response': 'Patient presents with controlled hypertension and diabetes. Pre-operative optimization recommended.',
                'status': 'yellow',
            },
            {
                'form': forms[2],
                'hospital': hospitals[1],
                'patient': patients[2],
                'ai_response_text': 'High-risk CABG procedure. Patient has significant cardiac history. Ensure cardiac catheterization results are current and cardiology team is aware.',
                'updated_response': 'High-risk cardiac surgery. Cardiology clearance obtained. Close perioperative monitoring required.',
                'status': 'red',
            },
        ]

        responses = [Response.objects.create(**data) for data in responses_data]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(responses)} responses'))

        self.stdout.write(self.style.SUCCESS('\n========================================'))
        self.stdout.write(self.style.SUCCESS('Database seeding completed successfully!'))
        self.stdout.write(self.style.SUCCESS('========================================'))
        self.stdout.write(f'Hospitals: {Hospital.objects.count()}')
        self.stdout.write(f'Patients: {Patient.objects.count()}')
        self.stdout.write(f'Surgeries: {Surgery.objects.count()}')
        self.stdout.write(f'Forms: {Form.objects.count()}')
        self.stdout.write(f'Responses: {Response.objects.count()}')
