from django.contrib import admin
from .models import Surgery

@admin.register(Surgery)
class SurgeryAdmin(admin.ModelAdmin):
    list_display = ("id", "hospital", "patient", "name", "scheduled_date")
    search_fields = ("name", "indication", "patient__first_name", "patient__last_name")
    list_filter = ("hospital", "scheduled_date")
