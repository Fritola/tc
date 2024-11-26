import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

function App() {

  const PublicRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken");

    if (accessToken) {
      return <Navigate to="/dashboard" replace />;
    }
    return children;
  };

  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const accessToken = localStorage.getItem("userToken");

    if (!accessToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
