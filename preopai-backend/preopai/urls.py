from django.contrib import admin
from django.urls import path, include
from hospitals.api.hospital_create_api import HospitalCreateApi
from hospitals.api.hospital_list_api import HospitalListApi
from hospitals.api.hospital_detail_api import HospitalDetailApi
from hospitals.api.hospital_update_api import HospitalUpdateApi

# Add these imports for drf-yasg
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from patients.api.patient_list_api import PatientListApi
from patients.api.patient_create_api import PatientCreateApi
from patients.api.patient_detail_api import PatientDetailApi
from patients.api.patient_update_api import PatientUpdateApi
from forms.api.form_list_api import FormListApi
from forms.api.form_create_api import FormCreateApi
from forms.api.form_detail_api import FormDetailApi
from forms.api.form_update_api import FormUpdateApi
from forms.api.form_export_api import FormExportApi
from ai_engine.api.analyse_api import generate_response_api
from ai_engine.api.response_detail_api import ResponseDetailApi
from ai_engine.api.response_update_api import ResponseUpdateApi
from ai_engine.api.response_list_api import ResponseListApi


patient_patterns = [
    path('', PatientListApi.as_view(), name='list'),
    path('create/', PatientCreateApi.as_view(), name='create'),
    path('<uuid:id>/update/', PatientUpdateApi.as_view(), name='update'),
    path('<uuid:id>/', PatientDetailApi.as_view(), name='detail'),
]

hospital_patterns = [
    path('', HospitalListApi.as_view(), name='list'),
    path('create/', HospitalCreateApi.as_view(), name='create'),
    path('<uuid:id>/update/', HospitalUpdateApi.as_view(), name='update'),
    path('<uuid:id>/', HospitalDetailApi.as_view(), name='detail')

]

form_patterns = [
    path('', FormListApi.as_view(), name='list'),
    path('create/', FormCreateApi.as_view(), name='create'),
    path('<uuid:id>/update/', FormUpdateApi.as_view(), name='update'),
    path('<uuid:id>/', FormDetailApi.as_view(), name='detail'),
    path('form/<uuid:id>/export/', FormExportApi.as_view(), name='form-export')
]

ai_patterns = [
    path('generate/', generate_response_api.as_view(), name='generate-response'),
]

response_patterns = [
    path('', ResponseListApi.as_view(), name='list'),
    path('<uuid:id>/update/', ResponseUpdateApi.as_view(), name='update'),
    path('<uuid:id>/', ResponseDetailApi.as_view(), name='detail'),
]

# Swagger schema view setup
schema_view = get_schema_view(
    openapi.Info(
        title="PreOpAI API",
        default_version='v1',
        description="API documentation for PreOpAI",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('hospitals/', include((hospital_patterns, 'hospitals'))),
    path('patients/', include((patient_patterns, 'patients'))),
    path('forms/', include((form_patterns, 'forms'))),
    path('ai/', include((ai_patterns, 'ai'))),
    path('responses/', include((response_patterns, 'responses'))),
    # Swagger/OpenAPI endpoints:
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]