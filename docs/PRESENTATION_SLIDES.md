# Mini Project Presentation (FA-2)
## AirSense Pro: Pollution Level Visualizer
**Pimpri Chinchwad Education Trust’s Pimpri Chinchwad College of Engineering (PCCOE)**  
**Department of MCA | Academic Year 2026 – 2027 | Semester III**  
**Course:** Advanced Web Technologies | **Course Owner:** Dr. Avinash Chormale  

---

### Slide 1: Title & Candidate Credentials
* **Project Title:** AirSense Pro - Real-Time Pollution Level Visualizer
* **Student Name:** Ladane Jagannath Baliram
* **PRN:** 125M1H010
* **Class & Section:** SYMCA, Semester III
* **Assessment Type:** Formative Assessment - II (FA-2) Mini Project (10 Marks)
* **Date:** October 2026

> **Presenter Speaking Note:**  
> "Good morning respected evaluators and course owner Dr. Avinash Chormale sir. Today I am presenting Phase-II of my Mini Project for Advanced Web Technologies, titled AirSense Pro - Pollution Level Visualizer."

---

### Slide 2: Problem Statement & Motivation
* **The Environmental Challenge:** Ambient air pollution ($PM_{2.5}$, $PM_{10}$, $NO_2$, $SO_2$) is the leading cause of urban cardiovascular and respiratory distress in regions like PCMC and Pune.
* **Problem in Current Solutions:** Existing government portals are often slow, lack real-time visual clarity, offer no side-by-side municipal comparison, and provide no interface for citizen incident reporting.
* **Our Solution:** A modern, blazing-fast, client-side web application transforming complex open environmental telemetry into actionable health indicators and community reporting tools.

---

### Slide 3: Phase-I (FA-1) vs Phase-II (FA-2) Progression
| Parameter | Phase-I (FA-1) Core | Phase-II (FA-2) Advanced Enhancement |
|---|---|---|
| **Routing** | Single static view | Multi-Page SPA via React Router v7 |
| **React Hooks** | `useState` only | `useEffect`, `useMemo`, `useCallback`, `useRef`, custom hooks, `useContext` |
| **Data CRUD** | Read-only single query | Full CRUD (Create, Read, Update, Delete) with localStorage |
| **Forms & Validation** | Basic single input | Controlled form with real-time regex & range validation |
| **Visualizations** | Single basic bar chart | Recharts Area (Forecast), Multi-Bar, WHO Radar, & SVG Gauge |
| **Testing** | None | 14 automated unit tests via Vitest |
| **UI Aesthetics** | Basic dark layout | Glassmorphism, Dark/Light mode, animated gauges, mobile drawer |

---

### Slide 4: System Architecture & Technology Stack
* **Frontend Library:** React 19.2.8 (Strict Mode & Functional Components)
* **Build System:** Vite 8.2 with Rolldown manual chunk splitting
* **Routing:** React Router v7 (BrowserRouter with 6 distinct modular routes)
* **Charting Library:** Recharts 3.10 (AreaChart, BarChart, RadarChart)
* **Styling:** Vanilla CSS design system with CSS custom properties, glassmorphism, and responsive CSS grid
* **Data Provider:** Open-Meteo Geocoding & Air Quality REST APIs (Zero API key dependency)
* **Unit Testing:** Vitest 5.0 with 100% test pass rate

---

### Slide 5: Core Feature 1 - Live Telemetry & 24-Hour Forecast
* **Real-Time EPA AQI Gauge:** Custom animated circular SVG gauge illustrating US EPA 0-500 index.
* **Dynamic WHO Guidelines Comparison:** Direct comparison of $PM_{2.5}$ and $PM_{10}$ against WHO 24-hr safe limits.
* **24-Hour Forecast Area Chart:** Real-time predictive telemetry curves with smooth gradients.
* **Cohort-Specific Health Advisory:** Tailored medical precautions for General Public, Asthmatics, Children, and Elderly.
* **Quick-Pick Chips:** 1-click loading for Pimpri-Chinchwad, Pune, Mumbai, Delhi, Bengaluru, London, and Tokyo.

---

### Slide 6: Core Feature 2 - Side-by-Side Municipal Comparison
* **Dual City Comparison:** Benchmark any two cities simultaneously (e.g., Pune vs Delhi, Pimpri-Chinchwad vs Mumbai).
* **Cleaner Air Winner Computation:** Mathematical algorithm calculating the cleaner air percentage and AQI delta.
* **Comparative Multi-Bar Graphs:** Visual side-by-side contrast of all five key pollutants ($PM_{2.5}$, $PM_{10}$, $NO_2$, $SO_2$, $O_3$).
* **Preset Shortcuts:** Instant selection of major metro comparisons.

---

### Slide 7: Core Feature 3 - Citizen Stations & Incident CRUD
* **Create:** Register new local environmental sensors or citizen pollution complaints.
* **Read:** Flexible toggle between responsive Card Grid and Data Table views.
* **Update:** In-place editing of sensor telemetry and 1-click status transitions (Active $\leftrightarrow$ Under Investigation $\leftrightarrow$ Resolved).
* **Delete:** Modal confirmation safeguard protecting user data.
* **Form Validation:** Real-time checking for name length, email syntax, numeric limits (0-1000 µg/m³), and instant live estimated AQI preview.

---

### Slide 8: Core Feature 4 - Environmental Analytics & Data Export
* **WHO Compliance Radar Chart:** Multi-dimensional radar comparing actual pollutant readings against strict WHO guidelines.
* **Environmental Audit Table:** Risk factors and exposure multiples calculated dynamically.
* **CSV Telemetry Export:** 1-click generation and download of formatted CSV files for researchers and environmental clubs.
* **Raw JSON Telemetry:** Copy raw API JSON directly to clipboard for debugging or external verification.

---

### Slide 9: Automated Testing & Performance Optimization
* **Test Suite:** 14 automated unit tests covering EPA AQI index calculations, WHO threshold logic, and form validator regexes.
* **Performance Optimizations:**
  - `useMemo` prevents heavy recalculations on keystroke events.
  - `useCallback` preserves function reference identities.
  - `useDebounce` limits geocoding API queries to 350ms delay.
  - Vite vendor chunk splitting delivers a lightweight 165 kB main bundle.
  - Zero-downtime offline fallback mechanism ensures seamless viva demonstration.

---

### Slide 10: Conclusion & Project Demonstration
* **Summary:** AirSense Pro transforms complex open environmental data into an intuitive, accessible, and interactive application.
* **Academic Fulfillment:** Fully addresses all FA-2 rubric requirements spanning React Hooks, Routing, Forms, CRUD, Error Handling, Testing, and Premium UI.
* **Ready for Live Demonstration & Technical Viva.**

> **Presenter Speaking Note:**  
> "Thank you Dr. Chormale sir and evaluators. I am now delighted to demonstrate the live working application and answer any technical questions."
