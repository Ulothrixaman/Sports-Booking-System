from django.urls import path
from .views import (
    SportListCreateView,
    CourtListCreateView,
    TimeSlotListCreateView,
    FacilityListCreateView,
    booking_list_create_view,
    schedule_view
)

urlpatterns = [
    path('', schedule_view, name='schedule'),
    path('api/sports/', SportListCreateView.as_view(), name='api_sports'),
    path('api/courts/', CourtListCreateView.as_view(), name='api_courts'),
    path('api/time-slots/', TimeSlotListCreateView.as_view(), name='api_time_slots'),
    path('api/facilities/', FacilityListCreateView.as_view(), name='api_facilities'),
    path('api/bookings/', booking_list_create_view, name='api_bookings'),
]
