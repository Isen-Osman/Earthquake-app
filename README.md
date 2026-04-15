# 🌍 Earthquake Monitor

A full-stack application for real-time monitoring of global seismic activity. Data is fetched directly from the **USGS (United States Geological Survey)** and presented through a modern web interface.

---

## 🚀 Quick Start (Docker)

The easiest way to run the entire stack (Database, Backend, and Frontend) is using Docker Compose.

### 1. Clone the repository
```bash
git clone https://github.com/Isen-Osman/Earthquake-app.git
cd Earthquake-app
```

### 2. Start the application
```bash
docker-compose up --build
```

### 3. Access the services
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:8081/api/v1/earthquakes](http://localhost:8081/api/v1/earthquakes)
- **API Documentation (Swagger):** [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)
- **Database (Postgres):** `localhost:5435`

---

## 🛠 Project Structure & Features

### 🖥️ Backend (Spring Boot)
Located in `/earthquake-backend`.

**What's included:**
- **USGS Integration:** Real-time synchronization with the USGS GeoJSON feed.
- **Data Persistence:** Stores earthquake records in a PostgreSQL database using JPA/Hibernate.
- **RESTful API:**
    - `POST /sync`: Synchronize local database with USGS (with optional filters).
    - `GET /`: Retrieve all stored earthquakes.
    - `GET /filter/magnitude`: Filter results by minimum magnitude.
    - `GET /filter/time`: Filter results by timestamp.
    - `DELETE /{id}`: Remove specific records.
- **Swagger/OpenAPI:** Built-in interactive API documentation.
- **WebClient:** Modern, non-blocking HTTP client for external API calls.

### 🎨 Frontend (React + Vite)
Located in `/earthquake-frontend`.

**What's included:**
- **Modern UI:** Built with **React 19** and **Bootstrap 5** for a responsive, clean design.
- **Real-time Data Display:** Interactive table with magnitude-based color coding (badges).
- **Filtering & Sync:**
    - Sync button to trigger backend updates.
    - Time-based filtering directly from the UI.
- **Interactive Actions:**
    - View detailed USGS info for each earthquake.
    - Delete records directly from the table.
---

## 🔧 Development (Manual Setup)

If you prefer to run the components individually:

### Backend
1. Ensure you have **Java 17** and **Maven** installed.
2. Start a Postgres database on port `5435` or update `application.properties`.
3. Run:
   ```bash
   cd earthquake-backend
   ./mvnw spring-boot:run
   ```

### Frontend
1. Ensure you have **Node.js** installed.
2. Run:
   ```bash
   cd earthquake-frontend
   npm install
   npm run dev
   ```
   *Note: In dev mode, Vite proxies `/api` requests to `http://localhost:8081`.*

---
