from rest_framework.permissions import BasePermission

class IsDoctor(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'doctor'

class IsNurse(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role == 'nurse'

class IsDoctorOrNurse(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.role in ['doctor', 'nurse']