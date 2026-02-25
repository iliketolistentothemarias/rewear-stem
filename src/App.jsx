import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/AuthContext';
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Repurpose from './pages/Repurpose';
import MapPage from './pages/Map';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/repurpose" element={<Repurpose />} />
            <Route path="/map" element={<MapPage />} />
          </Route>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
