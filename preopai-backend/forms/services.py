import json
import io
from forms.models import Form
from forms.selectors import form_get
from hospitals.selectors import hospital_get
from patients.selectors import patient_get
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_LEFT

def form_create(
    *,
    hospital_id: str,
    patient_id: str,
    medical_history
) -> Form:
    hospital = hospital_get(id=hospital_id)
    patient = patient_get(id=patient_id)
    form = Form(
        hospital=hospital,
        patient=patient,
        medical_history=medical_history,
    )
    form.save()
    return form

def form_update(
   *,
    id,
    medical_history: str,
    response: str,
    status: str,
) -> Form:
    form = form_get(id=id)
    if medical_history is not None:
        form.medical_history = medical_history
    if response is not None:
        form.response = response
    if status is not None:
        form.status = status
        
    form.save()
    return form

def export_form_pdf(*, id) -> bytes:
    form = form_get(id=id)
    patient = form.patient

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=40, leftMargin=40, topMargin=40, bottomMargin=40)
    elements = []
    styles = getSampleStyleSheet()
    normal = styles["Normal"]
    normal.alignment = TA_LEFT

    # Title
    title_style = styles["Title"]
    elements.append(Paragraph("PreOpAI - Patient & Form Export", title_style))
    elements.append(Spacer(1, 0.2 * inch))

    # Patient Details Section
    elements.append(Paragraph("<b>Patient Details</b>", styles["Heading2"]))
    patient_data = [
        ["Name:", f"{getattr(patient, 'first_name', '')} {getattr(patient, 'last_name', '')}"],
        ["Date of Birth:", getattr(patient, 'dob', '')],
        ["Sex:", getattr(patient, 'get_sex_display', lambda: '')()],
        ["Email:", getattr(patient, 'email', '')],
        ["Phone:", getattr(patient, 'phone', '')],
    ]
    patient_table = Table(patient_data, hAlign='LEFT', colWidths=[1.5*inch, 4.5*inch])
    patient_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.darkblue),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, colors.grey),
    ]))
    elements.append(patient_table)
    elements.append(Spacer(1, 0.2 * inch))

    # Form Details Section
    elements.append(Paragraph("<b>Form Details</b>", styles["Heading2"]))
    form_data = [
        ["Status:", getattr(form, 'get_status_display', lambda: '')()],
        ["Response:", getattr(form, 'response', '')],
    ]
    form_table = Table(form_data, hAlign='LEFT', colWidths=[1.5*inch, 4.5*inch])
    form_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.darkgreen),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('LINEBELOW', (0, -1), (-1, -1), 0.5, colors.grey),
    ]))
    elements.append(form_table)
    elements.append(Spacer(1, 0.2 * inch))

    # Medical History Section
    elements.append(Paragraph("<b>Medical History</b>", styles["Heading2"]))
    medical_history_str = json.dumps(form.medical_history, indent=2) if form.medical_history else "N/A"
    elements.append(Paragraph(f"<font face='Courier'>{medical_history_str.replace(' ', '&nbsp;').replace('\n', '<br/>')}</font>", normal))

    doc.build(elements)
    buffer.seek(0)
    return buffer.read()