// Constants for Pollution Level Visualizer (AirSense Pro)
// Pimpri Chinchwad College of Engineering - MCA FA-2 Mini Project

export const APP_METADATA = {
  title: 'AirSense Pro - Pollution Level Visualizer',
  version: '2.0.0 (Phase II)',
  studentName: 'Ladane Jagannath Baliram',
  prn: '125M1H010',
  department: 'MCA (Master of Computer Applications)',
  class: 'SYMCA - Semester III (2026 - 2027)',
  college: "Pimpri Chinchwad Education Trust's Pimpri Chinchwad College of Engineering (PCCOE)",
  course: 'Advanced Web Technologies',
  courseOwner: 'Dr. Avinash Chormale'
};

// WHO (World Health Organization) Recommended Air Quality Guidelines (24-hour mean in µg/m³)
export const WHO_GUIDELINES = {
  pm25: { limit: 15, name: 'PM2.5', unit: 'µg/m³', desc: 'Fine inhalable particles with diameters ≤ 2.5 µm' },
  pm10: { limit: 45, name: 'PM10', unit: 'µg/m³', desc: 'Inhalable particles with diameters ≤ 10 µm' },
  no2: { limit: 25, name: 'NO2', unit: 'µg/m³', desc: 'Nitrogen Dioxide from vehicular emissions' },
  so2: { limit: 40, name: 'SO2', unit: 'µg/m³', desc: 'Sulfur Dioxide from industrial fuel combustion' },
  co: { limit: 4000, name: 'CO', unit: 'µg/m³', desc: 'Carbon Monoxide from incomplete burning' },
  o3: { limit: 100, name: 'O3', unit: 'µg/m³', desc: 'Ground-level Ozone formed by sunlight + pollutants' }
};

// Quick cities for 1-click loading with PCMC & major Indian + Global cities
export const QUICK_CITIES = [
  { name: 'Pimpri-Chinchwad', query: 'Pimpri, India', badge: 'PCMC Local' },
  { name: 'Pune', query: 'Pune, India', badge: 'Regional' },
  { name: 'Mumbai', query: 'Mumbai, India', badge: 'Metro' },
  { name: 'Delhi', query: 'Delhi, India', badge: 'Capital' },
  { name: 'Bengaluru', query: 'Bengaluru, India', badge: 'Tech Hub' },
  { name: 'London', query: 'London, United Kingdom', badge: 'Global' },
  { name: 'Tokyo', query: 'Tokyo, Japan', badge: 'Global' },
  { name: 'New York', query: 'New York, United States', badge: 'Global' }
];

// Initial seed data for Custom Monitoring Stations & Community Incident Reports (CRUD)
export const INITIAL_STATIONS = [
  {
    id: 'st-1',
    name: 'PCCOE Campus Air Station',
    location: 'Sector 26, Pradhikaran, Nigdi, Pimpri-Chinchwad',
    category: 'Educational',
    pm25: 38.4,
    pm10: 72.1,
    aqi: 95,
    dominantPollutant: 'PM10',
    status: 'Active',
    reportedBy: 'Dept. of MCA - Environmental Club',
    contact: 'env.mca@pccoepune.org',
    notes: 'Campus rooftop real-time particulate optical monitor. Air quality remains moderate during college hours.',
    createdAt: '2026-10-10T09:30:00Z',
    updatedAt: '2026-10-12T08:00:00Z'
  },
  {
    id: 'st-2',
    name: 'Bhosari MIDC Industrial Monitor',
    location: 'Bhosari Industrial Estate, PCMC',
    category: 'Industrial',
    pm25: 142.6,
    pm10: 210.5,
    aqi: 184,
    dominantPollutant: 'PM2.5',
    status: 'Under Investigation',
    reportedBy: 'Jagannath Ladane (Citizen Scientist)',
    contact: 'jagannath.ladane@pccoepune.org',
    notes: 'Heavy smelting and fabrication emissions observed during morning shift. Alert sent to local pollution board.',
    createdAt: '2026-10-09T14:15:00Z',
    updatedAt: '2026-10-11T16:30:00Z'
  },
  {
    id: 'st-3',
    name: 'Akurdi Railway Station Interchange',
    location: 'Akurdi Railway Station Circle, Pimpri-Chinchwad',
    category: 'Traffic Junction',
    pm25: 88.0,
    pm10: 135.2,
    aqi: 132,
    dominantPollutant: 'NO2',
    status: 'Active',
    reportedBy: 'PCMC Smart City Cell',
    contact: 'smartcity@pcmcindia.gov.in',
    notes: 'Traffic congestion during peak commute hours (8-10 AM & 6-8 PM) leads to elevated NO2 and particulate spikes.',
    createdAt: '2026-10-08T11:00:00Z',
    updatedAt: '2026-10-12T06:45:00Z'
  },
  {
    id: 'st-4',
    name: 'Hinjawadi Phase 1 Green Buffer',
    location: 'Rajiv Gandhi Infotech Park, Hinjawadi',
    category: 'Commercial / IT',
    pm25: 28.5,
    pm10: 48.0,
    aqi: 45,
    dominantPollutant: 'O3',
    status: 'Resolved',
    reportedBy: 'Tech Park Eco-Initiative',
    contact: 'greenspace@hinjawadi-it.in',
    notes: 'Tree plantation drive and electric shuttle mandates have reduced local particulate matter significantly.',
    createdAt: '2026-10-05T08:00:00Z',
    updatedAt: '2026-10-10T12:00:00Z'
  }
];

