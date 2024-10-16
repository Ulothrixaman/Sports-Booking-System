## IIT2021181

## Facility Booking System [https://web-production-4985.up.railway.app/]
This is a Django-based web application for booking facilities, such as sports courts and resources. The application allows users to:

- View available facilities, sports, courts, and time slots dynamically.
- Create bookings that are stored persistently in the backend.
- Prevent booking conflicts through server-side validation.
# Table of Contents
- Prerequisites
- Installation
- Database Setup
- Running the Application
- Usage
- API Endpoints
- Notes
# Prerequisites
Before setting up the project, ensure you have the following installed on your system:

- Python 3.6 or higher
- pip (Python package installer)
- Virtualenv (optional but recommended)
- Django 3.x or higher
- Git (to clone the repository)
# Installation
Follow these steps to set up the project on your local machine.

## 1. Clone the Repository
bash
Copy code
git clone https://github.com/yourusername/facility-booking-system.git
cd facility-booking-system
## 2. Create a Virtual Environment
It's good practice to use a virtual environment to manage your Python dependencies.

```
# Using virtualenv
virtualenv venv
source venv/bin/activate
```

## Or using Python's built-in venv
```
python3 -m venv venv
source venv/bin/activate
```
## 3. Install Dependencies
Install the required Python packages using pip.

```
pip3 install -r requirements.txt
```
Note: Ensure that a requirements.txt file exists in the root directory with all necessary dependencies listed.

## 4. Configure the Django Settings (Optional)
If you need to customize the settings (e.g., database settings), edit the settings.py file in your Django project's directory.

# Database Setup
## 1. Apply Migrations
Run the following commands to create the necessary database tables.

```
python manage.py makemigrations
python manage.py migrate
```
## 2. Create a Superuser (Optional)
If you wish to access the Django admin interface.

```
python manage.py createsuperuser
```
Follow the prompts to set up your admin username and password.

## 3. Populate Initial Data
You need to populate the database with initial data for facilities, sports, courts, and time slots.

## Option 1: Using Django Admin Interface
- Run the development server: python manage.py runserver
- Navigate to http://localhost:8000/admin/
- Log in with your superuser credentials.
- Add facilities, sports, courts, and time slots via the admin interface.
## Option 2: Using a Script
- You can create a script populate_data.py inside your app directory to populate initial data.

## Running the Application
Start the Django development server:

```
python manage.py runserver
The application will be accessible at http://localhost:8000/.
```

# Usage
## Accessing the Booking System
- Navigate to http://localhost:8000/ in your web browser.
- The homepage will display the facility booking interface.
## Booking a Facility
- **Select Facility**: Choose a facility from the dropdown.
- **Select Sport**: Choose a sport; the courts will update based on the selected sport.
- **Select Date**: Pick a date; defaults to today's date.
- **View Bookings**: Existing bookings for the selected options will display in the table.
## Create a New Booking:
- Select a court/resource.
- Select a time slot.
- Enter your name.
- Click "Create Booking" to submit.
## Booking Validation
- The system checks for booking conflicts.
- If a time slot is already booked for the selected court, an error message will display.
# API Endpoints
The application provides several API endpoints for fetching data dynamically.

- Sports: /api/sports/ (GET, POST)
- Courts: /api/courts/?sport_id=<sport_id> (GET, POST)
- Time Slots: /api/time-slots/ (GET, POST)
- Facilities: /api/facilities/ (GET, POST)
- Bookings: /api/bookings/ (GET, POST)

# Demo
![Screenshot from 2024-10-17 00-48-38](https://github.com/user-attachments/assets/3a5412b5-9dc0-4f41-964e-ab34ffd21b42)
