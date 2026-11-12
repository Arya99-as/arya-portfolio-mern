import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DigitalProfileCard } from './components/DigitalProfileCard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/makrand" element={<DigitalProfileCard />} />
        <Route path="/profile/makrand-kaingade" element={<DigitalProfileCard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
