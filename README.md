# AdaniConnect – Alumni–Student Networking & Job Portal

**AdaniConnect** is a full-stack web application that connects students and alumni of a university.  
Students can network with alumni, request mentorship, and discover job opportunities posted by alumni.

---

## Features

### Student
- Register & maintain a personal profile
- Browse alumni directory
- Send connection/mentorship requests
- View accepted connections
- View and apply to job opportunities posted by alumni

### Alumni
- Register & maintain a professional profile
- View and respond (Accept / Decline) to connection requests
- Post job opportunities (title, company, skills, description, link)
- Manage accepted connections

### Security & Auth
- JWT-based authentication (login & protected routes)
- Role-based access control (Student vs Alumni)

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Auth:** JWT (JSON Web Tokens)

---

## Installation & Setup

### Prerequisites
- Node.js v16+
- MongoDB

### Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/adani-connect.git


## Backend Setup

 1. ```bash
    cd backend
    npm install

## Backend Setup

1. **Install dependencies:**
   ```bash
      cd backend
      npm install
   
2. **Create a .env file in backend with:**

   ```ini
    PORT=your_port
    MONGO_URI=your_mongo_connection_string
    JWT_SECRET=your_jwt_secret

3. **Start the backend server:**

   ```bash
   npm run dev


## Frontend Setup

1. **Install dependencies:**
    ```bash
    cd ../frontend
    npm install

2. **Create a .env file in backend with:**

   ```ini
   VITE_API_URL=http://localhost:5000/api

3. **Start the backend server:**

   ```bash
   npm run dev


## Usage Flow

1. Register a new user as **Student** or **Alumni**.

2. **Students** can:
   - View list of alumni
   - Send connection requests
   - Browse and apply to job opportunities

3. **Alumni** can:
   - View and respond to connection requests
   - Post job opportunities

4. Both roles can view accepted connections



## API Endpoints (Summary)

### Auth
1. `POST /api/auth/register` - Register user  
2. `POST /api/auth/login` - Login

### Profile
1. `GET /api/profile/me` - Get own profile  
2. `PUT /api/profile/me` - Update own profile  
3. `GET /api/profile/alumni` - Student: list alumni  
4. `GET /api/profile/students` - Alumni: list students

### Connection Requests
1. `POST /api/request` - Student sends connection request  
2. `GET /api/request/student` - Student views sent requests  
3. `GET /api/request/alumni` - Alumni views received requests  
4. `PUT /api/request/:id` - Alumni accepts/declines request  
5. `GET /api/request/connections` - View accepted connections

### Job Posts
1. `POST /api/posts` - Alumni creates job post  
2. `GET /api/posts` - View all job posts




## Future Enhancements

1. Real-time notifications
2. Advanced search & filters
3. Profile picture uploads
4. Chat or messaging feature

---

## License

MIT

---

## Author

Parth Babariya
