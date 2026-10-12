import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import useAirQuality from './hooks/useAirQuality';

// Pages
import DashboardPage from './pages/DashboardPage';
import ComparePage from './pages/ComparePage';
import AnalyticsPage from './pages/AnalyticsPage';
import GuidelinesPage from './pages/GuidelinesPage';
import NotFoundPage from './pages/NotFoundPage';

function AppContent() {
  // Shared Air Quality state for Dashboard and Analytics
  const airQuality = useAirQuality('Pune');

  return (
    <div className="app-container">
      <Navbar />

      <main className="main-content">
        <Routes>
          <Route path="/" element={<DashboardPage airQuality={airQuality} />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/analytics" element={<AnalyticsPage airQuality={airQuality} />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
