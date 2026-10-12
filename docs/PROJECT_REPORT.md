# Pimpri Chinchwad Education Trust’s
# Pimpri Chinchwad College of Engineering (PCCOE), Pune
### Department of Master of Computer Applications (MCA)
**Academic Year:** 2026 – 2027 | **Semester:** III | **Class:** SYMCA  
**Course Name:** Advanced Web Technologies | **Course Owner:** Dr. Avinash Chormale  
**Formative Assessment – II (FA-2) Mini Project Report**

---

# AIRSENSE PRO: POLLUTION LEVEL VISUALIZER
### An Advanced Client-Side Environmental Telemetry & Health Risk Assessment Web Application

**Submitted By:**  
- **Student Name:** Ladane Jagannath Baliram  
- **Permanent Registration Number (PRN):** 125M1H010  
- **Department:** Master of Computer Applications (MCA)  
- **Institution:** PCET’s Pimpri Chinchwad College of Engineering, Nigdi, Pune – 411044  

---

## TABLE OF CONTENTS
1. [Executive Summary & Abstract](#1-executive-summary--abstract)
2. [Problem Identification & Real-World Scope](#2-problem-identification--real-world-scope)
3. [Objectives of Phase-II](#3-objectives-of-phase-ii)
4. [Software Requirement Specification (SRS)](#4-software-requirement-specification-srs)
5. [System Architecture & Component Hierarchy](#5-system-architecture--component-hierarchy)
6. [Implementation of Advanced React Concepts](#6-implementation-of-advanced-react-concepts)
7. [API Integration & Data Modeling](#7-api-integration--data-modeling)
8. [CRUD Operations & Form Validation](#8-crud-operations--form-validation)
9. [Automated Testing & Quality Assurance](#9-automated-testing--quality-assurance)
10. [Performance Optimization & Bundle Splitting](#10-performance-optimization--bundle-splitting)
11. [Results & User Interface Highlights](#11-results--user-interface-highlights)
12. [Viva-Voce Technical Questions & Model Answers](#12-viva-voce-technical-questions--model-answers)
13. [Conclusion & Future Enhancements](#13-conclusion--future-enhancements)

---

## 1. Executive Summary & Abstract
Rapid industrialization and vehicular density across municipal corporations such as Pimpri-Chinchwad (PCMC) and Pune have led to deteriorating ambient air quality. **AirSense Pro** is a modern, responsive Single Page Web Application (SPA) designed and developed during Phase-II (FA-2) of the Mini Project for the Advanced Web Technologies curriculum.

Building upon the core React fundamentals established in Phase-I, Phase-II incorporates:
- Declarative client-side routing via **React Router v7**.
- Advanced React Hooks lifecycle patterns (`useEffect`, `useMemo`, `useCallback`, `useRef`, custom hooks, `useContext`).
- Real-time geocoding and pollution telemetry via the **Open-Meteo Air Quality API**.
- Full Create, Read, Update, Delete (**CRUD**) capabilities for citizen monitoring stations and pollution incident reports with strict regular-expression input validation.
- Responsive, multi-metric data visualizations using **Recharts** (Area charts, Bar charts, Radar charts) and custom SVG animated gauges.
- Dark and Light glassmorphic design system with WCAG accessibility considerations.
- Automated testing via **Vitest** achieving 100% test pass rate for utility algorithms and form validators.

---

## 2. Problem Identification & Real-World Scope
Air pollution is an invisible hazard. Particulate matter smaller than 2.5 micrometers ($PM_{2.5}$) penetrates directly into pulmonary alveoli and enters the human bloodstream, causing systemic cardiovascular and pulmonary diseases.

### Key Deficiencies in Existing Portals:
1. **Complex Cluttered Dashboards:** Government environmental portals present dense raw scientific tables without immediate actionable health context.
2. **Lack of Comparative Analytics:** Citizens cannot easily contrast pollution differentials between commuting hubs (e.g., Pimpri-Chinchwad vs Pune vs Delhi).
3. **Absence of Community Incident Reporting:** Local citizens cannot log hyper-local pollution incidents (e.g., MIDC factory smoke emissions or garbage fires) with real-time severity classification.

AirSense Pro addresses these challenges by transforming live environmental telemetry into intuitive visual gauges, comparative radar charts, and citizen-accessible reporting registries.

---

## 3. Objectives of Phase-II
In compliance with the FA-2 syllabus and Bloom's Taxonomy levels (**Analyze L4, Evaluate L5, Create L6**), the project objectives are:
1. **Integrate Multi-Route Navigation:** Implement seamless routing across Dashboard, City Comparison, Stations Registry, Analytics, Health Guidelines, and Academic Information pages.
2. **Master Advanced React Hooks:** Implement custom hooks (`useAirQuality`, `useLocalStorage`, `useDebounce`) and state memoization (`useMemo`, `useCallback`) to avoid redundant renders.
3. **Robust Form Handling & Validation:** Construct interactive modal forms with real-time feedback, email pattern checks, numeric boundaries, and touched-state tracking.
4. **Resilient API Architecture:** Query live REST endpoints with debounced autocomplete suggestions and graceful offline fallback mechanisms.
5. **Quality Assurance & Verification:** Establish automated unit tests and code-split production bundles for fast sub-second load times.

---

## 4. Software Requirement Specification (SRS)

### 4.1 Functional Requirements
- **FR-1 (Live Air Quality Telemetry):** Fetch real-time US EPA AQI, $PM_{2.5}$, $PM_{10}$, $CO$, $NO_2$, $SO_2$, and $O_3$ for any global or Indian municipality.
- **FR-2 (Debounced Geocoding Autocomplete):** Provide location suggestions as user types with a 350ms debounce threshold.
- **FR-3 (Multi-City Comparison):** Simultaneously benchmark two municipal regions side-by-side with automatic winner determination.
- **FR-4 (Citizen Station CRUD):** Allow users to Create new monitoring stations, Read them in Card/Table views, Update their telemetry or status, and Delete records with confirmation modals.
- **FR-5 (WHO Guideline Compliance Audit):** Compare all measured pollutants against World Health Organization 24-hour safety thresholds via radar charts.
- **FR-6 (Data Export):** Enable citizens and researchers to download comma-separated values (CSV) telemetry reports or copy raw JSON data.
- **FR-7 (Persistent Theming & Watchlist):** Persist theme preferences (Dark/Light) and saved watchlist cities in browser `localStorage`.

### 4.2 Non-Functional Requirements
- **NFR-1 (Performance):** Initial application bundle size under 200 kB (gzipped) via Vite manual code chunking.
- **NFR-2 (Responsiveness):** 100% fluid responsive design accommodating mobile phones (<640px), tablets (768px), and desktop viewports (>1024px).
- **NFR-3 (Reliability):** React ErrorBoundary ensures uninterrupted user experience; offline mock fallback ensures zero-downtime demonstration.
- **NFR-4 (Security & Validation):** Strict sanitization and regex validation on all user inputs to prevent malformed records.

---

## 5. System Architecture & Component Hierarchy

### 5.1 Architecture Workflow
```
[User Browser]
       │
       ▼
[React 19 Router (BrowserRouter)]
       ├── Context Providers (ThemeProvider, ToastProvider)
       ├── ErrorBoundary Container
       │
       ├── Page Routes:
       │     ├── /           -> DashboardPage (useAirQuality hook)
       │     ├── /compare    -> ComparePage (Dual API fetch)
       │     ├── /stations   -> StationsCrudPage (useLocalStorage CRUD)
       │     ├── /analytics  -> AnalyticsPage (WHO Radar & CSV Export)
       │     ├── /guidelines -> GuidelinesPage (Health Advisory)
       │     └── /about      -> AboutPage (Academic Info)
       │
       ▼
[Services Layer]
       ├── airQualityApi.js (Open-Meteo REST API + Geocoding)
       └── helpers.js (EPA Breakpoints, WHO caps, Validators)
       │
       ▼
[Persistent Storage]
       └── browser window.localStorage ('airsense_stations', 'airsense_theme')
```

### 5.2 Component Hierarchy
- `App.jsx`
  - `ErrorBoundary.jsx`
  - `ThemeProvider.jsx`
  - `ToastProvider.jsx`
    - `Navbar.jsx` (Academic strip, Brand, NavLinks, Theme toggle, Mobile Drawer)
    - `Routes`
      - `DashboardPage.jsx`
        - `SearchBarEnhanced.jsx` (Debounced suggestions, Geolocation)
        - `AQIGauge.jsx` (SVG Circular Meter, Glowing Glow Effect)
        - `HealthAdvisoryCard.jsx` (Cohort tab switching)
        - `PollutantGrid.jsx` (WHO safety progress bars)
        - `ForecastChart.jsx` (Recharts 24-hr Area Trend)
        - `Chart.jsx` (Recharts Comparative Bar)
      - `ComparePage.jsx`
        - Side-by-Side Scorecards & Multi-Bar Comparison
      - `StationsCrudPage.jsx`
        - Search & Filter Toolbar
        - Grid / Table Toggle
        - Station / Incident Modal Form with Inline Validation
        - Delete Confirmation Dialog
      - `AnalyticsPage.jsx`
        - Radar Chart (Observed vs WHO Safe Cap)
        - Compliance Audit Table & CSV Generator
      - `GuidelinesPage.jsx`
        - US EPA Classification Grid & NASA Air Plants
      - `AboutPage.jsx`
        - PCCOE SYMCA Credentials & Phase Comparison Matrix
      - `NotFoundPage.jsx`
    - `Footer.jsx`

---

## 6. Implementation of Advanced React Concepts

### 6.1 React Hooks Implemented
1. **`useState`:** Manages component-specific view modes, form fields, modal visibility, and active tab states.
2. **`useEffect`:** Handles asynchronous API synchronization, outside-click detection on dropdowns, and theme syncing to `document.documentElement`.
3. **`useMemo`:** 
   - Eliminates recalculation of EPA AQI breakpoints during form keystrokes.
   - Memoizes filtered station records based on search strings and category pills.
   - Optimizes Recharts multi-dataset transforms.
4. **`useCallback`:** Memoizes functions passed down to child components (e.g., `loadData`, `toggleFavorite`, `removeToast`) preventing unnecessary child re-renders.
5. **`useRef`:** References DOM elements for modal overlays and dropdown click-outside event listeners.
6. **Custom Hooks:**
   - **`useLocalStorage(key, initialValue)`:** Provides seamless synchronized state between React and browser storage with JSON parse error safety.
   - **`useDebounce(value, delay)`:** Delays rapid keystroke execution by 350ms, mitigating API rate limits.
   - **`useAirQuality(city)`:** Encapsulates complete query state, loading, caching, favorites, and manual refetch callbacks.
7. **`useContext`:** Powering `ThemeContext` (Dark/Light mode) and `ToastContext` (Global notifications).

---

## 7. API Integration & Data Modeling
The application connects to the **Open-Meteo Air Quality Open Data API** with no proprietary API key dependencies:
- **Geocoding Endpoint:** `https://geocoding-api.open-meteo.com/v1/search`
- **Air Quality Endpoint:** `https://air-quality-api.open-meteo.com/v1/air-quality`

### Data Transformation Schema:
```javascript
{
  city: "Pimpri-Chinchwad, Maharashtra, India",
  latitude: 18.62,
  longitude: 73.80,
  aqi: 92, // US EPA Scale (0-500)
  pollutants: {
    pm25: 36.5, // µg/m³
    pm10: 68.2, // µg/m³
    co: 420.0,
    no2: 24.8,
    so2: 9.3,
    o3: 38.6
  },
  hourly: [
    { time: "00:00", aqi: 75, pm25: 28, pm10: 55 },
    { time: "04:00", aqi: 82, pm25: 32, pm10: 60 },
    ...
  ],
  isFallback: false,
  lastUpdated: "2026-10-12T08:00:00Z"
}
```

---

## 8. CRUD Operations & Form Validation
The custom station registry allows full lifecycle operations on environmental data:

### Form Validation Specification:
| Field | Rule / Constraint | Error Feedback Message |
|---|---|---|
| **Station Name** | $\ge 3$ characters | *"Station/Incident name must be at least 3 characters long."* |
| **Location** | $\ge 3$ characters | *"Location or address is required."* |
| **Reported By** | $\ge 2$ characters | *"Reporter or organization name is required."* |
| **Contact Email** | Valid RFC email regex | *"Please enter a valid email address (e.g. student@pccoepune.org)."* |
| **$PM_{2.5}$ Concentration** | Numeric, $0 \le x \le 1000$ | *"$PM_{2.5}$ must be a valid positive concentration (0 to 1000 µg/m³)."* |
| **$PM_{10}$ Concentration** | Numeric, $0 \le x \le 1500$ | *"$PM_{10}$ must be a valid positive concentration (0 to 1500 µg/m³)."* |
| **Observation Notes** | $\ge 10$ characters | *"Notes must be at least 10 characters detailing observation."* |

---

## 9. Automated Testing & Quality Assurance
Automated unit tests were established using **Vitest** in `src/__tests__/helpers.test.js`.

### Test Execution Summary:
```
 RUN  v5.0.3 D:/projects/Pollution Level Visualizer

 ✓ src/__tests__/helpers.test.js (14 tests) 10ms
   ✓ getAQIInfo US EPA Scale Mapping (6 tests)
     ✓ should classify AQI <= 50 as Good
     ✓ should classify AQI 51-100 as Moderate
     ✓ should classify AQI 101-150 as Unhealthy for Sensitive Groups
     ✓ should classify AQI 151-200 as Unhealthy
     ✓ should classify AQI 201-300 as Very Unhealthy
     ✓ should classify AQI > 300 as Hazardous
   ✓ getHealthTip Recommendations (2 tests)
     ✓ should recommend outdoor activities when air is Good
     ✓ should recommend N95 mask or precautions when air is Unhealthy
   ✓ getPollutantStatus WHO Benchmarking (2 tests)
     ✓ should mark PM2.5 below 15 µg/m³ as Within WHO Limit
     ✓ should detect when PM2.5 exceeds WHO Limit
   ✓ calculateEstimatedAQI EPA Breakpoints (2 tests)
     ✓ should calculate valid AQI number from PM2.5 and PM10
     ✓ should return higher index when PM concentrations are elevated
   ✓ validateStationForm Form Validation Rules (2 tests)
     ✓ should return errors when mandatory fields are missing
     ✓ should pass validation when all fields are compliant

 Test Files  1 passed (1)
      Tests  14 passed (14)
   Duration  336ms
```

---

## 10. Performance Optimization & Bundle Splitting
To adhere to modern production standards, Vite's build configuration was tuned with manual chunk splitting:
```javascript
manualChunks(id) {
  if (id.includes('node_modules/recharts')) return 'vendor-charts';
  if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) return 'vendor-react';
}
```

### Resulting Production Bundles:
- `dist/assets/index.js`: **165.85 kB** (49.25 kB gzip)
- `dist/assets/vendor-react.js`: **218.08 kB** (70.13 kB gzip)
- `dist/assets/vendor-charts.js`: **430.49 kB** (121.39 kB gzip)
- `dist/assets/index.css`: **14.37 kB** (3.67 kB gzip)
- **Build Time:** **790 milliseconds**

---

## 11. Results & User Interface Highlights
1. **Live AQI Dashboard:** Features interactive city chips for immediate loading of PCMC, Pune, Mumbai, Delhi, Bengaluru, London, and Tokyo.
2. **Radial SVG Gauge:** Smoothly animates the circular stroke depending on calculated index score, illuminated by dynamic radial CSS glows.
3. **Multi-City Comparison:** Automatically computes cleaner air winner percentages and displays side-by-side comparative pollutant bar graphs.
4. **Stations CRUD:** Enables full administrative lifecycle with inline validation and instant estimated AQI calculation during typing.
5. **WHO Radar:** Shows environmental compliance ratios across 5 key pollutants.
6. **Dark & Light Mode:** Seamless transition with persistent state in `localStorage`.

---

## 12. Viva-Voce Technical Questions & Model Answers

### Q1: What is the primary difference between Phase-I (FA-1) and Phase-II (FA-2) in your project?
**Answer:** Phase-I focused on foundational React concepts including JSX, component structuring, props, and simple `useState`. Phase-II elevated the architecture into a full Single Page Application with React Router v7, advanced hooks (`useEffect`, `useMemo`, `useCallback`, `useContext`), full CRUD functionality, form validation, animated Recharts visualizations, dark/light themes, and automated Vitest unit testing.

### Q2: Why did you implement custom hooks like `useAirQuality` and `useLocalStorage`?
**Answer:** Custom hooks promote separation of concerns and code reusability. `useLocalStorage` abstracts browser storage synchronization with automatic JSON serialization and error handling. `useAirQuality` decouples data fetching, caching, error states, and favorites management from UI rendering components.

### Q3: How do you prevent unnecessary re-renders in your application?
**Answer:** We leverage `useMemo` to cache computationally intensive tasks such as filtering stations and calculating EPA AQI breakpoints. Event handlers passed to child components are wrapped with `useCallback` to maintain reference stability across renders.

### Q4: How is input validation handled in the Custom Station form?
**Answer:** We implemented a controlled component architecture. As the user enters data, a dedicated validator function checks character lengths, numeric constraints (e.g. $PM_{2.5}$ between 0 and 1000 µg/m³), and regular expression email matching. Field errors are displayed when fields are touched, and submission is prevented if errors exist.

### Q5: What fallback strategy is implemented if the external API fails during a demonstration?
**Answer:** The `airQualityApi.js` service incorporates offline mock fallback datasets for local municipal centers like Pune, Pimpri-Chinchwad, and Delhi. If the external network request times out, the application seamlessly serves verified mock telemetry with an "Offline Mock" indicator, ensuring zero downtime during demonstrations.

---

## 13. Conclusion & Future Enhancements
The **AirSense Pro: Pollution Level Visualizer** project successfully satisfies all requirements of the PCCOE SYMCA Formative Assessment II (FA-2) curriculum. The application demonstrates mastery over modern React 19 architecture, routing, state management, form validation, and data visualization.

### Future Enhancements:
1. Integration with IoT ESP32 physical particulate sensors via WebSockets.
2. Machine Learning predictive models (LSTM) for 7-day smog forecasting.
3. Push notification alerts via Service Workers when ambient AQI exceeds 200.

---
**Verified & Submitted by:**  
Ladane Jagannath Baliram (PRN: 125M1H010)  
Department of MCA, PCCOE Pune
