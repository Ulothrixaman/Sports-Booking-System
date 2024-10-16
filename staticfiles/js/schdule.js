document.addEventListener('DOMContentLoaded', function () {
    const datePicker = document.getElementById('date-picker');
    datePicker.value = new Date().toISOString().split('T')[0];

    function loadSchedule() {
        const date = datePicker.value;
        fetch(`/api/bookings/by_center_sport_date/?center=1&sport=1&date=${date}`)
            .then(response => response.json())
            .then(data => {
                populateTable(data);
            })
            .catch(error => console.error('Error fetching bookings:', error));
    }

    function populateTable(bookings) {
        const tbody = document.getElementById('schedule-body');
        tbody.innerHTML = '';  // Clear previous entries

        const timeSlots = ['4 AM', '5 AM', '6 AM', '7 AM', '8 AM', '9 AM', '10 AM'];
        timeSlots.forEach((time, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${time}</td>`;
            for (let i = 1; i <= 6; i++) {  // Assume 6 courts
                const cell = document.createElement('td');
                const booking = bookings.find(b => b.time_slot === `${time.split(' ')[0]}:00:00` && b.court === i);
                if (booking) {
                    cell.innerHTML = `<div class="bg-light p-2">${booking.customer_name || 'Coaching'}</div>`;
                    // Add custom classes and styles as needed
                } else {
                    cell.innerHTML = '<div class="p-2"></div>';
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        });
    }

    datePicker.addEventListener('change', loadSchedule);

    // Initial load
    loadSchedule();
});
