from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from easyop.models import PreOpAssessment

class CognitoUserManager(BaseUserManager):
    def create_user(self, cognito_sub, email, role='patient', password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        if not cognito_sub:
            raise ValueError('Users must have a Cognito sub')
        email = self.normalize_email(email)
        user = self.model(
            cognito_sub=cognito_sub,
            email=email,
            role=role,
            **extra_fields
        )
        user.set_unusable_password()  # Cognito handles authentication
        user.save(using=self._db)
        return user

    def create_superuser(self, cognito_sub, email, role='doctor', password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(cognito_sub, email, role, password, **extra_fields)

class CognitoUser(AbstractBaseUser, PermissionsMixin):
    cognito_sub = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)

    USER_ROLES = (
        ('patient', 'Patient'),
        ('doctor', 'Doctor'),
        ('nurse', 'Nurse'),
    )
    role = models.CharField(max_length=10, choices=USER_ROLES, default='patient')
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['cognito_sub']

    objects = CognitoUserManager()

    def __str__(self):
        return f"{self.email} ({self.role})"

class PatientFormAccessLog(models.Model):
    accessor = models.ForeignKey(CognitoUser, on_delete=models.CASCADE)
    patient_form = models.ForeignKey(PreOpAssessment, on_delete=models.CASCADE)
    action = models.CharField(max_length=50)  # 'viewed', 'edited', 'deleted'
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.accessor.email} {self.action} form {self.patient_form.id} at {self.timestamp}"