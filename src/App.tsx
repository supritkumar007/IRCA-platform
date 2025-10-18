import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CenterDetailPage from './pages/CenterDetailPage';
import EventsPage from './pages/EventsPage';
import FeedbackPage from './pages/FeedbackPage';
import FAQPage from './pages/FAQPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/center/:id" element={<CenterDetailPage />} />
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
