from django.test import TestCase
from AssessmentCardiac.services import (
    cardiac_risk_assessment,
    check_active_cardiac_conditions,
    calculate_rcri_score,
    calculate_dasi_score,
)
from AssessmentCardiac.models import CardiacAssessmentResult


class CardiacAssessmentServiceTests(TestCase):
    def setUp(self):
        self.sample_assessment = {
            # Active conditions
            "unstable_angina": False,
            "decompensated_hf": False,
            "severe_valve_disease": False,
            "significant_arrhythmia": False,
            "recent_mi": False,
            "icd_malfunction": False,

            # RCRI
            "high_risk_surgery": True,
            "cerebrovascular_disease": True,
            "heart_failure": False,
            "insulin_use": False,
            "ischemic_heart_disease": True,
            "serum_creatinine": 2.5,

            # Functional capacity (DASI)
            "self_care": True,
            "walk_indoors": True,
            "walk_block": False,
            "climb_stairs": False,
            "run_short_distance": False,
            "heavy_housework": False,
            "recreational_sports": False,
        }

    def test_check_active_cardiac_conditions(self):
        assessment = self.sample_assessment.copy()
        assessment["unstable_angina"] = True
        active_conditions = check_active_cardiac_conditions(assessment)
        self.assertIn("unstable_angina", active_conditions)
        self.assertEqual(len(active_conditions), 1)

    def test_calculate_rcri_score(self):
        assessment = self.sample_assessment.copy()
        rcri_score = calculate_rcri_score(assessment)
        self.assertEqual(rcri_score, 4)  # cerebrovascular_disease, high_risk_surgery, ischemic_heart_disease, serum_creatinine > 2.0

    def test_calculate_dasi_score(self):
        assessment = self.sample_assessment.copy()
        dasi_score = calculate_dasi_score(assessment)
        self.assertEqual(dasi_score, 4.5)  # self_care (2.75) + walk_indoors (1.75)

    def test_cardiac_risk_assessment_high_risk(self):
        assessment = self.sample_assessment.copy()
        assessment["unstable_angina"] = True
        result = cardiac_risk_assessment(assessment)
        self.assertEqual(result.colour, "red")
        self.assertEqual(result.outcomes, "Defer - treat/stabilise the cardiac issue")

    def test_cardiac_risk_assessment_amber_risk(self):
        assessment = self.sample_assessment.copy()
        assessment["unstable_angina"] = False
        assessment["serum_creatinine"] = 2.5  # Above threshold
        assessment["self_care"] = True
        assessment["walk_indoors"] = True
        assessment["walk_block"] = False
        result = cardiac_risk_assessment(assessment)
        self.assertEqual(result.colour, "amber")
        self.assertEqual(
            result.outcomes,
            "Baseline 12-lead ECG tests to be taken, along with hs-cTn and BNP tests",
        )

    def test_cardiac_risk_assessment_low_risk(self):
        assessment = self.sample_assessment.copy()
        # Ensure all RCRI-related fields are set to result in an RCRI score of 0
        assessment["unstable_angina"] = False
        assessment["high_risk_surgery"] = False
        assessment["cerebrovascular_disease"] = False
        assessment["heart_failure"] = False
        assessment["insulin_use"] = False
        assessment["ischemic_heart_disease"] = False
        assessment["serum_creatinine"] = 1.0  # Below threshold

        result = cardiac_risk_assessment(assessment)
        self.assertEqual(result.colour, "green")
        self.assertEqual(result.outcomes, "Proceed, no further cardiac tests")