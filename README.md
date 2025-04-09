# Inventory Management System
### A full-stack Inventory Management System built with Angular, ASP.NET Core Web API, and SQL Server. Designed to help businesses efficiently manage inventory items, supplier data, ### and logs through a responsive, user-friendly interface.

✨ Features
🔐 Authentication & Authorization

Role-based access for Admins and Users

Secure login and registration

📦 Inventory Management

Add, update, delete, and search inventory items

Track quantity, price, supplier, and part details

🧾 Supplier Management

Add and manage supplier details

Link inventory items to suppliers

📚 Activity Logs

Track user actions like inventory edits and deletions

📊 Dashboard Overview

View summaries of total inventory, suppliers, and system logs

🛠️ Responsive Frontend

Built with Angular and styled for usability on desktop and mobile devices

🧱 Tech Stack
Layer	Technology
Frontend	Angular, TypeScript, HTML, CSS
Backend	ASP.NET Core Web API (C#)
Database	SQL Server
Tools	Entity Framework Core, Swagger
DevOps	Docker (optional), Git/GitHub
🚀 Getting Started
Prerequisites
.NET SDK

Node.js + Angular CLI

SQL Server

Visual Studio / VS Code

Postman (for testing APIs)

Backend Setup (ASP.NET Core)
Clone the repo:

bash
Copy
Edit
git clone https://github.com/Babane-N/inventory-management-system.git
Navigate to the backend folder:

bash
Copy
Edit
cd backend
Update the appsettings.json with your SQL Server connection string.

Run database migrations:

bash
Copy
Edit
dotnet ef database update
Start the API:

bash
Copy
Edit
dotnet run
Frontend Setup (Angular)
Navigate to the frontend folder:

bash
Copy
Edit
cd frontend
Install dependencies:

bash
Copy
Edit
npm install
Start the Angular app:

bash
Copy
Edit
ng serve
Open in browser:
http://localhost:4200

📁 Project Structure
css
Copy
Edit
├── backend
│   ├── Controllers
│   ├── Models
│   ├── DTOs
│   ├── Services
│   ├── DataContext.cs
│   └── Program.cs
├── frontend
│   ├── src
│   │   ├── app
│   │   ├── components
│   │   ├── services
│   │   └── models
└── README.md
📌 Future Improvements
Add user profile management

Generate inventory reports (PDF/CSV)

Implement email notifications

Add unit testing for frontend and backend

Deploy using Docker containers or cloud services
