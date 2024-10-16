from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

class SportAdmin(admin.ModelAdmin):
    list_display = ('name',)

class CourtAdmin(admin.ModelAdmin):
    list_display = ('sport','name',)

class TimeAdmin(admin.ModelAdmin):
    list_display = ('start_time','end_time')

class FacilityAdmin(admin.ModelAdmin):
    list_display = ('name',)



admin.site.register(Sport, SportAdmin)
admin.site.register(Court, CourtAdmin)
admin.site.register(TimeSlot, TimeAdmin)
admin.site.register(Facility, FacilityAdmin)
