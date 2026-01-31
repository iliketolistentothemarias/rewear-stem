import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AppLayout from './layouts/AppLayout';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Profile from './pages/Profile';
import MapPage from './pages/MapPage';
import Network from './pages/Network';
import Rewards from './pages/Rewards';
import Action from './pages/Action';
import { Help, Settings } from './pages/Placeholders';

function App() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-eco-bg overflow-hidden">
      {/* Global Liquid Background Blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-eco-green/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-eco-light/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-eco-cream/60 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />

            <Route element={<AppLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/action" element={<Action />} />
              <Route path="/network" element={<Network />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/help" element={<Help />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
