from rest_framework import serializers
from .models import Sport, Court, TimeSlot, Booking, Facility

class SportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sport
        fields = '__all__'

class CourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Court
        fields = '__all__'

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'

class FacilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Facility
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    court_name = serializers.ReadOnlyField(source='court.name')
    time_slot_display = serializers.ReadOnlyField(source='time_slot.get_time_display')

    class Meta:
        model = Booking
        fields = '__all__'
