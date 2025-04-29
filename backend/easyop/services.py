def calculate_risk_score(assessment):
    """
    Sample risk calculation based on BMI and existing conditions.
    """
    bmi = assessment.weight / ((assessment.height / 100) ** 2)  # Convert height to meters
    risk_score = 0

    # BMI-based risk scoring
    if bmi < 18.5:
        risk_score += 1  # Underweight risk
    elif bmi > 30:
        risk_score += 3  # Obesity risk
    else:
        risk_score += 2  # Normal weight, lower risk

    # Check existing conditions
    if assessment.existing_conditions:
        risk_score += 2  # Increase risk for existing conditions

    #TODO: Implement and call the check for active cardiac conditions
    #TODO: Implement and calculate the RCRI score function
    #TODO: Implement and calculate the DASI score function

    return risk_score