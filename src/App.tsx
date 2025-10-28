import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CenterDetailPage from './pages/CenterDetailPage';
import GovernmentCentersPage from './pages/GovernmentCentersPage';
import PrivateCentersPage from './pages/PrivateCentersPage';
import GovernmentHospitalsPage from './pages/GovernmentHospitalsPage';
import PrivateHospitalsPage from './pages/PrivateHospitalsPage';
import PsychiatristsPage from './pages/PsychiatristsPage';
import EventsPage from './pages/EventsPage';
import FeedbackPage from './pages/FeedbackPage';
import FAQPage from './pages/FAQPage';

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />

            {/* Dynamic routing with nested parameters */}
            <Route path="/district/:district/taluk/:taluk/village/:village/hospital/private" element={<PrivateHospitalsPage />} />
            <Route path="/district/:district/taluk/:taluk/village/:village/psychiatrist" element={<PsychiatristsPage />} />
            <Route path="/district/:district/taluk/:taluk/village/:village/hospital/government" element={<GovernmentHospitalsPage />} />
            <Route path="/district/:district/taluk/:taluk/village/:village/irca/private" element={<PrivateCentersPage />} />
            <Route path="/district/:district/taluk/:taluk/village/:village/irca/government" element={<GovernmentCentersPage />} />

            {/* Legacy routes for backward compatibility */}
            <Route path="/center/:id" element={<CenterDetailPage />} />
            <Route path="/details/:id" element={<CenterDetailPage />} />
            <Route path="/centers/government" element={<GovernmentCentersPage />} />
            <Route path="/centers/private" element={<PrivateCentersPage />} />
            <Route path="/hospitals/government" element={<GovernmentHospitalsPage />} />
            <Route path="/hospitals/private" element={<PrivateHospitalsPage />} />
            <Route path="/psychiatrists" element={<PsychiatristsPage />} />

            {/* Other pages */}
            <Route path="/events" element={<EventsPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
