from datetime import date
import json
import io
from forms.models import Form, Surgery
from forms.selectors import form_get
from hospitals.selectors import hospital_get
from patients.selectors import patient_get
from surgeries.selectors import surgery_get
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.pdfgen.canvas import Canvas
from reportlab.lib.units import inch

def form_create(
    *,
    hospital_id: str,
    patient_id: str,
    surgery_id= str,
    medical_history,
) -> Form:
    hospital = hospital_get(id=hospital_id)
    patient = patient_get(id=patient_id)
    surgery = surgery_get(id=surgery_id)
    form = Form(
        hospital=hospital,
        patient=patient,
        surgery=surgery,
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

def header_footer(canvas: Canvas, doc):
    canvas.saveState()
    # Header
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(40, 770, "PreOpAI - Preoperative Assessment")
    canvas.setFont("Helvetica", 8)
    canvas.drawRightString(570, 770, date.today().strftime("%d %b %Y"))

    # Footer
    canvas.setFont("Helvetica", 8)
    canvas.drawString(40, 30, "Patient Form Export")
    canvas.drawRightString(570, 30, f"Page {doc.page}")
    canvas.restoreState()


def section_header(text, styles):
    """Styled section header bar"""
    data = [[Paragraph(f"<b>{text}</b>", styles["Heading2"])]]
    table = Table(data, colWidths=[6*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#e8f0fe")),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor("#1a237e")),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
    ]))
    return table


def _draw_json_as_table(json_obj, elements, styles, level=0):
    """
    Recursively adds key-value pairs from a JSON object to the PDF elements as tables.
    """
    if isinstance(json_obj, dict):
        data = []
        for key, value in json_obj.items():
            if isinstance(value, (dict, list)):
                data.append([f"{' ' * (level*2)}<b>{key}:</b>", ""])
                _draw_json_as_table(value, elements, styles, level=level+1)
            else:
                data.append([f"{' ' * (level*2)}<b>{key}:</b>", str(value)])
        if data:
            table = Table(data, hAlign='LEFT', colWidths=[2.2*inch, 3.8*inch])
            table.setStyle(TableStyle([
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 0), (-1, -1), 10),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
                ('TOPPADDING', (0, 0), (-1, -1), 4),
                ('LEFTPADDING', (0, 0), (-1, -1), 8 + level*8),
                ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.whitesmoke, colors.lightgrey]),
                ('LINEBELOW', (0, -1), (-1, -1), 0.25, colors.lightgrey),
            ]))
            elements.append(table)
    elif isinstance(json_obj, list):
        for item in json_obj:
            if isinstance(item, (dict, list)):
                _draw_json_as_table(item, elements, styles, level=level+1)
            else:
                elements.append(Paragraph(f"{' ' * (level*2)}• {str(item)}", styles["Normal"]))


def export_form_pdf(*, id) -> bytes:
    form = form_get(id=id)
    patient = form.patient
    surgery = form.surgery

    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=40, leftMargin=40, topMargin=60, bottomMargin=40
    )
    elements = []
    styles = getSampleStyleSheet()
    styles["Normal"].leading = 14
    styles["Normal"].alignment = TA_LEFT

    # Title
    elements.append(Paragraph("PreOpAI - Patient & Form Export", styles["Title"]))
    elements.append(Spacer(1, 0.2 * inch))

    # Patient Details Section
    elements.append(section_header("Patient Details", styles))
    elements.append(Spacer(1, 0.1 * inch))
    patient_data = [
        ["Name:", f"{getattr(patient, 'first_name', '')} {getattr(patient, 'last_name', '')}"],
        ["Date of Birth:", getattr(patient, 'dob', '')],
        ["Sex:", getattr(patient, 'get_sex_display', lambda: '')()],
        ["Ethnicity:", getattr(patient, 'ethnicity', '')],
        ["Email:", getattr(patient, 'email', '')],
        ["Phone:", getattr(patient, 'phone', '')],
    ]
    patient_table = Table(patient_data, hAlign='LEFT', colWidths=[1.5*inch, 4.5*inch])
    patient_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor("#0d47a1")),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (1, 0), (1, -1), [colors.whitesmoke, colors.lightgrey]),
        ('LINEBELOW', (0, -1), (-1, -1), 0.25, colors.grey),
    ]))
    elements.append(patient_table)
    elements.append(Spacer(1, 0.2 * inch))

    elements.append(section_header("Surgery Details", styles))
    elements.append(Spacer(1, 0.1 * inch))
    
    # Helper to format the date or return N/A
    def format_date(dt):
        if isinstance(dt, date):
            return dt.strftime('%d %b %Y')
        return 'N/A'

    
    surgery_data = [
        ["Procedure:", getattr(surgery, 'name', 'N/A')],
        ["Side:", getattr(surgery, 'side', 'N/A') or 'N/A'], # Use 'N/A' if side is None or empty string
        ["Indication:", getattr(surgery, 'indication', 'N/A')],
        ["Scheduled Date:", format_date(getattr(surgery, 'scheduled_date', None))],
    ]
    
    surgery_table = Table(surgery_data, hAlign='LEFT', colWidths=[1.5*inch, 4.5*inch])
    surgery_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor("#ff6f00")), # Using a new color for distinction
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (1, 0), (1, -1), [colors.whitesmoke, colors.lightgrey]),
        ('LINEBELOW', (0, -1), (-1, -1), 0.25, colors.grey),
    ]))
    elements.append(surgery_table)

    elements.append(Spacer(1, 0.2 * inch))

    # Form Details Section
    elements.append(section_header("Form Details", styles))
    elements.append(Spacer(1, 0.1 * inch))
    form_data = [
        ["Status:", getattr(form, 'get_status_display', lambda: '')()],
        ["Response:", getattr(form, 'response', '')],
    ]
    form_table = Table(form_data, hAlign='LEFT', colWidths=[1.5*inch, 4.5*inch])
    form_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.lightgrey),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor("#1b5e20")),
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica'),
        ('FONTSIZE', (0, 0), (-1, -1), 11),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('ROWBACKGROUNDS', (1, 0), (1, -1), [colors.whitesmoke, colors.lightgrey]),
        ('LINEBELOW', (0, -1), (-1, -1), 0.25, colors.grey),
    ]))
    elements.append(form_table)
    elements.append(Spacer(1, 0.2 * inch))

    # Medical History Section
    elements.append(section_header("Medical History", styles))
    elements.append(Spacer(1, 0.1 * inch))
    medical_history = form.medical_history if form.medical_history else {"Notes": "N/A"}
    _draw_json_as_table(medical_history, elements, styles)

    doc.build(elements, onFirstPage=header_footer, onLaterPages=header_footer)
    buffer.seek(0)
    return buffer.read()