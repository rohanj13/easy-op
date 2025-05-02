# Main Service to calculate the risk score


# Service function to check for active cardiac conditions

# Service function to calculate the RCRI score
def calculate_rcri_score(assessment):

    rcri_score = 0

    
    if assessment.cerebrovascular_disease: # What is the list of cerebrovascular diseases?
        rcri_score += 1
    if assessment.heart_failure: # History of heart failure, directly from the assessment: Medical History -> Cardiovascular
        rcri_score += 1
    if assessment.insulin_use: # Insulin use for diabetes, directly from the assessment
        rcri_score += 1
    if assessment.ischemic_heart_disease: # History of ischemic heart disease, directly from the assessment: Medical History -> Cardiovascular
        rcri_score += 1
    if assessment.serum_creatinine > 2.0: # How is this calculated? This isn't a field in the assessment currently
        rcri_score += 1
    if assessment.high_risk_surgery: # What constitutes high-risk surgery? This isn't a field in the assessment currently
        rcri_score += 1
    
    return rcri_score


    # Add more conditions as per the RCRI criteria

# Service function to calculate the DASI Score