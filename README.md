# Torre Technical Test

This repository contains the solution for the Torre Technical Test. It is a **monorepo** built using **Yarn Workspaces**, consisting of a NestJS backend, a Vite/React frontend, and a shared library package.

## 📂 Project Structure

- **apps/backend**: NestJS application acting as a proxy/integration layer for Torre's external APIs.
- **apps/frontend**: Vite + React application (Client).
- **packages/shared**: Shared interfaces and utilities used by both frontend and backend (e.g., `ApiResponse`, `ErrorInterface`).

## 🚀 Prerequisites

- **Node.js** (v18+ recommended)
- **Yarn** (`npm install -g yarn`)

## 🛠️ Setup & Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/enosefelix/Torre-Tech-Test.git
    cd "Torre.ai Test"
    ```

2.  **Install dependencies:**
    From the root directory, run:
    ```bash
    yarn install
    ```
    This will install dependencies for all workspaces (`backend`, `frontend`, and `shared`) and link the shared package.

3.  **Environment Configuration:**
    Navigate to `apps/backend` and create a `.env` file based on `.env.example`.
    ```bash
    cd apps/backend
    cp .env.example .env
    ```
    Ensure the following variables are set (defaults are usually sufficient for testing):
    ```env
    SEARCH_TORRE_BASE_URL=https://torre.ai
    OPPORTUNITIES_TORRE_BASE_URL=https://search.torre.co
    GENOME_TORRE_BASE_URL=https://torre.ai
    ```

## 🏃‍♂️ Running the Project

You can run the applications from the root directory or individually.

### Backend
To start the backend in development mode:
```bash
yarn backend:dev
```
The server will run at `http://localhost:3000`.

### Frontend
To start the frontend development server:
```bash
yarn frontend:dev
```
The client will serve at `http://localhost:5173` (by default).

## ✨ Backend Features

The backend serves as an intermediary to handle authentication, data transformation, and CORS for Torre's public APIs.

### Key Endpoints
Detailed documentation is available in [API_DOCUMENTATION.md](./apps/backend/API_DOCUMENTATION.md).

- **POST `/external/search`**:
  - Searches for entities (people, jobs) using Torre's streaming search API.
  - **Feature**: Handles **NDJSON** (Newline Delimited JSON) parsing automatically, allowing the client to receive standard JSON arrays.

- **GET `/external/bios/:username`**:
  - Retrieves detailed professional genome/bio information for a specific user.

- **POST `/external/opportunities/search`**:
  - Advanced search for job opportunities with filtering criteria (skills, language, status, etc.).

### Shared Interfaces
Both backend and frontend utilize the `@torre/shared` package to ensure type consistency for API responses (`ApiResponse<T>`) and error handling.

## 📄 Documentation

- **API Documentation**: See [apps/backend/API\_DOCUMENTATION.md](./apps/backend/API_DOCUMENTATION.md) for request/response schemas.