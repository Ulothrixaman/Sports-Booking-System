from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Sport, Court, TimeSlot, Booking, Facility
from .serializers import SportSerializer, CourtSerializer, TimeSlotSerializer, BookingSerializer, FacilitySerializer

# API Views

class SportListCreateView(generics.ListCreateAPIView):
    queryset = Sport.objects.all()
    serializer_class = SportSerializer

class CourtListCreateView(generics.ListCreateAPIView):
    serializer_class = CourtSerializer

    def get_queryset(self):
        sport_id = self.request.GET.get('sport_id')
        if sport_id:
            return Court.objects.filter(sport_id=sport_id)
        return Court.objects.all()

class TimeSlotListCreateView(generics.ListCreateAPIView):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer

class FacilityListCreateView(generics.ListCreateAPIView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

@api_view(['GET', 'POST'])
def booking_list_create_view(request):
    if request.method == 'GET':
        facility_id = request.GET.get('facility_id')
        sport_id = request.GET.get('sport_id')
        date = request.GET.get('date')

        bookings = Booking.objects.filter(
            facility_id=facility_id,
            sport_id=sport_id,
            date=date
        )
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            # Check for booking conflicts
            conflicts = Booking.objects.filter(
                court_id=serializer.validated_data['court'].id,
                date=serializer.validated_data['date'],
                time_slot_id=serializer.validated_data['time_slot'].id
            )
            if conflicts.exists():
                return Response({'error': 'This time slot is already booked for the selected court.'}, status=400)
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Render the Schedule Page
def schedule_view(request):
    return render(request, 'schdule.html')
