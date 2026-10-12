# AirSense Pro: Pollution Level Visualizer
### Formative Assessment – II (FA-2) Mini Project
**Pimpri Chinchwad Education Trust's Pimpri Chinchwad College of Engineering (PCCOE)**  
**Department of Master of Computer Applications (MCA)**  
**Academic Year:** 2026 – 2027 | **Semester:** III | **Class:** SYMCA  
**Course Name:** Advanced Web Technologies | **Course Owner:** Dr. Avinash Chormale  

---

## Academic Credentials
- **Student Name:** Ladane Jagannath Baliram
- **Permanent Registration Number (PRN):** 125M1H010
- **Mini Project Title:** Pollution Level Visualizer (AirSense Pro)
- **Assessment Type:** Formative Assessment - II (Mini Project - Phase II: Advanced Features, Testing and Deployment)

---

## Project Overview
**AirSense Pro** is a modern, high-performance environmental telemetry visualization web application. Built with React 19, React Router v7, and Recharts, it connects to live satellite sensor data via the Open-Meteo Air Quality API to provide real-time US EPA Air Quality Index (AQI) ratings, particulate breakdown ($PM_{2.5}$, $PM_{10}$, $CO$, $NO_2$, $SO_2$, $O_3$), comparative municipal analysis, citizen sensor registries with full CRUD capabilities, and WHO safety guideline compliance benchmarks.

---

## FA-2 Evaluation Rubric Compliance Checklist

| Syllabus Requirement | Project Implementation | File Reference |
|---|---|---|
| **React Hooks** | `useEffect`, `useMemo`, `useCallback`, `useRef`, custom hooks (`useAirQuality`, `useLocalStorage`, `useDebounce`), `useContext` | [`src/hooks/`](src/hooks/), [`src/context/`](src/context/) |
| **Routing** | React Router v7 multi-page SPA with 6 modular routes + 404 handler | [`src/App.jsx`](src/App.jsx), [`src/components/Navbar.jsx`](src/components/Navbar.jsx) |
| **Forms & Validation** | Controlled modal form with real-time feedback, email regex, numeric bounds (0-1000 µg/m³), live EPA AQI preview | [`src/pages/StationsCrudPage.jsx`](src/pages/StationsCrudPage.jsx) |
| **API Integration** | Open-Meteo REST API (real-time + hourly forecast) + debounced geocoding search + zero-downtime offline fallback | [`src/services/airQualityApi.js`](src/services/airQualityApi.js) |
| **CRUD Operations** | Full Create, Read (Card/Table views), Update, Delete with modal confirmation and localStorage sync | [`src/pages/StationsCrudPage.jsx`](src/pages/StationsCrudPage.jsx) |
| **Search & Filter** | Debounced search bar, status filters (Active/Resolved), category filters, pollutant filters | [`src/components/SearchBarEnhanced.jsx`](src/components/SearchBarEnhanced.jsx) |
| **Error Handling** | React ErrorBoundary, network timeout fallbacks, floating toast alerts, form error states | [`src/components/ErrorBoundary.jsx`](src/components/ErrorBoundary.jsx), [`src/context/ToastContext.jsx`](src/context/ToastContext.jsx) |
| **Responsive Design & UI** | Glassmorphism, Dark/Light mode toggle, radial SVG animated AQI gauge, mobile navigation drawer | [`src/index.css`](src/index.css) |
| **Performance Optimization** | Code splitting via manual vendor chunks (React, Recharts), debounced API requests, memoized calculations | [`vite.config.js`](vite.config.js) |
| **Project Testing** | 14 automated unit tests using Vitest (100% pass rate) covering helpers, calculators, and validators | [`src/__tests__/helpers.test.js`](src/__tests__/helpers.test.js) |
| **Academic Deliverables** | 8-10 page Project Report & 8-10 slide Presentation ready for evaluation | [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md), [`docs/PRESENTATION_SLIDES.md`](docs/PRESENTATION_SLIDES.md) |

---

## Getting Started & Local Execution

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### 2. Installation
```bash
# Clone or navigate to the project directory
cd "d:/projects/Pollution Level Visualizer"

# Install all dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Run Automated Test Suite
```bash
npm test
```
Executes all 14 unit tests using Vitest with immediate feedback.

### 5. Production Build & Optimization
```bash
npm run build
```
Generates production-optimized chunks in `dist/`.

---

## Application Routes & Navigation
- `/` — **Live AQI Dashboard:** Interactive city chips, SVG circular gauge, 24-hr forecast area chart, and health recommendations.
- `/compare` — **City Comparison Matrix:** Side-by-side benchmark between two cities with cleaner air winner percentage and comparative bar chart.
- `/stations` — **Custom Stations & Reports (CRUD):** Add, edit, delete, and filter custom monitoring stations with validation.
- `/analytics` — **Environmental Analytics:** WHO guideline compliance radar chart and CSV report export.
- `/guidelines` — **Health Advisory:** US EPA AQI breakdown, vulnerable cohort guidelines, and NASA air-purifying plants.
- `/about` — **Academic Profile:** PCCOE SYMCA credentials, FA-1 vs FA-2 comparison matrix, and project architecture.

---

## Deliverables in Repository
- 📄 **Project Report (8–10 Pages):** [`docs/PROJECT_REPORT.md`](docs/PROJECT_REPORT.md)
- 📽️ **Presentation Slides (8–10 Slides):** [`docs/PRESENTATION_SLIDES.md`](docs/PRESENTATION_SLIDES.md)

---
© 2026 Ladane Jagannath Baliram (125M1H010) • Department of MCA, PCCOE Pune
