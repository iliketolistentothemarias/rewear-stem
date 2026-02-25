import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './lib/AuthContext';
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

// Redirect to /auth if not logged in (except for public routes)
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
}

// Redirect to /home if already logged in (for auth/splash pages)
function RedirectIfAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes — redirect to /home if already signed in */}
          <Route path="/" element={<RedirectIfAuth><Splash /></RedirectIfAuth>} />
          <Route path="/auth" element={<RedirectIfAuth><Auth /></RedirectIfAuth>} />

          {/* Protected routes — redirect to /auth if not signed in */}
          <Route path="/onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
          <Route element={<RequireAuth><MainLayout /></RequireAuth>}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/repurpose" element={<Repurpose />} />
            <Route path="/map" element={<MapPage />} />
          </Route>
          <Route path="/item/:id" element={<RequireAuth><ItemDetail /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
