# FarmSync - Smart Crop & Expense Tracker

FarmSync is a full-stack web application designed to help farmers manage their crops and track farming-related expenses efficiently.

## Features

* User Registration and Login
* JWT-based Authentication
* Secure User Authentication
* Crop Management

  * Add Crop
  * View Crops
  * Edit Crop
  * Delete Crop
* Expense Management

  * Add Expense
  * View Expenses
  * Edit Expense
  * Delete Expense
* Dashboard
* User-specific crop data
* Crop-wise expense tracking
* Multi-language support
* Protected Routes
* Responsive User Interface

## Technologies Used

### Backend

* Java
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* Maven

### Frontend

* React
* JavaScript
* HTML
* CSS
* Vite

### Database

* MySQL

## Project Structure

```text
FarmSync
│
├── farmsync-backend
│   ├── src
│   │   ├── main
│   │   │   ├── java
│   │   │   │   └── com
│   │   │   │       └── farmsync
│   │   │   │           ├── config
│   │   │   │           ├── controller
│   │   │   │           ├── dto
│   │   │   │           ├── entity
│   │   │   │           ├── repository
│   │   │   │           ├── security
│   │   │   │           └── service
│   │   │   └── resources
│   │   │       ├── queries
│   │   │       ├── application-example.properties
│   │   │       └── ...
│   │   └── test
│   ├── pom.xml
│   └── ...
│
├── farmsync-frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── translations
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## Database Design

FarmSync uses MySQL as the database.

### Main Tables

* users
* crop
* expense

### Relationships

```text
User
 │
 │ 1
 │
 │ *
 ▼
Crop
 │
 │ 1
 │
 │ *
 ▼
Expense
```

* One user can have multiple crops.
* One crop can have multiple expenses.
* Each crop is associated with a user.
* Each expense is associated with a crop.

## Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/SST1303/FarmSync.git
```

### 2. Open the Backend

```text
farmsync-backend
```

Open the backend in Eclipse or VS Code.

### 3. Create MySQL Database

Open MySQL and run:

```sql
CREATE DATABASE farmsync;

USE farmsync;
```

The complete database reference queries are available in:

```text
farmsync-backend/src/main/resources/queries/farmsync_database.sql
```

### 4. Configure Database

Create the following file:

```text
farmsync-backend/src/main/resources/application.properties
```

Add your local MySQL configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/farmsync
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

server.port=55681
```

Replace:

```text
YOUR_MYSQL_PASSWORD
```

with your local MySQL password.

### 5. Run Backend

Run the Spring Boot application.

Backend URL:

```text
http://localhost:55681
```

## Frontend Setup

### 1. Open Frontend Folder

```bash
cd farmsync-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

Frontend will run at:

```text
http://localhost:5173
```

## API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Crop APIs

```text
GET    /api/crops
GET    /api/crops/{id}
POST   /api/crops
PUT    /api/crops/{id}
DELETE /api/crops/{id}
```

### Expense APIs

```text
GET    /api/expenses
GET    /api/expenses/{id}
POST   /api/expenses
PUT    /api/expenses/{id}
DELETE /api/expenses/{id}
```

## Authentication and Security

FarmSync uses JWT-based authentication for securing protected API endpoints.

The application includes:

* User authentication
* JWT token generation
* JWT authentication filter
* Protected routes
* Role-based user information
* Secure API access

Sensitive configuration such as database passwords is not included in the GitHub repository.

## Application Flow

```text
User
 │
 ▼
React Frontend
 │
 │ HTTP Requests
 ▼
Spring Boot REST API
 │
 ▼
Spring Security + JWT
 │
 ▼
Service Layer
 │
 ▼
Repository Layer
 │
 ▼
MySQL Database
```

## Screenshots

Screenshots of the application can be added here.

### Login

Add your Login page screenshot here.

### Dashboard

Add your Dashboard screenshot here.

### Crops

Add your Crops page screenshot here.

### Expenses

Add your Expenses page screenshot here.

## How to Use

1. Register a new account.
2. Login using your credentials.
3. View the Dashboard.
4. Add crops with crop details.
5. Edit or delete crop information when required.
6. Add expenses related to crops.
7. View and manage expenses.
8. Track crop and expense information from the application.

## Future Enhancements

* Crop profit and loss calculation
* Weather information integration
* Crop disease detection
* Notifications and reminders
* Advanced expense reports
* Data visualization and analytics
* Cloud deployment

## Author

**Shraddha Thorat**

GitHub: https://github.com/SST1303

## License

This project is developed for educational and project demonstration purposes.
