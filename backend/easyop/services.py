def calculate_risk_score(assessment):
    """
    Calculate the risk score based on the pre-operative assessment data.
    Sample calculation: BMI + conditions + medications.
    """
    bmi = assessment.weight / ((assessment.height / 100) ** 2)  # Convert height to meters
    risk_score = bmi  # Start with BMI as a base risk factor
    
    if assessment.existing_conditions:
        risk_score += 10  # Example: Add risk for pre-existing conditions

    if assessment.medications:
        risk_score += 5  # Example: Add risk for medications

    return min(risk_score, 100)  # Keep it within a max limit