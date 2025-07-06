import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import PartnershipPage from './pages/PartnershipPage';
import AdminPage from './pages/AdminPage';
import CookieBanner from './components/CookieBanner';
import EmailCapturePopup from './components/EmailCapturePopup';
import { Toaster } from 'react-hot-toast';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            style: {
              background: '#38A169',
              color: '#fff',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#e53e3e',
              color: '#fff',
            },
          },
        }}
      />

      <Routes>
        {/* Admin routes - no header/footer */}
        <Route path="/admin/*" element={<AdminPage />} />
        
        {/* Public routes - with header/footer */}
        <Route
          path="/*"
          element={
            <>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/partnership" element={<PartnershipPage />} />
                </Routes>
              </main>
              <Footer />
              <CookieBanner />
              <EmailCapturePopup />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;