from django.db import models

class Facility(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Sport(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Court(models.Model):
    name = models.CharField(max_length=100)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class TimeSlot(models.Model):
    start_time = models.TimeField()
    end_time = models.TimeField()

    def get_time_display(self):
        return f"{self.start_time.strftime('%H:%M')} - {self.end_time.strftime('%H:%M')}"

    def __str__(self):
        return self.get_time_display()

class Booking(models.Model):
    facility = models.ForeignKey(Facility, on_delete=models.CASCADE)
    sport = models.ForeignKey(Sport, on_delete=models.CASCADE)
    court = models.ForeignKey(Court, on_delete=models.CASCADE)
    date = models.DateField()
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    booked_by = models.CharField(max_length=100)
    booked_for = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.court.name} on {self.date} at {self.time_slot}"
