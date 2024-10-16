// DOM Elements
const facilitySelect = document.getElementById('facility-select');
const sportSelect = document.getElementById('sport-select');
const dateSelect = document.getElementById('date-select');
const bookingsTableBody = document.querySelector('#bookings-table tbody');
const courtSelect = document.getElementById('court-select');
const timeSlotSelect = document.getElementById('time-slot-select');
const bookingForm = document.getElementById('booking-form');
const userNameInput = document.getElementById('user-name');

// CSRF Token
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// Initialize Application
function init() {
    fetchFacilities();
    populateDate();
    fetchSports();
    fetchTimeSlots();

    // Event Listeners
    facilitySelect.addEventListener('change', updateBookings);
    sportSelect.addEventListener('change', () => {
        updateCourts();
        updateBookings();
    });
    dateSelect.addEventListener('change', updateBookings);
    bookingForm.addEventListener('submit', handleBookingFormSubmit);
}

// Fetch and populate facilities
function fetchFacilities() {
    fetch('/api/facilities/')
        .then(response => response.json())
        .then(data => {
            facilitySelect.innerHTML = '';
            data.forEach(facility => {
                const option = document.createElement('option');
                option.value = facility.id;
                option.textContent = facility.name;
                facilitySelect.appendChild(option);
            });
            updateBookings();
        })
        .catch(error => {
            console.error('Error fetching facilities:', error);
        });
}

// Populate Date with Today's Date
function populateDate() {
    const today = new Date().toISOString().split('T')[0];
    dateSelect.value = today;
}

// Fetch and populate sports
function fetchSports() {
    fetch('/api/sports/')
        .then(response => response.json())
        .then(data => {
            sportSelect.innerHTML = '';
            data.forEach(sport => {
                const option = document.createElement('option');
                option.value = sport.id;
                option.textContent = sport.name;
                sportSelect.appendChild(option);
            });
            updateCourts();
            updateBookings();
        })
        .catch(error => {
            console.error('Error fetching sports:', error);
        });
}

// Update Courts Based on Selected Sport
function updateCourts() {
    const selectedSportId = parseInt(sportSelect.value);
    fetch(`/api/courts/?sport_id=${selectedSportId}`)
        .then(response => response.json())
        .then(data => {
            courtSelect.innerHTML = '';
            data.forEach(court => {
                const option = document.createElement('option');
                option.value = court.id;
                option.textContent = court.name;
                courtSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching courts:', error);
        });
}

// Fetch and populate time slots
function fetchTimeSlots() {
    fetch('/api/time-slots/')
        .then(response => response.json())
        .then(data => {
            timeSlotSelect.innerHTML = '';
            data.forEach(timeSlot => {
                const option = document.createElement('option');
                option.value = timeSlot.id;
                option.textContent = `${timeSlot.start_time} - ${timeSlot.end_time}`;
                timeSlotSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching time slots:', error);
        });
}

// Update Bookings Table
function updateBookings() {
    bookingsTableBody.innerHTML = '';
    const selectedFacilityId = parseInt(facilitySelect.value);
    const selectedSportId = parseInt(sportSelect.value);
    const selectedDate = dateSelect.value;

    fetch(`/api/bookings/?facility_id=${selectedFacilityId}&sport_id=${selectedSportId}&date=${selectedDate}`)
        .then(response => response.json())
        .then(data => {
            if (data.length === 0) {
                const row = bookingsTableBody.insertRow();
                const cell = row.insertCell(0);
                cell.colSpan = 4;
                cell.textContent = 'No bookings available.';
            } else {
                data.forEach(booking => {
                    const row = bookingsTableBody.insertRow();
                    row.insertCell(0).textContent = booking.court_name;
                    row.insertCell(1).textContent = booking.time_slot_display;
                    row.insertCell(2).textContent = booking.booked_by;
                    row.insertCell(3).textContent = booking.booked_for;
                });
            }
        })
        .catch(error => {
            console.error('Error fetching bookings:', error);
        });
}

// Handle Booking Form Submission
function handleBookingFormSubmit(event) {
    event.preventDefault();

    const selectedSportId = parseInt(sportSelect.value);
    const selectedSportName = sportSelect.options[sportSelect.selectedIndex].textContent;
    const userName = userNameInput.value;

    const newBooking = {
        facility: parseInt(facilitySelect.value),
        sport: selectedSportId,
        court: parseInt(courtSelect.value),
        date: dateSelect.value,
        time_slot: parseInt(timeSlotSelect.value),
        booked_by: userName,
        booked_for: selectedSportName,
    };

    // Send booking to the backend
    fetch('/api/bookings/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(newBooking)
    })
    .then(response => {
        if (response.ok) {
            alert('Booking created successfully.');
            updateBookings();
            bookingForm.reset();
        } else {
            return response.json().then(data => {
                throw new Error(data.error || 'Error creating booking.');
            });
        }
    })
    .catch(error => {
        alert(error.message);
    });
}

// Initialize the App
document.addEventListener('DOMContentLoaded', function() {
    init();
});
