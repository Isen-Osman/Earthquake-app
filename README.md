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

## 📘 Documentation & Implementation Details

### 1. Project Setup Instructions
To set up the project locally:
- **Prerequisites:** Java 17+, Node.js 20+, Docker (optional but recommended), Maven.
- **Cloning:** `git clone https://github.com/Isen-Osman/Earthquake-app && cd Earthquake-app`
- **Environment:** The project uses standard Spring and React configurations. No additional `.env` files are required for basic setup.

### 2. How to Run Backend and Frontend
- **Using Docker (Recommended):**
  ```bash
  docker-compose up --build
  ```
  This starts the database (Postgres), the backend (Spring Boot), and the frontend (React/Nginx) automatically.
- **Manual Execution:**
    - **Backend:** `cd earthquake-backend && ./mvnw spring-boot:run`
    - **Frontend:** `cd earthquake-frontend && npm install && npm run dev`

### 3. Database Configuration Steps
- **Docker Compose:** The database is configured via environment variables in `docker-compose.yml`. It uses PostgreSQL 17 on port `5435`.
- **Backend Connection:** `earthquake-backend/src/main/resources/application.properties` points to `localhost:5435` for development.
- **Auto-Update:** Hibernate is set to `update` mode, so the schema is created automatically on the first run.

### 4. Assumptions Made
- **Data Source:** It is assumed the USGS API is publicly accessible and follows the GeoJSON format.
- **Sync Behavior:** It is assumed that "Sync" should update existing records based on their unique USGS ID (`externalId`) rather than deleting and recreating all data.
- **Timezone:** Timestamps are handled in UTC (Z-format) for consistency across the system.

### 5. Optional Improvements Implemented
- **Upsert Logic:** Improved the backend `sync` logic to perform updates or inserts instead of a destructive `deleteAll()`. This preserves historical data from multiple sync sessions.
- **Fixed URL Mapping:** Corrected the USGS detail URL mapping so users can now click the globe icon in the UI to view the original USGS report.
- **Enhanced UI Controls:** Added a "Reset" button in the frontend to quickly clear filters and refresh the data.
- **Activity Tracking:** Added a "Last Updated" status indicator in the frontend header to show the freshness of the data.
- **Advanced Deletion:** Implemented a `DELETE /api/v1/earthquakes/all` endpoint in the backend for convenient database maintenance.

