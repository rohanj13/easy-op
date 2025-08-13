

# Main Service to calculate the risk score
from .models import CardiacAssessmentResult


def cardiac_risk_assessment(assessment):
    """
    Cardiac pre-op risk assessment based on standard pre-op flow.

    Parameters:
    - active_cardiac_condition: True if patient has ACS, decomp HF, severe AS/MS, ICD malfunction, etc.
    - combined_risk: "Low" or "Elevated" (from RCRI)
    - mets: Functional capacity – "≥4 METs", "<4 METs", or "Unknown" (from DASI)

    Returns:
    - Cardiac Risk Assessment Result
    """
    cardiacAssessmentResult = CardiacAssessmentResult()
    active_cardiac_conditions = check_active_cardiac_conditions(assessment)
    if active_cardiac_conditions.__len__() == 0:
        #recommendations.append("Urgent cardiology/echo/ICD interrogation")
        rcri_score = calculate_rcri_score(assessment)
        cardiacAssessmentResult.rcri_score = rcri_score
        if rcri_score >= 1:
            dasi_score = calculate_dasi_score(assessment)
            cardiacAssessmentResult.dasi_score = dasi_score
            if dasi_score < 34:
                cardiacAssessmentResult.colour = "amber"
                cardiacAssessmentResult.outcomes = "Baseline 12-lead ECG tests to be taken, along with hs-cTn and BNP tests"
                return cardiacAssessmentResult
            else:
                cardiacAssessmentResult.colour = "green"
                cardiacAssessmentResult.outcomes = "Proceed, keep beat-blocker/statin"
                return cardiacAssessmentResult
        else:
            cardiacAssessmentResult.colour = "green"
            cardiacAssessmentResult.outcomes = "Proceed, no further cardiac tests"
            return cardiacAssessmentResult
    else:
        cardiacAssessmentResult.colour = "red"
        cardiacAssessmentResult.outcomes = "Defer - treat/stabilise the cardiac issue"
        return cardiacAssessmentResult

# Service function to check for active cardiac conditions
def check_active_cardiac_conditions(assessment: dict) -> list:
    active_cardiac_conditions = []
    possible_conditions = [
        "unstable_angina", 
        "decompensated_hf", # Is this related to CHF?
        "severe_valve_disease",
        "significant_arrhythmia",
        "recent_mi",
        "icd_malfunction"
    ]
    for condition in possible_conditions:
        if assessment.get(condition):
            active_cardiac_conditions.append(condition)
    return active_cardiac_conditions

# Service function to calculate the RCRI score
def calculate_rcri_score(assessment: dict) -> int:

    rcri_score = 0

    
    if assessment.get("cerebrovascular_disease"): # What is the list of cerebrovascular diseases?
        rcri_score += 1
    if assessment.get("heart_failure"): # History of heart failure, directly from the assessment: Medical History -> Cardiovascular
        rcri_score += 1
    if assessment.get("insulin_use"): # Insulin use for diabetes, directly from the assessment
        rcri_score += 1
    if assessment.get("ischemic_heart_disease"): # History of ischemic heart disease, directly from the assessment: Medical History -> Cardiovascular
        rcri_score += 1
    if assessment.get("serum_creatinine") > 2.0: # How is this calculated? This isn't a field in the assessment currently
        rcri_score += 1
    if assessment.get("high_risk_surgery"): # What constitutes high-risk surgery? This isn't a field in the assessment currently
        rcri_score += 1
    
    return rcri_score

# Service function to calculate the DASI Score
def calculate_dasi_score(assessment: dict) -> float:
    """
    Returns the DASI score based on patient's functional capacity responses.
    Replace field names with actual booleans from your form.
    """
    dasi_map = {
        "self_care": 2.75,
        "walk_indoors": 1.75,
        "walk_block": 2.75,
        "climb_stairs": 5.50,
        "run_short_distance": 8.0,
        "heavy_housework": 8.0,
        "recreational_sports": 11.5,
    }
    score = 0
    for field, value in dasi_map.items():
        if assessment.get(field):
            score += value
    return score
