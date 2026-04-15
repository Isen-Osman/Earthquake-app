# Earthquake App - Backend

This is the backend service for the Earthquake App, built with Spring Boot, Java 17, and PostgreSQL. It fetches earthquake data from the USGS API and provides a RESTful interface for searching and managing earthquake records.

## Project Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Docker and Docker Compose

### Instructions
1.  Clone the repository.
2.  Navigate to the `earthquake-backend` directory.
3.  Ensure your environment matches the Java version specified in `pom.xml`.

---

## How to Run

### Backend
1.  **Start the Database:**
    ```bash
    docker-compose up -d
    ```
2.  **Run the Application:**
    ```bash
    ./mvnw spring-boot:run
    ```
    The server will start on port `8081`.

3.  **API Documentation:**
    Access Swagger UI at: [http://localhost:8081/swagger-ui/index.html](http://localhost:8081/swagger-ui/index.html)

### Frontend (Assumed React Setup)
The backend is configured to allow CORS from `http://localhost:3000`. To run the frontend:
1.  Navigate to your frontend project directory.
2.  Install dependencies: `npm install`
3.  Start the application: `npm start`

---

## Database Configuration

The application uses PostgreSQL 17.0, configured via `docker-compose.yml`.

- **Database Name:** `earthquake_db`
- **Username:** `demo`
- **Password:** `demo`
- **Host Port:** `5435`
- **Internal Container Port:** `5432`

Spring Boot configuration (`application.properties`):
```properties
spring.datasource.url=jdbc:postgresql://localhost:5435/earthquake_db
spring.datasource.username=demo
spring.datasource.password=demo
spring.jpa.hibernate.ddl-auto=update
```

---

## Assumptions Made
1.  **Frontend Existence:** Based on the `@CrossOrigin` configuration in `EarthquakeController`, it is assumed a React frontend exists elsewhere and runs on `http://localhost:3000`.
2.  **Docker Environment:** It is assumed the user has Docker installed to host the PostgreSQL database.
3.  **USGS API:** It is assumed the USGS API is publicly accessible and does not require an API key for the daily GeoJSON feed.
4.  **Database Initial State:** `spring.jpa.hibernate.ddl-auto=update` is used to automatically create/update tables on startup.

---

## Optional Improvements Implemented
- **Swagger/OpenAPI:** Integrated for easy API testing and documentation.
- **WebClient:** Used `spring-boot-starter-webflux` for modern, non-blocking API interactions.
- **Dockerized Database:** Simplified setup using Docker Compose.
- **Lombok:** Used to reduce boilerplate code for models and DTOs.
- **Custom Exceptions:** Implemented specific exceptions for API and WebClient errors for better debugging.
- **Filtering Logic:** Added backend-level filtering for magnitude and time.