// Offline fallback mock data for seamless viva demonstration when offline
export const MOCK_CITY_DATA = {
  'pimpri-chinchwad': {
    city: 'Pimpri-Chinchwad, India',
    aqi: 92,
    category: 'Moderate',
    pollutants: { pm25: 36.5, pm10: 68.2, co: 420.0, no2: 24.8, so2: 9.3, o3: 38.6 },
    hourly: [
      { time: '00:00', aqi: 75, pm25: 28, pm10: 55 },
      { time: '04:00', aqi: 82, pm25: 32, pm10: 60 },
      { time: '08:00', aqi: 110, pm25: 45, pm10: 85 },
      { time: '12:00', aqi: 95, pm25: 38, pm10: 70 },
      { time: '16:00', aqi: 88, pm25: 34, pm10: 65 },
      { time: '20:00', aqi: 104, pm25: 42, pm10: 80 }
    ]
  },
  'pune': {
    city: 'Pune, India',
    aqi: 84,
    category: 'Moderate',
    pollutants: { pm25: 32.1, pm10: 58.4, co: 380.0, no2: 21.3, so2: 8.1, o3: 42.0 },
    hourly: [
      { time: '00:00', aqi: 70, pm25: 25, pm10: 50 },
      { time: '04:00', aqi: 75, pm25: 28, pm10: 54 },
      { time: '08:00', aqi: 98, pm25: 39, pm10: 74 },
      { time: '12:00', aqi: 88, pm25: 34, pm10: 64 },
      { time: '16:00', aqi: 82, pm25: 30, pm10: 58 },
      { time: '20:00', aqi: 92, pm25: 36, pm10: 68 }
    ]
  },
  'mumbai': {
    city: 'Mumbai, India',
    aqi: 125,
    category: 'Unhealthy for Sensitive Groups',
    pollutants: { pm25: 54.2, pm10: 105.8, co: 650.0, no2: 38.5, so2: 18.2, o3: 31.4 },
    hourly: [
      { time: '00:00', aqi: 110, pm25: 45, pm10: 90 },
      { time: '04:00', aqi: 115, pm25: 48, pm10: 96 },
      { time: '08:00', aqi: 140, pm25: 62, pm10: 120 },
      { time: '12:00', aqi: 130, pm25: 58, pm10: 112 },
      { time: '16:00', aqi: 122, pm25: 52, pm10: 102 },
      { time: '20:00', aqi: 135, pm25: 60, pm10: 118 }
    ]
  },
  'delhi': {
    city: 'Delhi, India',
    aqi: 268,
    category: 'Very Unhealthy',
    pollutants: { pm25: 185.0, pm10: 310.2, co: 1450.0, no2: 68.4, so2: 32.1, o3: 55.0 },
    hourly: [
      { time: '00:00', aqi: 240, pm25: 160, pm10: 280 },
      { time: '04:00', aqi: 260, pm25: 175, pm10: 300 },
      { time: '08:00', aqi: 295, pm25: 210, pm10: 350 },
      { time: '12:00', aqi: 275, pm25: 190, pm10: 320 },
      { time: '16:00', aqi: 255, pm25: 170, pm10: 290 },
      { time: '20:00', aqi: 280, pm25: 200, pm10: 335 }
    ]
  }
};
