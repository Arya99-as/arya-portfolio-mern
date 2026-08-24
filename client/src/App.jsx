import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DigitalProfileCard } from './components/DigitalProfileCard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DigitalProfileCard />} />
        <Route path="/profile" element={<DigitalProfileCard />} />
        <Route path="/profile/makrand" element={<DigitalProfileCard />} />
        <Route path="/profile/makrand-kaingade" element={<DigitalProfileCard />} />
        <Route path="*" element={<DigitalProfileCard />} />
      </Routes>
    </BrowserRouter>
  );
}
