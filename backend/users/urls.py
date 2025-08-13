from django.urls import path
from .views import CurrentUserView

urlpatterns = [
    path('/', CurrentUserView.as_view()),
]